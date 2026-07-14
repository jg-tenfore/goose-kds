/**
 * Expo / timer domain model — LOCAL to the Expo, Timers & Alerts surface.
 *
 * Deliberately kept out of the shared `src/kds/types.ts`: the expo board adds
 * fields the station boards don't need (per-item station + readiness, promised
 * time, order-modification markers, cancellation acknowledgement). It reuses the
 * shared `OrderSource`, `FulfillmentType`, and `TicketState` unions so the two
 * models stay compatible.
 *
 * Covers:
 *  - TF-173 Expo board cross-station readiness view (per-item station + status)
 *  - TF-174 Complete-order + manual override (readiness gate)
 *  - TF-175 Timer states normal/warning/late (elapsed + promised)
 *  - TF-177 Accessible (non-color) treatment (icon + shape + label tokens)
 *  - TF-178 Cancelled / modified-order board treatments (item change markers)
 */

import type { FulfillmentType, OrderSource, TicketState } from '../types';

/** Prep station an item routes to. Informational (neutral) — not an urgency signal. */
export type Station = 'Grill' | 'Fryer' | 'Griddle' | 'Cold' | 'Bev' | 'Fountain';

/**
 * Per-item readiness as seen by expo (TF-173).
 *  - pending  : station is still working it.
 *  - held     : station has paused it (blocked / waiting on the table / fire).
 *  - ready    : station bumped it up — it's in the window for expo.
 *  - complete : expo has staged/plated it for this order.
 *  - recalled : brought back after being marked ready.
 */
export type ExpoItemStatus = 'pending' | 'held' | 'ready' | 'complete' | 'recalled';

/** Urgency level derived from elapsed vs promised time (TF-175). */
export type TimerLevel = 'normal' | 'warning' | 'late';

/**
 * Item-level modification marker (TF-178). The ingestion layer produces these;
 * expo/board renders them long enough for a cook to catch the change.
 */
export type ItemChange = 'added' | 'removed' | 'changed';

export interface ExpoModifier {
  label: string;
  /** add/no are emphasized (red); option/note are lower-key. */
  kind?: 'add' | 'no' | 'option' | 'note';
  /** A modifier that changed on a live order — highlighted (TF-178). */
  changed?: boolean;
}

export interface ExpoItem {
  id: string;
  quantity: number;
  name: string;
  glyph?: string;
  /** e.g. "Seat 1" / "Table" — muted under the name. */
  seat?: string;
  /** Which station is responsible for this item. */
  station: Station;
  /** Live readiness of the item. */
  status: ExpoItemStatus;
  modifiers?: ExpoModifier[];
  note?: string;
  /** Allergy / critical note — always elevated, never silently truncated. */
  allergy?: string;
  /** Order-modification marker (TF-178). */
  change?: ItemChange;
}

export interface ExpoTicket {
  id: string;
  /** Ticket number or guest name, e.g. "108" or "Ortiz · A47". */
  label: string;
  /** Channel / runner shown at the header's right edge. */
  server?: string;
  source: OrderSource;
  fulfillment: FulfillmentType;
  /** Minutes elapsed since the order fired. Server time is authoritative (TF-175). */
  elapsedMin: number;
  /** Promised prep target in minutes. Undefined → elapsed-only timer mode (TF-175). */
  promisedMin?: number;
  /** Order-level state (reuses the shared union). */
  state: TicketState;
  /** For priority/recalled: when it happened, e.g. "1m ago". */
  stateSince?: string;
  items: ExpoItem[];
  /** Expo has flagged this ticket for attention (TF-173). */
  flagged?: boolean;
  /**
   * Order was cancelled mid-service and needs a cook acknowledgement before it
   * leaves the board (TF-178). `startedPrep` distinguishes wasted food from a
   * clean cancel for analytics.
   */
  cancelled?: { since: string; startedPrep: boolean };
  /** Card content overflows into the next column ("Continued…"). */
  continued?: boolean;
}

/** Threshold config (TF-175). In production this comes from Settings & Reliability. */
export interface TimerThresholds {
  /** Fraction of promised time at which a ticket turns `warning` (default 0.8). */
  warnRatio: number;
  /** Elapsed-only fallback: minutes → `warning` when no promised time. */
  warnMin: number;
  /** Elapsed-only fallback: minutes → `late` when no promised time. */
  lateMin: number;
}

export const DEFAULT_THRESHOLDS: TimerThresholds = {
  warnRatio: 0.8,
  warnMin: 12,
  lateMin: 20,
};

/**
 * Derive the urgency level from elapsed/promised time and thresholds (TF-175).
 * Server-authoritative: callers pass server-computed minutes, never a device clock.
 */
export function computeTimerLevel(
  elapsedMin: number,
  promisedMin?: number,
  thresholds: TimerThresholds = DEFAULT_THRESHOLDS,
): TimerLevel {
  if (promisedMin != null && promisedMin > 0) {
    if (elapsedMin >= promisedMin) return 'late';
    if (elapsedMin >= promisedMin * thresholds.warnRatio) return 'warning';
    return 'normal';
  }
  // Elapsed-only mode (no promised time).
  if (elapsedMin >= thresholds.lateMin) return 'late';
  if (elapsedMin >= thresholds.warnMin) return 'warning';
  return 'normal';
}

/** Readiness roll-up for a ticket (TF-173 / TF-174). */
export interface Readiness {
  /** Items that count toward completion (excludes removed/cancelled). */
  total: number;
  /** Items ready or complete. */
  done: number;
  /** Every required item is ready/complete → safe to complete without override. */
  allReady: boolean;
}

export function computeReadiness(ticket: ExpoTicket): Readiness {
  const required = ticket.items.filter((i) => i.change !== 'removed');
  const done = required.filter((i) => i.status === 'ready' || i.status === 'complete').length;
  return { total: required.length, done, allReady: required.length > 0 && done === required.length };
}

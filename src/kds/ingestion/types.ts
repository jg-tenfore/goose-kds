/**
 * Local extended types for the Order Ingestion & Routing surfaces.
 *
 * These live alongside (and never modify) the shared `src/kds/types.ts`. They
 * add the extra fields the ingestion screens need — preview scheduling, item
 * change markers, cancellation metadata, and routing-rule shapes — while
 * reusing the canonical `Ticket` / `TicketItem` / `Modifier` model underneath.
 *
 * Backs: TF-167 (incoming preview), TF-164 (lifecycle change markers +
 * cancelled state), TF-165 (station routing engine + fallback).
 */
import type { FulfillmentType, Modifier, OrderSource, Ticket, TicketItem } from '../types';

/* -------------------------------------------------------------------------- */
/* TF-167 · Incoming order preview                                            */
/* -------------------------------------------------------------------------- */

/** A ticket the source has exposed but that has NOT yet fired to the kitchen. */
export interface PreviewTicket extends Ticket {
  /** Countdown label until the order fires, e.g. "fires in 4m". */
  firesInLabel: string;
  /** Why it's previewable, e.g. "Mobile order-ahead · Tee time 11:50". */
  previewReason?: string;
}

/* -------------------------------------------------------------------------- */
/* TF-164 · Order-updated change markers                                      */
/* -------------------------------------------------------------------------- */

/** How a line changed after the ticket was already sent to the kitchen. */
export type ItemChange = 'added' | 'removed' | 'modified';

/** A modifier that may itself be newly added / removed / changed. */
export interface ChangeModifier extends Modifier {
  change?: ItemChange;
}

/** A ticket line carrying an after-fire change marker. */
export interface ChangeTicketItem extends Omit<TicketItem, 'modifiers'> {
  change?: ItemChange;
  modifiers?: ChangeModifier[];
}

export interface ChangeCourse {
  name: string;
  fireLabel?: string;
  items: ChangeTicketItem[];
}

/** A ticket that was updated after firing — markers surfaced on the card. */
export interface ChangeTicket extends Omit<Ticket, 'courses'> {
  courses: ChangeCourse[];
  /** When the change landed, e.g. "40s ago". */
  changeSince?: string;
}

/* -------------------------------------------------------------------------- */
/* TF-164 · Cancelled-in-progress state                                       */
/* -------------------------------------------------------------------------- */

/** A cancelled order that must be acknowledged before it clears. */
export interface CancelledTicket extends Ticket {
  /** Whether the kitchen had already started prep (forces acknowledgement). */
  prepStarted?: boolean;
  /** Free-text reason from the source, e.g. "Guest cancelled at window". */
  cancelReason?: string;
  /** When the cancel event arrived, e.g. "just now". */
  cancelledSince?: string;
}

/* -------------------------------------------------------------------------- */
/* TF-165 · Station routing engine + fallback                                 */
/* -------------------------------------------------------------------------- */

/** What an item attribute is matched against to pick a station. */
export type RouteMatchType = 'source' | 'dining' | 'item' | 'category' | 'fulfillment';

export interface RoutingRule {
  id: string;
  matchType: RouteMatchType;
  /** Human-readable match target, e.g. "Beer & Beverages" or "Kiosk". */
  matchValue: string;
  /** Destination station screen label. */
  station: string;
  /** Routes to more than one screen (shared-visibility item). */
  shared?: boolean;
  /** Extra clarification shown under the rule. */
  note?: string;
}

/** The catch-all applied when no rule matches (never drop an item). */
export interface RoutingFallback {
  station: string;
  note: string;
}

export type { FulfillmentType, OrderSource };

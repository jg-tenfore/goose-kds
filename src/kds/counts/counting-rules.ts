import type { Ticket, TicketItem, ItemState } from '../types';

/**
 * Counting rules (TF-182) — the single documented rule that BOTH all-day counts
 * (TF-179) and production-component counts (TF-180) apply, so a count never
 * misleads a prep decision.
 *
 * A count answers one question: "how many of this still needs to be MADE right
 * now?" The rule, per item state:
 *
 *   pending  → COUNTED    (open/active, the default — still needs making)
 *   held     → COUNTED    (fired but paused; the work is still owed, so it is
 *                          included — flagged separately so a cook knows it is
 *                          on hold, but never dropped from the total)
 *   recalled → COUNTED    (bumped too early and brought back — re-enters the
 *                          count because it must be remade)
 *   complete → EXCLUDED   (already made and bumped)
 *   cancelled→ EXCLUDED   (killed — never made)
 *
 * Ticket-level: a ticket whose state is `completed` or `cancelled` contributes
 * nothing (every line is done/killed). Preview / not-yet-fired tickets are
 * excluded until fired — the mock feed only carries fired tickets, but the guard
 * below documents the intent.
 *
 * Multi-quantity honesty: a line's `quantity` is its remaining make-count. When
 * a POS partially completes a line it lowers the quantity, so the remainder
 * counts automatically — there is no per-unit completion flag to reconcile.
 *
 * These are pure functions over the mock feed; wiring them to a live feed makes
 * the counts recompute on every state change (the "live recount" AC).
 */

/** Item states that still owe production and therefore count. */
const COUNTED_ITEM_STATES: ReadonlySet<ItemState> = new Set<ItemState>(['pending', 'held', 'recalled']);

/** Ticket states that contribute zero to open counts. */
const EXCLUDED_TICKET_STATES = new Set<Ticket['state']>(['completed', 'cancelled']);

/** The make-count a single line contributes under the documented rule. */
export function countableQuantity(item: TicketItem): number {
  const state: ItemState = item.state ?? 'pending';
  return COUNTED_ITEM_STATES.has(state) ? item.quantity : 0;
}

/** True when a whole ticket is excluded from open counts. */
export function isCountableTicket(ticket: Ticket): boolean {
  return !EXCLUDED_TICKET_STATES.has(ticket.state);
}

/** One aggregated menu-item row. */
export interface MenuCount {
  /** Menu item name (the aggregation key). */
  name: string;
  /** Optional leading glyph carried from the first line seen. */
  glyph?: string;
  /** Total make-count across all counted lines. */
  total: number;
  /** How many of `total` are on hold (subset, for the flag). */
  held: number;
  /** How many of `total` are remakes (recalled subset, for the flag). */
  recalled: number;
}

export interface AggregateOptions {
  /**
   * Restrict to lines whose item maps to this station id. When omitted, every
   * counted line is included ("All stations").
   */
  station?: string;
  /** Map an item name → station id. Lines with no mapping are kept under `all`. */
  stationOf?: (itemName: string) => string | undefined;
}

/**
 * Aggregate menu-item make-counts across a ticket feed using the documented
 * counting rule. Result is sorted by descending total, then name, so the
 * heaviest prep sits at the top of the list.
 */
export function aggregateMenuCounts(tickets: Ticket[], opts: AggregateOptions = {}): MenuCount[] {
  const byName = new Map<string, MenuCount>();

  for (const ticket of tickets) {
    if (!isCountableTicket(ticket)) continue;
    for (const course of ticket.courses) {
      for (const item of course.items) {
        const qty = countableQuantity(item);
        if (qty <= 0) continue;

        if (opts.station && opts.stationOf) {
          const station = opts.stationOf(item.name);
          if (station !== opts.station) continue;
        }

        const row = byName.get(item.name) ?? {
          name: item.name,
          glyph: item.glyph,
          total: 0,
          held: 0,
          recalled: 0,
        };
        row.total += qty;
        if (item.state === 'held') row.held += qty;
        if (item.state === 'recalled') row.recalled += qty;
        if (!row.glyph && item.glyph) row.glyph = item.glyph;
        byName.set(item.name, row);
      }
    }
  }

  return [...byName.values()].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
}

/** Total items still to make (sum of every counted line) — for a header stat. */
export function totalMakeCount(tickets: Ticket[]): number {
  return aggregateMenuCounts(tickets).reduce((sum, row) => sum + row.total, 0);
}

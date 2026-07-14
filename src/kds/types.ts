/**
 * KDS ticket domain model (TF-148 · shared ticket state model).
 *
 * These types are the single source of truth every KDS surface builds on.
 * No production backend — the board is driven by the seed/mock feed in
 * `fixtures.ts`. State treatments are applied via tokens (color + icon + label)
 * so the board stays legible without relying on color alone.
 */

/** Order-level state machine. */
export type TicketState =
  | 'active' // normal, in production
  | 'priority' // pushed up the queue
  | 'warning' // approaching the promised/late threshold
  | 'late' // past the promised threshold
  | 'recalled' // brought back after completion
  | 'completed' // bumped
  | 'cancelled'; // killed (acknowledge before discarding)

/** Item-level state machine. */
export type ItemState = 'pending' | 'held' | 'complete' | 'recalled' | 'cancelled';

/** Where the order originated (drives no color — header is neutral). */
export type OrderSource = 'pos' | 'kiosk' | 'online' | 'delivery' | 'phone';

/** Dining / fulfillment option, shown on the divider row. */
export type FulfillmentType = 'for-here' | 'to-go' | 'delivery' | 'pickup' | 'curbside';

/** A single modifier line under an item. `kind` tunes emphasis, not required. */
export interface Modifier {
  label: string;
  /** add/no are emphasized (red); option/note are lower-key. */
  kind?: 'add' | 'no' | 'option' | 'note';
}

export interface TicketItem {
  id: string;
  quantity: number;
  name: string;
  /** e.g. "Table", "Seat 1" — shown in muted text under the item. */
  seat?: string;
  modifiers?: Modifier[];
  /** Free-text note, rendered italic + muted. */
  note?: string;
  /** Allergy / critical note — elevated, never silently truncated. */
  allergy?: string;
  /** Optional leading emoji/glyph (e.g. 🍔). */
  glyph?: string;
  state?: ItemState;
}

/** Course grouping (e.g. "Starters") with an optional fire-timer label. */
export interface Course {
  /** Empty string = uncoursed; header row is hidden. */
  name: string;
  /** e.g. "3d" — rendered in the 🔥 fire chip. */
  fireLabel?: string;
  items: TicketItem[];
}

export interface Ticket {
  id: string;
  /** Ticket number or guest name, e.g. "108" or "Abbey Caruso". */
  label: string;
  /** Server / channel name shown at the header's right edge. */
  server?: string;
  source: OrderSource;
  fulfillment: FulfillmentType;
  /** Elapsed-time label, e.g. "3d" / "5m". Server time is authoritative. */
  elapsedLabel: string;
  state: TicketState;
  /** For priority/recalled: when it happened, e.g. "0m ago". */
  stateSince?: string;
  courses: Course[];
  /** Card content overflows into the next column ("Continued…"). */
  continued?: boolean;
}

/**
 * Board layout modes (TF-161), matching the Settings › Layout options:
 *  - `flex-rail`  — dynamic column-wrap flow, variable card heights (a.k.a. `flow`)
 *  - `tile-fill`  — masonry packing, columns auto-balanced to fit the most tickets
 *  - `1-rail`     — one row of full-height ticket columns, horizontal scroll
 *  - `2-rails`    — a 2-row grid of equal cells flowing into columns
 *  - `3-rails`    — a 3-row grid, densest layout
 * `flow`/`grid` are kept as aliases for `flex-rail`/`2-rails`.
 */
export type BoardMode = 'flex-rail' | 'tile-fill' | '1-rail' | '2-rails' | '3-rails' | 'flow' | 'grid';
export type BoardView = 'open' | 'completed';

export const FULFILLMENT_LABELS: Record<FulfillmentType, string> = {
  'for-here': 'For Here',
  'to-go': 'To Go',
  delivery: 'Delivery',
  pickup: 'Pickup',
  curbside: 'Curbside',
};

export const SOURCE_LABELS: Record<OrderSource, string> = {
  pos: 'POS',
  kiosk: 'Kiosk',
  online: 'Online',
  delivery: 'Delivery',
  phone: 'Phone',
};

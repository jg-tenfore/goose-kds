import type { Ticket } from '../types';

/**
 * Station model + menu→station routing for TenFore Grill — "The Turn".
 *
 * Stations are the physical make-lines a cook stands at. All-day counts can be
 * filtered to one station (TF-179 "station-specific filtering") so a cook sees
 * only what their line owes. Anything without a mapping falls under no station
 * and shows only in the unfiltered "All stations" view.
 */
export interface Station {
  id: string;
  label: string;
}

export const STATIONS: Station[] = [
  { id: 'grill', label: 'Grill' },
  { id: 'fryer', label: 'Fryer' },
  { id: 'cold', label: 'Cold / Wraps' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'bev', label: 'Beverage' },
];

/** Menu item name → station id. Kept explicit so routing is auditable. */
const ITEM_STATION: Record<string, string> = {
  // Grill
  Cheeseburger: 'grill',
  'Clubhouse Burger': 'grill',
  'Patty Melt': 'grill',
  'Hot Dog': 'grill',
  Bratwurst: 'grill',
  Reuben: 'grill',
  'Grilled Cheese': 'grill',
  // Fryer
  'Basket Fries': 'fryer',
  Fries: 'fryer',
  'Onion Rings': 'fryer',
  'Chicken Tenders': 'fryer',
  'Wings (12)': 'fryer',
  'Wings (6)': 'fryer',
  'Fish & Chips': 'fryer',
  'Soft Pretzel': 'fryer',
  Nachos: 'fryer',
  'Loaded Nachos': 'fryer',
  // Cold / Wraps
  'Turkey Club': 'cold',
  'Caesar Wrap': 'cold',
  'Buffalo Wrap': 'cold',
  'Cobb Salad': 'cold',
  BLT: 'cold',
  // Breakfast
  'Egg & Cheese Biscuit': 'breakfast',
  'Breakfast Platter': 'breakfast',
  'Blueberry Muffin': 'breakfast',
  'Avocado Toast': 'breakfast',
  // Beverage
  'Bud Light': 'bev',
  'Coors Light': 'bev',
  'Arnold Palmer': 'bev',
  Coffee: 'bev',
  Lemonade: 'bev',
  Water: 'bev',
  'Chocolate Shake': 'bev',
};

export function stationOf(itemName: string): string | undefined {
  return ITEM_STATION[itemName];
}

export function stationLabel(id: string): string {
  return STATIONS.find((s) => s.id === id)?.label ?? id;
}

/**
 * A busy mid-shift feed for the high-volume batch view. Hand-authored so the
 * full-screen counts read like a real rush ("12 Cheeseburger", "8 Hot Dog",
 * "6 Wings") — it flows through the SAME aggregation engine as the live board,
 * and exercises the counting rule (a completed and a cancelled line that must
 * NOT count, plus held + recalled lines that must).
 */
export const rushTickets: Ticket[] = [
  {
    id: 'r1',
    label: 'Turn · Rush A',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '9m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'r1-1', quantity: 4, name: 'Cheeseburger', glyph: '🍔' },
          { id: 'r1-2', quantity: 3, name: 'Hot Dog', glyph: '🌭' },
          { id: 'r1-3', quantity: 2, name: 'Basket Fries' },
          { id: 'r1-4', quantity: 4, name: 'Bud Light' },
        ],
      },
    ],
  },
  {
    id: 'r2',
    label: 'Grill · Rush B',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '14m',
    state: 'warning',
    courses: [
      {
        name: '',
        items: [
          { id: 'r2-1', quantity: 3, name: 'Cheeseburger', glyph: '🍔' },
          { id: 'r2-2', quantity: 2, name: 'Clubhouse Burger' },
          { id: 'r2-3', quantity: 1, name: 'Wings (12)' },
          { id: 'r2-4', quantity: 2, name: 'Onion Rings' },
          { id: 'r2-5', quantity: 3, name: 'Coors Light' },
        ],
      },
    ],
  },
  {
    id: 'r3',
    label: 'Cart · Hole 7',
    source: 'phone',
    fulfillment: 'delivery',
    elapsedLabel: '21m',
    state: 'late',
    courses: [
      {
        name: '',
        items: [
          { id: 'r3-1', quantity: 5, name: 'Bratwurst' },
          { id: 'r3-2', quantity: 4, name: 'Soft Pretzel', glyph: '🥨' },
          { id: 'r3-3', quantity: 2, name: 'Hot Dog', glyph: '🌭' },
          { id: 'r3-4', quantity: 6, name: 'Coors Light' },
        ],
      },
    ],
  },
  {
    id: 'r4',
    label: 'Shotgun · Field',
    source: 'phone',
    fulfillment: 'to-go',
    elapsedLabel: '7m',
    state: 'priority',
    stateSince: '3m ago',
    courses: [
      {
        name: '',
        items: [
          { id: 'r4-1', quantity: 2, name: 'Cheeseburger', glyph: '🍔' },
          { id: 'r4-2', quantity: 3, name: 'Hot Dog', glyph: '🌭' },
          { id: 'r4-3', quantity: 5, name: 'Wings (12)' },
          { id: 'r4-4', quantity: 4, name: 'Basket Fries' },
          { id: 'r4-5', quantity: 6, name: 'Coffee', glyph: '☕' },
        ],
      },
    ],
  },
  {
    id: 'r5',
    label: 'Kiosk · Rush C',
    source: 'kiosk',
    fulfillment: 'for-here',
    elapsedLabel: '11m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'r5-1', quantity: 3, name: 'Cheeseburger', glyph: '🍔' },
          { id: 'r5-2', quantity: 2, name: 'Turkey Club' },
          { id: 'r5-3', quantity: 2, name: 'Caesar Wrap' },
          { id: 'r5-4', quantity: 3, name: 'Basket Fries' },
          // Held line — still owed, must COUNT (flagged on hold).
          { id: 'r5-5', quantity: 2, name: 'Chicken Tenders', state: 'held' },
          // Completed line — already bumped, must NOT count.
          { id: 'r5-6', quantity: 2, name: 'Onion Rings', state: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'r6',
    label: 'Table 12 · Remake',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '30m',
    state: 'recalled',
    stateSince: '1m ago',
    courses: [
      {
        name: '',
        items: [
          // Recalled line — re-enters the count for a remake.
          { id: 'r6-1', quantity: 1, name: 'Clubhouse Burger', state: 'recalled' },
          // Cancelled line — killed, must NOT count.
          { id: 'r6-2', quantity: 1, name: 'Fish & Chips', state: 'cancelled' },
          { id: 'r6-3', quantity: 2, name: 'Fries' },
        ],
      },
    ],
  },
  {
    id: 'r7',
    label: 'Breakfast · Rush D',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '16m',
    state: 'warning',
    courses: [
      {
        name: '',
        items: [
          { id: 'r7-1', quantity: 6, name: 'Egg & Cheese Biscuit' },
          { id: 'r7-2', quantity: 3, name: 'Breakfast Platter' },
          { id: 'r7-3', quantity: 4, name: 'Coffee', glyph: '☕' },
          { id: 'r7-4', quantity: 2, name: 'Blueberry Muffin' },
        ],
      },
    ],
  },
];

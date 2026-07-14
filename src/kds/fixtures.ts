import type { Ticket } from './types';

/**
 * Seed / mock order feed (stands in for the real backend).
 *
 * Setting: **TenFore Grill — "The Turn"**, a diner-style grill at a golf course.
 * Orders come from the turn window (mobile order-ahead), the grill counter,
 * a self-order kiosk, phone, and the beverage cart running food out to holes.
 * Service is fast — everything lands within the hour, with 15–45 min waits —
 * so the feed exercises every ticket state at realistic golf-diner volume.
 */
export const seedTickets: Ticket[] = [
  // --- Fresh takeout at the turn window --------------------------------------
  {
    id: 't-mobile-a47',
    label: 'Mobile A47 · Ortiz',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '8m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'a47-1', quantity: 2, name: 'Hot Dog', glyph: '🌭' },
          {
            id: 'a47-2',
            quantity: 1,
            name: 'Cheeseburger',
            glyph: '🍔',
            modifiers: [
              { label: 'No Onion', kind: 'no' },
              { label: 'Add Bacon', kind: 'add' },
            ],
          },
          { id: 'a47-3', quantity: 1, name: 'Basket Fries' },
          { id: 'a47-4', quantity: 2, name: 'Bud Light' },
        ],
      },
    ],
  },
  // --- Dine-in at the grill, approaching the wait window ----------------------
  {
    id: 't-t6',
    label: 'Table 6 · Riley',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '16m',
    state: 'warning',
    courses: [
      {
        name: '',
        items: [
          {
            id: 't6-1',
            quantity: 1,
            name: 'Clubhouse Burger',
            modifiers: [
              { label: 'Medium', kind: 'option' },
              { label: 'Add Bacon', kind: 'add' },
              { label: 'Add Cheddar', kind: 'add' },
            ],
          },
          { id: 't6-2', quantity: 1, name: 'Patty Melt' },
          { id: 't6-3', quantity: 1, name: 'Onion Rings' },
          { id: 't6-4', quantity: 1, name: 'Arnold Palmer' },
        ],
      },
    ],
  },
  // --- Beverage-cart delivery to a hole, now late ----------------------------
  {
    id: 't-cart4',
    label: 'Cart · Hole 4',
    server: 'Bev Cart',
    source: 'phone',
    fulfillment: 'delivery',
    elapsedLabel: '23m',
    state: 'late',
    courses: [
      {
        name: '',
        items: [
          { id: 'c4-1', quantity: 4, name: 'Bratwurst' },
          { id: 'c4-2', quantity: 1, name: 'Soft Pretzel', glyph: '🥨' },
          { id: 'c4-3', quantity: 4, name: 'Coors Light' },
        ],
      },
    ],
  },
  // --- Priority: group with an imminent tee time -----------------------------
  {
    id: 't-shotgun',
    label: 'Shotgun · Miller Grp',
    server: 'Turn Window',
    source: 'phone',
    fulfillment: 'to-go',
    elapsedLabel: '6m',
    state: 'priority',
    stateSince: '2m ago',
    courses: [
      {
        name: '',
        items: [
          { id: 'sg-1', quantity: 6, name: 'Egg & Cheese Biscuit' },
          { id: 'sg-2', quantity: 6, name: 'Coffee', glyph: '☕' },
          { id: 'sg-3', quantity: 3, name: 'Blueberry Muffin' },
        ],
      },
    ],
  },
  // --- Kiosk order, mid-production -------------------------------------------
  {
    id: 't-k12',
    label: 'Kiosk K12',
    server: 'Kiosk',
    source: 'kiosk',
    fulfillment: 'for-here',
    elapsedLabel: '12m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'k12-1', quantity: 1, name: 'Chicken Tenders', modifiers: [{ label: 'Kids', kind: 'option' }] },
          { id: 'k12-2', quantity: 1, name: 'Caesar Wrap', modifiers: [{ label: 'Add Chicken', kind: 'add' }] },
          { id: 'k12-3', quantity: 1, name: 'Chocolate Shake' },
        ],
      },
    ],
  },
  // --- Recalled: bumped too early, brought back for a remake ------------------
  {
    id: 't-t3',
    label: 'Table 3 · Dana',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '33m',
    state: 'recalled',
    stateSince: '1m ago',
    courses: [
      {
        name: '',
        items: [
          {
            id: 't3-1',
            quantity: 1,
            name: 'Reuben',
            modifiers: [{ label: 'Rye — not Wheat', kind: 'note' }],
            note: 'Remake — wrong bread',
          },
          { id: 't3-2', quantity: 1, name: 'Fries' },
        ],
      },
    ],
  },
  // --- Late takeout, kitchen backed up ---------------------------------------
  {
    id: 't-mobile-a51',
    label: 'Mobile A51 · Chen',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '44m',
    state: 'late',
    courses: [
      {
        name: '',
        items: [
          { id: 'a51-1', quantity: 2, name: 'Turkey Club' },
          { id: 'a51-2', quantity: 1, name: 'Buffalo Wrap', modifiers: [{ label: 'Extra Ranch', kind: 'add' }] },
          { id: 'a51-3', quantity: 1, name: 'Nachos' },
          { id: 'a51-4', quantity: 3, name: 'Water' },
        ],
      },
    ],
  },
  // --- Fresh order just fired -------------------------------------------------
  {
    id: 't-turn-walsh',
    label: 'Turn · Walsh',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '3m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'w-1', quantity: 1, name: 'Hot Dog', glyph: '🌭' },
          { id: 'w-2', quantity: 1, name: 'Soft Pretzel', glyph: '🥨' },
          { id: 'w-3', quantity: 1, name: 'Lemonade' },
        ],
      },
    ],
  },
  // --- Large coursed dine-in, overflows the card -----------------------------
  {
    id: 't-t9',
    label: 'Table 9 · Thompson (6)',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '18m',
    state: 'warning',
    continued: true,
    courses: [
      {
        name: 'Starters',
        fireLabel: '18m',
        items: [
          { id: 't9-1', quantity: 1, name: 'Wings (12)', modifiers: [{ label: 'Buffalo', kind: 'option' }] },
          { id: 't9-2', quantity: 1, name: 'Loaded Nachos', modifiers: [{ label: 'Add Jalapeño', kind: 'add' }] },
        ],
      },
      {
        name: 'Mains',
        items: [
          { id: 't9-3', quantity: 3, name: 'Clubhouse Burger', modifiers: [{ label: 'Medium Well', kind: 'option' }] },
          { id: 't9-4', quantity: 1, name: 'Cobb Salad' },
          { id: 't9-5', quantity: 1, name: 'Fish & Chips' },
        ],
      },
    ],
  },
  // --- Breakfast rush with an allergy elevation ------------------------------
  {
    id: 't-t1',
    label: 'Table 1 · Sunrise',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '28m',
    state: 'warning',
    courses: [
      {
        name: '',
        items: [
          {
            id: 't1-1',
            quantity: 2,
            name: 'Breakfast Platter',
            modifiers: [
              { label: 'Eggs Over Easy', kind: 'option' },
              { label: 'Add Sausage', kind: 'add' },
            ],
          },
          {
            id: 't1-2',
            quantity: 1,
            name: 'Avocado Toast',
            allergy: 'GLUTEN — sub GF bread',
          },
          { id: 't1-3', quantity: 2, name: 'Coffee', glyph: '☕' },
        ],
      },
    ],
  },
];

/** Recently completed tickets (for the Completed view + recently-fulfilled strip). */
export const completedTickets: Ticket[] = [
  {
    id: 'd-a44',
    label: 'Mobile A44 · Kim',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '20 sec ago',
    state: 'completed',
    stateSince: '20 sec ago',
    courses: [
      {
        name: '',
        items: [
          { id: 'd44-1', quantity: 1, name: 'BLT', state: 'complete' },
          { id: 'd44-2', quantity: 1, name: 'Fries', state: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'd-t5',
    label: 'Table 5 · Nguyen',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '1 min ago',
    state: 'completed',
    stateSince: '1 min ago',
    courses: [
      {
        name: '',
        items: [
          { id: 'd5-1', quantity: 2, name: 'Cheeseburger', state: 'complete' },
          { id: 'd5-2', quantity: 1, name: 'Wings (6)', state: 'complete' },
        ],
      },
    ],
  },
];

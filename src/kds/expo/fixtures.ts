import type { ExpoTicket } from './types';

/**
 * Expo-board mock feed — **TenFore Grill "The Turn"** at the golf course.
 *
 * Expo sees every ticket's items fanned across the line: Grill (burgers/dogs),
 * Fryer (baskets/rings), Griddle (breakfast/melts), Cold (wraps/salads), and
 * Bev/Fountain (drinks). Each item carries its live readiness so the expeditor
 * can complete an order the moment the last station bumps up — everything lands
 * within the hour, 15–45 min waits.
 */
export const expoTickets: ExpoTicket[] = [
  // --- Almost up: one item still on the grill (readiness 3/4) -----------------
  {
    id: 'x-a47',
    label: 'A47 · Ortiz',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedMin: 9,
    promisedMin: 15,
    state: 'active',
    items: [
      { id: 'x47-1', quantity: 2, name: 'Hot Dog', glyph: '🌭', station: 'Grill', status: 'ready' },
      {
        id: 'x47-2',
        quantity: 1,
        name: 'Cheeseburger',
        glyph: '🍔',
        station: 'Grill',
        status: 'pending',
        modifiers: [
          { label: 'No Onion', kind: 'no' },
          { label: 'Add Bacon', kind: 'add' },
        ],
      },
      { id: 'x47-3', quantity: 1, name: 'Basket Fries', station: 'Fryer', status: 'ready' },
      { id: 'x47-4', quantity: 2, name: 'Bud Light', station: 'Bev', status: 'complete' },
    ],
  },
  // --- All ready → ready to complete -----------------------------------------
  {
    id: 'x-t6',
    label: 'Table 6 · Riley',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedMin: 13,
    promisedMin: 18,
    state: 'active',
    items: [
      {
        id: 'x6-1',
        quantity: 1,
        name: 'Clubhouse Burger',
        station: 'Grill',
        status: 'ready',
        modifiers: [{ label: 'Medium', kind: 'option' }, { label: 'Add Cheddar', kind: 'add' }],
      },
      { id: 'x6-2', quantity: 1, name: 'Patty Melt', station: 'Griddle', status: 'ready' },
      { id: 'x6-3', quantity: 1, name: 'Onion Rings', station: 'Fryer', status: 'ready' },
      { id: 'x6-4', quantity: 1, name: 'Arnold Palmer', station: 'Fountain', status: 'complete' },
    ],
  },
  // --- Late + a held item ----------------------------------------------------
  {
    id: 'x-cart4',
    label: 'Cart · Hole 4',
    server: 'Bev Cart',
    source: 'phone',
    fulfillment: 'delivery',
    elapsedMin: 24,
    promisedMin: 20,
    state: 'active',
    flagged: true,
    items: [
      { id: 'xc4-1', quantity: 4, name: 'Bratwurst', station: 'Grill', status: 'ready' },
      { id: 'xc4-2', quantity: 1, name: 'Soft Pretzel', glyph: '🥨', station: 'Fryer', status: 'held', note: 'Out of coarse salt — waiting' },
      { id: 'xc4-3', quantity: 4, name: 'Coors Light', station: 'Bev', status: 'ready' },
    ],
  },
  // --- Priority: shotgun group, mixed readiness ------------------------------
  {
    id: 'x-shotgun',
    label: 'Shotgun · Miller',
    server: 'Turn Window',
    source: 'phone',
    fulfillment: 'to-go',
    elapsedMin: 6,
    promisedMin: 15,
    state: 'priority',
    stateSince: '2m ago',
    items: [
      { id: 'xsg-1', quantity: 6, name: 'Egg & Cheese Biscuit', station: 'Griddle', status: 'pending' },
      { id: 'xsg-2', quantity: 6, name: 'Coffee', glyph: '☕', station: 'Fountain', status: 'ready' },
      { id: 'xsg-3', quantity: 3, name: 'Blueberry Muffin', station: 'Cold', status: 'ready' },
    ],
  },
  // --- Recalled: bumped early, brought back ----------------------------------
  {
    id: 'x-t3',
    label: 'Table 3 · Dana',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedMin: 21,
    promisedMin: 18,
    state: 'recalled',
    stateSince: '1m ago',
    items: [
      {
        id: 'x3-1',
        quantity: 1,
        name: 'Reuben',
        station: 'Griddle',
        status: 'recalled',
        modifiers: [{ label: 'Rye — not Wheat', kind: 'note' }],
        note: 'Remake — wrong bread',
      },
      { id: 'x3-2', quantity: 1, name: 'Fries', station: 'Fryer', status: 'ready' },
    ],
  },
  // --- Breakfast rush with allergy elevation ---------------------------------
  {
    id: 'x-t1',
    label: 'Table 1 · Sunrise',
    server: 'Griddle',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedMin: 16,
    promisedMin: 18,
    state: 'active',
    items: [
      {
        id: 'x1-1',
        quantity: 2,
        name: 'Breakfast Platter',
        station: 'Griddle',
        status: 'pending',
        modifiers: [{ label: 'Eggs Over Easy', kind: 'option' }, { label: 'Add Sausage', kind: 'add' }],
      },
      { id: 'x1-2', quantity: 1, name: 'Avocado Toast', station: 'Cold', status: 'ready', allergy: 'GLUTEN — sub GF bread' },
      { id: 'x1-3', quantity: 2, name: 'Coffee', glyph: '☕', station: 'Fountain', status: 'complete' },
    ],
  },
];

/**
 * A ticket that was **cancelled after prep started** — needs a cook
 * acknowledgement before it clears the board (TF-178).
 */
export const cancelledInProgress: ExpoTicket = {
  id: 'x-cancel-a51',
  label: 'A51 · Chen',
  server: 'Turn Window',
  source: 'online',
  fulfillment: 'to-go',
  elapsedMin: 11,
  promisedMin: 15,
  state: 'cancelled',
  cancelled: { since: '30 sec ago', startedPrep: true },
  items: [
    { id: 'xca-1', quantity: 2, name: 'Turkey Club', station: 'Cold', status: 'pending' },
    { id: 'xca-2', quantity: 1, name: 'Nachos', station: 'Fryer', status: 'pending' },
    { id: 'xca-3', quantity: 3, name: 'Water', station: 'Fountain', status: 'ready' },
  ],
};

/**
 * A **modified** live order (TF-178): an item added, one removed, and a modifier
 * changed on an item already in progress — each marked so a cook catches it.
 */
export const modifiedOrder: ExpoTicket = {
  id: 'x-mod-t9',
  label: 'Table 9 · Thompson',
  server: 'Grill',
  source: 'pos',
  fulfillment: 'for-here',
  elapsedMin: 12,
  promisedMin: 20,
  state: 'active',
  items: [
    {
      id: 'xm-1',
      quantity: 3,
      name: 'Clubhouse Burger',
      station: 'Grill',
      status: 'pending',
      modifiers: [{ label: 'Medium Well → Well Done', kind: 'option', changed: true }],
    },
    { id: 'xm-2', quantity: 1, name: 'Loaded Nachos', station: 'Fryer', status: 'ready', change: 'added', modifiers: [{ label: 'Add Jalapeño', kind: 'add' }] },
    { id: 'xm-3', quantity: 1, name: 'Cobb Salad', station: 'Cold', status: 'pending', change: 'removed' },
    { id: 'xm-4', quantity: 1, name: 'Fish & Chips', station: 'Fryer', status: 'ready' },
  ],
};

/** A large coursed ticket that overflows the card ("Continued…"). */
export const overflowTicket: ExpoTicket = {
  id: 'x-t9-cont',
  label: 'Table 12 · Vasquez (6)',
  server: 'Grill',
  source: 'pos',
  fulfillment: 'for-here',
  elapsedMin: 19,
  promisedMin: 22,
  state: 'active',
  continued: true,
  items: [
    { id: 'xo-1', quantity: 1, name: 'Wings (12)', station: 'Fryer', status: 'ready', modifiers: [{ label: 'Buffalo', kind: 'option' }] },
    { id: 'xo-2', quantity: 1, name: 'Loaded Nachos', station: 'Fryer', status: 'ready' },
    { id: 'xo-3', quantity: 3, name: 'Clubhouse Burger', station: 'Grill', status: 'pending', modifiers: [{ label: 'Medium Well', kind: 'option' }] },
    { id: 'xo-4', quantity: 1, name: 'Cobb Salad', station: 'Cold', status: 'ready' },
    { id: 'xo-5', quantity: 1, name: 'Fish & Chips', station: 'Fryer', status: 'pending' },
  ],
};

/** Full open-board feed for the expo shell (includes the edge-case tickets). */
export const expoBoardTickets: ExpoTicket[] = [
  expoTickets[3], // priority (surfaced high)
  expoTickets[1], // ready to complete
  expoTickets[0], // 3/4 ready
  expoTickets[2], // late + held
  modifiedOrder,
  expoTickets[4], // recalled
  expoTickets[5], // allergy
  cancelledInProgress,
  overflowTicket,
];

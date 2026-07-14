/**
 * Mock feed for the Order Ingestion & Routing screens.
 *
 * Setting stays in the golf-diner world of **TenFore Grill — "The Turn"**:
 * turn-window mobile order-ahead, grill-counter dine-in, a self-order kiosk,
 * phone orders, and the beverage cart running food out to holes.
 *
 * Backs TF-167 / TF-164 / TF-165.
 */
import type { CancelledTicket, ChangeTicket, PreviewTicket, RoutingFallback, RoutingRule } from './types';
import type { Ticket } from '../types';

/* -------------------------------------------------------------------------- */
/* TF-167 · Incoming preview tickets (eligible, not yet fired)                */
/* -------------------------------------------------------------------------- */

export const previewTickets: PreviewTicket[] = [
  {
    id: 'p-a63',
    label: 'Mobile A63 · Delgado',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: 'Placed 2m ago',
    firesInLabel: 'Fires in 4m',
    previewReason: 'Mobile order-ahead · Pickup 11:46',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'a63-1', quantity: 2, name: 'Cheeseburger', glyph: '🍔', modifiers: [{ label: 'Add Bacon', kind: 'add' }] },
          { id: 'a63-2', quantity: 1, name: 'Basket Fries' },
          { id: 'a63-3', quantity: 2, name: 'Bud Light' },
        ],
      },
    ],
  },
  {
    id: 'p-okafor',
    label: 'Turn · Okafor Grp',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: 'Placed 5m ago',
    firesInLabel: 'Fires at tee time · 11:50',
    previewReason: 'Order-ahead for 8:00 tee time group',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'ok-1', quantity: 4, name: 'Egg & Cheese Biscuit' },
          { id: 'ok-2', quantity: 4, name: 'Coffee', glyph: '☕' },
          { id: 'ok-3', quantity: 2, name: 'Hash Browns' },
        ],
      },
    ],
  },
  {
    id: 'p-cart7',
    label: 'Cart · Hole 7',
    server: 'Bev Cart',
    source: 'phone',
    fulfillment: 'delivery',
    elapsedLabel: 'Scheduled',
    firesInLabel: 'Fires in 12m',
    previewReason: 'Beverage-cart run · dispatch when cart nears the grill',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'c7-1', quantity: 3, name: 'Bratwurst' },
          { id: 'c7-2', quantity: 1, name: 'Soft Pretzel', glyph: '🥨' },
          { id: 'c7-3', quantity: 6, name: 'Coors Light' },
        ],
      },
    ],
  },
];

/** Active (already fired) tickets shown next to the preview lane for contrast. */
export const firedTickets: Ticket[] = [
  {
    id: 'f-turn-vela',
    label: 'Turn · Vela',
    server: 'Turn Window',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '5m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'fv-1', quantity: 1, name: 'Turkey Club' },
          { id: 'fv-2', quantity: 1, name: 'Basket Fries' },
          { id: 'fv-3', quantity: 1, name: 'Lemonade' },
        ],
      },
    ],
  },
  {
    id: 'f-t4',
    label: 'Table 4 · Boyd',
    server: 'Grill',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '11m',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'ft4-1', quantity: 1, name: 'Clubhouse Burger', modifiers: [{ label: 'Medium', kind: 'option' }] },
          { id: 'ft4-2', quantity: 1, name: 'Wings (6)', modifiers: [{ label: 'Buffalo', kind: 'option' }] },
          { id: 'ft4-3', quantity: 1, name: 'Arnold Palmer' },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* TF-164 · Order-updated change markers                                      */
/* -------------------------------------------------------------------------- */

/** Table 6 was sent, then the guest changed the order mid-prep. */
export const changedTicket: ChangeTicket = {
  id: 'chg-t6',
  label: 'Table 6 · Riley',
  server: 'Grill',
  source: 'pos',
  fulfillment: 'for-here',
  elapsedLabel: '14m',
  state: 'active',
  changeSince: '40s ago',
  courses: [
    {
      name: '',
      items: [
        {
          id: 'ct6-1',
          quantity: 1,
          name: 'Clubhouse Burger',
          change: 'modified',
          modifiers: [
            { label: 'Medium', kind: 'option', change: 'removed' },
            { label: 'Well Done', kind: 'option', change: 'added' },
            { label: 'Add Bacon', kind: 'add' },
          ],
        },
        {
          id: 'ct6-2',
          quantity: 1,
          name: 'Onion Rings',
          change: 'added',
        },
        {
          id: 'ct6-3',
          quantity: 1,
          name: 'Patty Melt',
          change: 'removed',
        },
        { id: 'ct6-4', quantity: 1, name: 'Arnold Palmer' },
      ],
    },
  ],
};

/** A takeout order where the guest added a shake and dropped the wings. */
export const changedTicketTakeout: ChangeTicket = {
  id: 'chg-a58',
  label: 'Mobile A58 · Pryor',
  server: 'Turn Window',
  source: 'online',
  fulfillment: 'to-go',
  elapsedLabel: '9m',
  state: 'active',
  changeSince: '1m ago',
  courses: [
    {
      name: '',
      items: [
        { id: 'ca58-1', quantity: 2, name: 'Hot Dog', glyph: '🌭' },
        {
          id: 'ca58-2',
          quantity: 1,
          name: 'Buffalo Wrap',
          change: 'modified',
          modifiers: [{ label: 'Extra Ranch', kind: 'add', change: 'added' }],
        },
        { id: 'ca58-3', quantity: 1, name: 'Chocolate Shake', glyph: '🥤', change: 'added' },
        { id: 'ca58-4', quantity: 1, name: 'Wings (6)', change: 'removed' },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* TF-164 · Cancelled-in-progress tickets                                     */
/* -------------------------------------------------------------------------- */

/** Cancelled after prep began — forces acknowledgement so food isn't wasted. */
export const cancelledTicket: CancelledTicket = {
  id: 'cx-a51',
  label: 'Mobile A51 · Chen',
  server: 'Turn Window',
  source: 'online',
  fulfillment: 'to-go',
  elapsedLabel: '12m',
  state: 'cancelled',
  prepStarted: true,
  cancelReason: 'Guest cancelled at the turn window',
  cancelledSince: 'just now',
  courses: [
    {
      name: '',
      items: [
        { id: 'cx-1', quantity: 2, name: 'Turkey Club' },
        { id: 'cx-2', quantity: 1, name: 'Buffalo Wrap', modifiers: [{ label: 'Extra Ranch', kind: 'add' }] },
        { id: 'cx-3', quantity: 1, name: 'Nachos' },
      ],
    },
  ],
};

/** Cancelled before prep started — lower urgency, still acknowledged. */
export const cancelledTicketNotStarted: CancelledTicket = {
  id: 'cx-k18',
  label: 'Kiosk K18',
  server: 'Kiosk',
  source: 'kiosk',
  fulfillment: 'for-here',
  elapsedLabel: '1m',
  state: 'cancelled',
  prepStarted: false,
  cancelReason: 'Duplicate order — kiosk double-tap',
  cancelledSince: '15s ago',
  courses: [
    {
      name: '',
      items: [
        { id: 'ck18-1', quantity: 1, name: 'Chicken Tenders' },
        { id: 'ck18-2', quantity: 1, name: 'Chocolate Shake', glyph: '🥤' },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* TF-165 · Station routing rules (authored in Settings, applied by engine)   */
/* -------------------------------------------------------------------------- */

export const routingRules: RoutingRule[] = [
  {
    id: 'r-grill-cat',
    matchType: 'category',
    matchValue: 'Burgers, Dogs & Sandwiches',
    station: 'Grill',
    note: 'Clubhouse Burger, Hot Dog, Patty Melt, Turkey Club…',
  },
  {
    id: 'r-breakfast',
    matchType: 'category',
    matchValue: 'Breakfast',
    station: 'Grill',
    note: 'Egg & Cheese Biscuit, Breakfast Platter, Hash Browns',
  },
  {
    id: 'r-fry',
    matchType: 'category',
    matchValue: 'Fried & Sides',
    station: 'Fry Station',
    note: 'Basket Fries, Onion Rings, Wings, Chicken Tenders, Pretzel',
  },
  {
    id: 'r-bev',
    matchType: 'category',
    matchValue: 'Beer & Beverages',
    station: 'Beverage / Bar',
    note: 'Bud Light, Coors Light, Arnold Palmer, Coffee, Shakes',
  },
  {
    id: 'r-cart',
    matchType: 'fulfillment',
    matchValue: 'Delivery (bev cart)',
    station: 'Beverage / Bar',
    shared: true,
    note: 'Cart runs are also mirrored to Expo for hand-off tracking',
  },
  {
    id: 'r-kiosk',
    matchType: 'source',
    matchValue: 'Kiosk',
    station: 'Expo',
    shared: true,
    note: 'Kiosk orders copied to Expo so nothing self-order is missed',
  },
  {
    id: 'r-togo',
    matchType: 'dining',
    matchValue: 'To Go (turn window)',
    station: 'Turn Window',
    shared: true,
    note: 'Also shown on the station that makes each item',
  },
];

export const routingFallback: RoutingFallback = {
  station: 'Expo',
  note: 'Any item with no matching rule routes here and logs a route_exception — items are never dropped.',
};

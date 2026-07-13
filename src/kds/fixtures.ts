import type { Ticket } from './types';

/**
 * Seed / mock order feed (stands in for the real backend).
 * Modeled on the Square KDS reference set so the board looks realistic and
 * exercises the ticket-card anatomy: courses, modifiers, notes, allergy flags,
 * long content ("Continued…"), and every ticket state.
 */
export const seedTickets: Ticket[] = [
  {
    id: 't-108',
    label: '108',
    server: 'Layla Levine',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'active',
    continued: true,
    courses: [
      {
        name: 'Starters',
        fireLabel: '3d',
        items: [
          {
            id: 'i1',
            quantity: 1,
            name: 'Burger',
            glyph: '🍔',
            seat: 'Table',
            modifiers: [
              { label: 'Medium', kind: 'option' },
              { label: 'Add Bacon', kind: 'add' },
              { label: 'Add Cheddar', kind: 'add' },
              { label: 'Add Mushroom', kind: 'add' },
            ],
          },
          { id: 'i2', quantity: 1, name: 'Crinkle Fries', seat: 'Table' },
          { id: 'i3', quantity: 1, name: 'Coke', seat: 'Table' },
        ],
      },
      {
        name: '',
        items: [
          {
            id: 'i4',
            quantity: 1,
            name: 'Burger',
            seat: 'Seat 1',
            modifiers: [
              { label: 'Medium Well', kind: 'option' },
              { label: 'Add Bacon', kind: 'add' },
              { label: 'Add Cheddar', kind: 'add' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't-abbey',
    label: 'Abbey Caruso',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'active',
    courses: [
      {
        name: '',
        items: [
          { id: 'a1', quantity: 1, name: 'Coke' },
          { id: 'a2', quantity: 1, name: 'Sprite' },
          {
            id: 'a3',
            quantity: 1,
            name: 'Burger',
            modifiers: [{ label: 'Medium', kind: 'option' }],
          },
          {
            id: 'a4',
            quantity: 1,
            name: 'Latte',
            modifiers: [
              { label: '12oz', kind: 'option' },
              { label: 'Add Caramel', kind: 'add' },
              { label: 'Iced', kind: 'option' },
              { label: 'Skim', kind: 'option' },
            ],
            note: 'Notes here',
          },
        ],
      },
    ],
  },
  {
    id: 't-25',
    label: '25',
    server: 'Sam Levine',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'priority',
    stateSince: '0m ago',
    courses: [
      {
        name: '',
        items: [
          {
            id: 's1',
            quantity: 1,
            name: 'Chicken Sandwich',
            glyph: '🍗',
            seat: 'Seat 1',
            modifiers: [
              { label: 'Spicy', kind: 'option' },
              { label: 'Add Lettuce', kind: 'add' },
              { label: 'No Cheese', kind: 'no' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't-kurt',
    label: 'Kurt',
    server: 'Cambria Nguyen',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'recalled',
    stateSince: '1m ago',
    courses: [
      {
        name: '',
        items: [
          {
            id: 'k1',
            quantity: 1,
            name: 'Ribeye',
            seat: 'Seat 1',
            modifiers: [
              { label: '8oz', kind: 'option' },
              { label: 'Medium Rare', kind: 'option' },
              { label: 'Veggies', kind: 'add' },
              { label: 'Hard sear', kind: 'note' },
            ],
            allergy: 'VIP birthday',
          },
        ],
      },
    ],
  },
  {
    id: 't-cambria',
    label: 'Cambria',
    server: 'Kiosk',
    source: 'kiosk',
    fulfillment: 'delivery',
    elapsedLabel: '3d',
    state: 'late',
    courses: [
      {
        name: '',
        items: [
          {
            id: 'c1',
            quantity: 1,
            name: 'Chicken Wrap',
            modifiers: [
              { label: 'Regular', kind: 'option' },
              { label: 'No Spice', kind: 'no' },
              { label: 'Extra Pickles', kind: 'add' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 't-jonny',
    label: 'Jonny',
    source: 'online',
    fulfillment: 'to-go',
    elapsedLabel: '5m',
    state: 'warning',
    courses: [
      {
        name: '',
        items: [
          {
            id: 'j1',
            quantity: 1,
            name: 'Burger',
            modifiers: [
              { label: 'Medium Rare', kind: 'option' },
              { label: 'Add Bacon', kind: 'add' },
              { label: 'No Lettuce', kind: 'no' },
            ],
            note: 'Xtra good',
          },
          { id: 'j2', quantity: 1, name: 'Coke' },
        ],
      },
    ],
  },
];

/** Completed tickets (for the Completed view + recently-fulfilled strip). */
export const completedTickets: Ticket[] = [
  {
    id: 'd-22',
    label: '22',
    server: 'Jonathan V.',
    source: 'pos',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'completed',
    stateSince: '10 sec ago',
    courses: [
      {
        name: '',
        items: [
          { id: 'd1', quantity: 1, name: 'Budweiser Can', state: 'complete' },
        ],
      },
    ],
  },
  {
    id: 'd-order',
    label: 'Order',
    source: 'kiosk',
    fulfillment: 'for-here',
    elapsedLabel: '3d',
    state: 'completed',
    stateSince: '23 sec ago',
    courses: [{ name: '', items: [{ id: 'd2', quantity: 1, name: 'Coke', state: 'complete' }] }],
  },
];

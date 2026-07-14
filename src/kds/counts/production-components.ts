import type { Ticket } from '../types';
import { countableQuantity, isCountableTicket } from './counting-rules';

/**
 * Production item count v1 (TF-180) — a count of PREP COMPONENTS, not menu
 * items. A cook tracking "how many patties still to drop" cares about the
 * component, which several menu items each consume. v1 is pilot-scoped: only
 * the hand-configured components below are tracked, and each has an EXPLICIT
 * menu→component mapping. Anything a menu item doesn't map to is excluded —
 * never guessed (recipe-aware planning is Northstar).
 *
 * Totals follow the same open/active counting rule as all-day counts
 * (`countableQuantity`), so a completed or cancelled line contributes nothing.
 */

/** One menu item that feeds a component, and how many units it consumes. */
export interface ComponentMapEntry {
  item: string;
  /** Units of the component consumed per one of that menu item. */
  perUnit: number;
}

export interface ProductionComponent {
  id: string;
  /** Component name, e.g. "Beef Patty". */
  label: string;
  /** Unit noun for the total, e.g. "patties", "baskets". */
  unit: string;
  /** Explicit menu mapping. A component with no matching open lines shows 0. */
  map: ComponentMapEntry[];
}

/**
 * Pilot component set for The Turn — the high-value items the line tracks by
 * hand today. Note components deliberately fed by MULTIPLE menu items (patty,
 * bun, fry basket) to exercise correct aggregation, and note that beverages,
 * wraps and salads map to NO component and are therefore excluded from v1.
 */
export const PRODUCTION_COMPONENTS: ProductionComponent[] = [
  {
    id: 'beef-patty',
    label: 'Beef Patty',
    unit: 'patties',
    map: [
      { item: 'Cheeseburger', perUnit: 1 },
      { item: 'Clubhouse Burger', perUnit: 1 },
      { item: 'Patty Melt', perUnit: 1 },
    ],
  },
  {
    id: 'burger-bun',
    label: 'Burger Bun',
    unit: 'buns',
    map: [
      { item: 'Cheeseburger', perUnit: 1 },
      { item: 'Clubhouse Burger', perUnit: 1 },
    ],
  },
  {
    id: 'hotdog-link',
    label: 'Hot Dog Link',
    unit: 'links',
    map: [{ item: 'Hot Dog', perUnit: 1 }],
  },
  {
    id: 'brat-link',
    label: 'Brat Link',
    unit: 'links',
    map: [{ item: 'Bratwurst', perUnit: 1 }],
  },
  {
    id: 'fry-basket',
    label: 'Fry Basket',
    unit: 'baskets',
    map: [
      { item: 'Basket Fries', perUnit: 1 },
      { item: 'Fries', perUnit: 1 },
      { item: 'Fish & Chips', perUnit: 1 },
    ],
  },
  {
    id: 'soft-pretzel',
    label: 'Soft Pretzel',
    unit: 'pretzels',
    map: [{ item: 'Soft Pretzel', perUnit: 1 }],
  },
  {
    id: 'wing',
    label: 'Wing',
    unit: 'wings',
    map: [{ item: 'Wings (12)', perUnit: 12 }],
  },
];

/** A computed component total plus the per-item contributions that built it. */
export interface ComponentCount {
  component: ProductionComponent;
  total: number;
  /** Non-zero contributions, for the "made of" breakdown. */
  breakdown: { item: string; menuQty: number; perUnit: number; subtotal: number }[];
}

/**
 * Sum each configured component across open tickets. Unmapped menu items never
 * appear because the only source of contributions is each component's `map`.
 */
export function aggregateComponentCounts(
  tickets: Ticket[],
  components: ProductionComponent[] = PRODUCTION_COMPONENTS,
): ComponentCount[] {
  // Roll open menu quantities up once, then read them per mapping entry.
  const menuQty = new Map<string, number>();
  for (const ticket of tickets) {
    if (!isCountableTicket(ticket)) continue;
    for (const course of ticket.courses) {
      for (const item of course.items) {
        const qty = countableQuantity(item);
        if (qty <= 0) continue;
        menuQty.set(item.name, (menuQty.get(item.name) ?? 0) + qty);
      }
    }
  }

  return components.map((component) => {
    const breakdown = component.map
      .map((entry) => {
        const menu = menuQty.get(entry.item) ?? 0;
        return { item: entry.item, menuQty: menu, perUnit: entry.perUnit, subtotal: menu * entry.perUnit };
      })
      .filter((b) => b.subtotal > 0);
    const total = breakdown.reduce((sum, b) => sum + b.subtotal, 0);
    return { component, total, breakdown };
  });
}

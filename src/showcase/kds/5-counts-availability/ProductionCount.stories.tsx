import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import { ProductionCountPanel } from '../../../kds/counts/ProductionCountPanel';
import { rushTickets } from '../../../kds/counts/stations';

/**
 * Production Item Count v1 (TF-180) — counts PREP COMPONENTS (patties, buns,
 * links, fry baskets, pretzels, wings), not menu items. Each component has an
 * explicit menu→component mapping; a menu item with no mapping (beverages,
 * wraps, salads) is excluded, never guessed. Totals use the same open/active
 * counting rule (TF-182) as all-day counts. Setting: TenFore Grill — "The Turn".
 */
const meta = {
  title: 'KDS Screens/5 · Counts & Availability/Production Item Count v1',
  component: ProductionCountPanel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('dark')}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ProductionCountPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Busy mid-shift feed — components fed by multiple menu items aggregate
 * correctly (e.g. Beef Patty = Cheeseburger + Clubhouse Burger + Patty Melt;
 * Fry Basket = Basket Fries + Fries + Fish & Chips). Wings show a per-unit
 * multiplier (×12).
 */
export const Rush: Story = {
  name: 'Rush feed · all components',
  args: { tickets: rushTickets },
};

/** Live off the current board feed — lower volume, some components at zero. */
export const LiveBoard: Story = {
  name: 'Live board feed',
  args: { tickets: seedTickets },
};

/** Hide components with a current total of 0 for a tighter batch list. */
export const HideZero: Story = {
  name: 'Rush feed · hide zero',
  args: { tickets: rushTickets, hideZero: true },
};

/** Empty feed — every configured component reads 0 (kept for context). */
export const Empty: Story = {
  name: 'Empty feed',
  args: { tickets: [] },
};

/** Light variant. */
export const Light: Story = {
  name: 'Rush feed · light',
  args: { tickets: rushTickets },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('light')}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

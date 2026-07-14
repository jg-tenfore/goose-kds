import type { Meta, StoryObj } from '@storybook/react-vite';
import { KdsAppShell } from '../../../kds/components/KdsAppShell';
import { seedTickets } from '../../../kds/fixtures';

/**
 * Board view modes (TF-161) — the five ticket layouts from Settings › Layout,
 * rendered as real boards. Switch a device between them for the workflow that
 * fits the station (glanceable flow vs. dense fixed rails).
 */
const meta = {
  title: 'KDS Screens/1 · Foundations & Board/Board Modes',
  component: KdsAppShell,
  parameters: { layout: 'fullscreen' },
  args: { openTickets: seedTickets, mode: 'dark' },
} satisfies Meta<typeof KdsAppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

/** FLEX RAIL — dynamic column-wrap flow; cards keep natural height and reflow. Best for seeing all items on a ticket without scrolling. */
export const FlexRail: Story = { name: 'Flex Rail', args: { boardMode: 'flex-rail' } };

/** TILE FILL — masonry packing; columns auto-balance to fit the most tickets on screen at once. */
export const TileFill: Story = { name: 'Tile Fill', args: { boardMode: 'tile-fill' } };

/** 1 RAIL — one row of full-height ticket columns; best for complex orders with many items per ticket. */
export const OneRail: Story = { name: '1 Rail', args: { boardMode: '1-rail' } };

/** 2 RAILS — a two-row grid of equal cells; a balance of ticket count and detail. */
export const TwoRails: Story = { name: '2 Rails', args: { boardMode: '2-rails' } };

/** 3 RAILS — a three-row grid; the densest layout for high volume. */
export const ThreeRails: Story = { name: '3 Rails', args: { boardMode: '3-rails' } };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { KdsAppShell } from '../../../kds/components/KdsAppShell';
import { seedTickets } from '../../../kds/fixtures';

const meta = {
  title: 'KDS Screens/1 · Foundations & Board/Board Modes',
  component: KdsAppShell,
  parameters: { layout: 'fullscreen' },
  args: { openTickets: seedTickets, mode: 'dark' },
} satisfies Meta<typeof KdsAppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Dynamic flow — cards fill a column top-to-bottom, then wrap; reflows on change. */
export const DynamicFlow: Story = {
  name: 'Dynamic Flow',
  args: { boardMode: 'flow' },
};

/** Fixed grid — stable slots that don't shift, for speed stations. */
export const FixedGrid: Story = {
  name: 'Fixed Grid',
  args: { boardMode: 'grid' },
};

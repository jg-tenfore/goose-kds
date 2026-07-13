import type { Meta, StoryObj } from '@storybook/react-vite';
import { KdsAppShell } from '../../../kds/components/KdsAppShell';
import { seedTickets, completedTickets } from '../../../kds/fixtures';

const meta = {
  title: 'KDS Screens/1 · Foundations & Board/Active Board (Open / Pending)',
  component: KdsAppShell,
  parameters: { layout: 'fullscreen' },
  args: {
    openTickets: seedTickets,
    completedTickets,
  },
} satisfies Meta<typeof KdsAppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Default working view — dark board, dynamic flow (TF-159 / TF-160 / TF-161). */
export const OpenBoard: Story = {
  name: 'Open / Pending (Dark)',
  args: { mode: 'dark', boardMode: 'flow', initialView: 'open' },
};

/** Light theme variant of the same board. */
export const LightTheme: Story = {
  name: 'Open / Pending (Light)',
  args: { mode: 'light', boardMode: 'flow', initialView: 'open' },
};

/** Empty state — no active tickets. */
export const EmptyBoard: Story = {
  name: 'Empty Board',
  args: { mode: 'dark', openTickets: [] },
};

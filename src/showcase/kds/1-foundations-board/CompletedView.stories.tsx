import type { Meta, StoryObj } from '@storybook/react-vite';
import { KdsAppShell } from '../../../kds/components/KdsAppShell';
import { seedTickets, completedTickets } from '../../../kds/fixtures';

const meta = {
  title: 'KDS Screens/1 · Foundations & Board/Completed View',
  component: KdsAppShell,
  parameters: { layout: 'fullscreen' },
  args: {
    openTickets: seedTickets,
    completedTickets,
    initialView: 'completed',
    mode: 'dark',
  },
} satisfies Meta<typeof KdsAppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Completed view — recently completed tickets (entry point to recall). */
export const Completed: Story = { name: 'Completed' };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/3 · Fulfillment Actions',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Completion: Story = {
  name: 'Item / Ticket Completion',
  args: {
    title: 'Item / Ticket Completion',
    description: 'One-touch bump for a line item or a whole ticket, with fast feedback and audit events.',
    contains: ['Complete item control', 'Complete ticket from header', 'Optimistic ~100ms update', 'No duplicate on double-tap'],
    issues: ['CRANE-151'],
  },
};

export const UndoToast: Story = {
  name: 'Undo Window',
  args: {
    title: 'Undo Window',
    description: 'A short, visible undo affordance right after a bump — the first line of recovery.',
    contains: ['Undo toast / control', 'Configurable window', 'Routes to recall after expiry'],
    issues: ['CRANE-171'],
  },
};

export const Recall: Story = {
  name: 'Recall / Unfulfill',
  args: {
    title: 'Recall / Unfulfill',
    description: 'Bring a completed ticket (or last accidental bump) back to active — audit preserved.',
    contains: ['Recall dialog with scope (expo/prep/all)', 'Recalled marker', 'Recall-after-ready warning', 'Preserved completion history'],
    issues: ['CRANE-172'],
  },
};

export const Priority: Story = {
  name: 'Prioritize',
  args: {
    title: 'Prioritize Ticket',
    description: 'Push a ticket up the queue from the ticket or expo, logged and expirable.',
    contains: ['Priority action + marker', 'Clears on complete / manual / expiry', 'Interacts with fired-time queue'],
    issues: ['CRANE-170'],
  },
};

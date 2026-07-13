import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/3 · Fulfillment Actions/Prioritize",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Prioritize Ticket",
    description: "Push a ticket up the queue from the ticket or expo, logged and expirable.",
    contains: [
      "Priority action + marker",
      "Clears on complete / manual / expiry",
      "Interacts with fired-time queue"
],
    issues: ["TF-170"],
  },
};

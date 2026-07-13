import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/3 · Fulfillment Actions/Item / Ticket Completion",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Item / Ticket Completion",
    description: "One-touch bump for a line item or a whole ticket, with fast feedback and audit events.",
    contains: [
      "Complete item control",
      "Complete ticket from header",
      "Optimistic ~100ms update",
      "No duplicate on double-tap"
],
    issues: ["TF-151"],
  },
};

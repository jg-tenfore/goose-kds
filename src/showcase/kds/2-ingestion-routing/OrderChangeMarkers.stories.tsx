import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/2 · Order Ingestion & Routing/Order Change Markers",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Order Change Markers",
    description: "Added / removed / modified items surfaced clearly when an order changes after send.",
    contains: [
      "Added marker",
      "Removed / cancelled item treatment",
      "Changed-modifier highlight"
],
    issues: ["TF-164","TF-168"],
  },
};

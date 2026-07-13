import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/3 · Fulfillment Actions/Recall / Unfulfill",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Recall / Unfulfill",
    description: "Bring a completed ticket (or last accidental bump) back to active — audit preserved.",
    contains: [
      "Recall dialog with scope (expo/prep/all)",
      "Recalled marker",
      "Recall-after-ready warning",
      "Preserved completion history"
],
    issues: ["TF-172"],
  },
};

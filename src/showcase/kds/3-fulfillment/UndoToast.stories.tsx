import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/3 · Fulfillment Actions/Undo Window",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Undo Window",
    description: "A short, visible undo affordance right after a bump — the first line of recovery.",
    contains: [
      "Undo toast / control",
      "Configurable window",
      "Routes to recall after expiry"
],
    issues: ["TF-171"],
  },
};

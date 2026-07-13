import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/4 · Expo, Timers & Alerts/Cancelled / Modified Treatments",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Cancelled / Modified Board Treatments",
    description: "Board-level treatments for orders that die or change mid-prep, with acknowledgement.",
    contains: [
      "Cancelled-in-progress acknowledgement",
      "Added/removed/changed markers",
      "Alert-fatigue guardrails"
],
    issues: ["TF-178"],
  },
};

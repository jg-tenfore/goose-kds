import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/4 · Expo, Timers & Alerts/Timer States",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Timer States",
    description: "Normal / warning / late urgency, driven by server time and legible without color alone.",
    contains: [
      "Elapsed + promised time",
      "Warning + late thresholds",
      "Accessible (non-color) treatment",
      "New-ticket sound per device"
],
    issues: ["TF-175","TF-176","TF-177"],
  },
};

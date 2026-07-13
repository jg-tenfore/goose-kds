import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/5 · Counts & Availability/All-Day Counts",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "All-Day Counts",
    description: "Aggregate item quantities across open tickets — compact list + full-screen batch view.",
    contains: [
      "List view (quick station reference)",
      "Full-screen view (high-volume prep)",
      "Station-specific filtering",
      "Documented open/completed/cancelled/held/recalled rules"
],
    issues: ["TF-179","TF-182"],
  },
};

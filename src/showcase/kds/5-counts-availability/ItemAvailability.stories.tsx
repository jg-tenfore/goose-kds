import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/5 · Counts & Availability/Item Availability",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Item Availability",
    description: "Manager-controlled available / limited / unavailable, honest about local vs upstream state.",
    contains: [
      "Availability toggles (permission-gated)",
      "Local-only vs upstream-synced labeling",
      "Sync status + failure alerting"
],
    issues: ["TF-181","TF-183"],
  },
};

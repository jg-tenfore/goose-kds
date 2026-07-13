import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/6 · Settings & Reliability/Offline / Sync",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Offline / Sync",
    description: "Trust through sync visibility — usable offline, reconnect-safe, no duplicate work.",
    contains: [
      "Offline banner + last-sync + sync states",
      "Local cache survival on refresh",
      "Queued-action replay (no dupes)",
      "Local-network path for in-house orders"
],
    issues: ["TF-185","TF-186"],
  },
};

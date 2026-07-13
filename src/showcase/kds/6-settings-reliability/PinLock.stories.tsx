import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/6 · Settings & Reliability/PIN Lock",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "PIN Lock",
    description: "Locked-screen sign-in and protected-action gate for a shared kitchen device.",
    contains: [
      "Locked / entering / invalid / success states",
      "Lockout + reset path",
      "Auto-lock timeout",
      "Role boundaries"
],
    issues: ["TF-150"],
  },
};

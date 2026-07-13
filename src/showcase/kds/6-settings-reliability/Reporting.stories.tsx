import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/6 · Settings & Reliability/Reporting / Manager Dashboard",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Reporting / Manager Dashboard",
    description: "Simple post-shift read + live kitchen health from the audit event stream.",
    contains: [
      "Completed by hour, avg prep time",
      "Late count, recall count, priority count, route exceptions",
      "Station load / oldest ticket (live)"
],
    issues: ["TF-184"],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/4 · Expo, Timers & Alerts/Expo Board",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Expo Board",
    description: "Consolidated cross-station readiness so expo can coordinate handoff without walking the line.",
    contains: [
      "All items per ticket with station + status",
      "Ready-to-complete signal",
      "Complete-order + manual override (audit)",
      "Prioritize / flag from expo"
],
    issues: ["TF-173","TF-174"],
  },
};

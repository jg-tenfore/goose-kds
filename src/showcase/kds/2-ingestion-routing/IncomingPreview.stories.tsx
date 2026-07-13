import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/2 · Order Ingestion & Routing/Incoming Order Preview",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Incoming Order Preview",
    description: "Eligible not-yet-fired orders shown in a distinct preview state so the kitchen can pace.",
    contains: [
      "Preview treatment (distinct from active)",
      "Excluded from counts/timers until fired",
      "Transition to active on fire"
],
    issues: ["TF-167"],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/6 · Settings & Reliability/Settings / Setup",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Settings / Setup",
    description: "Self-serve device configuration — station, routing rules, layout, timers — no code needed.",
    contains: [
      "Device identity + station assignment",
      "Routing rule authoring (test before publish)",
      "Layout / text size / board mode / header style",
      "Timer thresholds, sound, completion/recall behavior",
      "Role/PIN guardrails"
],
    issues: ["TF-149","TF-187"],
  },
};

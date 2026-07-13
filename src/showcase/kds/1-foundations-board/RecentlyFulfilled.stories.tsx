import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/1 · Foundations & Board/Recently-Fulfilled Strip",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Recently-Fulfilled Strip",
    description: "A toggleable strip of just-completed tickets to validate bumps and catch mistakes.",
    contains: [
      "Time-boxed recent completions",
      "Toggle show/hide",
      "Jump to unfulfill / recall"
],
    issues: ["TF-162"],
  },
};

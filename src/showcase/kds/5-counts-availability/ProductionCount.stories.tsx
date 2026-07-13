import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/5 · Counts & Availability/Production Item Count v1",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Production Item Count v1",
    description: "Pilot-safe count of prep components (patties, baskets, sauces) with explicit menu mapping.",
    contains: [
      "Configured component totals",
      "Distinct from menu-item counts",
      "Excludes unmapped items"
],
    issues: ["TF-180"],
  },
};

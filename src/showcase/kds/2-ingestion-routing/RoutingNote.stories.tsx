import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/2 · Order Ingestion & Routing/Routing (config in Settings)",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Station Routing",
    description: "Routing is engine + rules. The engine is non-visual; rule authoring lives under Settings & Reliability.",
    contains: [
      "Route by source/dining/item/category/fulfillment",
      "Fallback for unmatched items",
      "Fired-time sequencing + priority override"
],
    issues: ["TF-165","TF-166"],
  },
};

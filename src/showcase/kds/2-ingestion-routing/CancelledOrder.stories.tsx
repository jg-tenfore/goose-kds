import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from '../ScreenPlaceholder';

const meta = {
  title: "KDS Screens/2 · Order Ingestion & Routing/Cancelled Order State",
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {
  args: {
    title: "Cancelled Order State",
    description: "A cancelled-in-progress order forces acknowledgement so food isn’t made by mistake.",
    contains: [
      "Cancelled state on the ticket",
      "Acknowledgement flow if prep started",
      "Analytics distinguish cancel vs complete"
],
    issues: ["TF-164","TF-178"],
  },
};

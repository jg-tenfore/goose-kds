import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/5 · Counts & Availability',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const AllDayCounts: Story = {
  name: 'All-Day Counts',
  args: {
    title: 'All-Day Counts',
    description: 'Aggregate item quantities across open tickets — compact list + full-screen batch view.',
    contains: ['List view (quick station reference)', 'Full-screen view (high-volume prep)', 'Station-specific filtering', 'Documented open/completed/cancelled/held/recalled rules'],
    issues: ['CRANE-179', 'CRANE-182'],
  },
};

export const ProductionCount: Story = {
  name: 'Production Item Count v1',
  args: {
    title: 'Production Item Count v1',
    description: 'Pilot-safe count of prep components (patties, baskets, sauces) with explicit menu mapping.',
    contains: ['Configured component totals', 'Distinct from menu-item counts', 'Excludes unmapped items'],
    issues: ['CRANE-180'],
  },
};

export const ItemAvailability: Story = {
  name: 'Item Availability',
  args: {
    title: 'Item Availability',
    description: 'Manager-controlled available / limited / unavailable, honest about local vs upstream state.',
    contains: ['Availability toggles (permission-gated)', 'Local-only vs upstream-synced labeling', 'Sync status + failure alerting'],
    issues: ['CRANE-181', 'CRANE-183'],
  },
};

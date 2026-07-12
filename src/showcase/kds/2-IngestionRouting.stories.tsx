import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/2 · Order Ingestion & Routing',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const IncomingPreview: Story = {
  name: 'Incoming Order Preview',
  args: {
    title: 'Incoming Order Preview',
    description: 'Eligible not-yet-fired orders shown in a distinct preview state so the kitchen can pace.',
    contains: ['Preview treatment (distinct from active)', 'Excluded from counts/timers until fired', 'Transition to active on fire'],
    issues: ['CRANE-167'],
  },
};

export const OrderChangeMarkers: Story = {
  name: 'Order Change Markers',
  args: {
    title: 'Order Change Markers',
    description: 'Added / removed / modified items surfaced clearly when an order changes after send.',
    contains: ['Added marker', 'Removed / cancelled item treatment', 'Changed-modifier highlight'],
    issues: ['CRANE-164', 'CRANE-168'],
  },
};

export const CancelledOrder: Story = {
  name: 'Cancelled Order State',
  args: {
    title: 'Cancelled Order State',
    description: 'A cancelled-in-progress order forces acknowledgement so food isn’t made by mistake.',
    contains: ['Cancelled state on the ticket', 'Acknowledgement flow if prep started', 'Analytics distinguish cancel vs complete'],
    issues: ['CRANE-164', 'CRANE-178'],
  },
};

export const RoutingNote: Story = {
  name: 'Routing (config in Settings)',
  args: {
    title: 'Station Routing',
    description: 'Routing is engine + rules. The engine is non-visual; rule authoring lives under Settings & Reliability.',
    contains: ['Route by source/dining/item/category/fulfillment', 'Fallback for unmatched items', 'Fired-time sequencing + priority override'],
    issues: ['CRANE-165', 'CRANE-166'],
  },
};

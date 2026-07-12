import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/1 · Foundations & Board',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveBoard: Story = {
  name: 'Active Board (Open / Pending)',
  args: {
    title: 'Active Board (Open / Pending)',
    description:
      'Default working view for prep stations — the calm, glanceable board a cook reads from several feet away.',
    contains: [
      'Ticket cards in fired-time / priority order',
      'Filters by station, source, fulfillment type, dining option',
      'Dynamic flow vs fixed-grid layout',
      'Empty + high-volume rush states',
    ],
    issues: ['CRANE-148', 'CRANE-159', 'CRANE-160'],
  },
};

export const CompletedView: Story = {
  name: 'Completed View',
  args: {
    title: 'Completed View',
    description: 'Recently completed tickets for recall, remake, and audit — searchable by ticket / label.',
    contains: ['Completed ticket list', 'Search by ticket # / customer label', 'Entry point to Recall'],
    issues: ['CRANE-159'],
  },
};

export const TicketCard: Story = {
  name: 'Ticket Card & Detail',
  args: {
    title: 'Ticket Card & Detail',
    description: 'The core board unit + its expanded detail — everything needed to prepare accurately.',
    contains: [
      'Source, dining option, elapsed + promised time, label',
      'Item list, quantities, modifiers, allergy elevation',
      'State treatments (normal/priority/warning/late/recalled) — non-color safe',
      'Expanded detail with audit events',
    ],
    issues: ['CRANE-160'],
  },
};

export const BoardModes: Story = {
  name: 'Board Modes',
  args: {
    title: 'Board View Modes',
    description: 'Dynamic horizontal flow for flexible service; fixed grid for speed stations.',
    contains: ['Dynamic flow (reflow by fired time)', 'Fixed grid (stable slots)', 'Mode switch by device setup'],
    issues: ['CRANE-161'],
  },
};

export const RecentlyFulfilled: Story = {
  name: 'Recently-Fulfilled Strip',
  args: {
    title: 'Recently-Fulfilled Strip',
    description: 'A toggleable strip of just-completed tickets to validate bumps and catch mistakes.',
    contains: ['Time-boxed recent completions', 'Toggle show/hide', 'Jump to unfulfill / recall'],
    issues: ['CRANE-162'],
  },
};

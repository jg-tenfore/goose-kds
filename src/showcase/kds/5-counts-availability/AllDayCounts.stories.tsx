import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import { AllDayCountsList } from '../../../kds/counts/AllDayCountsList';
import { AllDayCountsBoard } from '../../../kds/counts/AllDayCountsBoard';
import { rushTickets } from '../../../kds/counts/stations';

/**
 * All-Day Counts (TF-179) — aggregate make-counts across open tickets, in a
 * compact list for quick station reference and a full-screen view for a
 * high-volume prep push. Both share one aggregation engine and the documented
 * counting rule (TF-182): pending / held / recalled lines COUNT; completed and
 * cancelled lines do NOT. Setting: TenFore Grill — "The Turn".
 */
const meta = {
  title: 'KDS Screens/5 · Counts & Availability/All-Day Counts',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const panelDecorator = (mode: 'dark' | 'light') => (Story: () => ReactElement) => (
  <ThemeProvider theme={createKdsTheme(mode)}>
    <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>
      <Story />
    </Box>
  </ThemeProvider>
);

/** Compact list driven live off the current board feed — the sidebar quick reference. */
export const List: Story = {
  name: 'List · compact (live board feed)',
  decorators: [panelDecorator('dark')],
  render: () => <AllDayCountsList tickets={seedTickets} />,
};

/** Same list preselected to the Grill station (TF-179 station filtering). */
export const ListGrillStation: Story = {
  name: 'List · Grill station filter',
  decorators: [panelDecorator('dark')],
  render: () => <AllDayCountsList tickets={seedTickets} defaultStation="grill" />,
};

/** Light variant of the compact list. */
export const ListLight: Story = {
  name: 'List · light',
  decorators: [panelDecorator('light')],
  render: () => <AllDayCountsList tickets={seedTickets} />,
};

/** Empty state — no open items to make. */
export const ListEmpty: Story = {
  name: 'List · empty state',
  decorators: [panelDecorator('dark')],
  render: () => <AllDayCountsList tickets={[]} />,
};

/**
 * Full-screen batch view against a busy mid-shift feed (12 Cheeseburger, 8 Hot
 * Dog, 6 Wings…). The rush feed also carries a completed line and a cancelled
 * line that are correctly excluded, plus held + recalled lines that count.
 */
export const FullScreenBatch: Story = {
  name: 'Full-screen · batch (rush)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <AllDayCountsBoard tickets={rushTickets} />
    </ThemeProvider>
  ),
};

/** Full-screen view filtered to a single station on load. */
export const FullScreenFryer: Story = {
  name: 'Full-screen · Fryer station',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <AllDayCountsBoard tickets={rushTickets} defaultStation="fryer" />
    </ThemeProvider>
  ),
};

/** Full-screen empty state for the prep-push view. */
export const FullScreenEmpty: Story = {
  name: 'Full-screen · empty',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <AllDayCountsBoard tickets={[]} />
    </ThemeProvider>
  ),
};

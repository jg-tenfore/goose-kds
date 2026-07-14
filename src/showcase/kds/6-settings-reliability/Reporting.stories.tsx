import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material';
import { ReportingDashboard } from '../../../kds/settings/ReportingDashboard';
import { createKdsTheme } from '../../../kds/theme';

/**
 * Reporting / Manager Dashboard (TF-184).
 *
 * Simple post-shift read + live kitchen health from the audit event stream:
 * completed-by-hour, average prep time, late / recall / priority counts, route
 * exceptions, and live station load (open + oldest ticket per station). Numbers
 * are a realistic busy golf morning at the turn; the bar chart is inline Box
 * bars (no chart library). Reads from order_received / item_completed /
 * ticket_completed / ticket_recalled / route_exception_created events.
 */
const meta = {
  title: 'KDS Screens/6 · Settings & Reliability/Reporting / Manager Dashboard',
  component: ReportingDashboard,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ReportingDashboard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Post-shift dashboard (dark) — the default manager read. */
export const Dark: Story = {
  name: 'Dashboard (dark)',
  render: (args) => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <ReportingDashboard {...args} />
    </ThemeProvider>
  ),
  args: { seedLabel: true },
};

/** Same dashboard in light mode for the clubhouse office. */
export const Light: Story = {
  name: 'Dashboard (light)',
  render: (args) => (
    <ThemeProvider theme={createKdsTheme('light')}>
      <ReportingDashboard {...args} />
    </ThemeProvider>
  ),
  args: { seedLabel: true },
};

/** Empty state — a daypart with no completed service (TF-184 no-data). */
export const Empty: Story = {
  name: 'Empty period',
  render: (args) => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <ReportingDashboard {...args} />
    </ThemeProvider>
  ),
  args: { empty: true, seedLabel: false },
};

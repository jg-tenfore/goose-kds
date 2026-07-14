import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material';
import { SettingsModal } from '../../../kds/settings/SettingsModal';
import { createKdsTheme } from '../../../kds/theme';

/**
 * Settings / Setup (TF-149 config flow · TF-187 guardrails).
 *
 * The full self-serve device configuration modal, modeled on the Square KDS
 * settings structure: a left nav (General · Routing › Source & fulfillment /
 * Items & categories · Layout · Tickets · Ticket Appearance · Coursing ·
 * Timers & alerts · Printers) over a scrolling content pane. Light theme for now.
 * Golf-diner context: TenFore Grill — "The Turn".
 */
const meta = {
  title: 'KDS Screens/6 · Settings & Reliability/Settings / Setup',
  component: SettingsModal,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('light')}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof SettingsModal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const General: Story = { args: { initialSection: 'general' } };
export const SourceAndFulfillment: Story = { name: 'Source & Fulfillment', args: { initialSection: 'source' } };
export const ItemsAndCategories: Story = { name: 'Items & Categories', args: { initialSection: 'items' } };
export const Layout: Story = { args: { initialSection: 'layout' } };
export const Tickets: Story = { args: { initialSection: 'tickets' } };
export const TicketAppearance: Story = { name: 'Ticket Appearance', args: { initialSection: 'appearance' } };
export const Coursing: Story = { args: { initialSection: 'coursing' } };
export const TimersAndAlerts: Story = { name: 'Timers & Alerts', args: { initialSection: 'timers' } };
export const Printers: Story = { args: { initialSection: 'printers' } };

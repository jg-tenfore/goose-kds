import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsCancelledTicketCard } from '../../../kds/ingestion/KdsCancelledTicketCard';
import { cancelledTicket, cancelledTicketNotStarted } from '../../../kds/ingestion/fixtures';
import { createKdsTheme } from '../../../kds/theme';

/**
 * **Cancelled Order State** (TF-164 · order-cancelled lifecycle event).
 *
 * A cancel event that lands after prep started can't silently disappear — the
 * kitchen would keep making the food. The ticket flips to a hard-stop red state
 * ("CANCELLED — do not make"), items are struck through, and the cook must tap
 * **Acknowledge & discard**. When prep had already started, acknowledging opens
 * a confirm dialog first; once acknowledged the card collapses to a quiet,
 * cleared state.
 */
const meta = {
  title: 'KDS Screens/2 · Order Ingestion & Routing/Cancelled Order State',
  component: KdsCancelledTicketCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('dark')}>
        <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex', gap: 2 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof KdsCancelledTicketCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Prep already started — acknowledging opens a confirm dialog. Try the button. */
export const PrepStarted: Story = {
  name: 'Cancelled after prep started',
  args: { ticket: cancelledTicket },
};

/** Cancelled before prep — one-tap acknowledge, no dialog. */
export const NotStarted: Story = {
  name: 'Cancelled before prep (duplicate)',
  args: { ticket: cancelledTicketNotStarted },
};

/** The quiet, cleared state after the cook acknowledges. */
export const Acknowledged: Story = {
  name: 'Acknowledged & cleared',
  args: { ticket: cancelledTicket, defaultAcknowledged: true },
};

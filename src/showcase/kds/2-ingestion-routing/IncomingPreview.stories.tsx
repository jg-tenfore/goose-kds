import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsIncomingBoard } from '../../../kds/ingestion/KdsIncomingBoard';
import { KdsPreviewCard } from '../../../kds/ingestion/KdsPreviewCard';
import { previewTickets, firedTickets } from '../../../kds/ingestion/fixtures';
import { createKdsTheme } from '../../../kds/theme';

/**
 * **Incoming Order Preview** (TF-167 · Incoming-order preview state).
 *
 * Eligible not-yet-fired orders — turn-window mobile order-ahead, scheduled
 * tee-time groups, and staged beverage-cart runs — are surfaced in a distinct
 * preview treatment so the kitchen can pace the coming load. Preview tickets are
 * dashed/desaturated, carry a "PREVIEW · fires in Xm" banner, are **excluded
 * from active counts and timers until fired**, and expose a "Fire now"
 * affordance that transitions them into fired-time sequencing.
 */
const meta = {
  title: 'KDS Screens/2 · Order Ingestion & Routing/Incoming Order Preview',
  component: KdsIncomingBoard,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof KdsIncomingBoard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Full board: an "Incoming — preview" lane beside the fired/active board. */
export const PreviewBoard: Story = {
  name: 'Preview lane + active board',
  args: {
    previews: previewTickets,
    active: firedTickets,
    // eslint-disable-next-line no-alert
    onFire: (t) => alert(`Fired ${t.label} → joins the active queue`),
  },
};

/** A single preview card in isolation — dashed frame, desaturated body, fire button. */
export const SinglePreviewCard: Story = {
  name: 'Preview card (bare)',
  parameters: { layout: 'centered' },
  args: { previews: previewTickets, active: firedTickets },
  render: () => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>
        <KdsPreviewCard ticket={previewTickets[0]} />
      </Box>
    </ThemeProvider>
  ),
};

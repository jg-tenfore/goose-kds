import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsChangeTicketCard } from '../../../kds/ingestion/KdsChangeTicketCard';
import { KdsTicketCard } from '../../../kds/components/KdsTicketCard';
import { changedTicket, changedTicketTakeout } from '../../../kds/ingestion/fixtures';
import { seedTickets } from '../../../kds/fixtures';
import { createKdsTheme } from '../../../kds/theme';

/**
 * **Order Change Markers** (TF-164 · order-updated lifecycle event).
 *
 * When an order changes *after* it was sent to the kitchen, the cook needs to
 * see exactly what moved. This card variant surfaces three markers: newly
 * **Added** lines (green), **Removed** lines struck through (red), and
 * **Changed** modifiers highlighted amber (e.g. Medium → Well Done). A blue
 * "Order changed" banner holds the update long enough to notice.
 */
const meta = {
  title: 'KDS Screens/2 · Order Ingestion & Routing/Order Change Markers',
  component: KdsChangeTicketCard,
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
} satisfies Meta<typeof KdsChangeTicketCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Dine-in: added Onion Rings, removed Patty Melt, modifier Medium → Well Done. */
export const DineInUpdate: Story = {
  name: 'Dine-in — added / removed / changed',
  args: { ticket: changedTicket },
};

/** Takeout: added shake + extra ranch, dropped the wings. */
export const TakeoutUpdate: Story = {
  name: 'Takeout — item added & removed',
  args: { ticket: changedTicketTakeout },
};

/** Before / after: the original fired card next to its updated version. */
export const BeforeAfter: Story = {
  name: 'Before vs. after change',
  args: { ticket: changedTicket },
  render: () => (
    <>
      <KdsTicketCard ticket={seedTickets.find((t) => t.id === 't-t6')!} />
      <KdsChangeTicketCard ticket={changedTicket} />
    </>
  ),
};

/** Light mode — markers hold contrast on the light board variant. */
export const LightMode: Story = {
  name: 'Light mode',
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('light')}>
        <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  args: { ticket: changedTicket },
};

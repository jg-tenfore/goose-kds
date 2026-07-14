import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, ThemeProvider, Typography } from '@mui/material';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { ExpoTicketCard } from '../../../kds/expo/ExpoTicketCard';
import { createKdsTheme } from '../../../kds/theme';
import { cancelledInProgress, modifiedOrder, expoTickets } from '../../../kds/expo/fixtures';
import type { ExpoTicket } from '../../../kds/expo/types';

/**
 * # Cancelled / Modified Board Treatments (TF-178)
 *
 * How the board handles orders that die or change mid-prep, so the kitchen
 * never makes cancelled food or misses a modifier change:
 *
 * - **Cancelled after prep started** → a red cancelled banner that **requires an
 *   acknowledgement** before the ticket leaves the board (wasted food is
 *   recorded separately from a clean cancel).
 * - **Modified order** → added items get an **Added** marker, removed items are
 *   struck through with a **Removed** marker, and a changed modifier is boxed
 *   and highlighted long enough to catch.
 * - **Alert-fatigue guardrails** → only actionable changes get a persistent
 *   marker; acknowledgement is demanded only when it matters (cancel after prep,
 *   change to an already-completed item).
 */
const dark = createKdsTheme('dark');
const decorator = [
  (Story: () => ReactElement) => (
    <ThemeProvider theme={dark}>
      <Box sx={{ p: 3, bgcolor: 'board.canvas', color: 'text.primary', display: 'inline-flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];

const meta = {
  title: 'KDS Screens/4 · Expo, Timers & Alerts/Cancelled / Modified Treatments',
  component: ExpoTicketCard,
  parameters: { layout: 'centered' },
  decorators: decorator,
} satisfies Meta<typeof ExpoTicketCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Cancelled after prep started
 * Prep was already underway, so the ticket doesn't silently vanish — it holds a
 * red **Cancelled — prep started** banner and stays until a cook taps
 * **Acknowledge & clear** (emits `ticket_cancelled_acknowledged`).
 */
export const CancelledInProgress: Story = {
  args: { ticket: cancelledInProgress },
};

/**
 * ## Cancelled before prep (clean)
 * Nothing was started, so the board can clear it quietly — the analytics still
 * record a cancel (not a complete). Shown here still asking for a light-touch ack.
 */
export const CancelledClean: Story = {
  args: {
    ticket: {
      ...cancelledInProgress,
      id: 'x-cancel-clean',
      label: 'A62 · Park',
      cancelled: { since: '5 sec ago', startedPrep: false },
      items: cancelledInProgress.items.map((i) => ({ ...i, status: 'pending' as const })),
    } satisfies ExpoTicket,
  },
};

/**
 * ## Modified order — added / removed / changed
 * One item **added** (Loaded Nachos), one **removed** (Cobb Salad, struck
 * through), and a modifier **changed** on a burger already in progress
 * (Medium Well → Well Done, boxed). Each marker persists so the change survives
 * a glance.
 */
export const ModifiedOrder: Story = {
  args: { ticket: modifiedOrder },
};

/**
 * ## Change to a completed item → remake
 * A modifier landed on an item the grill already plated, so its status is pushed
 * back to **recalled** and the changed modifier is highlighted — forcing a remake
 * rather than shipping the wrong plate.
 */
export const ChangeAfterComplete: Story = {
  args: {
    ticket: {
      id: 'x-mod-complete',
      label: 'Table 4 · Boyd',
      server: 'Grill',
      source: 'pos',
      fulfillment: 'for-here',
      elapsedMin: 14,
      promisedMin: 18,
      state: 'recalled',
      stateSince: 'just now',
      items: [
        {
          id: 'xmc-1',
          quantity: 1,
          name: 'Clubhouse Burger',
          station: 'Grill',
          status: 'recalled',
          modifiers: [{ label: 'Add Bacon', kind: 'add', changed: true }],
          note: 'Remake — bacon added after bump',
        },
        { id: 'xmc-2', quantity: 1, name: 'Fries', station: 'Fryer', status: 'complete' },
      ],
    } satisfies ExpoTicket,
  },
};

function Guard({ icon, color, title, body }: { icon: ReactElement; color: string; title: string; body: string }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.25, maxWidth: 620 }}>
      <Box sx={{ mt: 0.25, color }}>{icon}</Box>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 800 }}>{title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{body}</Typography>
      </Box>
    </Box>
  );
}

/**
 * ## Alert-fatigue guardrails
 * The rules that keep change-markers meaningful — the reference for the board
 * treatments above, next to a normal (unmarked) ticket so the contrast is clear.
 */
export const Guardrails: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Stack spacing={2}>
        <Guard
          icon={<AddCircleRoundedIcon />}
          color={dark.palette.status.priority}
          title="Only actionable changes get a marker"
          body="Added / removed items and changed modifiers are marked; cosmetic re-sorts and re-prices are not — the line only sees what changes the food."
        />
        <Guard
          icon={<AutorenewRoundedIcon />}
          color="#B26A00"
          title="Latest state wins, still noticeable"
          body="Rapid successive edits collapse to the final state rather than stacking alerts, but the marker stays until the item is remade or bumped."
        />
        <Guard
          icon={<BlockRoundedIcon />}
          color={dark.palette.status.late}
          title="Acknowledgement only when it matters"
          body="A cancel after prep, or a change to an already-completed item, blocks auto-clear and asks for one tap. Everything else clears on the normal bump."
        />
        <Guard
          icon={<CheckCircleRoundedIcon />}
          color={dark.palette.status.normal}
          title="No pop-ups, no timeouts to dismiss"
          body="Treatments live on the ticket, not in modal alerts — a cancel banner stays put until acknowledged instead of firing a dialog that steals the screen."
        />
      </Stack>
      <ExpoTicketCard ticket={expoTickets[1]} />
    </Box>
  ),
};

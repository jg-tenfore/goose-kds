import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { ExpoAppShell } from '../../../kds/expo/ExpoBoard';
import { ExpoTicketCard } from '../../../kds/expo/ExpoTicketCard';
import { createKdsTheme } from '../../../kds/theme';
import { expoBoardTickets, expoTickets, overflowTicket } from '../../../kds/expo/fixtures';

const byId = (id: string) => expoTickets.find((t) => t.id === id)!;

/**
 * # Expo Board — cross-station readiness (TF-173 / TF-174)
 *
 * The expeditor's consolidated view: one card per ticket showing **every item
 * across all stations** with its station tag and live readiness
 * (working / held / ready / plated / recalled), a readiness roll-up, and the
 * **complete-order bump** — with a **manual override** (audited) when expo
 * sends before the board shows all items ready. Prioritize / flag act on the
 * whole ticket from here.
 *
 * Modeled on Square's Expo screen; built on the shared KDS chrome + card
 * anatomy (neutral header, state accent, fulfillment divider, red modifiers).
 */
const meta = {
  title: 'KDS Screens/4 · Expo, Timers & Alerts/Expo Board',
  component: ExpoAppShell,
  parameters: { layout: 'fullscreen' },
  args: { tickets: expoBoardTickets },
} satisfies Meta<typeof ExpoAppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Full expo board (dark) — mixed readiness, priority surfaced, late/held, recall, cancel, modified. */
export const Board: Story = {
  name: 'Expo Board (Dark)',
  args: { mode: 'dark', boardMode: 'flow' },
};

/** Light-theme variant of the same board. */
export const BoardLight: Story = {
  name: 'Expo Board (Light)',
  args: { mode: 'light', boardMode: 'flow' },
};

/** Fixed-grid layout — stable slots for a busy expo station. */
export const BoardGrid: Story = {
  name: 'Expo Board (Grid)',
  args: { mode: 'dark', boardMode: 'grid' },
};

const cardDecorator = [
  (Story: () => ReactElement) => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex', gap: 2, flexWrap: 'wrap' }}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];

/**
 * ## Ready to complete (TF-174)
 * Every station has bumped its item up — the card shows "Ready to complete" and
 * a filled progress track, and the primary action is the green **Complete order**
 * bump.
 */
export const ReadyToComplete: StoryObj = {
  parameters: { layout: 'centered' },
  decorators: cardDecorator,
  render: () => <ExpoTicketCard ticket={byId('x-t6')} />,
};

/**
 * ## Partial readiness → override (TF-174)
 * One item still on the grill (3 of 4 ready). Complete is gated; expo can
 * **Override & send** — logged as a manual-override audit event.
 */
export const PartialOverride: StoryObj = {
  parameters: { layout: 'centered' },
  decorators: cardDecorator,
  render: () => <ExpoTicketCard ticket={byId('x-a47')} />,
};

/**
 * ## Flagged + held + late
 * A beverage-cart run past its promised time with a held item (out of salt) —
 * flagged by expo for attention.
 */
export const FlaggedLate: StoryObj = {
  parameters: { layout: 'centered' },
  decorators: cardDecorator,
  render: () => <ExpoTicketCard ticket={byId('x-cart4')} />,
};

/**
 * ## Long ticket overflow
 * A six-top that overflows the card height and continues into the next column.
 */
export const Overflow: StoryObj = {
  parameters: { layout: 'centered' },
  decorators: cardDecorator,
  render: () => <ExpoTicketCard ticket={overflowTicket} />,
};

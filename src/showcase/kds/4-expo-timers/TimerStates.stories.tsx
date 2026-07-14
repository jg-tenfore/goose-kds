import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, ThemeProvider, Typography } from '@mui/material';
import { TimerBadge } from '../../../kds/expo/TimerBadge';
import { ExpoTicketCard } from '../../../kds/expo/ExpoTicketCard';
import { createKdsTheme } from '../../../kds/theme';
import { computeTimerLevel } from '../../../kds/expo/types';
import { expoTickets } from '../../../kds/expo/fixtures';

/**
 * # Timer States — normal / warning / late (TF-175 + TF-177)
 *
 * Each ticket shows **elapsed** and, where available, **promised** time and
 * moves normal → warning → late as thresholds hit. Urgency is carried by four
 * redundant signals so it reads without color alone (TF-177 / WCAG): a distinct
 * **icon**, a text **label**, a **border shape/weight**, and color. Timers are
 * server-authoritative — the device clock is never used.
 *
 * Defaults: `warning` at 80% of promised, `late` at/after promised. With no
 * promised time the timer falls back to elapsed-only thresholds (12m / 20m).
 */
const dark = createKdsTheme('dark');
const decorator = [
  (Story: () => ReactElement) => (
    <ThemeProvider theme={dark}>
      <Box sx={{ p: 3, bgcolor: 'board.canvas', color: 'text.primary', display: 'inline-block' }}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];

const meta = {
  title: 'KDS Screens/4 · Expo, Timers & Alerts/Timer States',
  component: TimerBadge,
  parameters: { layout: 'centered' },
  decorators: decorator,
} satisfies Meta<typeof TimerBadge>;
export default meta;

function Row({ elapsedMin, promisedMin, note }: { elapsedMin: number; promisedMin?: number; note: string }) {
  const level = computeTimerLevel(elapsedMin, promisedMin);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ width: 140 }}>
        <TimerBadge elapsedMin={elapsedMin} promisedMin={promisedMin} />
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        <b style={{ textTransform: 'uppercase' }}>{level}</b> — {note}
      </Typography>
    </Box>
  );
}

/**
 * ## All states, with & without a promised time
 * Promised-time tickets warn at 80% and go late at the promise; elapsed-only
 * tickets fall back to fixed 12m / 20m thresholds.
 */
export const AllStates: StoryObj = {
  render: () => (
    <Stack spacing={2.5}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 800 }}>
        With promised time (15m target)
      </Typography>
      <Row elapsedMin={8} promisedMin={15} note="under 80% of promise" />
      <Row elapsedMin={13} promisedMin={15} note="crossed 80% warning threshold (12m)" />
      <Row elapsedMin={18} promisedMin={15} note="past the promise — impossible to miss" />
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 800, pt: 1 }}>
        Elapsed-only (no promised time)
      </Typography>
      <Row elapsedMin={6} note="fresh order" />
      <Row elapsedMin={14} note="past 12m fallback warning" />
      <Row elapsedMin={22} note="past 20m fallback late" />
    </Stack>
  ),
};

/**
 * ## Accessible, non-color proof (TF-177)
 * The same three states rendered in grayscale — icon, label, and border
 * shape/weight still separate them, so urgency survives for colorblind staff
 * and glare-washed mounted displays.
 */
export const NonColorLegibility: StoryObj = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 800, mb: 1.5 }}>
          In color
        </Typography>
        <Stack direction="row" spacing={2}>
          <TimerBadge elapsedMin={8} promisedMin={15} />
          <TimerBadge elapsedMin={13} promisedMin={15} />
          <TimerBadge elapsedMin={18} promisedMin={15} />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 800, mb: 1.5 }}>
          Grayscale (color signal removed)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ filter: 'grayscale(1) contrast(1.15)' }}>
          <TimerBadge elapsedMin={8} promisedMin={15} />
          <TimerBadge elapsedMin={13} promisedMin={15} />
          <TimerBadge elapsedMin={18} promisedMin={15} />
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1.5 }}>
          Solid thin border + clock = on time · dashed = warning · thick double border + bell + "LATE" = late.
        </Typography>
      </Box>
    </Stack>
  ),
};

/**
 * ## Sizes
 * `md` for standalone/legend use; `sm` for dense card headers.
 */
export const Sizes: StoryObj = {
  render: () => (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="caption" sx={{ width: 40, color: 'text.secondary' }}>md</Typography>
        <TimerBadge elapsedMin={13} promisedMin={15} size="md" />
        <TimerBadge elapsedMin={18} promisedMin={15} size="md" />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="caption" sx={{ width: 40, color: 'text.secondary' }}>sm</Typography>
        <TimerBadge elapsedMin={13} promisedMin={15} size="sm" />
        <TimerBadge elapsedMin={18} promisedMin={15} size="sm" />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="caption" sx={{ width: 40, color: 'text.secondary' }}>compact</Typography>
        <TimerBadge elapsedMin={18} promisedMin={15} variant="compact" />
      </Stack>
    </Stack>
  ),
};

/**
 * ## In context — on expo cards
 * Timers ride the card header. Left: on-time. Right: past its promise (late).
 */
export const OnCards: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <Box sx={{ display: 'inline-flex', gap: 2 }}>
      <ExpoTicketCard ticket={expoTickets[0]} />
      <ExpoTicketCard ticket={expoTickets[2]} />
    </Box>
  ),
};

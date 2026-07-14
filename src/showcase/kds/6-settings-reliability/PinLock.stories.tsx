import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, ThemeProvider, Typography } from '@mui/material';
import { PinPad } from '../../../kds/settings/PinPad';
import { LockScreen } from '../../../kds/settings/LockScreen';
import { createKdsTheme, type KdsThemeMode } from '../../../kds/theme';

/**
 * PIN Lock (TF-150).
 *
 * Locked-screen sign-in and protected-action gate for a shared kitchen device.
 * The PIN pad is interactive — the correct PIN is <b>2468</b>. It drives
 * locked → entering → invalid → success, with attempt backoff → lockout and a
 * reset/help path; the settings surface configures the auto-lock timeout.
 * Touch-first keys for gloved use. Dark by default; light variants below.
 */
const meta = {
  title: 'KDS Screens/6 · Settings & Reliability/PIN Lock',
  component: PinPad,
  decorators: [
    (Story, ctx) => {
      const mode = (ctx.parameters.kdsMode as KdsThemeMode) ?? 'dark';
      return (
        <ThemeProvider theme={createKdsTheme(mode)}>
          <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>
            <Story />
          </Box>
        </ThemeProvider>
      );
    },
  ],
} satisfies Meta<typeof PinPad>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive pad, dark — type a PIN (2468 unlocks; anything else after 3 tries locks out). */
export const Interactive: Story = {
  name: 'PIN pad (dark)',
  args: { correctPin: '2468', prompt: 'Enter PIN to unlock' },
};

/** Interactive pad, light theme. */
export const InteractiveLight: Story = {
  name: 'PIN pad (light)',
  args: { correctPin: '2468', prompt: 'Enter PIN to unlock' },
  parameters: { kdsMode: 'light' },
};

/** All lifecycle states side by side (forced, non-interactive). */
export const States: Story = {
  name: 'States: locked / entering / invalid / success / lockout',
  render: () => (
    <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {(['locked', 'entering', 'invalid', 'success', 'lockout'] as const).map((s) => (
        <Stack key={s} spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="overline" color="text.secondary">
            {s}
          </Typography>
          <PinPad forcedState={s} />
        </Stack>
      ))}
    </Stack>
  ),
};

/** Protected-action gate: shift lead entering PIN to open settings. */
export const ProtectedAction: Story = {
  name: 'Protected action gate',
  args: { correctPin: '2468', prompt: 'Manager PIN required' },
};

/** Full-screen locked device (dark) — the sign-in state a cook sees on an idle screen. */
export const FullScreenLock: Story = {
  name: 'Full-screen lock (dark)',
  render: () => (
    <Box sx={{ width: '100vw', m: -3 }}>
      <LockScreen correctPin="2468" />
    </Box>
  ),
};

/** Full-screen locked device, light theme. */
export const FullScreenLockLight: Story = {
  name: 'Full-screen lock (light)',
  parameters: { kdsMode: 'light' },
  render: () => (
    <Box sx={{ width: '100vw', m: -3 }}>
      <LockScreen correctPin="2468" />
    </Box>
  ),
};

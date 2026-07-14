import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Card, CardContent, Divider, Stack, ThemeProvider, Typography } from '@mui/material';
import {
  LocalNetworkRow,
  OfflineBanner,
  QueuedActionsPanel,
  SyncIndicator,
} from '../../../kds/settings/SyncIndicator';
import { createKdsTheme } from '../../../kds/theme';
import type { QueuedAction, SyncState } from '../../../kds/settings/types';

/**
 * Offline / Sync (TF-185 banner + last-sync + local cache · TF-186 queued replay
 * + local network).
 *
 * Trust through sync visibility: the kitchen always knows whether the board is
 * live, offline, reconnecting, or stale; cached tickets survive a refresh; and
 * actions taken offline replay exactly once (idempotency key → no duplicate
 * bumps). In-house orders keep flowing over the clubhouse LAN during an outage.
 */
const decorators = [
  (Story: React.ComponentType) => (
    <ThemeProvider theme={createKdsTheme('dark')}>
      <Box sx={{ bgcolor: 'board.canvas', minHeight: '100vh' }}>
        <Story />
      </Box>
    </ThemeProvider>
  ),
];

const meta = {
  title: 'KDS Screens/6 · Settings & Reliability/Offline / Sync',
  component: OfflineBanner,
  parameters: { layout: 'fullscreen' },
  decorators,
  // Each story overrides via a custom render; args satisfy OfflineBanner's required props.
  args: { state: 'offline', lastSync: '10:39a' },
} satisfies Meta<typeof OfflineBanner>;
export default meta;
type Story = StoryObj<typeof meta>;

const QUEUE: QueuedAction[] = [
  { id: 'q1', label: 'Bumped Mobile A47 · Ortiz', at: '4m ago', status: 'synced' },
  { id: 'q2', label: 'Recalled Table 6 · Riley', at: '3m ago', status: 'replaying' },
  { id: 'q3', label: 'Bumped Cart · Hole 4', at: '2m ago', status: 'queued' },
  { id: 'q4', label: 'Marked 86 · Patty Melt', at: '1m ago', status: 'queued' },
];

/** A full board-chrome mock: sync chip in the bar, offline banner, and the offline story panels. */
function SyncScreen({ state, lastSync }: { state: SyncState; lastSync: string }) {
  return (
    <Box>
      {/* Top bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          py: 1.25,
          bgcolor: '#000',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          10:42a
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The Turn — Grill 1
        </Typography>
        <Box sx={{ flex: 1 }} />
        <SyncIndicator state={state} lastSync={lastSync} />
      </Box>

      <OfflineBanner state={state} lastSync={lastSync} />

      <Box sx={{ maxWidth: 640, mx: 'auto', p: 3 }}>
        <Stack spacing={2.5}>
          <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <QueuedActionsPanel actions={QUEUE} />
            </CardContent>
          </Card>
          <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Stack spacing={2}>
                <LocalNetworkRow active={state !== 'synced'} />
                <Divider />
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Local cache
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      12 active tickets + device state cached — survives a refresh or restart with no blank board.
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

/** Live — board is synced, banner hidden, chip shows "Live". */
export const Synced: Story = {
  name: 'Live (synced)',
  render: () => <SyncScreen state="synced" lastSync="just now" />,
};

/** Offline — cached board still usable; queued actions waiting. */
export const Offline: Story = {
  render: () => <SyncScreen state="offline" lastSync="10:39a" />,
};

/** Reconnecting — replaying queued actions exactly once. */
export const Reconnecting: Story = {
  render: () => <SyncScreen state="syncing" lastSync="10:39a" />,
};

/** Stale — connection thinks it's live but no update in a while. */
export const Stale: Story = {
  render: () => <SyncScreen state="stale" lastSync="18m ago" />,
};

/** Sync error — retrying in background; cached data safe. */
export const SyncError: Story = {
  name: 'Sync error',
  render: () => <SyncScreen state="error" lastSync="10:31a" />,
};

/** Every banner + indicator state stacked for comparison. */
export const AllStates: Story = {
  name: 'All sync states',
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        {(['synced', 'syncing', 'offline', 'stale', 'error'] as SyncState[]).map((s) => (
          <Box key={s} sx={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="overline" color="text.secondary" sx={{ width: 90 }}>
                {s}
              </Typography>
              <SyncIndicator state={s} lastSync={s === 'synced' ? 'just now' : '10:39a'} />
            </Box>
            <OfflineBanner state={s} lastSync="10:39a" />
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

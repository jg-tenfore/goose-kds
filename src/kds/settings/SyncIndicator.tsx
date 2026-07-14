import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import CloudOffRoundedIcon from '@mui/icons-material/CloudOffRounded';
import HistoryToggleOffRoundedIcon from '@mui/icons-material/HistoryToggleOffRounded';
import WifiTetheringRoundedIcon from '@mui/icons-material/WifiTetheringRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import type { QueuedAction, SyncState } from './types';

interface SyncMeta {
  label: string;
  color: (t: Theme) => string;
  Icon: typeof CloudDoneRoundedIcon;
}

function metaFor(state: SyncState): SyncMeta {
  switch (state) {
    case 'synced':
      return { label: 'Live', color: (t) => t.palette.status.normal, Icon: CloudDoneRoundedIcon };
    case 'syncing':
      return { label: 'Reconnecting', color: (t) => t.palette.status.priority, Icon: CloudSyncRoundedIcon };
    case 'offline':
      return { label: 'Offline', color: (t) => t.palette.status.late, Icon: CloudOffRoundedIcon };
    case 'stale':
      return { label: 'Stale', color: (t) => t.palette.status.warning, Icon: HistoryToggleOffRoundedIcon };
    case 'error':
      return { label: 'Sync error', color: (t) => t.palette.status.late, Icon: ErrorOutlineRoundedIcon };
  }
}

/** Compact top-bar chip showing the current sync state (TF-185). */
export function SyncIndicator({ state, lastSync }: { state: SyncState; lastSync: string }) {
  const theme = useTheme();
  const { label, color, Icon } = metaFor(state);
  const c = color(theme);
  return (
    <Chip
      icon={<Icon sx={{ fontSize: 18, color: `${c} !important` }} />}
      label={
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
          <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: c }}>
            {label}
          </Typography>
          <Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>
            · synced {lastSync}
          </Typography>
        </Stack>
      }
      sx={{ bgcolor: theme.palette.action.hover, height: 34 }}
    />
  );
}

/**
 * Full-width banner shown when the board is not live (TF-185). Explains what the
 * kitchen is seeing and reassures that cached tickets remain usable.
 */
export function OfflineBanner({ state, lastSync }: { state: SyncState; lastSync: string }) {
  const theme = useTheme();
  if (state === 'synced') return null;
  const { color, Icon } = metaFor(state);
  const c = color(theme);

  const copy: Record<Exclude<SyncState, 'synced'>, string> = {
    syncing: 'Reconnecting — showing cached tickets. Anything you bump now will sync automatically.',
    offline: `Offline since ${lastSync}. The board is running from local cache; keep working — nothing is lost.`,
    stale: `No update in a while (last sync ${lastSync}). Data may be behind — check the network.`,
    error: 'Sync error. Cached tickets are safe; retrying in the background.',
  };

  return (
    <Box
      role="status"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.5,
        bgcolor: `${c}1f`,
        borderBottom: `2px solid ${c}`,
        color: 'text.primary',
      }}
    >
      <Icon sx={{ color: c, fontSize: 26 }} />
      <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
        {copy[state as Exclude<SyncState, 'synced'>]}
      </Typography>
      {state === 'syncing' && (
        <CloudSyncRoundedIcon
          sx={{ color: c, animation: 'kds-sync-spin 1.2s linear infinite', '@keyframes kds-sync-spin': { to: { transform: 'rotate(360deg)' } } }}
        />
      )}
    </Box>
  );
}

/** Local-network path indicator: in-house orders keep flowing without internet (TF-186). */
export function LocalNetworkRow({ active }: { active: boolean }) {
  const theme = useTheme();
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
      <WifiTetheringRoundedIcon sx={{ color: active ? theme.palette.status.normal : 'text.disabled' }} />
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Local network {active ? 'active' : 'idle'}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {active
            ? 'Grill, kiosk & POS orders route over the clubhouse LAN — no internet needed.'
            : 'In-house orders route through the cloud while online.'}
        </Typography>
      </Box>
    </Stack>
  );
}

/**
 * Queue of actions taken while offline, waiting to replay exactly once on
 * reconnect (TF-186 — reconnect-safe, no dupes).
 */
export function QueuedActionsPanel({ actions }: { actions: QueuedAction[] }) {
  const theme = useTheme();
  const queued = actions.filter((a) => a.status !== 'synced').length;
  const replaying = actions.some((a) => a.status === 'replaying');

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center',  mb: 1 }}>
        <ReplayRoundedIcon sx={{ color: 'text.secondary' }} />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, flex: 1 }}>
          Queued actions
        </Typography>
        <Chip
          size="small"
          label={queued > 0 ? `${queued} pending` : 'All synced'}
          sx={{
            bgcolor: queued > 0 ? `${theme.palette.status.warning}22` : `${theme.palette.status.normal}22`,
            color: queued > 0 ? theme.palette.status.warning : theme.palette.status.normal,
            fontWeight: 700,
          }}
        />
      </Stack>
      {replaying && <LinearProgress sx={{ mb: 1, borderRadius: 1 }} />}
      <Stack spacing={0.75}>
        {actions.map((a) => (
          <Box
            key={a.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1,
              borderRadius: 2,
              bgcolor: theme.palette.action.hover,
            }}
          >
            {a.status === 'synced' ? (
              <CheckCircleRoundedIcon sx={{ color: theme.palette.status.normal, fontSize: 20 }} />
            ) : a.status === 'replaying' ? (
              <CloudSyncRoundedIcon sx={{ color: theme.palette.status.priority, fontSize: 20 }} />
            ) : (
              <HistoryToggleOffRoundedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
            )}
            <Typography variant="body2" sx={{ flex: 1 }}>
              {a.label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {a.status === 'synced' ? 'synced' : a.status === 'replaying' ? 'replaying…' : `queued · ${a.at}`}
            </Typography>
          </Box>
        ))}
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Each action carries an idempotency key, so reconnecting replays it exactly once — no duplicate bumps.
      </Typography>
    </Box>
  );
}

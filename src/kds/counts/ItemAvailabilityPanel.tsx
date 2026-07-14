import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import CloudSyncRoundedIcon from '@mui/icons-material/CloudSyncRounded';
import CloudOffRoundedIcon from '@mui/icons-material/CloudOffRounded';
import SyncProblemRoundedIcon from '@mui/icons-material/SyncProblemRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import {
  AVAILABILITY_LABEL,
  seedAvailability,
  type Availability,
  type AvailabilityItem,
} from './availability-model';

export interface ItemAvailabilityPanelProps {
  items?: AvailabilityItem[];
  /**
   * Permission gate (TF-181). When false, availability is read-only and a lock
   * note explains that a manager sign-in is required. Writes are logged
   * (item_availability_changed) — represented here by the audit line per row.
   */
  canManage?: boolean;
  /**
   * How a newly-triggered upstream sync resolves. `fail` demonstrates the
   * TF-183 failure path interactively; `succeed` is the happy path. Local-only
   * items ignore this (nothing syncs).
   */
  syncBehavior?: 'succeed' | 'fail';
}

const SYNC_DELAY_MS = 1100;

/**
 * Item Availability (TF-181 + TF-183). Manager-controlled available / limited /
 * 86 toggles, permission-gated, honest about local-only vs upstream-synced
 * state. Interactive: changing availability optimistically updates the local
 * decision, then (for upstream sources) runs a sync that can succeed or fail —
 * failures are surfaced loudly because the upstream menu may still sell the item.
 */
export function ItemAvailabilityPanel({
  items = seedAvailability,
  canManage = true,
  syncBehavior = 'succeed',
}: ItemAvailabilityPanelProps) {
  const { palette } = useTheme();
  const [rows, setRows] = useState<AvailabilityItem[]>(items);
  const timers = useRef<number[]>([]);

  // Reset when the story swaps the seed list; clear any in-flight timers.
  useEffect(() => {
    setRows(items);
  }, [items]);
  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const patch = (id: string, next: Partial<AvailabilityItem>) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...next } : r)));

  const runSync = (id: string) => {
    patch(id, { syncStatus: 'pending' });
    const handle = window.setTimeout(() => {
      patch(id, { syncStatus: syncBehavior === 'fail' ? 'failed' : 'synced' });
    }, SYNC_DELAY_MS);
    timers.current.push(handle);
  };

  const changeAvailability = (row: AvailabilityItem, value: Availability | null) => {
    if (!canManage || value === null) return;
    patch(row.id, { availability: value, updatedLabel: 'just now', updatedBy: 'You' });
    // Local decision is applied immediately; only upstream sources sync.
    if (row.syncMode === 'upstream') runSync(row.id);
  };

  const failed = rows.filter((r) => r.syncStatus === 'failed');

  const availColor = (a: Availability) =>
    a === 'available' ? palette.status.normal : a === 'limited' ? palette.status.warning : palette.status.late;

  return (
    <Box sx={{ bgcolor: 'board.canvas', color: 'text.primary', minHeight: '100vh', p: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Item Availability
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {rows.filter((r) => r.availability !== 'available').length} limited / 86’d
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Mark items available, limited, or 86’d. Changes to upstream sources sync to the ordering system; local-only
        sources inform the line but can’t stop new orders.
      </Typography>

      {failed.length > 0 && (
        <Alert
          severity="error"
          icon={<SyncProblemRoundedIcon />}
          sx={{ mb: 2 }}
        >
          <AlertTitle>Sync failed — upstream menu may still be selling these</AlertTitle>
          {failed.map((r) => r.name).join(', ')}. The 86 applied on this display, but the ordering system did not
          confirm. Retry below, or 86 the item at the register.
        </Alert>
      )}

      {!canManage && (
        <Alert severity="info" icon={<LockRoundedIcon />} sx={{ mb: 2 }}>
          Availability is read-only. A manager sign-in is required to change what the kitchen is selling.
        </Alert>
      )}

      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Stack divider={<Divider />}>
          {rows.map((row) => (
            <Stack
              key={row.id}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' }, px: 2.5, py: 2 }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Box
                    sx={{ width: 10, height: 10, borderRadius: '50%', flex: '0 0 auto', bgcolor: availColor(row.availability) }}
                  />
                  <Typography sx={{ fontWeight: 700 }} noWrap>
                    {row.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {row.station}
                  </Typography>
                </Stack>
                {(row.updatedLabel || row.updatedBy) && (
                  <Typography variant="caption" sx={{ color: 'text.secondary', ml: 2.25 }}>
                    Changed {row.updatedLabel ?? ''}
                    {row.updatedBy ? ` · ${row.updatedBy}` : ''}
                  </Typography>
                )}
              </Box>

              <SyncIndicator row={row} onRetry={() => runSync(row.id)} canManage={canManage} />

              <ToggleButtonGroup
                exclusive
                value={row.availability}
                onChange={(_, v) => changeAvailability(row, v as Availability | null)}
                disabled={!canManage}
                size="small"
              >
                {(['available', 'limited', 'unavailable'] as Availability[]).map((val) => (
                  <ToggleButton
                    key={val}
                    value={val}
                    sx={{
                      fontWeight: 700,
                      '&.Mui-selected, &.Mui-selected:hover': {
                        bgcolor: availColor(val),
                        color: val === 'limited' ? '#1a1a1a' : '#fff',
                      },
                    }}
                  >
                    {AVAILABILITY_LABEL[val]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

function SyncIndicator({
  row,
  onRetry,
  canManage,
}: {
  row: AvailabilityItem;
  onRetry: () => void;
  canManage: boolean;
}) {
  const { palette } = useTheme();

  // Local-only: never claim it reached upstream.
  if (row.syncMode === 'local-only') {
    return (
      <Tooltip title="This source can’t accept availability — the flag stays on this display only." arrow>
        <Chip
          size="small"
          icon={<CloudOffRoundedIcon />}
          label="Local only"
          sx={{ bgcolor: 'transparent', border: 1, borderColor: 'divider', color: 'text.secondary' }}
        />
      </Tooltip>
    );
  }

  const chip =
    row.syncStatus === 'pending'
      ? { icon: <CloudSyncRoundedIcon />, label: 'Syncing…', color: palette.status.priority }
      : row.syncStatus === 'failed'
        ? { icon: <SyncProblemRoundedIcon />, label: 'Sync failed', color: palette.status.late }
        : { icon: <CloudDoneRoundedIcon />, label: 'Synced', color: palette.status.normal };

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Chip
        size="small"
        icon={chip.icon}
        label={chip.label}
        sx={{ bgcolor: 'transparent', border: 1, borderColor: chip.color, color: chip.color, '& .MuiChip-icon': { color: chip.color } }}
      />
      {row.syncStatus === 'failed' && canManage && (
        <Button size="small" variant="text" startIcon={<ReplayRoundedIcon />} onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
}

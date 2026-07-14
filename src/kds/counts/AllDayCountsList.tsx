import { useMemo, useState } from 'react';
import { Box, Chip, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import type { Ticket } from '../types';
import { aggregateMenuCounts, totalMakeCount } from './counting-rules';
import { STATIONS, stationOf } from './stations';

export interface AllDayCountsListProps {
  tickets: Ticket[];
  /** Fixed width for the panel (drops into the board sidebar slot). */
  width?: number | string;
  /** Optional station preselection. */
  defaultStation?: string;
}

/**
 * Compact all-day counts — the quick station reference (TF-179). Aggregates
 * make-counts across open tickets via the documented rule (TF-182) and lets a
 * cook filter to their line. Sits where the board sidebar reserves the slot.
 */
export function AllDayCountsList({ tickets, width = 320, defaultStation = 'all' }: AllDayCountsListProps) {
  const { palette } = useTheme();
  const [station, setStation] = useState(defaultStation);

  const rows = useMemo(
    () => aggregateMenuCounts(tickets, station === 'all' ? {} : { station, stationOf }),
    [tickets, station],
  );
  const grandTotal = useMemo(() => totalMakeCount(tickets), [tickets]);

  return (
    <Box
      sx={{
        width,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <Stack sx={{ p: 2, pb: 1.5 }} spacing={1.5}>
        <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
            All day
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {grandTotal} to make
          </Typography>
        </Stack>
        <TextField
          select
          size="small"
          label="Station"
          value={station}
          onChange={(e) => setStation(e.target.value)}
          fullWidth
        >
          <MenuItem value="all">All stations</MenuItem>
          {STATIONS.map((s) => (
            <MenuItem key={s.id} value={s.id}>
              {s.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Divider />

      {rows.length === 0 ? (
        <Stack spacing={1} sx={{ alignItems: 'center', py: 5, px: 2, color: 'text.secondary' }}>
          <ReceiptLongRoundedIcon sx={{ fontSize: 40, opacity: 0.5 }} />
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Nothing to make{station !== 'all' ? ' at this station' : ''}.
          </Typography>
        </Stack>
      ) : (
        <Stack divider={<Divider />}>
          {rows.map((row) => (
            <Stack
              key={row.name}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: 'center', px: 2, py: 1.25 }}
            >
              <Typography
                sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontSize: 22, minWidth: 34 }}
              >
                {row.total}
              </Typography>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 600 }} noWrap>
                  {row.glyph ? `${row.glyph} ` : ''}
                  {row.name}
                </Typography>
              </Box>
              {row.held > 0 && (
                <Chip
                  size="small"
                  label={`${row.held} held`}
                  sx={{ bgcolor: 'transparent', color: palette.status.warning, border: 1, borderColor: palette.status.warning }}
                />
              )}
              {row.recalled > 0 && (
                <Chip
                  size="small"
                  label={`${row.recalled} remake`}
                  sx={{ bgcolor: 'transparent', color: palette.status.recalled, border: 1, borderColor: palette.status.recalled }}
                />
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </Box>
  );
}

import { useMemo, useState } from 'react';
import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Ticket } from '../types';
import { aggregateMenuCounts, totalMakeCount, type MenuCount } from './counting-rules';
import { STATIONS, stationOf, stationLabel } from './stations';

export interface AllDayCountsBoardProps {
  tickets: Ticket[];
  defaultStation?: string;
}

function CountTile({ row }: { row: MenuCount }) {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        bgcolor: 'board.card',
        color: 'board.cardText',
        borderRadius: 2,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minHeight: 150,
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontSize: 64, lineHeight: 1 }}>
        {row.total}
      </Typography>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          {row.glyph ? `${row.glyph} ` : ''}
          {row.name}
        </Typography>
        <Stack direction="row" spacing={0.75} sx={{ mt: 0.75, flexWrap: 'wrap', gap: 0.75 }}>
          {row.held > 0 && (
            <Chip size="small" label={`${row.held} held`} sx={{ bgcolor: palette.status.warning, color: '#1a1a1a', fontWeight: 700 }} />
          )}
          {row.recalled > 0 && (
            <Chip size="small" label={`${row.recalled} remake`} sx={{ bgcolor: palette.status.recalled, color: '#fff', fontWeight: 700 }} />
          )}
        </Stack>
      </Box>
    </Box>
  );
}

/**
 * Full-screen all-day counts — the high-volume batch view (TF-179). Big,
 * glanceable tiles for a prep push, with a station tab bar. Same aggregation +
 * counting rule as the compact list, so totals always agree.
 */
export function AllDayCountsBoard({ tickets, defaultStation = 'all' }: AllDayCountsBoardProps) {
  const [station, setStation] = useState(defaultStation);

  const rows = useMemo(
    () => aggregateMenuCounts(tickets, station === 'all' ? {} : { station, stationOf }),
    [tickets, station],
  );
  const grandTotal = useMemo(() => totalMakeCount(tickets), [tickets]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'board.canvas', color: 'text.primary', p: 3 }}>
      <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          All-Day Counts
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          {station === 'all' ? 'All stations' : stationLabel(station)} · {grandTotal} to make
        </Typography>
      </Stack>

      <Tabs
        value={station}
        onChange={(_, v) => setStation(v)}
        variant="scrollable"
        allowScrollButtonsMobile
        sx={{ mb: 3, '& .MuiTab-root': { fontSize: 16, fontWeight: 700, minHeight: 52 } }}
      >
        <Tab value="all" label="All stations" />
        {STATIONS.map((s) => (
          <Tab key={s.id} value={s.id} label={s.label} />
        ))}
      </Tabs>

      {rows.length === 0 ? (
        <Box sx={{ py: 10, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="h5">Nothing to make right now.</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Counts are empty — no open items{station !== 'all' ? ' at this station' : ''}.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {rows.map((row) => (
            <CountTile key={row.name} row={row} />
          ))}
        </Box>
      )}
    </Box>
  );
}

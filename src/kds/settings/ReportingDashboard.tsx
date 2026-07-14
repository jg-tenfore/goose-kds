import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import TimerRoundedIcon from '@mui/icons-material/TimerRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import type { HourBucket, StationLoad } from './types';

// --- Realistic busy golf morning at the turn (7a–1p) ------------------------
export const DEFAULT_HOURS: HourBucket[] = [
  { hour: '6a', completed: 8 },
  { hour: '7a', completed: 24 },
  { hour: '8a', completed: 41 },
  { hour: '9a', completed: 58 },
  { hour: '10a', completed: 47 },
  { hour: '11a', completed: 63 },
  { hour: '12p', completed: 72 },
  { hour: '1p', completed: 39 },
];

export const DEFAULT_STATIONS: StationLoad[] = [
  { station: 'Grill', open: 9, oldest: '22m', avgPrep: '11m' },
  { station: 'Turn Window', open: 5, oldest: '14m', avgPrep: '7m' },
  { station: 'Bev Cart', open: 3, oldest: '18m', avgPrep: '9m' },
  { station: 'Expo', open: 4, oldest: '9m', avgPrep: '—' },
];

interface StatTileProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  tone?: (t: Theme) => string;
}

function StatTile({ icon, label, value, sub, tone }: StatTileProps) {
  const theme = useTheme();
  const c = tone ? tone(theme) : theme.palette.text.primary;
  return (
    <Card variant="outlined" sx={{ bgcolor: 'background.paper', flex: '1 1 150px', minWidth: 150 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center',  color: c, mb: 0.5 }}>
          {icon}
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {label}
          </Typography>
        </Stack>
        <Typography variant="h4" sx={{ fontWeight: 700, color: c, lineHeight: 1.1 }}>
          {value}
        </Typography>
        {sub && (
          <Typography variant="caption" color="text.secondary">
            {sub}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

/** Single-series vertical bar chart (Box bars), completed tickets by hour. */
function CompletedByHour({ data }: { data: HourBucket[] }) {
  const theme = useTheme();
  const max = Math.max(...data.map((d) => d.completed), 1);
  const bar = theme.palette.status.normal; // single hue — magnitude, one series
  const peak = data.reduce((a, b) => (b.completed > a.completed ? b : a), data[0]);

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: 1.5,
          alignItems: 'end',
          height: 180,
        }}
      >
        {data.map((d) => {
          const isPeak = d.hour === peak.hour;
          return (
            <Box key={d.hour} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: isPeak ? bar : 'text.secondary', mb: 0.5 }}>
                {d.completed}
              </Typography>
              <Box
                title={`${d.hour}: ${d.completed} completed`}
                sx={{
                  width: '100%',
                  maxWidth: 44,
                  height: `${(d.completed / max) * 100}%`,
                  minHeight: 4,
                  borderRadius: '4px 4px 0 0',
                  bgcolor: bar,
                  opacity: isPeak ? 1 : 0.68,
                  transition: 'opacity 100ms linear',
                }}
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, 1fr)`, gap: 1.5, mt: 0.75 }}>
        {data.map((d) => (
          <Typography key={d.hour} variant="caption" align="center" color="text.secondary">
            {d.hour}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

function StationLoadTable({ rows }: { rows: StationLoad[] }) {
  const theme = useTheme();
  return (
    <Stack spacing={0}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', px: 1, pb: 1 }}>
        {['Station', 'Open', 'Oldest', 'Avg prep'].map((h) => (
          <Typography key={h} variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>
            {h}
          </Typography>
        ))}
      </Box>
      {rows.map((r, i) => {
        const hot = parseInt(r.oldest) >= 20;
        return (
          <Box
            key={r.station}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
              alignItems: 'center',
              px: 1,
              py: 1.25,
              borderTop: i === 0 ? 'none' : `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>{r.station}</Typography>
            <Typography>{r.open}</Typography>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              {hot && <FiberManualRecordRoundedIcon sx={{ fontSize: 10, color: theme.palette.status.late }} />}
              <Typography sx={{ color: hot ? theme.palette.status.late : 'text.primary', fontWeight: hot ? 700 : 400 }}>
                {r.oldest}
              </Typography>
            </Stack>
            <Typography color="text.secondary">{r.avgPrep}</Typography>
          </Box>
        );
      })}
    </Stack>
  );
}

export interface ReportingDashboardProps {
  hours?: HourBucket[];
  stations?: StationLoad[];
  /** Show the "seed data" prototype label (TF-184 partial-data state). */
  seedLabel?: boolean;
  /** Render an empty state instead of data (TF-184 no-data period). */
  empty?: boolean;
}

/**
 * Post-shift read + live kitchen health from the audit event stream (TF-184).
 * Stat tiles (completed / avg prep / late / recall / priority / route
 * exceptions), a completed-by-hour bar chart, and live station load.
 */
export function ReportingDashboard({
  hours = DEFAULT_HOURS,
  stations = DEFAULT_STATIONS,
  seedLabel = true,
  empty = false,
}: ReportingDashboardProps) {
  const theme = useTheme();
  const total = hours.reduce((s, h) => s + h.completed, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'board.canvas', color: 'text.primary' }}>
      {/* Header */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          bgcolor: theme.palette.mode === 'dark' ? '#000' : '#fff',
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Manager Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            TenFore Grill · The Turn — today, morning service
          </Typography>
        </Box>
        {seedLabel && <Chip size="small" variant="outlined" color="warning" label="Seed data · prototype" />}
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 } }}>
        {empty ? (
          <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
            <CardContent sx={{ py: 8, textAlign: 'center' }}>
              <TimerRoundedIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                No service in this period
              </Typography>
              <Typography color="text.secondary">
                Pick a daypart with completed tickets to see prep times and counts.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Stack spacing={3}>
            {/* Stat tiles */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <StatTile icon={<CheckCircleRoundedIcon />} label="Completed" value={String(total)} sub="tickets today" tone={(t) => t.palette.status.normal} />
              <StatTile icon={<TimerRoundedIcon />} label="Avg prep" value="8m 40s" sub="all stations" />
              <StatTile icon={<WarningAmberRoundedIcon />} label="Late" value="11" sub="past promise" tone={(t) => t.palette.status.late} />
              <StatTile icon={<ReplayRoundedIcon />} label="Recalls" value="4" sub="bumped early" tone={(t) => t.palette.status.recalled} />
              <StatTile icon={<PriorityHighRoundedIcon />} label="Priority" value="7" sub="tee-time push" tone={(t) => t.palette.status.priority} />
              <StatTile icon={<AltRouteRoundedIcon />} label="Route exceptions" value="2" sub="no rule matched" tone={(t) => t.palette.status.warning} />
            </Box>

            {/* Chart */}
            <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline',  mb: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Completed by hour
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: theme.palette.status.normal }} />
                    <Typography variant="caption" color="text.secondary">
                      Tickets bumped
                    </Typography>
                  </Stack>
                </Stack>
                <CompletedByHour data={hours} />
              </CardContent>
            </Card>

            {/* Station load (live) */}
            <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center',  mb: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                    Station load
                  </Typography>
                  <Chip
                    size="small"
                    icon={<FiberManualRecordRoundedIcon sx={{ fontSize: '12px !important', color: `${theme.palette.status.normal} !important` }} />}
                    label="Live"
                    sx={{ bgcolor: theme.palette.action.hover }}
                  />
                </Stack>
                <Divider sx={{ mb: 1 }} />
                <StationLoadTable rows={stations} />
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

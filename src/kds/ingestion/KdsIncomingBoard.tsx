import { useMemo } from 'react';
import { Box, Chip, ThemeProvider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { KdsTopBar } from '../components/KdsTopBar';
import { KdsTicketCard } from '../components/KdsTicketCard';
import { KdsPreviewCard } from './KdsPreviewCard';
import { createKdsTheme, type KdsThemeMode } from '../theme';
import type { PreviewTicket } from './types';
import type { Ticket } from '../types';

const PREVIEW_COLOR = '#4f8bd6';

interface LaneHeaderProps {
  color: string;
  icon: React.ReactNode;
  label: string;
  count: number;
  countLabel: string;
  hint?: string;
}

function LaneHeader({ color, icon, label, count, countLabel, hint }: LaneHeaderProps) {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color }}>
        {icon}
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color, letterSpacing: 0.3 }}>
          {label}
        </Typography>
      </Box>
      <Chip
        size="small"
        label={`${count} ${countLabel}`}
        sx={{ height: 22, fontWeight: 800, bgcolor: color, color: palette.getContrastText(color) }}
      />
      {hint && (
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          {hint}
        </Typography>
      )}
    </Box>
  );
}

export interface KdsIncomingBoardProps {
  previews: PreviewTicket[];
  active: Ticket[];
  time?: string;
  stationName?: string;
  mode?: KdsThemeMode;
  onFire?: (ticket: PreviewTicket) => void;
}

/**
 * Split screen for the incoming-order preview state (TF-167).
 *
 * A dedicated "Incoming — preview" lane sits *left of* the active board so the
 * kitchen can see load coming without it polluting the fired queue. The top-bar
 * open-count reflects only fired tickets (previews are excluded until fired),
 * which the lane counts make explicit. Self-themes (like `KdsAppShell`) so it
 * can drop straight into a fullscreen story.
 */
export function KdsIncomingBoard({
  previews,
  active,
  time = '11:42 AM',
  stationName = 'TenFore Grill — The Turn · Expo',
  mode = 'dark',
  onFire,
}: KdsIncomingBoardProps) {
  const theme = useMemo(() => createKdsTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'board.canvas' }}>
      <KdsTopBar time={time} stationName={stationName} orderSources={7} online />

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        {/* Incoming preview lane */}
        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            p: 1.5,
            overflow: 'auto',
            borderRight: `1px dashed ${PREVIEW_COLOR}`,
            bgcolor: 'rgba(79,139,214,0.04)',
          }}
        >
          <LaneHeader
            color={PREVIEW_COLOR}
            icon={<ScheduleRoundedIcon sx={{ fontSize: 20 }} />}
            label="Incoming — preview"
            count={previews.length}
            countLabel="not fired"
            hint="excluded from counts"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {previews.map((p) => (
              <KdsPreviewCard key={p.id} ticket={p} width={272} onFire={onFire} />
            ))}
          </Box>
        </Box>

        {/* Active (fired) board */}
        <Box sx={{ flex: 1, minWidth: 0, p: 1.5, overflow: 'auto' }}>
          <LaneHeader
            color="#37c26a"
            icon={<PlayArrowRoundedIcon sx={{ fontSize: 22 }} />}
            label="Active — fired"
            count={active.length}
            countLabel="open"
            hint="in fired-time sequence"
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: 1.5 }}>
            {active.map((t) => (
              <KdsTicketCard key={t.id} ticket={t} width={260} />
            ))}
          </Box>
        </Box>
      </Box>
      </Box>
    </ThemeProvider>
  );
}

import { useMemo, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { KdsTopBar } from '../components/KdsTopBar';
import { KdsBoardToolbar } from '../components/KdsBoardToolbar';
import { KdsSidebar } from '../components/KdsSidebar';
import { createKdsTheme, type KdsThemeMode } from '../theme';
import type { BoardMode } from '../types';
import { ExpoTicketCard, type ExpoTicketCardProps } from './ExpoTicketCard';
import type { ExpoTicket } from './types';

/** Board of expo cards — Square-style column-wrapping flow, or a fixed grid. */
export function ExpoBoard({
  tickets,
  mode = 'flow',
  cardWidth = 300,
  cardActions,
}: {
  tickets: ExpoTicket[];
  mode?: BoardMode;
  cardWidth?: number;
  cardActions?: Omit<ExpoTicketCardProps, 'ticket' | 'width'>;
}) {
  const common = { flex: 1, p: 1.5, overflow: 'auto' as const };
  if (mode === 'grid') {
    return (
      <Box
        sx={{
          ...common,
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: `repeat(auto-fill, ${cardWidth}px)`,
          alignContent: 'start',
          justifyContent: 'start',
        }}
      >
        {tickets.map((t) => (
          <ExpoTicketCard key={t.id} ticket={t} width={cardWidth} {...cardActions} />
        ))}
      </Box>
    );
  }
  return (
    <Box sx={{ ...common, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-start', gap: 1.5 }}>
      {tickets.map((t) => (
        <ExpoTicketCard key={t.id} ticket={t} width={cardWidth} {...cardActions} />
      ))}
    </Box>
  );
}

export interface ExpoAppShellProps {
  tickets: ExpoTicket[];
  mode?: KdsThemeMode;
  boardMode?: BoardMode;
  stationName?: string;
  time?: string;
  orderSources?: number;
  online?: boolean;
}

/**
 * Self-contained expo shell (TF-173): the station chrome (top bar + toolbar +
 * sidebar) reused verbatim, but the board renders {@link ExpoTicketCard} so the
 * expeditor gets cross-station readiness + the complete-order bump. Wraps itself
 * in the KDS theme so it drops straight into Storybook.
 */
export function ExpoAppShell({
  tickets,
  mode = 'dark',
  boardMode = 'flow',
  stationName = 'TenFore Grill — The Turn · Expo',
  time = '11:42 AM',
  orderSources = 7,
  online = true,
}: ExpoAppShellProps) {
  const theme = useMemo(() => createKdsTheme(mode), [mode]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: theme.palette.board.canvas,
          color: theme.palette.text.primary,
        }}
      >
        <KdsTopBar time={time} stationName={stationName} orderSources={orderSources} online={online} />
        <KdsBoardToolbar view="open" openCount={tickets.length} onMenu={() => setSidebarOpen(true)} />
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <ExpoBoard tickets={tickets} mode={boardMode} />
        </Box>
        <KdsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

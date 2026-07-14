import { useMemo, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { KdsTopBar } from './KdsTopBar';
import { KdsBoardToolbar } from './KdsBoardToolbar';
import { KdsSidebar } from './KdsSidebar';
import { KdsBoard } from './KdsBoard';
import { createKdsTheme, type KdsThemeMode } from '../theme';
import type { BoardMode, BoardView, Ticket } from '../types';

export interface KdsAppShellProps {
  openTickets: Ticket[];
  completedTickets?: Ticket[];
  mode?: KdsThemeMode;
  boardMode?: BoardMode;
  initialView?: BoardView;
  stationName?: string;
  time?: string;
  orderSources?: number;
  online?: boolean;
}

/**
 * KDS application shell (TF-159): top status bar + board toolbar + sidebar over
 * the ticket board. Self-contained — wraps itself in the KDS theme (`mode`), so
 * it can be dropped into Storybook or the app directly.
 */
export function KdsAppShell({
  openTickets,
  completedTickets = [],
  mode = 'dark',
  boardMode = 'flow',
  initialView = 'open',
  stationName = 'TenFore Grill — The Turn',
  time = '11:42 AM',
  orderSources = 7,
  online = true,
}: KdsAppShellProps) {
  const theme = useMemo(() => createKdsTheme(mode), [mode]);
  const [view, setView] = useState<BoardView>(initialView);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tickets = view === 'open' ? openTickets : completedTickets;

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
        <KdsBoardToolbar
          view={view}
          openCount={openTickets.length}
          onViewChange={setView}
          onMenu={() => setSidebarOpen(true)}
        />
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <KdsBoard
            tickets={tickets}
            mode={boardMode}
            emptyLabel={view === 'open' ? 'No open tickets' : 'No completed tickets'}
          />
        </Box>
        <KdsSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

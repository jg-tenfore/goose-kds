import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import { KdsTicketCard } from './KdsTicketCard';
import type { BoardMode, Ticket } from '../types';

export interface KdsBoardProps {
  tickets: Ticket[];
  mode?: BoardMode;
  cardWidth?: number;
  emptyLabel?: string;
}

/**
 * Board layout (TF-161).
 *  - `flow`: dynamic horizontal flow — cards fill a column top-to-bottom, then
 *    wrap into the next column (Square-style). Reflows as tickets change.
 *  - `grid`: fixed grid — stable slots that don't shift for speed stations.
 */
export function KdsBoard({ tickets, mode = 'flow', cardWidth = 260, emptyLabel = 'No open tickets' }: KdsBoardProps) {
  const { palette } = useTheme();

  if (tickets.length === 0) {
    return (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          color: palette.text.secondary,
        }}
      >
        <InboxRoundedIcon sx={{ fontSize: 56, opacity: 0.5 }} />
        <Typography variant="h6" sx={{ color: palette.text.secondary }}>
          {emptyLabel}
        </Typography>
      </Box>
    );
  }

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
          <KdsTicketCard key={t.id} ticket={t} width={cardWidth} />
        ))}
      </Box>
    );
  }

  // Dynamic flow: column-wrapping so cards pack top-to-bottom then across.
  return (
    <Box
      sx={{
        ...common,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: 1.5,
      }}
    >
      {tickets.map((t) => (
        <KdsTicketCard key={t.id} ticket={t} width={cardWidth} />
      ))}
    </Box>
  );
}

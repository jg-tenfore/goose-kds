import type { ReactNode } from 'react';
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
 * Board layout (TF-161) — five layout modes matching Settings › Layout:
 *  - `flex-rail` (`flow`): dynamic column-wrap flow, variable card heights.
 *  - `tile-fill`: masonry packing (CSS columns), auto-balanced to fit more.
 *  - `1-rail`: one row of full-height ticket columns, horizontal scroll.
 *  - `2-rails` (`grid`): a 2-row grid of equal cells flowing into columns.
 *  - `3-rails`: a 3-row grid, densest layout.
 */
export function KdsBoard({ tickets, mode = 'flex-rail', cardWidth = 260, emptyLabel = 'No open tickets' }: KdsBoardProps) {
  const { palette } = useTheme();

  if (tickets.length === 0) {
    return (
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5, color: palette.text.secondary }}>
        <InboxRoundedIcon sx={{ fontSize: 56, opacity: 0.5 }} />
        <Typography variant="h6" sx={{ color: palette.text.secondary }}>
          {emptyLabel}
        </Typography>
      </Box>
    );
  }

  const common = { flex: 1, minHeight: 0, p: 1.5 } as const;
  const wrap = (sx: object, children: ReactNode) => <Box sx={{ ...common, ...sx }}>{children}</Box>;

  // Masonry via CSS multi-column — cards keep width and pack top-to-bottom,
  // columns auto-balance to roughly equal height.
  if (mode === 'tile-fill') {
    return wrap(
      { overflow: 'auto', columnWidth: `${cardWidth}px`, columnGap: '12px' },
      tickets.map((t) => (
        <Box key={t.id} sx={{ breakInside: 'avoid', mb: 1.5 }}>
          <KdsTicketCard ticket={t} width={cardWidth} />
        </Box>
      )),
    );
  }

  // One row of full-height columns; scroll horizontally.
  if (mode === '1-rail') {
    return wrap(
      { display: 'flex', flexDirection: 'row', gap: 1.5, overflowX: 'auto', overflowY: 'hidden' },
      tickets.map((t) => (
        <Box key={t.id} sx={{ height: '100%', flex: '0 0 auto' }}>
          <KdsTicketCard ticket={t} width={cardWidth} fillHeight />
        </Box>
      )),
    );
  }

  // Fixed-row grids flowing into columns (2 or 3 rails).
  if (mode === '2-rails' || mode === '3-rails' || mode === 'grid') {
    const rows = mode === '3-rails' ? 3 : 2;
    return wrap(
      {
        display: 'grid',
        gap: 1.5,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridAutoFlow: 'column',
        gridAutoColumns: `${cardWidth}px`,
        overflowX: 'auto',
        overflowY: 'hidden',
      },
      tickets.map((t) => <KdsTicketCard key={t.id} ticket={t} width={cardWidth} fillHeight />),
    );
  }

  // flex-rail / flow (default): dynamic column-wrap flow.
  return wrap(
    { display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-start', gap: 1.5, overflow: 'auto' },
    tickets.map((t) => <KdsTicketCard key={t.id} ticket={t} width={cardWidth} />),
  );
}

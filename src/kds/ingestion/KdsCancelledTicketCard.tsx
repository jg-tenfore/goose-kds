import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import { FULFILLMENT_LABELS } from '../types';
import type { CancelledTicket } from './types';

const CANCEL_RED = '#c0392b';

export interface KdsCancelledTicketCardProps {
  ticket: CancelledTicket;
  width?: number;
  /** Start acknowledged (for showing the resolved state in a story). */
  defaultAcknowledged?: boolean;
  onAcknowledge?: (ticket: CancelledTicket) => void;
}

/**
 * Cancelled-order treatment with forced acknowledgement (TF-164).
 *
 * A cancel event that lands after prep started can't just vanish — food would
 * get made anyway. The card flips to a hard-stop red state ("Do not make"),
 * items are struck through, and the cook must tap "Acknowledge & discard".
 * If prep had started, acknowledging opens a confirm dialog first. Once
 * acknowledged the card collapses to a quiet, cleared state.
 */
export function KdsCancelledTicketCard({
  ticket,
  width = 260,
  defaultAcknowledged = false,
  onAcknowledge,
}: KdsCancelledTicketCardProps) {
  const { palette } = useTheme();
  const [acknowledged, setAcknowledged] = useState(defaultAcknowledged);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const items = ticket.courses.flatMap((c) => c.items);

  const ack = () => {
    setAcknowledged(true);
    setConfirmOpen(false);
    onAcknowledge?.(ticket);
  };

  const handleAckClick = () => {
    if (ticket.prepStarted) setConfirmOpen(true);
    else ack();
  };

  /* ---- Acknowledged / cleared state ------------------------------------- */
  if (acknowledged) {
    return (
      <Box
        sx={{
          width,
          borderRadius: 1.5,
          border: `1px dashed ${palette.board.cardBorder}`,
          bgcolor: 'rgba(255,255,255,0.04)',
          p: 1.5,
          opacity: 0.6,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <CheckRoundedIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }} />
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)', flex: 1 }} noWrap>
            {ticket.label}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          Cancellation acknowledged · cleared
        </Typography>
      </Box>
    );
  }

  /* ---- Active cancelled state (needs acknowledgement) ------------------- */
  return (
    <Box
      sx={{
        width,
        bgcolor: palette.board.card,
        color: palette.board.cardText,
        borderRadius: 1.5,
        overflow: 'hidden',
        border: `1px solid ${palette.board.cardBorder}`,
        borderLeft: `5px solid ${CANCEL_RED}`,
        boxShadow: `0 0 0 2px ${CANCEL_RED}, 0 1px 3px rgba(0,0,0,0.4)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Neutral header */}
      <Box sx={{ px: 1.5, py: 1, bgcolor: '#dbe4ef' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#12263a', lineHeight: 1.1 }} noWrap>
            {ticket.label}
          </Typography>
          {ticket.server && (
            <Typography variant="body2" sx={{ color: '#3d5063', fontWeight: 600 }} noWrap>
              {ticket.server}
            </Typography>
          )}
        </Box>
        <Typography variant="caption" sx={{ color: '#3d5063' }}>
          {ticket.elapsedLabel}
        </Typography>
      </Box>

      {/* Hard-stop cancelled banner */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: CANCEL_RED }}>
        <BlockRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
        <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff', flex: 1 }}>
          CANCELLED{ticket.prepStarted ? ' — do not make' : ''}
        </Typography>
        {ticket.cancelledSince && (
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            {ticket.cancelledSince}
          </Typography>
        )}
      </Box>

      {/* Fulfillment divider */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75 }}>
        <Box sx={{ flex: 1, height: '2px', bgcolor: palette.board.cardBorder }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: palette.board.cardText }}>
          {FULFILLMENT_LABELS[ticket.fulfillment]}
        </Typography>
        <Box sx={{ flex: 1, height: '2px', bgcolor: palette.board.cardBorder }} />
      </Box>

      {/* Items — struck through */}
      <Stack spacing={0.75} sx={{ px: 1.5, pb: 1 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', gap: 1.25, opacity: 0.6 }}>
            <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 18, textAlign: 'right', textDecoration: 'line-through' }}>
              {item.quantity}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, textDecoration: 'line-through', lineHeight: 1.3 }}>
              {item.glyph ? `${item.glyph} ` : ''}
              {item.name}
            </Typography>
          </Box>
        ))}
      </Stack>

      {ticket.cancelReason && (
        <Typography variant="caption" sx={{ px: 1.5, pb: 1, color: palette.board.cardTextMuted, fontStyle: 'italic' }}>
          {ticket.cancelReason}
        </Typography>
      )}

      {/* Acknowledge action */}
      <Box sx={{ px: 1.5, pb: 1.5 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<CheckRoundedIcon />}
          onClick={handleAckClick}
          sx={{ bgcolor: CANCEL_RED, fontWeight: 800, '&:hover': { bgcolor: '#a5321f' } }}
        >
          Acknowledge & discard
        </Button>
      </Box>

      {/* Confirm dialog — only when prep already started */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ReportProblemRoundedIcon sx={{ color: CANCEL_RED }} />
          Confirm cancellation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>{ticket.label}</strong> was cancelled after prep started
            {ticket.cancelReason ? ` (${ticket.cancelReason})` : ''}. Stop making these items and discard anything already
            started. This clears the ticket from the board.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Keep on board</Button>
          <Button onClick={ack} variant="contained" sx={{ bgcolor: CANCEL_RED, '&:hover': { bgcolor: '#a5321f' } }}>
            Acknowledge & discard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

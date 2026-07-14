import { Box, Button, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { KdsTicketCard } from '../components/KdsTicketCard';
import type { PreviewTicket } from './types';

/** Preview accent — a cool "not fired yet" sky-blue, distinct from every fired state. */
const PREVIEW_COLOR = '#4f8bd6';

export interface KdsPreviewCardProps {
  ticket: PreviewTicket;
  width?: number;
  /** Fire affordance — transitions the preview to active/fired work. */
  onFire?: (ticket: PreviewTicket) => void;
}

/**
 * Incoming-order preview treatment (TF-167).
 *
 * Wraps the shared `KdsTicketCard` in a visually distinct frame so eligible
 * not-yet-fired orders read as *coming load*, never as active work:
 *  - dashed sky-blue frame + tinted "Preview" banner (icon + label, not color alone)
 *  - inner card desaturated + slightly dimmed so it recedes behind fired tickets
 *  - "Not counted / no timer" chip — excluded from active counts & timers until fired
 *  - a "Fire now" affordance that transitions it into fired-time sequencing
 */
export function KdsPreviewCard({ ticket, width = 260, onFire }: KdsPreviewCardProps) {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width,
        borderRadius: 2,
        border: `2px dashed ${PREVIEW_COLOR}`,
        bgcolor: 'rgba(79,139,214,0.10)',
        p: 0.75,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}
    >
      {/* Preview banner — icon + label + countdown (never color alone) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 0.5, pt: 0.25 }}>
        <ScheduleRoundedIcon sx={{ fontSize: 18, color: PREVIEW_COLOR }} />
        <Typography variant="body2" sx={{ fontWeight: 800, letterSpacing: 0.4, color: PREVIEW_COLOR, flex: 1 }}>
          PREVIEW
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: PREVIEW_COLOR }}>
          {ticket.firesInLabel}
        </Typography>
      </Box>

      {ticket.previewReason && (
        <Typography variant="caption" sx={{ px: 0.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.3 }}>
          {ticket.previewReason}
        </Typography>
      )}

      {/* The real card, desaturated + dimmed so it recedes behind fired work */}
      <Box sx={{ filter: 'saturate(0.55)', opacity: 0.9 }}>
        <KdsTicketCard ticket={ticket} width={width - 12} />
      </Box>

      {/* Excluded-from-counts note + fire affordance */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 0.5 }}>
        <Chip
          size="small"
          label="Not counted · no timer"
          sx={{
            height: 22,
            fontSize: 11,
            fontWeight: 700,
            bgcolor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.7)',
          }}
        />
      </Box>
      <Button
        fullWidth
        size="small"
        variant="contained"
        startIcon={<BoltRoundedIcon />}
        onClick={() => onFire?.(ticket)}
        sx={{
          bgcolor: PREVIEW_COLOR,
          fontWeight: 800,
          '&:hover': { bgcolor: '#3f79c2' },
          color: palette.getContrastText(PREVIEW_COLOR),
        }}
      >
        Fire now
      </Button>
    </Box>
  );
}

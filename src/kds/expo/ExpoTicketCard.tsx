import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import OutlinedFlagRoundedIcon from '@mui/icons-material/OutlinedFlagRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import { FULFILLMENT_LABELS } from '../types';
import { TimerBadge } from './TimerBadge';
import { computeReadiness, type ExpoItem, type ExpoItemStatus, type ExpoModifier, type ExpoTicket } from './types';

/**
 * Expo ticket card (TF-173 / TF-174 / TF-178).
 *
 * The expeditor's per-ticket view: every item across all stations with its
 * station tag and live readiness, a readiness roll-up, and the complete-order
 * bump — with a manual-override path when expo sends before the board shows all
 * items ready (audited). Prioritize/flag act on the whole ticket.
 *
 * Reuses the shared card anatomy (neutral header + state accent + labeled
 * banner + fulfillment divider + red modifiers) so it reads as one system with
 * the station boards.
 */

/** Item status → icon + label + color key. Icon + label carry it without color (TF-177). */
const STATUS_META: Record<ExpoItemStatus, { icon: SvgIconComponent; label: string; colorKey: 'normal' | 'warning' | 'recalled' | 'muted' }> = {
  pending: { icon: RadioButtonUncheckedRoundedIcon, label: 'Working', colorKey: 'muted' },
  held: { icon: PauseCircleOutlineRoundedIcon, label: 'Held', colorKey: 'warning' },
  ready: { icon: CheckCircleOutlineRoundedIcon, label: 'Ready', colorKey: 'normal' },
  complete: { icon: CheckCircleRoundedIcon, label: 'Plated', colorKey: 'normal' },
  recalled: { icon: ReplayRoundedIcon, label: 'Recalled', colorKey: 'recalled' },
};

function StatusPill({ status }: { status: ExpoItemStatus }) {
  const { palette } = useTheme();
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  const color =
    meta.colorKey === 'muted'
      ? palette.board.cardTextMuted
      : meta.colorKey === 'normal'
        ? palette.status.normal
        : meta.colorKey === 'warning'
          ? '#B26A00'
          : palette.status.recalled;
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.375, flexShrink: 0 }}>
      <Icon sx={{ fontSize: 16, color }} aria-hidden />
      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color, whiteSpace: 'nowrap' }}>{meta.label}</Typography>
    </Box>
  );
}

function ModifierText({ modifier }: { modifier: ExpoModifier }) {
  const { palette } = useTheme();
  const emphasized = modifier.kind === 'add' || modifier.kind === 'no';
  const muted = modifier.kind === 'note';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: emphasized ? palette.board.modifier : muted ? palette.board.cardTextMuted : palette.board.cardText,
          fontStyle: muted ? 'italic' : 'normal',
          lineHeight: 1.35,
          // Changed modifier is boxed so it survives a glance (TF-178).
          ...(modifier.changed && {
            bgcolor: 'rgba(242,201,76,0.28)',
            border: '1px solid #B26A00',
            borderRadius: 0.75,
            px: 0.5,
            fontWeight: 800,
          }),
        }}
      >
        {modifier.changed ? '↻ ' : ''}
        {modifier.label}
      </Typography>
    </Box>
  );
}

function ItemRow({ item }: { item: ExpoItem }) {
  const { palette } = useTheme();
  const removed = item.change === 'removed';
  const added = item.change === 'added';
  const done = item.status === 'complete';

  return (
    <Box sx={{ display: 'flex', gap: 1, opacity: removed ? 0.6 : done ? 0.7 : 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 16, textAlign: 'right', color: palette.board.cardText }}>
        {item.quantity}
      </Typography>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 0.75 }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: palette.board.cardText,
              lineHeight: 1.3,
              textDecoration: removed ? 'line-through' : 'none',
            }}
          >
            {item.glyph ? `${item.glyph} ` : ''}
            {item.name}
          </Typography>
          <StatusPill status={item.status} />
        </Box>

        {/* Station tag (neutral) + change markers */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.25, flexWrap: 'wrap' }}>
          <Chip
            size="small"
            label={item.station}
            sx={{
              height: 18,
              fontSize: '0.65rem',
              fontWeight: 700,
              bgcolor: '#e7ebf0',
              color: '#3d5063',
              '& .MuiChip-label': { px: 0.75 },
            }}
          />
          {added && (
            <Chip
              size="small"
              icon={<AddCircleRoundedIcon sx={{ fontSize: 13 }} />}
              label="Added"
              sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, bgcolor: palette.status.priority, color: '#fff', '& .MuiChip-icon': { color: '#fff', ml: 0.5 }, '& .MuiChip-label': { px: 0.5 } }}
            />
          )}
          {removed && (
            <Chip
              size="small"
              icon={<BlockRoundedIcon sx={{ fontSize: 13 }} />}
              label="Removed"
              sx={{ height: 18, fontSize: '0.65rem', fontWeight: 800, bgcolor: 'rgba(235,87,87,0.15)', color: palette.status.late, border: `1px solid ${palette.status.late}`, '& .MuiChip-icon': { color: palette.status.late, ml: 0.5 }, '& .MuiChip-label': { px: 0.5 } }}
            />
          )}
        </Box>

        {item.seat && (
          <Typography variant="body2" sx={{ color: palette.board.cardTextMuted }}>
            {item.seat}
          </Typography>
        )}
        {item.modifiers?.map((m, i) => <ModifierText key={i} modifier={m} />)}
        {item.note && (
          <Typography variant="body2" sx={{ color: palette.board.cardTextMuted, fontStyle: 'italic' }}>
            {item.note}
          </Typography>
        )}
        {item.allergy && (
          <Box
            sx={{
              mt: 0.5,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              bgcolor: 'rgba(235,87,87,0.12)',
              border: `1px solid ${palette.status.late}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 16, color: palette.status.late }} />
            <Typography variant="body2" sx={{ color: palette.status.late, fontWeight: 700 }}>
              {item.allergy}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export interface ExpoTicketCardProps {
  ticket: ExpoTicket;
  width?: number;
  onComplete?: (id: string) => void;
  onOverride?: (id: string) => void;
  onPrioritize?: (id: string) => void;
  onFlag?: (id: string) => void;
  onAcknowledge?: (id: string) => void;
}

export function ExpoTicketCard({
  ticket,
  width = 300,
  onComplete,
  onOverride,
  onPrioritize,
  onFlag,
  onAcknowledge,
}: ExpoTicketCardProps) {
  const { palette } = useTheme();
  const readiness = computeReadiness(ticket);
  const prioritized = ticket.state === 'priority';
  const recalled = ticket.state === 'recalled';
  const cancelled = !!ticket.cancelled;

  // Accent stripe mirrors the station card: priority/recall/cancel drive it.
  const accent = cancelled
    ? palette.status.late
    : prioritized
      ? palette.status.priority
      : recalled
        ? palette.status.recalled
        : readiness.allReady
          ? palette.status.normal
          : undefined;

  return (
    <Box
      sx={{
        width,
        bgcolor: palette.board.card,
        color: palette.board.cardText,
        borderRadius: 1.5,
        overflow: 'hidden',
        border: `1px solid ${palette.board.cardBorder}`,
        borderLeft: accent ? `5px solid ${accent}` : `1px solid ${palette.board.cardBorder}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header (neutral) — label + server + timer, with prioritize/flag actions. */}
      <Box sx={{ px: 1.5, py: 1, bgcolor: '#dbe4ef' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#12263a', lineHeight: 1.1 }} noWrap>
              {ticket.label}
            </Typography>
            {ticket.server && (
              <Typography variant="caption" sx={{ color: '#3d5063', fontWeight: 600 }} noWrap>
                {ticket.server}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flexShrink: 0 }}>
            <Button
              size="small"
              onClick={() => onPrioritize?.(ticket.id)}
              aria-label="Prioritize ticket"
              sx={{ minWidth: 32, p: 0.5, color: prioritized ? palette.status.priority : '#3d5063' }}
            >
              <PriorityHighRoundedIcon sx={{ fontSize: 20 }} />
            </Button>
            <Button
              size="small"
              onClick={() => onFlag?.(ticket.id)}
              aria-label={ticket.flagged ? 'Unflag ticket' : 'Flag ticket'}
              sx={{ minWidth: 32, p: 0.5, color: ticket.flagged ? palette.status.late : '#3d5063' }}
            >
              {ticket.flagged ? <FlagRoundedIcon sx={{ fontSize: 20 }} /> : <OutlinedFlagRoundedIcon sx={{ fontSize: 20 }} />}
            </Button>
          </Box>
        </Box>
        <Box sx={{ mt: 0.5 }}>
          <TimerBadge elapsedMin={ticket.elapsedMin} promisedMin={ticket.promisedMin} size="sm" />
        </Box>
      </Box>

      {/* Cancelled banner — requires acknowledgement before it leaves the board (TF-178). */}
      {cancelled && (
        <Box sx={{ px: 1.5, py: 0.75, bgcolor: palette.status.late }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <BlockRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff', flex: 1 }}>
              Cancelled{ticket.cancelled!.startedPrep ? ' — prep started' : ''}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              {ticket.cancelled!.since}
            </Typography>
          </Box>
          <Button
            fullWidth
            size="small"
            onClick={() => onAcknowledge?.(ticket.id)}
            sx={{ mt: 0.5, bgcolor: '#fff', color: palette.status.late, fontWeight: 800, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
          >
            Acknowledge & clear
          </Button>
        </Box>
      )}

      {/* Priority / recall banner (icon + label + time — not color alone). */}
      {!cancelled && (prioritized || recalled) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: accent }}>
          {prioritized ? (
            <PriorityHighRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
          ) : (
            <ReplayRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
          )}
          <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff', flex: 1 }}>
            {prioritized ? 'Prioritized' : 'Recalled'}
          </Typography>
          {ticket.stateSince && (
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              {ticket.stateSince}
            </Typography>
          )}
        </Box>
      )}

      {/* Fulfillment divider */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.75 }}>
        <Box sx={{ flex: 1, height: '2px', bgcolor: palette.board.cardBorder }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: palette.board.cardText }}>
          {FULFILLMENT_LABELS[ticket.fulfillment]}
        </Typography>
        <Box sx={{ flex: 1, height: '2px', bgcolor: palette.board.cardBorder }} />
      </Box>

      {/* Items across stations */}
      <Stack spacing={1} sx={{ px: 1.5, pb: 1 }}>
        {ticket.items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </Stack>

      {/* Readiness roll-up + complete/override (TF-173 / TF-174) */}
      {!cancelled && !ticket.continued && (
        <Box sx={{ mt: 'auto', px: 1.5, py: 1, borderTop: `1px solid ${palette.board.cardBorder}`, bgcolor: '#f4f6f9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
            {readiness.allReady ? (
              <DoneAllRoundedIcon sx={{ fontSize: 18, color: palette.status.normal }} />
            ) : (
              <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 18, color: palette.board.cardTextMuted }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 800, color: readiness.allReady ? palette.status.normal : palette.board.cardTextMuted, flex: 1 }}>
              {readiness.allReady ? 'Ready to complete' : `${readiness.done} of ${readiness.total} ready`}
            </Typography>
          </Box>
          {/* Progress track (shape signal, not color alone) */}
          <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#dde2e8', overflow: 'hidden', mb: 1 }}>
            <Box
              sx={{
                height: '100%',
                width: `${readiness.total ? (readiness.done / readiness.total) * 100 : 0}%`,
                bgcolor: readiness.allReady ? palette.status.normal : palette.status.priority,
              }}
            />
          </Box>
          {readiness.allReady ? (
            <Button
              fullWidth
              size="small"
              startIcon={<DoneAllRoundedIcon />}
              onClick={() => onComplete?.(ticket.id)}
              sx={{ bgcolor: palette.status.normal, color: '#fff', fontWeight: 800, '&:hover': { bgcolor: '#256628' } }}
            >
              Complete order
            </Button>
          ) : (
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<SendRoundedIcon />}
              onClick={() => onOverride?.(ticket.id)}
              sx={{ color: '#3d5063', borderColor: palette.board.cardBorder, fontWeight: 700 }}
            >
              Override & send
            </Button>
          )}
        </Box>
      )}

      {/* Continued overflow footer */}
      {ticket.continued && (
        <Box sx={{ mt: 'auto', px: 1.5, py: 0.75, bgcolor: '#eef1f4', borderTop: `1px solid ${palette.board.cardBorder}` }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: palette.board.cardTextMuted }}>
            Continued…
          </Typography>
        </Box>
      )}
    </Box>
  );
}

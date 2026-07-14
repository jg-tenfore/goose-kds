import type { ReactNode } from 'react';
import { Box, ButtonBase, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { useTheme, type Theme } from '@mui/material/styles';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import { FULFILLMENT_LABELS, type Modifier, type Ticket, type TicketItem, type TicketState } from '../types';

/**
 * Interactive ticket card for the Fulfillment Actions stories.
 *
 * A faithful re-skin of the shared `KdsTicketCard` anatomy (neutral header +
 * state accent stripe + labeled banner, red modifiers, italic notes, elevated
 * allergy, 🔥 course chip, "Continued…" footer) with the interactivity the
 * shared card intentionally doesn't carry:
 *
 *  - `onItemToggle` makes each line item a one-touch bump target (TF-151).
 *  - `onCompleteTicket` adds the header check + a full-width "Complete ticket"
 *    footer action (TF-151).
 *  - `completing` renders Square's full-card "Completing" overlay (TF-151).
 *  - `prioritizing` renders a "Prioritizing… / Cancel" progress overlay (TF-170).
 *  - `footerSlot` hosts inline recovery affordances (e.g. Undo) (TF-171).
 *
 * The shared card is not modified — this lives entirely under `kds/fulfillment/`.
 */

function stateMetaFor(state: TicketState, palette: Theme['palette']) {
  const map: Partial<Record<TicketState, { color: string; icon: SvgIconComponent; label: string }>> = {
    priority: { color: palette.status.priority, icon: PriorityHighRoundedIcon, label: 'Prioritized' },
    warning: { color: palette.status.warning, icon: WarningAmberRoundedIcon, label: 'Running late' },
    late: { color: palette.status.late, icon: ScheduleRoundedIcon, label: 'Late' },
    recalled: { color: palette.status.recalled, icon: ReplayRoundedIcon, label: 'Recalled' },
    completed: { color: palette.status.normal, icon: CheckCircleRoundedIcon, label: 'Completed' },
  };
  return map[state];
}

function ModifierText({ modifier }: { modifier: Modifier }) {
  const { palette } = useTheme();
  const emphasized = modifier.kind === 'add' || modifier.kind === 'no';
  const muted = modifier.kind === 'note';
  return (
    <Typography
      variant="body2"
      sx={{
        color: emphasized ? palette.board.modifier : muted ? palette.board.cardTextMuted : palette.board.cardText,
        fontStyle: muted ? 'italic' : 'normal',
        lineHeight: 1.35,
      }}
    >
      {modifier.label}
    </Typography>
  );
}

function ItemBody({ item }: { item: TicketItem }) {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: 'flex', gap: 1.25, flex: 1, minWidth: 0 }}>
      <Typography variant="body1" sx={{ fontWeight: 700, minWidth: 18, textAlign: 'right', color: palette.board.cardText }}>
        {item.quantity}
      </Typography>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body1" sx={{ fontWeight: 700, color: palette.board.cardText, lineHeight: 1.3 }}>
          {item.glyph ? `${item.glyph} ` : ''}
          {item.name}
        </Typography>
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

function ItemRow({ item, onToggle }: { item: TicketItem; onToggle?: (id: string) => void }) {
  const { palette } = useTheme();
  const done = item.state === 'complete' || item.state === 'recalled';
  const interactive = Boolean(onToggle);

  const content = (
    <>
      <ItemBody item={item} />
      {interactive && (
        <Box
          aria-hidden
          sx={{
            alignSelf: 'flex-start',
            mt: 0.25,
            width: 22,
            height: 22,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${done ? palette.status.normal : palette.board.cardBorder}`,
            bgcolor: done ? palette.status.normal : 'transparent',
            flexShrink: 0,
          }}
        >
          {done && <CheckRoundedIcon sx={{ fontSize: 16, color: '#fff' }} />}
        </Box>
      )}
    </>
  );

  if (!interactive) {
    return <Box sx={{ display: 'flex', gap: 1, opacity: done ? 0.45 : 1 }}>{content}</Box>;
  }

  return (
    <ButtonBase
      onClick={() => onToggle!(item.id)}
      focusRipple
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 1,
        width: '100%',
        textAlign: 'left',
        borderRadius: 1,
        px: 0.5,
        py: 0.5,
        mx: -0.5,
        transition: 'background-color 100ms linear, opacity 100ms linear',
        opacity: done ? 0.45 : 1,
        '&:hover': { bgcolor: 'rgba(46,125,50,0.08)' },
      }}
    >
      {content}
    </ButtonBase>
  );
}

export interface FulfillmentTicketCardProps {
  ticket: Ticket;
  /** Fixed card width in the flow/grid. */
  width?: number;
  /** Makes each line item a one-touch bump target. */
  onItemToggle?: (itemId: string) => void;
  /** Adds the header check + full-width complete-ticket footer action. */
  onCompleteTicket?: () => void;
  /** Footer action label. */
  completeLabel?: string;
  /** Full-card "Completing" overlay (Square-style bump feedback). */
  completing?: boolean;
  /** Full-card "Prioritizing…" progress overlay with Cancel. */
  prioritizing?: boolean;
  onCancelPrioritize?: () => void;
  /** Dims the whole card (e.g. a completed ticket in a recall picker). */
  dim?: boolean;
  /** Inline footer content, e.g. an Undo affordance. */
  footerSlot?: ReactNode;
}

export function FulfillmentTicketCard({
  ticket,
  width = 260,
  onItemToggle,
  onCompleteTicket,
  completeLabel = 'Complete ticket',
  completing = false,
  prioritizing = false,
  onCancelPrioritize,
  dim = false,
  footerSlot,
}: FulfillmentTicketCardProps) {
  const { palette } = useTheme();
  const stateMeta = stateMetaFor(ticket.state, palette);
  const StateIcon = stateMeta?.icon;

  return (
    <Box sx={{ position: 'relative', width, opacity: dim ? 0.55 : 1 }}>
      <Box
        sx={{
          bgcolor: palette.board.card,
          color: palette.board.cardText,
          borderRadius: 1.5,
          overflow: 'hidden',
          border: `1px solid ${palette.board.cardBorder}`,
          borderLeft: stateMeta ? `5px solid ${stateMeta.color}` : `1px solid ${palette.board.cardBorder}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header (neutral) — with an optional one-touch complete-ticket check */}
        <Box sx={{ px: 1.5, py: 1, bgcolor: '#dbe4ef', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
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
          {onCompleteTicket && (
            <ButtonBase
              onClick={onCompleteTicket}
              focusRipple
              aria-label="Complete ticket"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                flexShrink: 0,
                bgcolor: 'rgba(18,38,58,0.08)',
                color: '#12263a',
                transition: 'background-color 100ms linear',
                '&:hover': { bgcolor: palette.status.normal, color: '#fff' },
              }}
            >
              <CheckRoundedIcon sx={{ fontSize: 22 }} />
            </ButtonBase>
          )}
        </Box>

        {/* State banner (icon + label + timestamp — never color alone) */}
        {stateMeta && StateIcon && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: stateMeta.color }}>
            <StateIcon sx={{ fontSize: 18, color: '#fff' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff', flex: 1 }}>
              {stateMeta.label}
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

        {/* Courses + items */}
        <Stack spacing={1.25} sx={{ px: 1.5, pb: 1.25 }}>
          {ticket.courses.map((course, ci) => (
            <Box key={ci}>
              {course.name && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: palette.board.cardText }}>
                    {course.name}
                  </Typography>
                  {course.fireLabel && (
                    <Chip
                      size="small"
                      icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: 16 }} />}
                      label={course.fireLabel}
                      sx={{
                        height: 24,
                        bgcolor: 'rgba(235,87,87,0.12)',
                        color: palette.status.late,
                        '& .MuiChip-icon': { color: palette.status.late },
                      }}
                    />
                  )}
                </Box>
              )}
              <Stack spacing={0.5}>
                {course.items.map((item) => (
                  <ItemRow key={item.id} item={item} onToggle={onItemToggle} />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Continued overflow footer */}
        {ticket.continued && (
          <Box sx={{ px: 1.5, py: 0.75, bgcolor: '#eef1f4', borderTop: `1px solid ${palette.board.cardBorder}` }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: palette.board.cardTextMuted }}>
              Continued…
            </Typography>
          </Box>
        )}

        {/* Inline footer slot (e.g. Undo) */}
        {footerSlot && (
          <Box sx={{ px: 1.5, py: 1, bgcolor: '#eef1f4', borderTop: `1px solid ${palette.board.cardBorder}` }}>{footerSlot}</Box>
        )}

        {/* Complete-ticket action bar */}
        {onCompleteTicket && (
          <ButtonBase
            onClick={onCompleteTicket}
            focusRipple
            sx={{
              px: 1.5,
              py: 1.25,
              bgcolor: palette.status.normal,
              color: '#fff',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.75,
              transition: 'filter 100ms linear',
              '&:hover': { filter: 'brightness(1.08)' },
            }}
          >
            <CheckRoundedIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff' }}>
              {completeLabel}
            </Typography>
          </ButtonBase>
        )}
      </Box>

      {/* Full-card "Completing" overlay */}
      {completing && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 1.5,
            bgcolor: 'rgba(46,125,50,0.92)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <CircularProgress size={34} thickness={5} sx={{ color: '#fff' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#fff' }}>
            Completing…
          </Typography>
        </Box>
      )}

      {/* Full-card "Prioritizing…" progress overlay */}
      {prioritizing && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: 1.5,
            bgcolor: 'rgba(47,128,237,0.92)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <CircularProgress size={34} thickness={5} sx={{ color: '#fff' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#fff' }}>
            Prioritizing…
          </Typography>
          {onCancelPrioritize && (
            <ButtonBase
              onClick={onCancelPrioritize}
              focusRipple
              sx={{ mt: 0.5, px: 2, py: 0.75, borderRadius: 1, border: '2px solid #fff', fontWeight: 800 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff' }}>
                Cancel
              </Typography>
            </ButtonBase>
          )}
        </Box>
      )}
    </Box>
  );
}

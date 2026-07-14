import { Box, Chip, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import { FULFILLMENT_LABELS, type Modifier, type Ticket, type TicketItem, type TicketState } from '../types';

/** State → accent color + icon + label. Color is never the only signal. */
function useStateMeta(state: TicketState) {
  const { palette } = useTheme();
  const map: Partial<Record<TicketState, { color: string; icon: SvgIconComponent; label: string }>> = {
    priority: { color: palette.status.priority, icon: PriorityHighRoundedIcon, label: 'Prioritized' },
    warning: { color: palette.status.warning, icon: WarningAmberRoundedIcon, label: 'Running late' },
    late: { color: palette.status.late, icon: ScheduleRoundedIcon, label: 'Late' },
    recalled: { color: palette.status.recalled, icon: ReplayRoundedIcon, label: 'Recalled' },
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

function ItemRow({ item }: { item: TicketItem }) {
  const { palette } = useTheme();
  const done = item.state === 'complete' || item.state === 'recalled';
  return (
    <Box sx={{ display: 'flex', gap: 1.25, opacity: done ? 0.45 : 1 }}>
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

export interface KdsTicketCardProps {
  ticket: Ticket;
  /** Fixed card width in the flow/grid. */
  width?: number;
  /** Fill the parent's height (used by rail/grid layouts) and clip overflow. */
  fillHeight?: boolean;
}

export function KdsTicketCard({ ticket, width = 260, fillHeight = false }: KdsTicketCardProps) {
  const { palette } = useTheme();
  const stateMeta = useStateMeta(ticket.state);
  const StateIcon = stateMeta?.icon;

  return (
    <Box
      sx={{
        width,
        height: fillHeight ? '100%' : undefined,
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
      {/* Header (neutral) */}
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

      {/* State banner (icon + label + timestamp — not color alone) */}
      {stateMeta && StateIcon && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            px: 1.5,
            py: 0.5,
            bgcolor: stateMeta.color,
          }}
        >
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
            <Stack spacing={1}>
              {course.items.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

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

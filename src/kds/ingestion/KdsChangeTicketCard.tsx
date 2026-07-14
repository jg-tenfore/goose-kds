import { Box, Chip, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { FULFILLMENT_LABELS } from '../types';
import type { ChangeModifier, ChangeTicket, ChangeTicketItem, ItemChange } from './types';

/** After-fire change palette — each marker pairs a color with an icon + text tag. */
const CHANGE = {
  update: '#3f6fd1', // banner / "order changed" accent
  added: { fg: '#1f7a3d', bg: 'rgba(31,122,61,0.12)', label: 'Added', icon: AddRoundedIcon },
  removed: { fg: '#c0392b', bg: 'rgba(192,57,43,0.12)', label: 'Removed', icon: RemoveRoundedIcon },
  modified: { fg: '#b7791f', bg: 'rgba(183,121,31,0.14)', label: 'Changed', icon: EditRoundedIcon },
} as const;

function ChangeTag({ change }: { change: ItemChange }) {
  const meta = CHANGE[change];
  const Icon = meta.icon;
  return (
    <Chip
      size="small"
      icon={<Icon sx={{ fontSize: 14 }} />}
      label={meta.label}
      sx={{
        height: 20,
        fontSize: 11,
        fontWeight: 800,
        bgcolor: meta.bg,
        color: meta.fg,
        '& .MuiChip-icon': { color: meta.fg, ml: '4px' },
        '& .MuiChip-label': { px: '6px' },
      }}
    />
  );
}

function ModifierLine({ modifier }: { modifier: ChangeModifier }) {
  const { palette } = useTheme();
  const emphasized = modifier.kind === 'add' || modifier.kind === 'no';
  const muted = modifier.kind === 'note';
  const changeMeta = modifier.change ? CHANGE[modifier.change] : undefined;
  const removed = modifier.change === 'removed';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography
        variant="body2"
        sx={{
          color: changeMeta ? changeMeta.fg : emphasized ? palette.board.modifier : muted ? palette.board.cardTextMuted : palette.board.cardText,
          fontStyle: muted ? 'italic' : 'normal',
          textDecoration: removed ? 'line-through' : 'none',
          fontWeight: changeMeta ? 700 : 400,
          lineHeight: 1.35,
        }}
      >
        {modifier.label}
      </Typography>
      {modifier.change && <ChangeTag change={modifier.change} />}
    </Box>
  );
}

function ItemRow({ item }: { item: ChangeTicketItem }) {
  const { palette } = useTheme();
  const changeMeta = item.change ? CHANGE[item.change] : undefined;
  const removed = item.change === 'removed';

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.25,
        px: changeMeta ? 0.75 : 0,
        py: changeMeta ? 0.5 : 0,
        borderRadius: 1,
        bgcolor: changeMeta ? changeMeta.bg : 'transparent',
        borderLeft: changeMeta ? `3px solid ${changeMeta.fg}` : 'none',
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: 700, minWidth: 18, textAlign: 'right', color: palette.board.cardText, textDecoration: removed ? 'line-through' : 'none' }}
      >
        {item.quantity}
      </Typography>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: palette.board.cardText,
              lineHeight: 1.3,
              textDecoration: removed ? 'line-through' : 'none',
              opacity: removed ? 0.7 : 1,
            }}
          >
            {item.glyph ? `${item.glyph} ` : ''}
            {item.name}
          </Typography>
          {item.change && <ChangeTag change={item.change} />}
        </Box>
        {item.seat && (
          <Typography variant="body2" sx={{ color: palette.board.cardTextMuted }}>
            {item.seat}
          </Typography>
        )}
        {item.modifiers?.map((m, i) => <ModifierLine key={i} modifier={m} />)}
        {item.note && (
          <Typography variant="body2" sx={{ color: palette.board.cardTextMuted, fontStyle: 'italic' }}>
            {item.note}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export interface KdsChangeTicketCardProps {
  ticket: ChangeTicket;
  width?: number;
}

/**
 * Ticket-card variant that surfaces after-fire order changes (TF-164).
 *
 * When an order-updated event lands on an already-fired ticket, the cook needs
 * to see *exactly* what moved: newly added lines get a green "Added" tag, removed
 * lines are struck through with a red "Removed" tag, and changed modifiers are
 * highlighted amber with a "Changed" tag (e.g. Medium → Well Done). A blue
 * "Order changed" banner at the top holds the change long enough to notice.
 */
export function KdsChangeTicketCard({ ticket, width = 260 }: KdsChangeTicketCardProps) {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width,
        bgcolor: palette.board.card,
        color: palette.board.cardText,
        borderRadius: 1.5,
        overflow: 'hidden',
        border: `1px solid ${palette.board.cardBorder}`,
        borderLeft: `5px solid ${CHANGE.update}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
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

      {/* "Order changed" banner (icon + label + when) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: CHANGE.update }}>
        <ChangeCircleRoundedIcon sx={{ fontSize: 18, color: '#fff' }} />
        <Typography variant="body2" sx={{ fontWeight: 800, color: '#fff', flex: 1 }}>
          Order changed
        </Typography>
        {ticket.changeSince && (
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            {ticket.changeSince}
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
            <Stack spacing={0.75}>
              {course.items.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import type { SvgIconComponent } from '@mui/icons-material';
import { computeTimerLevel, type TimerLevel, type TimerThresholds } from './types';

/**
 * Ticket timer badge (TF-175 + TF-177).
 *
 * Shows elapsed time and, where available, the promised target. Urgency is
 * carried by FOUR redundant signals so it never depends on color alone
 * (TF-177 / WCAG): a distinct **icon**, a text **label**, a **shape** (border
 * weight / style), and color. Legible on a glare-washed mounted display and for
 * colorblind staff.
 */

interface LevelMeta {
  icon: SvgIconComponent;
  label: string;
  /** status palette key */
  colorKey: 'normal' | 'warning' | 'late';
  /** border treatment — a shape signal independent of color. */
  border: 'solid' | 'dashed' | 'double';
  borderWidth: number;
  filled: boolean;
}

const LEVEL_META: Record<TimerLevel, LevelMeta> = {
  normal: { icon: ScheduleRoundedIcon, label: 'On time', colorKey: 'normal', border: 'solid', borderWidth: 1, filled: false },
  warning: { icon: WarningAmberRoundedIcon, label: 'Warning', colorKey: 'warning', border: 'dashed', borderWidth: 2, filled: false },
  late: { icon: NotificationsActiveRoundedIcon, label: 'LATE', colorKey: 'late', border: 'double', borderWidth: 4, filled: true },
};

function fmt(min: number): string {
  return `${min}m`;
}

export interface TimerBadgeProps {
  elapsedMin: number;
  promisedMin?: number;
  thresholds?: TimerThresholds;
  /** Force a level (e.g. for the states showcase). Defaults to computed. */
  level?: TimerLevel;
  /** `full` shows the label; `compact` shows icon + time only (for dense cards). */
  variant?: 'full' | 'compact';
  size?: 'sm' | 'md';
}

/** Returns the badge and, for convenience, the resolved level. */
export function TimerBadge({
  elapsedMin,
  promisedMin,
  thresholds,
  level: forced,
  variant = 'full',
  size = 'md',
}: TimerBadgeProps) {
  const { palette } = useTheme();
  const level = forced ?? computeTimerLevel(elapsedMin, promisedMin, thresholds);
  const meta = LEVEL_META[level];
  const Icon = meta.icon;
  const color = palette.status[meta.colorKey];

  const iconSize = size === 'sm' ? 15 : 18;
  const timeSize = size === 'sm' ? '0.8rem' : '0.95rem';

  return (
    <Box
      role="status"
      aria-label={`Timer ${meta.label}: ${fmt(elapsedMin)} elapsed${promisedMin != null ? ` of ${fmt(promisedMin)} promised` : ''}`}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: size === 'sm' ? 0.75 : 1,
        py: 0.25,
        borderRadius: 1,
        // Shape signal: border style + weight differ per level (color-independent).
        borderStyle: meta.border,
        borderWidth: meta.borderWidth,
        borderColor: color,
        bgcolor: meta.filled ? color : 'transparent',
      }}
    >
      <Icon sx={{ fontSize: iconSize, color: meta.filled ? '#fff' : color }} aria-hidden />
      <Typography
        component="span"
        sx={{ fontWeight: 800, fontSize: timeSize, lineHeight: 1, color: meta.filled ? '#fff' : color, fontVariantNumeric: 'tabular-nums' }}
      >
        {fmt(elapsedMin)}
        {promisedMin != null && (
          <Typography
            component="span"
            sx={{ fontWeight: 600, opacity: 0.75, fontSize: '0.85em', ml: 0.25 }}
          >
            /{fmt(promisedMin)}
          </Typography>
        )}
      </Typography>
      {variant === 'full' && (
        <Typography
          component="span"
          sx={{
            ml: 0.25,
            fontWeight: 800,
            fontSize: size === 'sm' ? '0.62rem' : '0.68rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: meta.filled ? '#fff' : color,
          }}
        >
          {meta.label}
        </Typography>
      )}
    </Box>
  );
}

export { LEVEL_META };

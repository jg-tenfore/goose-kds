import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import CallSplitRoundedIcon from '@mui/icons-material/CallSplitRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import type { RouteMatchType, RoutingFallback, RoutingRule } from './types';

const MATCH_LABELS: Record<RouteMatchType, string> = {
  source: 'Source',
  dining: 'Dining option',
  item: 'Item',
  category: 'Category',
  fulfillment: 'Fulfillment',
};

const MATCH_COLORS: Record<RouteMatchType, string> = {
  source: '#8e6fd6',
  dining: '#3f8fd1',
  item: '#3f9c8a',
  category: '#c98a2b',
  fulfillment: '#c05f8a',
};

function RuleRow({ rule }: { rule: RoutingRule }) {
  const { palette } = useTheme();
  const color = MATCH_COLORS[rule.matchType];
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.25,
        px: 1.5,
        borderRadius: 1.5,
        bgcolor: palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        border: `1px solid ${palette.divider}`,
        flexWrap: 'wrap',
      }}
    >
      {/* When (match) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 240, flex: 1 }}>
        <Chip
          size="small"
          label={MATCH_LABELS[rule.matchType]}
          sx={{ height: 22, fontWeight: 800, fontSize: 11, bgcolor: color, color: '#fff' }}
        />
        <Typography variant="body1" sx={{ fontWeight: 700, color: palette.text.primary }}>
          {rule.matchValue}
        </Typography>
      </Box>

      {/* Routes to (station) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ArrowRightAltRoundedIcon sx={{ color: palette.text.secondary }} />
        <Chip
          size="small"
          variant="outlined"
          label={rule.station}
          sx={{ height: 26, fontWeight: 700, color: palette.text.primary, borderColor: palette.divider }}
        />
        {rule.shared && (
          <Chip
            size="small"
            icon={<CallSplitRoundedIcon sx={{ fontSize: 14 }} />}
            label="Shared"
            sx={{ height: 22, fontSize: 11, fontWeight: 700, bgcolor: 'rgba(63,111,209,0.16)', color: '#7aa7ee', '& .MuiChip-icon': { color: '#7aa7ee' } }}
          />
        )}
      </Box>

      {rule.note && (
        <Typography variant="caption" sx={{ color: palette.text.secondary, flexBasis: '100%' }}>
          {rule.note}
        </Typography>
      )}
    </Box>
  );
}

export interface KdsRoutingRulesPanelProps {
  rules: RoutingRule[];
  fallback: RoutingFallback;
  maxWidth?: number;
}

/**
 * Routing-rules concept panel (TF-165).
 *
 * The routing *engine* is non-visual — it evaluates rules against each item and
 * fans it out to the right station screen(s). This panel documents the config
 * the engine applies: match by source / dining option / item / category /
 * fulfillment, shared-visibility items shown on multiple screens, and a
 * guaranteed fallback so an unmatched item is never dropped (it lands on Expo
 * and logs a route exception). Rule *authoring* lives under Settings › Routing.
 */
export function KdsRoutingRulesPanel({ rules, fallback, maxWidth = 720 }: KdsRoutingRulesPanelProps) {
  const { palette } = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{ maxWidth, width: '100%', p: 3, bgcolor: palette.background.paper, borderColor: palette.divider }}
    >
      <Stack spacing={2.5}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <RouteRoundedIcon sx={{ color: palette.text.primary }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: palette.text.primary }}>
            Station routing rules
          </Typography>
          <Chip
            size="small"
            icon={<SettingsRoundedIcon sx={{ fontSize: 15 }} />}
            label="Configured in Settings › Routing"
            sx={{ height: 24, fontWeight: 700, bgcolor: 'rgba(255,255,255,0.06)', color: palette.text.secondary, '& .MuiChip-icon': { color: palette.text.secondary } }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: palette.text.secondary }}>
          The engine evaluates each item top-to-bottom and routes it to the matching station screen. Items can appear on
          more than one screen when marked <em>shared</em>. Rule authoring lives in Settings — this panel reflects the
          active configuration.
        </Typography>

        <Divider />

        {/* Rules */}
        <Typography variant="overline" sx={{ color: palette.text.secondary }}>
          Active rules
        </Typography>
        <Stack spacing={1}>
          {rules.map((r) => (
            <RuleRow key={r.id} rule={r} />
          ))}
        </Stack>

        {/* Fallback */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.25,
            p: 1.5,
            borderRadius: 1.5,
            border: `1px dashed ${palette.status.warning}`,
            bgcolor: 'rgba(240,180,50,0.08)',
          }}
        >
          <ReportProblemRoundedIcon sx={{ color: palette.status.warning, mt: 0.25 }} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ fontWeight: 800, color: palette.text.primary }}>
                Fallback (no match)
              </Typography>
              <ArrowRightAltRoundedIcon sx={{ color: palette.text.secondary, fontSize: 18 }} />
              <Chip size="small" label={fallback.station} sx={{ height: 22, fontWeight: 700, bgcolor: palette.status.warning, color: '#1a1a1a' }} />
            </Box>
            <Typography variant="caption" sx={{ color: palette.text.secondary }}>
              {fallback.note}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: palette.text.secondary }}>
          A station display can be scoped to one station, several, or all tickets. QA target: ≥95% correct routing.
        </Typography>
      </Stack>
    </Paper>
  );
}

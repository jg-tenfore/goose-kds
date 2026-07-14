import { useMemo } from 'react';
import { Box, Chip, Stack, Tooltip, Typography } from '@mui/material';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import type { Ticket } from '../types';
import { aggregateComponentCounts, PRODUCTION_COMPONENTS, type ProductionComponent } from './production-components';

export interface ProductionCountPanelProps {
  tickets: Ticket[];
  components?: ProductionComponent[];
  /** Hide components whose current total is 0 (default keeps them for context). */
  hideZero?: boolean;
}

/**
 * Production Item Count v1 (TF-180) — prep COMPONENTS, not menu items. Each
 * tile shows a configured component's required total across open tickets plus
 * its explicit menu→component breakdown, so the number is auditable. Items with
 * no component mapping never appear (v1 is limited to mapped pilot components).
 */
export function ProductionCountPanel({ tickets, components = PRODUCTION_COMPONENTS, hideZero = false }: ProductionCountPanelProps) {
  const counts = useMemo(() => aggregateComponentCounts(tickets, components), [tickets, components]);
  const shown = hideZero ? counts.filter((c) => c.total > 0) : counts;

  return (
    <Box sx={{ bgcolor: 'board.canvas', color: 'text.primary', p: 3, minHeight: '100vh' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 0.5 }}>
        <BuildRoundedIcon sx={{ color: 'text.secondary' }} />
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Production Count
        </Typography>
        <Chip size="small" label="Components · v1" sx={{ bgcolor: 'transparent', color: 'text.secondary', border: 1, borderColor: 'divider' }} />
      </Stack>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
        Prep components across open tickets — distinct from menu-item all-day counts. Unmapped items are excluded.
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {shown.map(({ component, total, breakdown }) => (
          <Box
            key={component.id}
            sx={{
              bgcolor: 'board.card',
              color: 'board.cardText',
              borderRadius: 2,
              p: 2.5,
              opacity: total === 0 ? 0.55 : 1,
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-end' }}>
              <Typography sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontSize: 56, lineHeight: 0.9 }}>
                {total}
              </Typography>
              <Box sx={{ pb: 0.75 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{component.label}</Typography>
                <Typography variant="caption" sx={{ color: 'board.cardTextMuted' }}>
                  {component.unit}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: 'board.cardBorder' }}>
              <Typography variant="caption" sx={{ color: 'board.cardTextMuted', fontWeight: 700, letterSpacing: 0.5 }}>
                MADE OF
              </Typography>
              {breakdown.length === 0 ? (
                <Typography variant="body2" sx={{ color: 'board.cardTextMuted', mt: 0.5 }}>
                  No open orders using this component.
                </Typography>
              ) : (
                <Stack spacing={0.5} sx={{ mt: 0.75 }}>
                  {breakdown.map((b) => (
                    <Stack key={b.item} direction="row" sx={{ justifyContent: 'space-between', color: 'board.cardText' }}>
                      <Typography variant="body2" noWrap sx={{ minWidth: 0 }}>
                        {b.item}
                      </Typography>
                      <Tooltip title={`${b.menuQty} × ${b.perUnit} per`} arrow>
                        <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700, whiteSpace: 'nowrap', pl: 1 }}>
                          {b.menuQty}
                          {b.perUnit !== 1 ? ` ×${b.perUnit}` : ''} = {b.subtotal}
                        </Typography>
                      </Tooltip>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

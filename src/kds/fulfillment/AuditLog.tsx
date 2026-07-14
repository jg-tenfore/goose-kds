import { Box, Chip, Stack, Typography } from '@mui/material';
import type { AuditEvent, AuditEventKind } from './types';

/**
 * Demo audit-trail panel (TF-151 / TF-171 / TF-172 / TF-170).
 *
 * Every fulfillment action persists an event for reporting. The stories surface
 * this list so the acceptance criteria ("… is auditable / logged / recorded")
 * are visible rather than implied. Newest event first.
 */

const KIND_META: Record<AuditEventKind, { label: string; color: string }> = {
  item_completed: { label: 'item_completed', color: '#2E7D32' },
  ticket_completed: { label: 'ticket_completed', color: '#2E7D32' },
  item_uncompleted: { label: 'item_uncompleted', color: '#F2994A' },
  ticket_recalled: { label: 'ticket_recalled', color: '#9B51E0' },
  ticket_prioritized: { label: 'ticket_prioritized', color: '#2F80ED' },
  priority_cleared: { label: 'priority_cleared', color: '#6b7280' },
};

export function AuditLog({ events, title = 'Audit trail' }: { events: AuditEvent[]; title?: string }) {
  return (
    <Box
      sx={{
        width: 300,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 2,
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
        {title}
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          No events yet — take an action to log one.
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {events.map((e, i) => {
            const meta = KIND_META[e.kind];
            return (
              <Box key={i} sx={{ borderLeft: `3px solid ${meta.color}`, pl: 1.25 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                  <Chip
                    label={meta.label}
                    size="small"
                    sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: `${meta.color}22`, color: meta.color }}
                  />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {e.at}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.25 }}>
                  {e.target}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {e.actor}
                  {e.detail ? ` · ${e.detail}` : ''}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}

import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import { FulfillmentTicketCard } from '../../../kds/fulfillment/FulfillmentTicketCard';
import { AuditLog } from '../../../kds/fulfillment/AuditLog';
import { itemCount, nowLabel, withCompletedItems } from '../../../kds/fulfillment/helpers';
import type { AuditEvent } from '../../../kds/fulfillment/types';

/**
 * TF-151 · Complete item & complete ticket (one-touch).
 *
 * The most-used action on the board: bump a single line item or a whole ticket
 * with one fast, deliberate touch. Item taps flip the line to complete (dimmed +
 * check); the header/footer control bumps the whole ticket with a full-card
 * "Completing" overlay, then it leaves the active board. Every action logs an
 * `item_completed` / `ticket_completed` audit event.
 */
const meta = {
  title: 'KDS Screens/3 · Fulfillment Actions/Item / Ticket Completion',
  component: FulfillmentTicketCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FulfillmentTicketCard>;
export default meta;

const Frame = ({ children, mode = 'dark' as const }: { children: React.ReactNode; mode?: 'dark' | 'light' }) => (
  <ThemeProvider theme={createKdsTheme(mode)}>
    <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>{children}</Box>
  </ThemeProvider>
);

const byId = (id: string) => seedTickets.find((t) => t.id === id)!;

function ItemBumpDemo() {
  const base = byId('t-mobile-a47');
  const [completed, setCompleted] = useState<ReadonlySet<string>>(new Set());
  const [events, setEvents] = useState<AuditEvent[]>([]);

  const ticket = useMemo(() => withCompletedItems(base, completed), [base, completed]);
  const total = itemCount(base);

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      const wasDone = next.has(id);
      wasDone ? next.delete(id) : next.add(id);
      setEvents((ev) => [
        {
          kind: wasDone ? 'item_uncompleted' : 'item_completed',
          ticketId: base.id,
          itemId: id,
          target: `${base.label} · item ${id}`,
          actor: 'Grill station',
          at: nowLabel(),
        },
        ...ev,
      ]);
      return next;
    });
  };

  return (
    <Frame>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Box>
          <FulfillmentTicketCard ticket={ticket} onItemToggle={toggle} width={280} />
          <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: 'text.secondary', maxWidth: 280 }}>
            {completed.size}/{total} items done — tap a line to bump it, tap again to undo.
          </Typography>
        </Box>
        <AuditLog events={events} />
      </Box>
    </Frame>
  );
}

/**
 * Item-level bump — tap a line to mark it done on your station. The line dims
 * with a filled check; tap again to undo. Idempotent, so rapid taps never log a
 * duplicate `item_completed`. Expo readiness (TF-169) would update off these.
 */
export const ItemBump: StoryObj = { render: () => <ItemBumpDemo /> };

function TicketCompleteDemo() {
  const base = byId('t-shotgun');
  const [phase, setPhase] = useState<'open' | 'completing' | 'done'>('open');
  const [events, setEvents] = useState<AuditEvent[]>([]);

  const complete = () => {
    if (phase !== 'open') return; // guard against double-tap
    setPhase('completing');
    setEvents((ev) => [
      { kind: 'ticket_completed', ticketId: base.id, target: base.label, actor: 'Expo', at: nowLabel() },
      ...ev,
    ]);
    setTimeout(() => setPhase('done'), 700);
  };

  // Priority banner is noise here — show the plain active order being bumped.
  const openTicket = { ...base, state: 'active' as const, stateSince: undefined };

  return (
    <Frame>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Box sx={{ width: 280, minHeight: 260 }}>
          {phase === 'done' ? (
            <Box
              sx={{
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>Bumped — moved to Completed</Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: 'primary.main', cursor: 'pointer', fontWeight: 700 }}
                onClick={() => setPhase('open')}
              >
                Reset demo
              </Typography>
            </Box>
          ) : (
            <FulfillmentTicketCard
              ticket={openTicket}
              width={280}
              completing={phase === 'completing'}
              onCompleteTicket={complete}
            />
          )}
        </Box>
        <AuditLog events={events} />
      </Box>
    </Frame>
  );
}

/**
 * Ticket-level bump — one deliberate action from the header check or the footer
 * bar. Fires a full-card "Completing" overlay (~700 ms), logs `ticket_completed`,
 * then the card clears from the active board (no ghost card). Reset to try again.
 */
export const TicketComplete: StoryObj = { render: () => <TicketCompleteDemo /> };

/** Both completion surfaces at rest — the header check and the footer bar (light mode). */
export const ControlsLight: StoryObj = {
  render: () => (
    <Frame mode="light">
      <FulfillmentTicketCard ticket={{ ...byId('t-k12') }} width={280} onCompleteTicket={() => {}} />
    </Frame>
  ),
};

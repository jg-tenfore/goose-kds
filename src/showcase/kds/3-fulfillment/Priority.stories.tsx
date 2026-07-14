import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import { FulfillmentTicketCard } from '../../../kds/fulfillment/FulfillmentTicketCard';
import { AuditLog } from '../../../kds/fulfillment/AuditLog';
import { nowLabel } from '../../../kds/fulfillment/helpers';
import type { AuditEvent } from '../../../kds/fulfillment/types';
import type { Ticket } from '../../../kds/types';

/**
 * TF-170 · Prioritize ticket (from ticket & expo).
 *
 * A one-touch way to push a ticket up the queue. In flow mode the ticket moves
 * ahead of normal fired-time order and gets the persistent priority marker; a
 * "Prioritizing…" progress overlay (with Cancel) confirms the intent. Priority is
 * logged (`ticket_prioritized`) and clears on complete, manual clear, or expiry.
 * In fixed-grid mode the marker shows in place — the grid does not reflow.
 */
const meta = {
  title: 'KDS Screens/3 · Fulfillment Actions/Prioritize',
  component: FulfillmentTicketCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FulfillmentTicketCard>;
export default meta;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={createKdsTheme('dark')}>
    <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>{children}</Box>
  </ThemeProvider>
);

const byId = (id: string) => seedTickets.find((t) => t.id === id)!;
const QUEUE_IDS = ['t-mobile-a47', 't-k12', 't-turn-walsh', 't-t6'];

/**
 * Flow mode — prioritize any queued ticket and it jumps to the front with the
 * blue "Prioritized" banner. Tapping Prioritize shows the progress overlay; Cancel
 * aborts. "Clear priority" removes it and logs `priority_cleared`. Expiry (config,
 * e.g. 10 min) or completion clears it the same way.
 */
function PrioritizeDemo() {
    const [order, setOrder] = useState<Ticket[]>(QUEUE_IDS.map((id) => ({ ...byId(id), state: 'active', stateSince: undefined })));
    const [busyId, setBusyId] = useState<string | null>(null);
    const [events, setEvents] = useState<AuditEvent[]>([]);
    const timer = useRef<number | null>(null);
    useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

    const prioritize = (id: string) => {
      setBusyId(id);
      timer.current = window.setTimeout(() => {
        setBusyId(null);
        setOrder((prev) => {
          const target = prev.find((x) => x.id === id)!;
          const rest = prev.filter((x) => x.id !== id);
          return [{ ...target, state: 'priority', stateSince: '0m ago' }, ...rest];
        });
        setEvents((ev) => [
          { kind: 'ticket_prioritized', ticketId: id, target: byId(id).label, actor: 'Expo · Devon', at: nowLabel() },
          ...ev,
        ]);
      }, 800);
    };

    const cancel = () => {
      if (timer.current) window.clearTimeout(timer.current);
      setBusyId(null);
    };

    const clearPriority = (id: string) => {
      setOrder((prev) => prev.map((t) => (t.id === id ? { ...t, state: 'active', stateSince: undefined } : t)));
      setEvents((ev) => [
        { kind: 'priority_cleared', ticketId: id, target: byId(id).label, actor: 'Expo · Devon', at: nowLabel(), detail: 'manual' },
        ...ev,
      ]);
    };

    return (
      <Frame>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Queue order (front → back). Prioritizing jumps a ticket to the front.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'flex-start' }}>
              {order.map((t) => {
                const isPriority = t.state === 'priority';
                return (
                  <FulfillmentTicketCard
                    key={t.id}
                    ticket={t}
                    width={240}
                    prioritizing={busyId === t.id}
                    onCancelPrioritize={cancel}
                    footerSlot={
                      isPriority ? (
                        <Button
                          fullWidth
                          size="small"
                          startIcon={<CloseRoundedIcon />}
                          onClick={() => clearPriority(t.id)}
                          sx={{ fontWeight: 800, color: 'text.secondary' }}
                        >
                          Clear priority
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          size="small"
                          startIcon={<ArrowUpwardRoundedIcon />}
                          onClick={() => prioritize(t.id)}
                          disabled={busyId !== null}
                          sx={{ fontWeight: 800, color: 'status.priority' }}
                        >
                          Prioritize
                        </Button>
                      )
                    }
                  />
                );
              })}
            </Box>
          </Box>
          <AuditLog events={events} />
        </Box>
      </Frame>
    );
}

export const PrioritizeAndReorder: StoryObj = { render: () => <PrioritizeDemo /> };

/**
 * Fixed-grid mode — stable slots that don't shift for speed stations. Priority is
 * conveyed by the marker in place (slot 3 here), so the layout never reflows.
 */
export const FixedGridMarker: StoryObj = {
  render: () => {
    const tickets = QUEUE_IDS.map((id, i) =>
      i === 2
        ? { ...byId(id), state: 'priority' as const, stateSince: '1m ago' }
        : { ...byId(id), state: 'active' as const, stateSince: undefined },
    );
    return (
      <Frame>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Fixed grid — the prioritized ticket (slot 3) keeps its slot; only the marker changes.
          </Typography>
          <Box sx={{ mt: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 240px)', gap: 2, alignItems: 'start' }}>
            {tickets.map((t) => (
              <FulfillmentTicketCard key={t.id} ticket={t} width={240} />
            ))}
          </Box>
        </Box>
      </Frame>
    );
  },
};

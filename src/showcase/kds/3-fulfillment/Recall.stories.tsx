import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Stack, ThemeProvider, Typography } from '@mui/material';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { createKdsTheme } from '../../../kds/theme';
import { completedTickets } from '../../../kds/fixtures';
import { FulfillmentTicketCard } from '../../../kds/fulfillment/FulfillmentTicketCard';
import { RecallDialog } from '../../../kds/fulfillment/RecallDialog';
import { AuditLog } from '../../../kds/fulfillment/AuditLog';
import { nowLabel } from '../../../kds/fulfillment/helpers';
import { RECALL_SCOPE_LABELS, type AuditEvent, type RecallScope } from '../../../kds/fulfillment/types';
import type { Ticket } from '../../../kds/types';

/**
 * TF-172 · Recall / unfulfill with preserved audit + recall scope.
 *
 * Bring a completed ticket back to the active board — non-destructively, with the
 * original completion history preserved. A dialog captures scope (expo / prep /
 * all), and when a "Ready" status already went out, a downstream warning surfaces.
 * The recalled ticket reappears with the shared recalled marker for a short period.
 */
const meta = {
  title: 'KDS Screens/3 · Fulfillment Actions/Recall / Unfulfill',
  component: FulfillmentTicketCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FulfillmentTicketCard>;
export default meta;

const Frame = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={createKdsTheme('dark')}>
    <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>{children}</Box>
  </ThemeProvider>
);

/** Reset an item's completed flag when it recalls back to active. */
function toActive(ticket: Ticket): Ticket {
  return {
    ...ticket,
    courses: ticket.courses.map((c) => ({ ...c, items: c.items.map((i) => ({ ...i, state: 'pending' as const })) })),
  };
}

// One completed ticket already had a "Ready" handoff sent — recall must warn.
const READY_SENT = new Set(['d-t5']);

/**
 * Full recall flow: the Completed view lists recently-bumped tickets, each with a
 * "Recall ticket" action. Recalling opens the scope dialog; confirming moves the
 * ticket to the active board with the recalled marker and logs `ticket_recalled`
 * (actor, timestamp, scope). Recalling Table 5 warns that its Ready status is out.
 */
function RecallFromCompletedDemo() {
    const [completed, setCompleted] = useState<Ticket[]>(completedTickets);
    const [recalled, setRecalled] = useState<Ticket[]>([]);
    const [dialogFor, setDialogFor] = useState<Ticket | null>(null);
    const [events, setEvents] = useState<AuditEvent[]>([]);

    const confirm = (scope: RecallScope) => {
      const t = dialogFor!;
      setDialogFor(null);
      setCompleted((list) => list.filter((x) => x.id !== t.id));
      setRecalled((list) => [{ ...toActive(t), state: 'recalled', stateSince: '0m ago' }, ...list]);
      setEvents((ev) => [
        {
          kind: 'ticket_recalled',
          ticketId: t.id,
          target: t.label,
          actor: 'Expo · Devon',
          at: nowLabel(),
          detail: RECALL_SCOPE_LABELS[scope],
        },
        ...ev,
      ]);
    };

    return (
      <Frame>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Completed view */}
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800 }}>
              Completed
            </Typography>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {completed.length === 0 && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  All recalled.
                </Typography>
              )}
              {completed.map((t) => (
                <FulfillmentTicketCard
                  key={t.id}
                  ticket={t}
                  width={260}
                  dim
                  footerSlot={
                    <Button
                      fullWidth
                      size="small"
                      startIcon={<ReplayRoundedIcon />}
                      onClick={() => setDialogFor(t)}
                      sx={{ fontWeight: 800, color: 'status.recalled' }}
                    >
                      Recall ticket
                    </Button>
                  }
                />
              ))}
            </Stack>
          </Box>

          {/* Active board — recalled tickets land here */}
          <Box>
            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 800 }}>
              Active board
            </Typography>
            <Stack spacing={2} sx={{ mt: 1, minWidth: 260 }}>
              {recalled.length === 0 ? (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Recalled tickets appear here.
                </Typography>
              ) : (
                recalled.map((t) => <FulfillmentTicketCard key={t.id} ticket={t} width={260} />)
              )}
            </Stack>
          </Box>

          <AuditLog events={events} />
        </Box>

        <RecallDialog
          open={dialogFor !== null}
          ticketLabel={dialogFor?.label ?? ''}
          recallAfterReady={dialogFor ? READY_SENT.has(dialogFor.id) : false}
          onCancel={() => setDialogFor(null)}
          onConfirm={confirm}
        />
      </Frame>
    );
}

export const RecallFromCompleted: StoryObj = { render: () => <RecallFromCompletedDemo /> };

/** The recall dialog on its own — scope options + the recall-after-ready warning. */
export const ScopeDialog: StoryObj = {
  render: () => (
    <Frame>
      <Box sx={{ width: 360, height: 200 }}>
        <RecallDialog
          open
          ticketLabel="Table 5 · Nguyen"
          recallAfterReady
          onCancel={() => {}}
          onConfirm={() => {}}
        />
      </Box>
    </Frame>
  ),
};

/** The resulting recalled treatment (shared marker) once a ticket is back on the board. */
export const RecalledTreatment: StoryObj = {
  render: () => (
    <Frame>
      <FulfillmentTicketCard
        ticket={{ ...toActive(completedTickets[0]), state: 'recalled', stateSince: '0m ago' }}
        width={280}
      />
    </Frame>
  ),
};

import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, LinearProgress, Snackbar, ThemeProvider, Typography } from '@mui/material';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import { FulfillmentTicketCard } from '../../../kds/fulfillment/FulfillmentTicketCard';
import { AuditLog } from '../../../kds/fulfillment/AuditLog';
import { nowLabel } from '../../../kds/fulfillment/helpers';
import type { AuditEvent } from '../../../kds/fulfillment/types';

/**
 * TF-171 · Undo window after completion.
 *
 * The instant-recovery affordance right after a bump — the first line of defense
 * before an accidental completion becomes a recall. A short, clearly-visible undo
 * window opens (toast + inline card chip). Undo in-window returns the ticket to
 * active with no residual completion and logs `item_uncompleted`. When the window
 * expires, undo is withdrawn and recovery routes to Recall.
 */
const meta = {
  title: 'KDS Screens/3 · Fulfillment Actions/Undo Window',
  component: FulfillmentTicketCard,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FulfillmentTicketCard>;
export default meta;

const byId = (id: string) => seedTickets.find((t) => t.id === id)!;

type Phase = 'open' | 'undoable' | 'expired';

function UndoDemo({ windowMs }: { windowMs: number }) {
  const base = byId('t-mobile-a47');
  const [phase, setPhase] = useState<Phase>('open');
  const [remaining, setRemaining] = useState(windowMs);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearInterval(t));
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const bump = () => {
    if (phase !== 'open') return;
    setEvents((ev) => [
      { kind: 'ticket_completed', ticketId: base.id, target: base.label, actor: 'Turn Window', at: nowLabel() },
      ...ev,
    ]);
    setPhase('undoable');
    setRemaining(windowMs);
    const started = Date.now();
    const iv = window.setInterval(() => {
      const left = Math.max(0, windowMs - (Date.now() - started));
      setRemaining(left);
      if (left <= 0) {
        clearTimers();
        setPhase('expired');
      }
    }, 50);
    timers.current.push(iv);
  };

  const undo = () => {
    clearTimers();
    setPhase('open');
    setEvents((ev) => [
      { kind: 'item_uncompleted', ticketId: base.id, target: base.label, actor: 'Turn Window', at: nowLabel(), detail: 'undo in-window' },
      ...ev,
    ]);
  };

  const reset = () => {
    clearTimers();
    setPhase('open');
  };

  const completedTicket = { ...base, state: 'completed' as const, stateSince: 'just now' };
  const pct = (remaining / windowMs) * 100;

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
      <Box sx={{ width: 280 }}>
        {phase === 'open' ? (
          <FulfillmentTicketCard ticket={{ ...base, state: 'active' }} width={280} onCompleteTicket={bump} />
        ) : (
          <FulfillmentTicketCard
            ticket={completedTicket}
            width={280}
            dim={phase === 'expired'}
            footerSlot={
              phase === 'undoable' ? (
                <Button
                  fullWidth
                  size="small"
                  startIcon={<UndoRoundedIcon />}
                  onClick={undo}
                  sx={{ fontWeight: 800, color: 'status.priority' }}
                >
                  Undo bump · {Math.ceil(remaining / 1000)}s
                </Button>
              ) : (
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  Undo window closed — recover via Recall from Completed.
                </Typography>
              )
            }
          />
        )}
        <Typography
          variant="body2"
          sx={{ mt: 1.5, color: 'primary.main', cursor: 'pointer', fontWeight: 700 }}
          onClick={reset}
        >
          Reset demo
        </Typography>
      </Box>

      <AuditLog events={events} />

      {/* Undo toast — visible for the duration of the window, with a countdown bar. */}
      <Snackbar
        open={phase === 'undoable'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={null}
      >
        <Box sx={{ bgcolor: 'grey.900', color: '#fff', borderRadius: 2, overflow: 'hidden', minWidth: 320, boxShadow: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1.25 }}>
            <Typography sx={{ flex: 1, fontWeight: 700, color: '#fff' }}>
              {base.label} bumped
            </Typography>
            <Button onClick={undo} startIcon={<UndoRoundedIcon />} sx={{ color: '#8ab4ff', fontWeight: 800 }}>
              Undo
            </Button>
          </Box>
          <LinearProgress
            variant="determinate"
            value={pct}
            sx={{
              height: 4,
              bgcolor: 'rgba(255,255,255,0.15)',
              '& .MuiLinearProgress-bar': { bgcolor: '#8ab4ff', transition: 'transform 60ms linear' },
            }}
          />
        </Box>
      </Snackbar>
    </Box>
  );
}

const Frame = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={createKdsTheme('dark')}>
    <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>{children}</Box>
  </ThemeProvider>
);

/** Bump the ticket → a 5s undo window opens (toast + inline chip). Undo, or let it expire. */
export const BumpAndUndo: StoryObj = {
  render: () => (
    <Frame>
      <UndoDemo windowMs={5000} />
    </Frame>
  ),
};

/** The window is configurable in settings — here a tight 3s window for a fast station. */
export const ShortWindow: StoryObj = {
  render: () => (
    <Frame>
      <UndoDemo windowMs={3000} />
    </Frame>
  ),
};

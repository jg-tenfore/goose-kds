import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Alert, Box, Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Native MUI `Snackbar` — a brief, non-blocking message that appears at the
 * edge of the screen and auto-dismisses. In the KDS it confirms transient
 * actions such as "Ticket bumped" without interrupting the cook's flow.
 */
function SnackbarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Bump ticket
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message="Ticket #142 bumped"
        action={
          <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

/**
 * Snackbar with an **Undo** action — mirrors the KDS bump-undo, giving the cook
 * a few seconds to restore a ticket bumped by mistake.
 */
function SnackbarUndoDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Bump ticket
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message="Ticket #142 bumped"
        action={
          <>
            <Button color="secondary" size="small" onClick={() => setOpen(false)}>
              Undo
            </Button>
            <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </Box>
  );
}

/**
 * Severity variants — a styled `Alert` inside the `Snackbar` colour-codes
 * success, error, warning, and info feedback.
 */
function SnackbarSeverityDemo() {
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info' | null>(null);
  const messages = {
    success: 'Order sent to the kitchen',
    error: 'Failed to reach the POS',
    warning: 'Ticket #142 is running late',
    info: '3 tickets waiting on the grill',
  } as const;
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button color="success" variant="outlined" onClick={() => setSeverity('success')}>
          Success
        </Button>
        <Button color="error" variant="outlined" onClick={() => setSeverity('error')}>
          Error
        </Button>
        <Button color="warning" variant="outlined" onClick={() => setSeverity('warning')}>
          Warning
        </Button>
        <Button color="info" variant="outlined" onClick={() => setSeverity('info')}>
          Info
        </Button>
      </Box>
      <Snackbar open={severity !== null} autoHideDuration={4000} onClose={() => setSeverity(null)}>
        {severity ? (
          <Alert severity={severity} variant="filled" onClose={() => setSeverity(null)} sx={{ width: '100%' }}>
            {messages[severity]}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}

/**
 * Anchored to the top-centre — useful for board-wide alerts the whole line
 * should notice, rather than the default bottom-left toast.
 */
function SnackbarAnchorDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Broadcast alert
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="info" variant="filled" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          Kitchen closing in 15 minutes
        </Alert>
      </Snackbar>
    </Box>
  );
}

const meta = {
  title: 'Components/Feedback & Status/Snackbar',
  component: SnackbarDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Snackbar` — a brief, non-blocking message shown at the edge of the screen that auto-dismisses after `autoHideDuration`. ' +
          'In the golf-diner KDS it confirms transient actions such as "Ticket bumped" without interrupting the cook, and can carry an **Undo** action, a colour-coded `Alert`, or a custom `anchorOrigin`. ' +
          'For blocking, in-progress feedback use **Backdrop** instead.',
      },
    },
  },
} satisfies Meta<typeof SnackbarDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive — press **Bump ticket** to show a toast that auto-hides after 4 seconds. */
export const Playground: Story = {
  render: () => <SnackbarDemo />,
};

/** A bump confirmation with an **Undo** action, mirroring the KDS bump-undo pattern. */
export const WithUndoAction: Story = {
  parameters: {
    docs: { description: { story: 'Snackbar with an Undo action button and a close icon.' } },
  },
  render: () => <SnackbarUndoDemo />,
};

/** Colour-coded feedback using an `Alert` inside the `Snackbar`. */
export const SeverityVariants: Story = {
  parameters: {
    docs: { description: { story: 'Success, error, warning, and info severities via a filled Alert.' } },
  },
  render: () => <SnackbarSeverityDemo />,
};

/** Positioned at the top-centre for board-wide broadcasts. */
export const AnchorOrigin: Story = {
  parameters: {
    docs: { description: { story: 'A custom anchorOrigin (top-centre) for alerts the whole line should see.' } },
  },
  render: () => <SnackbarAnchorDemo />,
};

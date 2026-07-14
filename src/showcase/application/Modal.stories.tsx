import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

const meta = {
  title: 'Components/Feedback & Status/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `Dialog` — a modal overlay that interrupts the workflow to confirm an action, surface a decision, or collect a short piece of input. ' +
          'Compose it from `DialogTitle`, `DialogContent` (optionally with `DialogContentText`), and `DialogActions`. ' +
          'Use it for destructive confirmations (recall, void, clear) and quick forms; for passive, non-blocking messages prefer a **Snackbar** or **Alert** instead.',
      },
    },
  },
  args: { open: false },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A button that opens a basic Dialog with a title, body, and action buttons. */
function PlaygroundDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Recall ticket
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Recall ticket #42?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This returns the ticket to the active board with a recalled marker. Original completion
            history is preserved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Recall
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

/** A destructive confirmation with a warning body and an emphasized error action. */
function AlertDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        Clear all tickets
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="clear-title">
        <DialogTitle id="clear-title">Clear all tickets?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All active tickets on this station will be removed from the board. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => setOpen(false)}>
            Clear all
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const AlertDialog: Story = {
  render: () => <AlertDialogDemo />,
  parameters: {
    docs: { description: { story: 'A confirm/alert dialog for a destructive action.' } },
  },
};

/** A Dialog that collects input via a TextField before confirming. */
function FormDialogDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Rename station
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Rename station</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter a new display name for this KDS station.
          </DialogContentText>
          <Stack spacing={2}>
            <TextField
              autoFocus
              fullWidth
              label="Station name"
              placeholder="Expo 1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const FormDialog: Story = {
  render: () => <FormDialogDemo />,
  parameters: {
    docs: { description: { story: 'A Dialog containing a form field for quick edits.' } },
  },
};

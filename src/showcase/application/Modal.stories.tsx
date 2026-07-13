import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function ModalDemo() {
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

const meta = {
  title: 'Components/Actions/Modal',
  component: ModalDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ModalDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Modal: Story = {};

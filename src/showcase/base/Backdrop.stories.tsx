import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material';

/**
 * Native MUI `Backdrop` — a full-screen dimming layer that signals the app is
 * busy and blocks interaction while a task runs. In the KDS it fronts a
 * `CircularProgress` spinner while tickets sync from the POS or an order batch
 * is bumped. Click the dimmed area to dismiss.
 */
function BackdropDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Sync tickets
      </Button>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}

/**
 * Backdrop with a labelled message beneath the spinner — clearer for longer
 * operations such as reconnecting to the kitchen network.
 */
function BackdropMessageDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Reconnect
      </Button>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography variant="body1">Syncing…</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}

const meta = {
  title: 'Components/Feedback & Status/Backdrop',
  component: BackdropDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Backdrop` — a full-screen dimming layer that communicates a blocking, in-progress task and prevents interaction until it finishes. ' +
          'In the golf-diner KDS it fronts a `CircularProgress` spinner while tickets sync from the POS or an order batch is bumped. ' +
          'Press the button to open it, then click the dimmed area to dismiss. For non-blocking, transient feedback use **Snackbar** instead.',
      },
    },
  },
} satisfies Meta<typeof BackdropDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive — click **Sync tickets** to raise the backdrop, then click anywhere to close it. */
export const Playground: Story = {
  render: () => <BackdropDemo />,
};

/** A spinner paired with a **Syncing…** label for longer-running operations. */
export const WithMessage: Story = {
  parameters: {
    docs: { description: { story: 'Backdrop with a custom message under the spinner for longer tasks.' } },
  },
  render: () => <BackdropMessageDemo />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertTitle, Stack } from '@mui/material';

const meta = {
  title: 'Application Components/Alerts',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 420 }}>
      <Alert severity="success">Order sent to the kitchen.</Alert>
      <Alert severity="info">3 tickets in the incoming preview.</Alert>
      <Alert severity="warning">Ticket approaching late threshold.</Alert>
      <Alert severity="error" variant="filled">
        <AlertTitle>Offline</AlertTitle>
        Network lost — actions will queue and replay on reconnect.
      </Alert>
    </Stack>
  ),
};

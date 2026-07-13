import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Typography } from '@mui/material';
import Inbox from '@mui/icons-material/Inbox';

const meta = {
  title: 'Components/Feedback & Status/Empty State',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  render: () => (
    <Box sx={{ textAlign: 'center', maxWidth: 340, p: 4 }}>
      <Inbox sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h6" sx={{ mt: 1 }}>
        No active tickets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        New orders will appear here as they fire from the POS, kiosk, or mobile.
      </Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>
        View completed
      </Button>
    </Box>
  ),
};

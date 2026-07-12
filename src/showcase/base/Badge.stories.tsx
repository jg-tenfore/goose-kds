import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Stack } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import Restaurant from '@mui/icons-material/Restaurant';

const meta = {
  title: 'Base Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Badge_: Story = {
  name: 'Badge',
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
      <Badge badgeContent={4} color="primary">
        <Notifications />
      </Badge>
      <Badge badgeContent={12} color="error">
        <Restaurant />
      </Badge>
      <Badge variant="dot" color="success">
        <Notifications />
      </Badge>
    </Stack>
  ),
};

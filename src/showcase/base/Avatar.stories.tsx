import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import Person from '@mui/icons-material/Person';

const meta = {
  title: 'Components/Media & Visuals/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Avatar>JG</Avatar>
      <Avatar sx={{ bgcolor: 'primary.main' }}>IK</Avatar>
      <Avatar variant="rounded">GK</Avatar>
      <Avatar>
        <Person />
      </Avatar>
    </Stack>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar>JG</Avatar>
      <Avatar>IK</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>CD</Avatar>
      <Avatar>EF</Avatar>
    </AvatarGroup>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, Stack } from '@mui/material';

const meta = {
  title: 'Base Components/Badge Group',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const BadgeGroup: Story = {
  render: () => (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
      <Chip label="POS" size="small" />
      <Chip label="Dine-in" size="small" color="primary" />
      <Chip label="Priority" size="small" color="info" />
      <Chip label="Late" size="small" color="error" />
      <Chip label="Allergy" size="small" color="warning" />
    </Stack>
  ),
};

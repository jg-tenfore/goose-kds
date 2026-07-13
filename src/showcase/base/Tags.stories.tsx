import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip, Stack } from '@mui/material';
import Done from '@mui/icons-material/Done';

const meta = {
  title: 'Components/Typography & Content/Tags',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tags: Story = {
  render: () => (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
      <Chip label="Filled" />
      <Chip label="Outlined" variant="outlined" />
      <Chip label="Primary" color="primary" />
      <Chip label="Deletable" onDelete={() => {}} />
      <Chip label="With icon" icon={<Done />} color="success" />
      <Chip label="Clickable" onClick={() => {}} variant="outlined" />
    </Stack>
  ),
};

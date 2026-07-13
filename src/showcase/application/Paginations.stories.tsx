import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, Stack } from '@mui/material';

const meta = {
  title: 'Components/Navigation/Paginations',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Paginations: Story = {
  render: () => (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" shape="rounded" />
      <Pagination count={10} variant="outlined" />
    </Stack>
  ),
};

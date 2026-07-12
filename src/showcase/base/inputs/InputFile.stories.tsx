import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@mui/material';

const meta = {
  title: 'Base Components/Inputs/Input File',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputFile: Story = {
  render: () => (
    <TextField
      type="file"
      label="Attach file"
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ minWidth: 280 }}
    />
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@mui/material';

const meta = {
  title: 'Base Components/Inputs/Input Number',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputNumber: Story = {
  render: () => (
    <TextField
      type="number"
      label="Quantity"
      defaultValue={1}
      slotProps={{ htmlInput: { min: 0, max: 99, step: 1 } }}
    />
  ),
};

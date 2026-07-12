import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@mui/material';

const meta = {
  title: 'Base Components/Textarea',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Notes', multiline: true, minRows: 3, placeholder: 'Order notes…' },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Textarea: Story = { render: (args) => <TextField {...args} sx={{ width: 360 }} /> };

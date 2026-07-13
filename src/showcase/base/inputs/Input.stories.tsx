import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, TextField } from '@mui/material';

const meta = {
  title: 'Components/Forms/Input',
  component: TextField,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder', variant: 'outlined' },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField {...args} variant="outlined" label="Outlined" />
      <TextField {...args} variant="filled" label="Filled" />
      <TextField {...args} variant="standard" label="Standard" />
    </Box>
  ),
};

export const States: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField {...args} label="With helper" helperText="Helper text" />
      <TextField {...args} label="Error" error helperText="Something's wrong" />
      <TextField {...args} label="Disabled" disabled />
      <TextField {...args} label="Required" required />
    </Box>
  ),
};

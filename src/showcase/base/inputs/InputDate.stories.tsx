import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, TextField } from '@mui/material';

// Native date/time fields (core MUI). Swap for MUI X Date Pickers later for calendars.
const meta = {
  title: 'Components/Forms/Input Date',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputDate: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField type="date" label="Date" slotProps={{ inputLabel: { shrink: true } }} />
      <TextField type="time" label="Time" slotProps={{ inputLabel: { shrink: true } }} />
      <TextField
        type="datetime-local"
        label="Date & time"
        slotProps={{ inputLabel: { shrink: true } }}
      />
    </Box>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, TextField, Typography } from '@mui/material';

// Placeholder using native date/time fields. Add @mui/x-date-pickers for a full calendar.
const meta = {
  title: 'Application Components/Date Picker',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DatePicker: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 280 }}>
      <Typography variant="caption" color="text.secondary">
        Native fields (core MUI). Swap for MUI X Date Pickers for a calendar UI.
      </Typography>
      <TextField type="date" label="Service date" slotProps={{ inputLabel: { shrink: true } }} />
      <TextField type="time" label="Promised time" slotProps={{ inputLabel: { shrink: true } }} />
    </Box>
  ),
};

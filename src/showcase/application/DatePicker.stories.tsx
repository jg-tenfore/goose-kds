import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

// Real MUI X pickers. LocalizationProvider (AdapterDayjs) is provided globally
// in .storybook/preview.tsx, so these work out of the box.
const meta = {
  title: 'Application Components/Date Picker',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Pickers: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 280 }}>
      <DatePicker label="Service date" defaultValue={dayjs()} />
      <TimePicker label="Promised time" />
      <DateTimePicker label="Fired at" />
    </Box>
  ),
};

export const Calendar: Story = {
  render: () => <DateCalendar defaultValue={dayjs()} />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const meta = {
  title: 'Components/Forms/Form',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: () => (
    <Box component="form" sx={{ width: 360, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Device setup</Typography>
      <TextField label="Device name" defaultValue="Grill 1" />
      <TextField label="Station" select defaultValue="grill">
        {['grill', 'fry', 'cold', 'beverage', 'expo'].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
      <TextField label="Location" placeholder="Clubhouse kitchen" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Play new-ticket sound" />
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button variant="text">Cancel</Button>
        <Button variant="contained">Save</Button>
      </Stack>
    </Box>
  ),
};

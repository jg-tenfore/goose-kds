import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import Info from '@mui/icons-material/Info';

const meta = {
  title: 'Base Components/Tooltip',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tooltip_: Story = {
  name: 'Tooltip',
  render: () => (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      <Tooltip title="Top tooltip" placement="top">
        <Button variant="outlined">Hover me</Button>
      </Tooltip>
      <Tooltip title="Ticket has been in the queue 4m 30s" arrow>
        <IconButton>
          <Info />
        </IconButton>
      </Tooltip>
    </Stack>
  ),
};

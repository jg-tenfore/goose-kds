import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';

const meta = {
  title: 'Base Components/Progress Indicators',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressIndicators: Story = {
  render: () => (
    <Stack spacing={4} sx={{ width: 320 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <CircularProgress />
        <CircularProgress variant="determinate" value={65} />
        <CircularProgress color="success" variant="determinate" value={100} />
      </Stack>
      <Box>
        <Typography variant="caption">Indeterminate</Typography>
        <LinearProgress />
      </Box>
      <Box>
        <Typography variant="caption">Determinate (65%)</Typography>
        <LinearProgress variant="determinate" value={65} />
      </Box>
    </Stack>
  ),
};

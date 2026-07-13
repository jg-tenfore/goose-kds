import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Card, CardContent, CircularProgress, Skeleton, Stack } from '@mui/material';

const meta = {
  title: 'Components/Feedback & Status/Loading Indicator',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingIndicator: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, height: 160 }}>
        <CircularProgress />
      </Box>
      <Card sx={{ width: 260 }}>
        <CardContent>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" height={72} sx={{ mt: 2, borderRadius: 1 }} />
          <Skeleton sx={{ mt: 1 }} />
          <Skeleton width="80%" />
        </CardContent>
      </Card>
    </Stack>
  ),
};

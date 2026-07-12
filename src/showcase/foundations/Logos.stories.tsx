import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';

const meta = {
  title: 'Foundations/Logos',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Logos: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Placeholder logo slots — drop TenFore / KDS brand marks here (SVG) when finalized.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {['Primary', 'Wordmark', 'Icon / App', 'Monochrome'].map((label) => (
          <Paper
            key={label}
            variant="outlined"
            sx={{
              width: 220,
              height: 110,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h5">🪿</Typography>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  ),
};

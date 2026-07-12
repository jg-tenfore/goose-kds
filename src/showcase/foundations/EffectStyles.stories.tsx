import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';

// MUI ships 25 elevation levels (theme.shadows[0..24]).
const LEVELS = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24];

const meta = {
  title: 'Foundations/Effect Styles',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const EffectStyles: Story = {
  name: 'Effect Styles',
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, p: 4 }}>
      {LEVELS.map((e) => (
        <Box key={e} sx={{ textAlign: 'center' }}>
          <Paper elevation={e} sx={{ width: 120, height: 80 }} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            elevation {e}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

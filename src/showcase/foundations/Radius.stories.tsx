import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';

const RADII: [string, number | string][] = [
  ['0', 0],
  ['sm', 4],
  ['base (theme.shape)', 10],
  ['md', 12],
  ['lg', 16],
  ['xl', 24],
  ['pill', 999],
];

const meta = {
  title: 'Foundations/Radius',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Radius_: Story = {
  name: 'Radius',
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, p: 3 }}>
      {RADII.map(([name, r]) => (
        <Box key={name} sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 96,
              height: 96,
              bgcolor: 'primary.main',
              borderRadius: `${r}px`.replace('999px', '999px'),
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

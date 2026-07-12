import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';

const VARIANTS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'button',
  'caption',
  'overline',
] as const;

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Typography_: Story = {
  name: 'Typography',
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 3 }}>
      {VARIANTS.map((v) => (
        <Box key={v} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ width: 88, flexShrink: 0 }}>
            {v}
          </Typography>
          <Typography variant={v}>The quick brown fox — 1234567890</Typography>
        </Box>
      ))}
    </Box>
  ),
};

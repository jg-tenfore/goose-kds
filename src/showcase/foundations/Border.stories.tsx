import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';

const BORDERS: [string, object][] = [
  ['1px solid divider', { border: 1, borderColor: 'divider' }],
  ['2px solid primary', { border: 2, borderColor: 'primary.main' }],
  ['dashed', { border: '2px dashed', borderColor: 'text.secondary' }],
  ['left accent', { borderLeft: 4, borderColor: 'error.main' }],
  ['bottom rule', { borderBottom: 1, borderColor: 'divider' }],
];

const meta = {
  title: 'Foundations/Border',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Border_: Story = {
  name: 'Border',
  render: () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, p: 3 }}>
      {BORDERS.map(([label, sx]) => (
        <Box key={label} sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 140, height: 88, borderRadius: 1, ...sx }} />
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  ),
};

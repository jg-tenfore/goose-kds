import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/**
 * Foundations → Palette. A live read-out of the theme's brand colors and the
 * custom KDS ticket-urgency tokens. Edit `src/theme/theme.ts` and these update.
 */
function Swatch({ name, color }: { name: string; color: string }) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden', width: 160 }}>
      <Box sx={{ height: 72, bgcolor: color }} />
      <Box sx={{ p: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {color}
        </Typography>
      </Box>
    </Paper>
  );
}

function PaletteView() {
  const theme = useTheme();
  const brand: [string, string][] = [
    ['primary', theme.palette.primary.main],
    ['secondary', theme.palette.secondary.main],
    ['error', theme.palette.error.main],
    ['warning', theme.palette.warning.main],
    ['info', theme.palette.info.main],
    ['success', theme.palette.success.main],
  ];
  const status = Object.entries(theme.palette.status);

  return (
    <Stack spacing={4} sx={{ p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Brand
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }} useFlexGap>
          {brand.map(([name, color]) => (
            <Swatch key={name} name={name} color={color} />
          ))}
        </Stack>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          KDS ticket-urgency (custom tokens)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }} useFlexGap>
          {status.map(([name, color]) => (
            <Swatch key={name} name={`status.${name}`} color={color as string} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

const meta = {
  title: 'Foundations/Palette',
  component: PaletteView,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PaletteView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Spacing() {
  const t = useTheme();
  const steps = [0.5, 1, 2, 3, 4, 6, 8, 10, 12];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 3 }}>
      <Typography variant="body2" color="text.secondary">
        Base unit: theme.spacing(1) = {t.spacing(1)}
      </Typography>
      {steps.map((s) => (
        <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ width: 96, flexShrink: 0 }}>
            spacing({s}) · {t.spacing(s)}
          </Typography>
          <Box sx={{ height: 16, width: t.spacing(s), bgcolor: 'primary.main', borderRadius: 0.5 }} />
        </Box>
      ))}
    </Box>
  );
}

const meta = {
  title: 'Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Spacing_: Story = { name: 'Spacing', render: () => <Spacing /> };

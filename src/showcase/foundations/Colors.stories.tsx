import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function Swatch({ name, color }: { name: string; color: string }) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden', width: 150 }}>
      <Box sx={{ height: 64, bgcolor: color }} />
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

function Row({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {items.map(([n, c]) => (
          <Swatch key={n} name={n} color={c} />
        ))}
      </Box>
    </Box>
  );
}

function Colors() {
  const t = useTheme();
  const brand = (['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).flatMap(
    (k) =>
      [
        [`${k}.main`, t.palette[k].main],
        [`${k}.light`, t.palette[k].light],
        [`${k}.dark`, t.palette[k].dark],
      ] as [string, string][],
  );
  const status = Object.entries(t.palette.status).map(
    ([k, v]) => [`status.${k}`, v as string] as [string, string],
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 3 }}>
      <Row title="Brand" items={brand} />
      <Row title="KDS ticket-urgency (custom tokens)" items={status} />
    </Box>
  );
}

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Colors_: Story = { name: 'Colors', render: () => <Colors /> };

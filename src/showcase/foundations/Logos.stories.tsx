import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';
import tfLogo from '../../assets/images/tf-logo.svg';
import tfLogoWhite from '../../assets/images/tf-logo-white.svg';
import tfLogoBlack from '../../assets/images/tf-logo-black.svg';
import tfSquareColor from '../../assets/images/square/tf-square-color.svg';
import tfSquareWhite from '../../assets/images/square/tf-square-white.svg';
import tfSquareBlack from '../../assets/images/square/tf-square-black.svg';

type LogoSpec = { label: string; src: string; bg: string; onDark?: boolean };

const wordmarks: LogoSpec[] = [
  { label: 'Primary', src: tfLogo, bg: '#ffffff' },
  { label: 'Black', src: tfLogoBlack, bg: '#ffffff' },
  { label: 'White (reversed)', src: tfLogoWhite, bg: '#101112', onDark: true },
];

const marks: LogoSpec[] = [
  { label: 'Color', src: tfSquareColor, bg: '#ffffff' },
  { label: 'Black', src: tfSquareBlack, bg: '#ffffff' },
  { label: 'White (reversed)', src: tfSquareWhite, bg: '#101112', onDark: true },
];

function LogoCard({ spec, size }: { spec: LogoSpec; size: 'wordmark' | 'mark' }) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden', width: size === 'mark' ? 168 : 260 }}>
      <Box
        sx={{
          height: size === 'mark' ? 140 : 120,
          bgcolor: spec.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          component="img"
          src={spec.src}
          alt={`TenFore logo — ${spec.label}`}
          sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
      </Box>
      <Box sx={{ px: 1.5, py: 1, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {spec.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {spec.onDark ? 'Use on dark backgrounds' : 'Use on light backgrounds'}
        </Typography>
      </Box>
    </Paper>
  );
}

function Section({ title, hint, specs, size }: { title: string; hint: string; specs: LogoSpec[]; size: 'wordmark' | 'mark' }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {hint}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {specs.map((s) => (
          <LogoCard key={s.label} spec={s} size={size} />
        ))}
      </Box>
    </Box>
  );
}

function LogosGallery() {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Section title="Wordmark" hint="The full TenFore logo — primary usage for headers, auth, and marketing." specs={wordmarks} size="wordmark" />
      <Section title="App icon / mark" hint="The TenFore square mark — for app icons, avatars, and tight spaces." specs={marks} size="mark" />
    </Box>
  );
}

const meta = {
  title: 'Foundations/Logos',
  component: LogosGallery,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The TenFore brand logos — wordmark and app-icon marks, in color / black / reversed-white variants. Use the reversed (white) versions on dark backgrounds (e.g. the KDS board chrome).',
      },
    },
  },
} satisfies Meta<typeof LogosGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Logos: Story = {};

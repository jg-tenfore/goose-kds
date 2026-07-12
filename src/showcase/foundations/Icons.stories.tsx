import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';
import Restaurant from '@mui/icons-material/Restaurant';
import LocalBar from '@mui/icons-material/LocalBar';
import Timer from '@mui/icons-material/Timer';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import Undo from '@mui/icons-material/Undo';
import Print from '@mui/icons-material/Print';
import Settings from '@mui/icons-material/Settings';
import Lock from '@mui/icons-material/Lock';
import Notifications from '@mui/icons-material/Notifications';
import WifiOff from '@mui/icons-material/WifiOff';

const ICONS = [
  ['Restaurant', Restaurant],
  ['LocalBar', LocalBar],
  ['Timer', Timer],
  ['CheckCircle', CheckCircle],
  ['Warning', Warning],
  ['PriorityHigh', PriorityHigh],
  ['Undo', Undo],
  ['Print', Print],
  ['Settings', Settings],
  ['Lock', Lock],
  ['Notifications', Notifications],
  ['WifiOff', WifiOff],
] as const;

const meta = {
  title: 'Foundations/Icons',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Sample from <code>@mui/icons-material</code> (~2,100 icons available in filled, outlined,
        rounded, two-tone, and sharp variants).
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {ICONS.map(([name, Icon]) => (
          <Box key={name} sx={{ width: 96, textAlign: 'center' }}>
            <Icon fontSize="large" />
            <Typography variant="caption" noWrap sx={{ display: 'block' }}>
              {name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};

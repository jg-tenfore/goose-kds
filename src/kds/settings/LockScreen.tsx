import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PinPad, type PinPadProps } from './PinPad';

export interface LockScreenProps extends PinPadProps {
  /** Header line, e.g. device name. */
  deviceName?: string;
  /** Subtext under the clock. */
  subtitle?: string;
}

/**
 * Full-screen locked state for the shared KDS device (TF-150): a dimmed board
 * backdrop with the PIN pad centered. Used as the sign-in gate and the
 * protected-action gate.
 */
export function LockScreen({
  deviceName = 'The Turn — Grill 1',
  subtitle = 'Screen locked · enter PIN to continue',
  ...pinProps
}: LockScreenProps) {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'board.canvas',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: 3,
        // faint tee-time backdrop wash
        backgroundImage:
          palette.mode === 'dark'
            ? 'radial-gradient(circle at 50% 20%, rgba(46,125,50,0.10), transparent 60%)'
            : 'radial-gradient(circle at 50% 20%, rgba(46,125,50,0.08), transparent 60%)',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {deviceName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <PinPad {...pinProps} />
    </Box>
  );
}

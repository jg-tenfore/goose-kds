import { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import type { PinState } from './types';

const PIN_LENGTH = 4;
const MAX_ATTEMPTS = 3;

export interface PinPadProps {
  /** The PIN that unlocks. Never logged; compared locally only. Default "2468". */
  correctPin?: string;
  /** Title above the dots, e.g. "Enter PIN to unlock" or "Manager PIN required". */
  prompt?: string;
  /** Force a specific visual state for showcase stories (skips interaction). */
  forcedState?: PinState;
  /** Called when the correct PIN is entered. */
  onSuccess?: () => void;
}

/**
 * Interactive numeric PIN pad for the shared kitchen device (TF-150).
 *
 * Drives the locked → entering → invalid → success lifecycle locally, with
 * attempt backoff → lockout, a reset/help path, and no PIN logging. Touch-first
 * sizing (large keys) for gloved use. Pass `forcedState` to pin a state for
 * showcase without typing.
 */
export function PinPad({
  correctPin = '2468',
  prompt = 'Enter PIN to unlock',
  forcedState,
  onSuccess,
}: PinPadProps) {
  const { palette } = useTheme();
  const [entry, setEntry] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [state, setState] = useState<PinState>('locked');

  const effective: PinState = forcedState ?? state;
  const lockedOut = effective === 'lockout';
  const showDots = forcedState
    ? forcedState === 'success'
      ? PIN_LENGTH
      : forcedState === 'invalid'
        ? PIN_LENGTH
        : forcedState === 'entering'
          ? 2
          : 0
    : entry.length;

  // Evaluate on full entry.
  useEffect(() => {
    if (forcedState) return;
    if (entry.length !== PIN_LENGTH) return;
    const t = setTimeout(() => {
      if (entry === correctPin) {
        setState('success');
        onSuccess?.();
      } else {
        const next = attempts + 1;
        setAttempts(next);
        setState(next >= MAX_ATTEMPTS ? 'lockout' : 'invalid');
        setEntry('');
      }
    }, 180);
    return () => clearTimeout(t);
  }, [entry, correctPin, attempts, forcedState, onSuccess]);

  const press = (d: string) => {
    if (forcedState || lockedOut || effective === 'success') return;
    if (state === 'invalid') setState('entering');
    if (entry.length >= PIN_LENGTH) return;
    setEntry((e) => e + d);
    if (state === 'locked') setState('entering');
  };
  const backspace = () => {
    if (forcedState || lockedOut) return;
    setEntry((e) => e.slice(0, -1));
  };
  const reset = () => {
    setEntry('');
    setAttempts(0);
    setState('locked');
  };

  const accent =
    effective === 'success'
      ? palette.status.normal
      : effective === 'invalid' || effective === 'lockout'
        ? palette.status.late
        : palette.text.primary;

  const remaining = MAX_ATTEMPTS - attempts;

  return (
    <Box
      sx={{
        width: 340,
        maxWidth: '100%',
        p: 3,
        borderRadius: 4,
        bgcolor: palette.mode === 'dark' ? '#141518' : '#fff',
        // Explicit text color so headings/links don't inherit the ambient
        // (light-theme) cascade and go dark-on-dark inside the dark pad.
        color: palette.text.primary,
        border: `1px solid ${palette.divider}`,
        textAlign: 'center',
      }}
    >
      {/* Status glyph */}
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: 'auto',
          mb: 1.5,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor:
            effective === 'success'
              ? `${palette.status.normal}22`
              : effective === 'invalid' || effective === 'lockout'
                ? `${palette.status.late}22`
                : palette.action.hover,
          color: accent,
        }}
      >
        {effective === 'success' ? (
          <LockOpenRoundedIcon sx={{ fontSize: 34 }} />
        ) : effective === 'invalid' || effective === 'lockout' ? (
          <ErrorOutlineRoundedIcon sx={{ fontSize: 34 }} />
        ) : (
          <LockRoundedIcon sx={{ fontSize: 34 }} />
        )}
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        {effective === 'success'
          ? 'Unlocked'
          : effective === 'lockout'
            ? 'Too many attempts'
            : effective === 'invalid'
              ? 'Incorrect PIN'
              : prompt}
      </Typography>
      <Typography
        variant="body2"
        sx={{ minHeight: 22, mb: 2, color: effective === 'invalid' || effective === 'lockout' ? palette.status.late : 'text.secondary' }}
      >
        {effective === 'success'
          ? 'Welcome back — settings are open.'
          : effective === 'lockout'
            ? 'Locked for 30s. Ask a manager or reset.'
            : effective === 'invalid'
              ? `${remaining} attempt${remaining === 1 ? '' : 's'} left before lockout.`
              : 'TenFore Grill · The Turn'}
      </Typography>

      {/* Dots */}
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center',  mb: 3 }}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => {
          const filled = i < showDots;
          return (
            <Box
              key={i}
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: filled ? accent : 'transparent',
                border: `2px solid ${filled ? accent : palette.divider}`,
                transition: 'all 120ms linear',
              }}
            />
          );
        })}
      </Stack>

      {/* Keypad */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.25,
          opacity: lockedOut || effective === 'success' ? 0.4 : 1,
          pointerEvents: lockedOut || effective === 'success' ? 'none' : 'auto',
        }}
      >
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
          <PinKey key={d} label={d} onClick={() => press(d)} />
        ))}
        <Box />
        <PinKey label="0" onClick={() => press('0')} />
        <PinKey label={<BackspaceRoundedIcon />} onClick={backspace} muted />
      </Box>

      {/* Footer: reset/help path */}
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center',  mt: 2.5 }}>
        {effective === 'success' ? (
          <Button size="small" startIcon={<CheckRoundedIcon />} onClick={reset}>
            Lock again
          </Button>
        ) : (
          <Button size="small" color="inherit" onClick={reset}>
            Forgot PIN? Reset
          </Button>
        )}
      </Stack>
    </Box>
  );
}

function PinKey({
  label,
  onClick,
  muted,
}: {
  label: React.ReactNode;
  onClick: () => void;
  muted?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        aspectRatio: '1.6 / 1',
        minHeight: 56,
        borderRadius: 3,
        fontSize: '1.6rem',
        fontWeight: 600,
        color: muted ? 'text.secondary' : 'text.primary',
        bgcolor: 'action.hover',
        '&:hover': { bgcolor: 'action.selected' },
      }}
    >
      {label}
    </Button>
  );
}

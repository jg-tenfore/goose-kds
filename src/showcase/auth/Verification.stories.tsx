import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';

function Verification() {
  const length = 6;
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handle = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[i] = d;
    setValues(next);
    if (d && i < length - 1) refs.current[i + 1]?.focus();
  };
  return (
    <Paper variant="outlined" sx={{ p: 4, width: 420 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h6">Verify your email</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the 6-digit code we sent you.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {values.map((val, i) => (
            <TextField
              key={i}
              value={val}
              onChange={(e) => handle(i, e.target.value)}
              inputRef={(el) => {
                refs.current[i] = el;
              }}
              slotProps={{
                htmlInput: { maxLength: 1, style: { textAlign: 'center', fontSize: 22 } },
              }}
              sx={{ width: 52 }}
            />
          ))}
        </Box>
        <Button variant="contained" fullWidth size="large">
          Verify
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          Didn't get it? <Link href="#">Resend code</Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

const meta = {
  title: 'Account/Verification',
  component: Verification,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Verification>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Verification_: Story = { name: 'Verification' };

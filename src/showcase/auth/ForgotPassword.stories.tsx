import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';

function ForgotPassword() {
  return (
    <Paper variant="outlined" sx={{ p: 4, width: 380 }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h6">Reset your password</Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your email and we'll send a reset link.
          </Typography>
        </Box>
        <TextField label="Email" type="email" fullWidth />
        <Button variant="contained" fullWidth size="large">
          Send reset link
        </Button>
        <Link href="#" variant="body2" align="center">
          Back to sign in
        </Link>
      </Stack>
    </Paper>
  );
}

const meta = {
  title: 'Sign in ∕ Sign up/Forgot password',
  component: ForgotPassword,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ForgotPassword>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ForgotPassword_: Story = { name: 'Forgot password' };

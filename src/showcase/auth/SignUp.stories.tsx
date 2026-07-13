import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Divider, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import Google from '@mui/icons-material/Google';

function SignUp() {
  return (
    <Paper variant="outlined" sx={{ p: 4, width: 380 }}>
      <Stack spacing={2.5}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">🪿</Typography>
          <Typography variant="h6">Create your account</Typography>
        </Box>
        <TextField label="Full name" fullWidth />
        <TextField label="Email" type="email" fullWidth />
        <TextField label="Password" type="password" fullWidth helperText="At least 8 characters" />
        <Button variant="contained" fullWidth size="large">
          Create account
        </Button>
        <Divider>or</Divider>
        <Button variant="outlined" fullWidth startIcon={<Google />}>
          Sign up with Google
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          Already have an account? <Link href="#">Sign in</Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

const meta = {
  title: 'Account/Sign up',
  component: SignUp,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SignUp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SignUp_: Story = { name: 'Sign up' };

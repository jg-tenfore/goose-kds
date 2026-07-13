import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '@mui/icons-material/Google';

function LogIn() {
  const [show, setShow] = useState(false);
  return (
    <Paper variant="outlined" sx={{ p: 4, width: 380 }}>
      <Stack spacing={2.5}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">🪿</Typography>
          <Typography variant="h6">Sign in to Goose KDS</Typography>
        </Box>
        <TextField label="Email" type="email" fullWidth />
        <TextField
          label="Password"
          type={show ? 'text' : 'password'}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow((s) => !s)} edge="end">
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Link href="#" variant="body2" sx={{ alignSelf: 'flex-end' }}>
          Forgot password?
        </Link>
        <Button variant="contained" fullWidth size="large">
          Sign in
        </Button>
        <Divider>or</Divider>
        <Button variant="outlined" fullWidth startIcon={<Google />}>
          Continue with Google
        </Button>
        <Typography variant="body2" align="center" color="text.secondary">
          No account? <Link href="#">Sign up</Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

const meta = {
  title: 'Account/Log in',
  component: LogIn,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LogIn>;
export default meta;
type Story = StoryObj<typeof meta>;

export const LogIn_: Story = { name: 'Log in' };

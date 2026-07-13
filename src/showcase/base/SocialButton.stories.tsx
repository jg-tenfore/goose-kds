import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Stack } from '@mui/material';
import Google from '@mui/icons-material/Google';
import Apple from '@mui/icons-material/Apple';

const meta = {
  title: 'Components/Actions/Social Button',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const SocialButton: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 280 }}>
      <Button variant="outlined" fullWidth startIcon={<Google />}>
        Continue with Google
      </Button>
      <Button variant="outlined" fullWidth startIcon={<Apple />}>
        Continue with Apple
      </Button>
    </Stack>
  ),
};

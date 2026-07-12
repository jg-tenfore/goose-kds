import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, InputAdornment, TextField } from '@mui/material';
import CreditCard from '@mui/icons-material/CreditCard';

const meta = {
  title: 'Base Components/Inputs/Input Payment',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputPayment: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320 }}>
      <TextField
        label="Card number"
        placeholder="1234 5678 9012 3456"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <CreditCard />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="Expiry" placeholder="MM/YY" fullWidth />
        <TextField label="CVC" placeholder="123" fullWidth />
      </Box>
    </Box>
  ),
};

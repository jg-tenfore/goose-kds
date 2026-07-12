import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, InputAdornment, TextField } from '@mui/material';
import Search from '@mui/icons-material/Search';
import AttachMoney from '@mui/icons-material/AttachMoney';

const meta = {
  title: 'Base Components/Inputs/Input Group',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputGroup: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        label="Search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Amount"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          },
        }}
      />
    </Box>
  ),
};

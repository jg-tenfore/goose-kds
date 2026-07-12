import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const meta = {
  title: 'Base Components/RadioButtons',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButtons: Story = {
  render: () => (
    <FormControl>
      <FormLabel>Dining option</FormLabel>
      <RadioGroup defaultValue="dine-in">
        <FormControlLabel value="dine-in" control={<Radio />} label="Dine in" />
        <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
        <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
        <FormControlLabel value="cart" control={<Radio disabled />} label="Beverage cart (disabled)" />
      </RadioGroup>
    </FormControl>
  ),
};

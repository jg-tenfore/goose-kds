import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SelectDemo() {
  const [value, setValue] = useState('grill');
  return (
    <FormControl sx={{ minWidth: 220 }}>
      <InputLabel id="station-label">Station</InputLabel>
      <Select
        labelId="station-label"
        label="Station"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <MenuItem value="grill">Grill</MenuItem>
        <MenuItem value="fry">Fry</MenuItem>
        <MenuItem value="cold">Cold</MenuItem>
        <MenuItem value="beverage">Beverage</MenuItem>
        <MenuItem value="expo">Expo</MenuItem>
      </Select>
    </FormControl>
  );
}

const meta = {
  title: 'Base Components/Select',
  component: SelectDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SelectDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Select_: Story = { name: 'Select' };

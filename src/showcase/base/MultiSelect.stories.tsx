import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

const OPTIONS = ['Grill', 'Fry', 'Cold', 'Beverage', 'Packaging', 'Expo'];

function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(['Grill', 'Expo']);
  return (
    <FormControl sx={{ width: 320 }}>
      <InputLabel id="stations-label">Stations</InputLabel>
      <Select
        labelId="stations-label"
        multiple
        value={value}
        onChange={(e) => setValue(e.target.value as string[])}
        input={<OutlinedInput label="Stations" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((v) => (
              <Chip key={v} label={v} size="small" />
            ))}
          </Box>
        )}
      >
        {OPTIONS.map((o) => (
          <MenuItem key={o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const meta = {
  title: 'Components/Forms/Multi-Select',
  component: MultiSelectDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MultiSelectDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelect: Story = {};

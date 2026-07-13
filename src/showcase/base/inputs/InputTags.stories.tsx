import type { Meta, StoryObj } from '@storybook/react-vite';
import { Autocomplete, TextField } from '@mui/material';

const meta = {
  title: 'Components/Forms/Input Tags',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const InputTags: Story = {
  render: () => (
    <Autocomplete
      multiple
      freeSolo
      options={['No onions', 'Gluten-free', 'Extra sauce', 'Well done', 'Allergy: nuts']}
      defaultValue={['No onions', 'Allergy: nuts']}
      sx={{ width: 360 }}
      renderInput={(params) => <TextField {...params} label="Tags" placeholder="Add tag" />}
    />
  ),
};

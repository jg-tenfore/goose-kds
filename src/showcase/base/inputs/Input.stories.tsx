import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, TextField } from '@mui/material';

const meta = {
  title: 'Components/Forms/Text Field',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-line text field, built on MUI `TextField`. Use it for names, emails, ticket labels, and search — for multi-line notes use **Textarea**, and for on/off settings use **Switch**. ' +
          'It supports a label, placeholder, helper text, validation (`error`), sizing, and three visual `variant`s. ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Field label.' },
    placeholder: { control: 'text', description: 'Ghost text shown while empty.' },
    helperText: { control: 'text', description: 'Assistive text shown beneath the field.' },
    variant: {
      control: 'inline-radio',
      options: ['outlined', 'filled', 'standard'],
      description: 'Visual style.',
      table: { defaultValue: { summary: 'outlined' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      description: 'Control density.',
      table: { defaultValue: { summary: 'medium' } },
    },
    error: { control: 'boolean', description: 'Invalid / error state.' },
    required: { control: 'boolean', description: 'Marks the field as required.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    fullWidth: { control: 'boolean', description: 'Expand to the container width.' },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: '',
    variant: 'outlined',
    size: 'medium',
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {};

/** The three MUI variants side by side. */
export const Variants: Story = {
  parameters: { docs: { description: { story: 'Outlined (default), filled, and standard styles.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField {...args} variant="outlined" label="Outlined" />
      <TextField {...args} variant="filled" label="Filled" />
      <TextField {...args} variant="standard" label="Standard" />
    </Box>
  ),
};

/** Helper text, error, disabled, and required states. */
export const States: Story = {
  parameters: { docs: { description: { story: 'Common field states: helper text, error, disabled, and required.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField {...args} label="With helper" helperText="Helper text" />
      <TextField {...args} label="Error" error helperText="Something's wrong" />
      <TextField {...args} label="Disabled" disabled />
      <TextField {...args} label="Required" required />
    </Box>
  ),
};

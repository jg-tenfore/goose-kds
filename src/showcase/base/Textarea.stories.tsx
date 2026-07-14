import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@mui/material';

const meta = {
  title: 'Components/Forms/Textarea',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text field — a MUI `TextField` with `multiline` enabled. Use it for free-form notes such as order/kitchen notes or a manager memo. ' +
          '`minRows` sets the starting height and it grows with content up to `maxRows`. ' +
          'Edit the props in the **Controls** panel to preview it live.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Field label.' },
    placeholder: { control: 'text', description: 'Ghost text shown while empty.' },
    helperText: { control: 'text', description: 'Assistive text shown beneath the field.' },
    minRows: { control: { type: 'number', min: 1, max: 12 }, description: 'Starting number of visible rows.' },
    maxRows: { control: { type: 'number', min: 1, max: 20 }, description: 'Max rows before it scrolls.' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled', 'standard'], description: 'Visual style.' },
    error: { control: 'boolean', description: 'Invalid / error state.' },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
  },
  args: {
    label: 'Notes',
    placeholder: 'Order notes…',
    helperText: '',
    multiline: true,
    minRows: 3,
    maxRows: 8,
    variant: 'outlined',
    error: false,
    disabled: false,
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Textarea: Story = { render: (args) => <TextField {...args} sx={{ width: 360 }} /> };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Stack } from '@mui/material';

const meta = {
  title: 'Base Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button', variant: 'contained', color: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['contained', 'outlined', 'text'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'inherit'],
    },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2}>
      <Button {...args} variant="contained">
        Contained
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="medium">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </Stack>
  ),
};

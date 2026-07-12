import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, ButtonGroup, Stack } from '@mui/material';

const meta = {
  title: 'Base Components/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonGroup_: Story = {
  name: 'Button Group',
  render: () => (
    <Stack spacing={2}>
      <ButtonGroup variant="contained">
        <Button>Complete</Button>
        <Button>Recall</Button>
        <Button>Priority</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  ),
};

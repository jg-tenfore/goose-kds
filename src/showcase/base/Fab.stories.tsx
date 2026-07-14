import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Fab } from '@mui/material';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Navigation from '@mui/icons-material/Navigation';

const meta = {
  title: 'Components/Actions/Floating Action Button',
  component: Fab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Floating Action Button (`Fab`) is a round, elevated button for the single most important action on a screen — ' +
          'on the KDS think **New manual ticket**, **Recall last order**, or jump-to-newest. It comes in three sizes, several colors, and ' +
          'a `circular` (icon-only) or `extended` (icon + label) variant. Set the props in the **Controls** panel to preview each combination.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'inline-radio',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'Theme color.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Button size.',
      table: { defaultValue: { summary: 'large' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['circular', 'extended'],
      description: 'Icon-only (circular) or icon + label (extended).',
      table: { defaultValue: { summary: 'circular' } },
    },
    disabled: { control: 'boolean', description: 'Disables the button.' },
  },
  args: {
    color: 'primary',
    size: 'large',
    variant: 'circular',
    disabled: false,
    'aria-label': 'add',
    children: <Add />,
  },
} satisfies Meta<typeof Fab>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change color, size, or variant in the **Controls** panel. */
export const Playground: Story = {};

/** The theme color options. */
export const Colors: Story = {
  parameters: { docs: { description: { story: 'Fab in each semantic theme color.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Fab {...args} color="default" aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} color="primary" aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} color="secondary" aria-label="edit">
        <Edit />
      </Fab>
      <Fab {...args} color="success" aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} color="error" aria-label="add">
        <Add />
      </Fab>
    </Box>
  ),
};

/** Small, medium, and large sizes. */
export const Sizes: Story = {
  parameters: { docs: { description: { story: 'The three Fab sizes side by side.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Fab {...args} size="small" aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} size="medium" aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} size="large" aria-label="add">
        <Add />
      </Fab>
    </Box>
  ),
};

/** Extended Fabs pair an icon with a text label. */
export const Extended: Story = {
  parameters: { docs: { description: { story: 'The `extended` variant shows a label — good for a primary KDS action like starting a new ticket.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Fab {...args} variant="extended" color="primary">
        <Add sx={{ mr: 1 }} />
        New ticket
      </Fab>
      <Fab {...args} variant="extended" color="secondary">
        <Edit sx={{ mr: 1 }} />
        Edit order
      </Fab>
    </Box>
  ),
};

/** Different icons for different actions. */
export const IconOptions: Story = {
  parameters: { docs: { description: { story: 'Any icon can sit inside a Fab — Add, Edit, or Navigation shown here.' } } },
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Fab {...args} aria-label="add">
        <Add />
      </Fab>
      <Fab {...args} aria-label="edit">
        <Edit />
      </Fab>
      <Fab {...args} aria-label="navigate">
        <Navigation />
      </Fab>
    </Box>
  ),
};

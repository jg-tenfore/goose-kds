import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

const meta = {
  title: 'Components/Layout & Structure/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Divider` — a thin rule that separates content, either horizontally between rows or vertically between inline items. ' +
          'In the KDS it splits ticket line-items, separates station groups in a rail, and labels sections (e.g. a "Grill" divider between courses). ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the rule.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['fullWidth', 'inset', 'middle'],
      description: 'How far the rule extends within its container.',
      table: { defaultValue: { summary: 'fullWidth' } },
    },
    flexItem: {
      control: 'boolean',
      description: 'Lets a vertical divider stretch inside a flex row.',
    },
    textAlign: {
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
      description: 'Alignment of child text/chip content.',
      table: { defaultValue: { summary: 'center' } },
    },
  },
  args: {
    orientation: 'horizontal',
    variant: 'fullWidth',
    flexItem: false,
    textAlign: 'center',
  },
} satisfies Meta<typeof Divider>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => (
    <Box sx={{ width: 320 }}>
      <Typography variant="body2" gutterBottom>
        Clubhouse Burger
      </Typography>
      <Divider {...args} />
      <Typography variant="body2" sx={{ mt: 1 }}>
        Side of fries
      </Typography>
    </Box>
  ),
};

/** Horizontal dividers separating rows in a list of ticket items. */
export const InAList: Story = {
  parameters: {
    docs: { description: { story: 'Full-width dividers between rows of a `List`.' } },
  },
  render: () => (
    <Paper variant="outlined" sx={{ width: 280 }}>
      <List disablePadding>
        <ListItem>
          <ListItemText primary="Clubhouse Burger" secondary="No onion" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Wings (12)" secondary="Buffalo" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Iced Tea" secondary="Large" />
        </ListItem>
      </List>
    </Paper>
  ),
};

/** A divider carrying centered text or a chip as a section label. */
export const WithContent: Story = {
  parameters: {
    docs: { description: { story: 'Text and chip labels embedded in the rule to mark a section break.' } },
  },
  render: () => (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Divider>COURSE 2</Divider>
      <Divider textAlign="left">
        <Chip label="Grill" size="small" />
      </Divider>
    </Box>
  ),
};

/** Vertical dividers separating inline items in a flex row. */
export const Vertical: Story = {
  parameters: {
    docs: { description: { story: 'Vertical dividers with `flexItem` between inline stats in a row.' } },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">18</Typography>
        <Typography variant="caption" color="text.secondary">
          Open
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">4</Typography>
        <Typography variant="caption" color="text.secondary">
          Overdue
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6">96</Typography>
        <Typography variant="caption" color="text.secondary">
          Done
        </Typography>
      </Box>
    </Box>
  ),
};

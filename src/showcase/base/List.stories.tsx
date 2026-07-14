import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from '@mui/material';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

const meta = {
  title: 'Components/Layout & Structure/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `List` (with `ListItem`, `ListItemButton`, `ListItemIcon`, `ListItemText`, and `ListSubheader`) — a vertical stack of related rows. ' +
          'In the KDS it drives station navigation, ticket line-items, and settings menus, with optional icons, secondary text, subheaders, and selection state. ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    dense: {
      control: 'boolean',
      description: 'Compact row height for denser lists.',
    },
    disablePadding: {
      control: 'boolean',
      description: 'Removes the top/bottom padding of the list.',
    },
  },
  args: {
    dense: false,
    disablePadding: false,
    children: <></>,
  },
} satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => (
    <Paper variant="outlined" sx={{ width: 260 }}>
      <List {...args}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <OutdoorGrillIcon />
            </ListItemIcon>
            <ListItemText primary="Grill" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <RamenDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Fryer" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LocalBarIcon />
            </ListItemIcon>
            <ListItemText primary="Beverage" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  ),
};

/** Rows with a leading icon and secondary supporting text. */
export const WithIconsAndText: Story = {
  parameters: {
    docs: { description: { story: 'Each row pairs an icon with a primary and secondary line.' } },
  },
  render: (args) => (
    <Paper variant="outlined" sx={{ width: 300 }}>
      <List {...args}>
        <ListItem>
          <ListItemIcon>
            <LunchDiningIcon />
          </ListItemIcon>
          <ListItemText primary="Clubhouse Burger" secondary="Grill · 6 min avg" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <RamenDiningIcon />
          </ListItemIcon>
          <ListItemText primary="Basket of Wings" secondary="Fryer · 8 min avg" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LocalBarIcon />
          </ListItemIcon>
          <ListItemText primary="Arnold Palmer" secondary="Beverage · 1 min avg" />
        </ListItem>
      </List>
    </Paper>
  ),
};

/** A subheader labelling the group, with dividers between rows. */
export const WithSubheaderAndDividers: Story = {
  parameters: {
    docs: { description: { story: 'A `ListSubheader` caption above rows separated by dividers.' } },
  },
  render: (args) => (
    <Paper variant="outlined" sx={{ width: 300 }}>
      <List
        {...args}
        subheader={<ListSubheader>Ticket #142 · Table 7</ListSubheader>}
      >
        <ListItem>
          <ListItemText primary="Clubhouse Burger" secondary="No onion" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Basket of Wings" secondary="Buffalo, extra ranch" />
        </ListItem>
        <Divider component="li" />
        <ListItem>
          <ListItemText primary="Arnold Palmer" secondary="Large" />
        </ListItem>
      </List>
    </Paper>
  ),
};

const STATIONS = [
  { label: 'Grill', icon: <OutdoorGrillIcon /> },
  { label: 'Fryer', icon: <RamenDiningIcon /> },
  { label: 'Beverage', icon: <LocalBarIcon /> },
];

/** Selectable navigation list — one row highlighted at a time via `useState`. */
function SelectableList() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Paper variant="outlined" sx={{ width: 260 }}>
      <List>
        {STATIONS.map((station, index) => (
          <ListItem key={station.label} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            >
              <ListItemIcon>{station.icon}</ListItemIcon>
              <ListItemText primary={station.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

/** Click a row to select it — the highlighted item is tracked in state. */
export const Selectable: Story = {
  parameters: {
    docs: { description: { story: 'A controlled selectable list using `ListItemButton`’s `selected` prop.' } },
  },
  render: () => <SelectableList />,
};

/** The `dense` variant, for tightly-packed lists like ticket line-items. */
export const Dense: Story = {
  parameters: {
    docs: { description: { story: 'Reduced row height via the `dense` prop.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Paper variant="outlined" sx={{ width: 220 }}>
        <List>
          <ListItem>
            <ListItemText primary="Clubhouse Burger" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Basket of Wings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Arnold Palmer" />
          </ListItem>
        </List>
      </Paper>
      <Paper variant="outlined" sx={{ width: 220 }}>
        <List dense>
          <ListItem>
            <ListItemText primary="Clubhouse Burger" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Basket of Wings" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Arnold Palmer" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  ),
};

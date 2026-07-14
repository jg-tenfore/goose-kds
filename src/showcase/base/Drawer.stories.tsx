import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import Tag from '@mui/icons-material/Tag';
import Inventory2 from '@mui/icons-material/Inventory2';
import Settings from '@mui/icons-material/Settings';
import ReceiptLong from '@mui/icons-material/ReceiptLong';

const meta = {
  title: 'Components/Navigation/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Side panel for navigation and secondary tools, built on MUI `Drawer`. ' +
          'In the golf-diner KDS a temporary drawer slides the station sidebar in on demand — All-day counts, Item availability, and Settings — keeping the ticket board full-bleed until the expo needs it. ' +
          'Use `temporary` (overlay) for touch, or `permanent` for a fixed rail on large kitchen displays. Set `anchor` to place it on either edge.',
      },
    },
  },
  argTypes: {
    anchor: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Edge the drawer slides in from.',
      table: { defaultValue: { summary: 'left' } },
    },
  },
  args: {
    anchor: 'left',
  },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'Open tickets', icon: <ReceiptLong /> },
  { label: 'All-day counts', icon: <Tag /> },
  { label: 'Item availability', icon: <Inventory2 /> },
  { label: 'Settings', icon: <Settings /> },
];

function DrawerContent() {
  return (
    <Box sx={{ width: 260 }} role="presentation">
      <List
        subheader={<ListSubheader disableSticky>Station</ListSubheader>}
      >
        {navItems.map((item) => (
          <ListItemButton key={item.label}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

function TemporaryDrawerDemo({ anchor }: { anchor?: DrawerAnchor }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" startIcon={<Menu />} onClick={() => setOpen(true)}>
        Open station menu
      </Button>
      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <Box onClick={() => setOpen(false)}>
          <DrawerContent />
        </Box>
      </Drawer>
    </>
  );
}

/** Fully interactive — open the temporary drawer and switch its `anchor` in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => <TemporaryDrawerDemo anchor={args.anchor} />,
};

/** Temporary drawers from either edge — left is the default station rail; right suits contextual tools. */
export const AnchorLeftAndRight: Story = {
  parameters: {
    docs: { description: { story: 'The same drawer anchored left and right. Temporary drawers overlay the board and dismiss on backdrop click.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TemporaryDrawerDemo anchor="left" />
      <TemporaryDrawerDemo anchor="right" />
    </Box>
  ),
};

/** A `permanent` drawer stays pinned as a fixed rail — ideal for always-on expo displays. */
export const Permanent: Story = {
  parameters: {
    docs: { description: { story: 'A permanent-variant drawer rendered inline as a fixed sidebar rail alongside the board content.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', height: 340, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: 260, position: 'relative' },
        }}
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Expo Station
          </Typography>
        </Toolbar>
        <Divider />
        <DrawerContent />
      </Drawer>
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Ticket board area
        </Typography>
      </Box>
    </Box>
  ),
};

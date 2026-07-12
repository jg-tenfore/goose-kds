import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import Inventory from '@mui/icons-material/Inventory';
import Settings from '@mui/icons-material/Settings';

function SlideoutDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open menu
      </Button>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {[
              ['All-day counts', <Dashboard />],
              ['Item availability', <Inventory />],
              ['Settings', <Settings />],
            ].map(([text, icon]) => (
              <ListItemButton key={text as string}>
                <ListItemIcon>{icon as React.ReactNode}</ListItemIcon>
                <ListItemText primary={text as string} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

const meta = {
  title: 'Application Components/Slideout Menu',
  component: SlideoutDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SlideoutDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SlideoutMenu: Story = {};

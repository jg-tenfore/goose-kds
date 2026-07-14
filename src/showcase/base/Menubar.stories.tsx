import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AppBar, Box, Button, Divider, Menu, MenuItem, Toolbar } from '@mui/material';

/**
 * MUI (`@mui/material` v9) does not ship a native `Menubar` component, so this composes one
 * from an `AppBar`/`Toolbar` of trigger `Button`s, each opening a `Menu` of `MenuItem`s —
 * the desktop-app menubar pattern (File / Edit / View / Help), KDS-flavoured.
 */
const meta = {
  title: 'Components/Navigation/Menubar',
  component: AppBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A horizontal application menubar composed from MUI primitives — MUI does not export a native `Menubar`. ' +
          'Each top-level trigger (Board, Tickets, Counts, Settings) opens a `Menu` of commands, mirroring a desktop app bar. ' +
          'In the golf-diner KDS it gives the expo lead keyboard-and-mouse access to board layouts, ticket actions, all-day counts, and station settings from one persistent strip. ' +
          'A single active menu is tracked with `anchorEl` plus the open menu key.',
      },
    },
  },
} satisfies Meta<typeof AppBar>;
export default meta;
type Story = StoryObj<typeof meta>;

type MenuKey = 'board' | 'tickets' | 'counts' | 'settings';

const menus: Record<MenuKey, { label: string; items: string[] }> = {
  board: { label: 'Board', items: ['Grid layout', 'List layout', 'Refresh board'] },
  tickets: { label: 'Tickets', items: ['Recall ticket', 'Reprint', 'Void ticket'] },
  counts: { label: 'Counts', items: ['Show all-day', 'Reset counts', 'Export counts'] },
  settings: { label: 'Settings', items: ['Stations', 'Printers', 'Preferences'] },
};

function MenubarDemo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  const handleOpen = (key: MenuKey) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(key);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  return (
    <Box sx={{ width: 520 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense" sx={{ gap: 0.5 }}>
          {(Object.keys(menus) as MenuKey[]).map((key) => (
            <Button
              key={key}
              color="inherit"
              size="small"
              onClick={handleOpen(key)}
              sx={{ textTransform: 'none' }}
            >
              {menus[key].label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      {(Object.keys(menus) as MenuKey[]).map((key) => (
        <Menu
          key={key}
          anchorEl={anchorEl}
          open={openMenu === key}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          {menus[key].items.map((item, i) =>
            item === 'Void ticket' ? (
              <Box key={item}>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
                  {item}
                </MenuItem>
              </Box>
            ) : (
              <MenuItem key={item + i} onClick={handleClose}>
                {item}
              </MenuItem>
            ),
          )}
        </Menu>
      ))}
    </Box>
  );
}

/** Fully interactive — click each top-level menu to open its command list. */
export const Playground: Story = {
  render: () => <MenubarDemo />,
};

/** The menubar sitting above a mock board area, as it appears in the KDS shell. */
export const InContext: Story = {
  parameters: {
    docs: { description: { story: 'The composed menubar pinned above the ticket board content.' } },
  },
  render: () => (
    <Box sx={{ width: 520, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
      <MenubarDemo />
      <Box sx={{ p: 4, color: 'text.secondary' }}>Ticket board area</Box>
    </Box>
  ),
};

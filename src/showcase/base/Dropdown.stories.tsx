import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function DropdownDemo() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDown />}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        Actions
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setAnchor(null)}>Recall ticket</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>Reprint</MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>Mark priority</MenuItem>
      </Menu>
    </>
  );
}

const meta = {
  title: 'Components/Actions/Dropdown',
  component: DropdownDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Replay from '@mui/icons-material/Replay';
import Print from '@mui/icons-material/Print';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import Check from '@mui/icons-material/Check';

const meta = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `Menu` — a temporary surface of actions anchored to the element that opened it, built from `MenuItem`s. ' +
          'Track an `anchorEl` in state: set it from the trigger button on click, and clear it on close. ' +
          'Use it for per-ticket action overflow menus, station switchers, and settings shortcuts. ' +
          'Add `ListItemIcon` / `ListItemText` for iconed rows, `Divider` to group actions, and `selected` / `disabled` on individual items.',
      },
    },
  },
  args: { open: false },
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A button that opens a Menu of plain text actions anchored beneath it. */
function PlaygroundDemo() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const close = () => setAnchor(null);
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDown />}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        Actions
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
        <MenuItem onClick={close}>Recall ticket</MenuItem>
        <MenuItem onClick={close}>Reprint</MenuItem>
        <MenuItem onClick={close}>Mark priority</MenuItem>
        <MenuItem onClick={close}>Move to station</MenuItem>
      </Menu>
    </>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

/** Menu items with leading icons, grouped by a Divider before a destructive action. */
function WithIconsDemo() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const close = () => setAnchor(null);
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDown />}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        Ticket actions
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
        <MenuItem onClick={close}>
          <ListItemIcon>
            <Replay fontSize="small" />
          </ListItemIcon>
          <ListItemText>Recall ticket</ListItemText>
        </MenuItem>
        <MenuItem onClick={close}>
          <ListItemIcon>
            <Print fontSize="small" />
          </ListItemIcon>
          <ListItemText>Reprint</ListItemText>
        </MenuItem>
        <MenuItem onClick={close}>
          <ListItemIcon>
            <PriorityHigh fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark priority</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={close}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Void ticket</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export const WithIcons: Story = {
  render: () => <WithIconsDemo />,
  parameters: {
    docs: {
      description: { story: 'Iconed rows via `ListItemIcon` / `ListItemText`, split by a `Divider`.' },
    },
  },
};

/** A station switcher showing a currently selected item and a disabled, offline station. */
function SelectionDemo() {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [station, setStation] = useState('Expo 1');
  const close = () => setAnchor(null);
  const pick = (value: string) => {
    setStation(value);
    close();
  };
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<KeyboardArrowDown />}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        {station}
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close}>
        <MenuItem selected={station === 'Expo 1'} onClick={() => pick('Expo 1')}>
          <ListItemIcon>{station === 'Expo 1' ? <Check fontSize="small" /> : null}</ListItemIcon>
          <ListItemText>Expo 1</ListItemText>
        </MenuItem>
        <MenuItem selected={station === 'Grill'} onClick={() => pick('Grill')}>
          <ListItemIcon>{station === 'Grill' ? <Check fontSize="small" /> : null}</ListItemIcon>
          <ListItemText>Grill</ListItemText>
        </MenuItem>
        <MenuItem selected={station === 'Fryer'} onClick={() => pick('Fryer')}>
          <ListItemIcon>{station === 'Fryer' ? <Check fontSize="small" /> : null}</ListItemIcon>
          <ListItemText>Fryer</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemIcon />
          <ListItemText>Bar (offline)</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export const SelectedAndDisabled: Story = {
  render: () => <SelectionDemo />,
  parameters: {
    docs: {
      description: { story: 'Items using `selected` for the active choice and `disabled` for an unavailable one.' },
    },
  },
};

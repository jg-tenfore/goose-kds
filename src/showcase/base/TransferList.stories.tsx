import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

// Stations/categories a manager can assign to a single KDS display.
type Item = string;

const not = (a: Item[], b: Item[]) => a.filter((v) => !b.includes(v));
const intersection = (a: Item[], b: Item[]) => a.filter((v) => b.includes(v));

// Named component so useState lives in a real component (react-hooks/rules-of-hooks).
function TransferListDemo() {
  const [checked, setChecked] = useState<Item[]>([]);
  const [available, setAvailable] = useState<Item[]>(['Cold Line', 'Beverage', 'Dessert', 'Catering', 'Bar']);
  const [assigned, setAssigned] = useState<Item[]>(['Grill', 'Fryer', 'Expo']);

  const availableChecked = intersection(checked, available);
  const assignedChecked = intersection(checked, assigned);

  const toggle = (value: Item) => () => {
    setChecked((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const moveRight = () => {
    setAssigned((prev) => [...prev, ...availableChecked]);
    setAvailable((prev) => not(prev, availableChecked));
    setChecked((prev) => not(prev, availableChecked));
  };

  const moveLeft = () => {
    setAvailable((prev) => [...prev, ...assignedChecked]);
    setAssigned((prev) => not(prev, assignedChecked));
    setChecked((prev) => not(prev, assignedChecked));
  };

  const renderList = (title: string, items: Item[]) => (
    <Card variant="outlined" sx={{ width: 240 }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={
          <Typography variant="subtitle2">
            {title} ({items.length})
          </Typography>
        }
      />
      <Divider />
      <List dense component="div" role="list" sx={{ height: 240, overflow: 'auto' }}>
        {items.map((value) => (
          <ListItemButton key={value} role="listitem" onClick={toggle(value)}>
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <Checkbox edge="start" checked={checked.includes(value)} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText primary={value} />
          </ListItemButton>
        ))}
      </List>
    </Card>
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {renderList('Available', available)}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={moveRight}
          disabled={availableChecked.length === 0}
          aria-label="Move selected to this display"
        >
          &gt;
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={moveLeft}
          disabled={assignedChecked.length === 0}
          aria-label="Move selected to available"
        >
          &lt;
        </Button>
      </Box>
      {renderList('On this display', assigned)}
    </Box>
  );
}

const meta = {
  title: 'Components/Forms/Transfer List',
  component: TransferListDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Transfer List pattern moves items between two checkbox lists with the buttons in the middle. ' +
          'On the KDS it lets a manager choose which **stations / categories** appear on a given display — tick items in either column, ' +
          'then press **>** or **<** to move the checked ones across. Built from two MUI `List`s, `Checkbox`es, and move `Button`s.',
      },
    },
  },
} satisfies Meta<typeof TransferListDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Tick stations in either column, then use the arrow buttons to move them. */
export const Playground: Story = {};

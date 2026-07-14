import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Tag from '@mui/icons-material/Tag';
import Settings from '@mui/icons-material/Settings';

const meta = {
  title: 'Components/Navigation/Bottom Navigation',
  component: BottomNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact bottom bar for switching between top-level views, built on MUI `BottomNavigation` and `BottomNavigationAction`. ' +
          'In the golf-diner KDS it anchors a touch-friendly station switcher on smaller expo screens — jumping between Open tickets, Completed orders, all-day Counts, and Settings without reaching for a side rail. ' +
          'The active action is tracked with `value`; toggle `showLabels` to keep every label visible instead of only the selected one.',
      },
    },
  },
  argTypes: {
    showLabels: {
      control: 'boolean',
      description: 'Always show labels for every action (not just the selected one).',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    showLabels: false,
  },
} satisfies Meta<typeof BottomNavigation>;
export default meta;
type Story = StoryObj<typeof meta>;

function BottomNavDemo({ showLabels }: { showLabels?: boolean }) {
  const [value, setValue] = useState(0);
  return (
    <Paper elevation={2} sx={{ width: 460 }}>
      <BottomNavigation showLabels={showLabels} value={value} onChange={(_, v) => setValue(v)}>
        <BottomNavigationAction label="Open" icon={<ReceiptLong />} />
        <BottomNavigationAction label="Completed" icon={<CheckCircle />} />
        <BottomNavigationAction label="Counts" icon={<Tag />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </Paper>
  );
}

/** Fully interactive — tap an action and toggle `showLabels` in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => <BottomNavDemo showLabels={args.showLabels} />,
};

/** With `showLabels` on, every station label stays visible for glanceable navigation. */
export const WithLabels: Story = {
  parameters: {
    docs: { description: { story: 'All labels shown at once — useful on wider expo displays where every station should read clearly.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <BottomNavDemo showLabels />
    </Box>
  ),
};

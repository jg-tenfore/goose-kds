import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import Print from '@mui/icons-material/Print';
import Restore from '@mui/icons-material/Restore';
import PriorityHigh from '@mui/icons-material/PriorityHigh';

// Ticket-level quick actions surfaced from a single floating trigger.
const actions = [
  { icon: <Print />, name: 'Print' },
  { icon: <Restore />, name: 'Recall' },
  { icon: <PriorityHigh />, name: 'Prioritize' },
];

// Named component so useState (open) obeys react-hooks/rules-of-hooks.
function SpeedDialDemo({ direction = 'up' as const }: { direction?: 'up' | 'down' | 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    // A tall relative box gives the fanned-out actions room to render inside the story.
    <Box sx={{ position: 'relative', height: 320, width: 320 }}>
      <SpeedDial
        ariaLabel="Ticket quick actions"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        direction={direction}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{ tooltip: { title: action.name } }}
            onClick={() => setOpen(false)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

const meta = {
  title: 'Components/Actions/Speed Dial',
  component: SpeedDialDemo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A `SpeedDial` is a floating action button that fans out into related actions when opened. ' +
          'On the KDS it packs a ticket\'s secondary actions — **Print**, **Recall**, **Prioritize** — behind one thumb-friendly trigger, ' +
          'keeping the board uncluttered. Hover or tap the button to reveal the actions.',
      },
    },
  },
} satisfies Meta<typeof SpeedDialDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Open the dial to reveal Print, Recall, and Prioritize actions. */
export const Playground: Story = {};

/** The same actions fanning out to the left instead of up. */
export const LeftDirection: Story = {
  parameters: { docs: { description: { story: 'Set `direction="left"` when the trigger sits at a screen edge and should open inward.' } } },
  render: () => <SpeedDialDemo direction="left" />,
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewModule from '@mui/icons-material/ViewModule';
import ViewStream from '@mui/icons-material/ViewStream';

/**
 * ToggleButtonGroup — a segmented, mutually-exclusive choice such as the KDS
 * board view mode (dynamic flow vs fixed grid). For a binary on/off setting,
 * use the Switch instead.
 */
function ToggleDemo() {
  const [mode, setMode] = useState('flow');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
      <ToggleButtonGroup
        exclusive
        value={mode}
        onChange={(_, v) => v && setMode(v)}
        aria-label="board mode"
      >
        <ToggleButton value="flow">
          <ViewStream sx={{ mr: 1 }} /> Dynamic flow
        </ToggleButton>
        <ToggleButton value="grid">
          <ViewModule sx={{ mr: 1 }} /> Fixed grid
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

const meta = {
  title: 'Components/Forms/Toggle Button',
  component: ToggleDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `ToggleButtonGroup` for a segmented, mutually-exclusive choice — for example the KDS board view mode (dynamic flow vs fixed grid). ' +
          'Click a button to switch modes. For a binary on/off setting use **Switch** instead.',
      },
    },
  },
} satisfies Meta<typeof ToggleDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle: Story = {};

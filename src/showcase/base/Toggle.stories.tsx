import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Box,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ViewModule from '@mui/icons-material/ViewModule';
import ViewStream from '@mui/icons-material/ViewStream';

function ToggleDemo() {
  const [mode, setMode] = useState('flow');
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
      <FormControlLabel control={<Switch defaultChecked />} label="New-ticket sound" />
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
  title: 'Base Components/Toggle',
  component: ToggleDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToggleDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle: Story = {};

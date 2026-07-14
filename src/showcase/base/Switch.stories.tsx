import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, FormControlLabel, FormGroup, Switch as MuiSwitch, Typography } from '@mui/material';

/**
 * Native MUI Switch — for binary on/off settings such as the KDS
 * "New-ticket sound" chime (see KDS Screens › Settings / Setup).
 */
function SwitchDemo() {
  const [sound, setSound] = useState(true);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-start' }}>
      <FormControlLabel
        control={<MuiSwitch checked={sound} onChange={(e) => setSound(e.target.checked)} />}
        label="New-ticket sound"
      />

      <FormGroup>
        <FormControlLabel control={<MuiSwitch defaultChecked />} label="On" />
        <FormControlLabel control={<MuiSwitch />} label="Off" />
        <FormControlLabel control={<MuiSwitch defaultChecked disabled />} label="Disabled (on)" />
        <FormControlLabel control={<MuiSwitch disabled />} label="Disabled (off)" />
      </FormGroup>

      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Small
        </Typography>
        <MuiSwitch size="small" defaultChecked />
        <Typography variant="body2" color="text.secondary">
          Medium
        </Typography>
        <MuiSwitch defaultChecked />
      </Box>
    </Box>
  );
}

const meta = {
  title: 'Components/Forms/Switch',
  component: SwitchDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Switch` for a binary on/off setting — for example the KDS **New-ticket sound** chime (see KDS Screens › Settings / Setup). ' +
          'Toggle the first switch to see it work; the rest show the on / off, disabled, and small / medium variants. For a segmented multi-option choice use **Toggle** instead.',
      },
    },
  },
} satisfies Meta<typeof SwitchDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Switch: Story = {};

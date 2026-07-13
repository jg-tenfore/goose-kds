import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

function TabsDemo() {
  const [value, setValue] = useState(0);
  const labels = ['Open / Pending', 'Completed', 'All-day counts'];
  return (
    <Box sx={{ width: 520 }}>
      <Tabs value={value} onChange={(_, v) => setValue(v)}>
        {labels.map((l) => (
          <Tab key={l} label={l} />
        ))}
      </Tabs>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Panel: {labels[value]}
        </Typography>
      </Box>
    </Box>
  );
}

const meta = {
  title: 'Components/Navigation/Tabs',
  component: TabsDemo,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TabsDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tabs_: Story = { name: 'Tabs' };

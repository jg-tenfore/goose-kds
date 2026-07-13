import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Slider, Typography } from '@mui/material';

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Box sx={{ width: 320 }}>
      <Slider {...args} defaultValue={40} valueLabelDisplay="auto" />
    </Box>
  ),
};

export const Variants: Story = {
  render: () => (
    <Box sx={{ width: 320, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="caption">Continuous</Typography>
        <Slider defaultValue={30} />
      </Box>
      <Box>
        <Typography variant="caption">Range</Typography>
        <Slider defaultValue={[20, 60]} valueLabelDisplay="auto" />
      </Box>
      <Box>
        <Typography variant="caption">Marks / steps</Typography>
        <Slider defaultValue={4} min={0} max={10} step={1} marks valueLabelDisplay="auto" />
      </Box>
    </Box>
  ),
};

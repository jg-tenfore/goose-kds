import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Paper, Typography } from '@mui/material';

const meta = {
  title: 'Components/Layout & Structure/Paper',
  component: Paper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Paper` — the base elevated surface almost every other MUI container is built on. ' +
          'In the KDS it is the raw panel behind station columns, ticket rails, and popovers, letting you dial in shadow depth (`elevation`) or swap to a flat `outlined` border. ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['elevation', 'outlined'],
      description: 'Shadow-based surface or a flat bordered surface.',
      table: { defaultValue: { summary: 'elevation' } },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth 0–24 (elevation variant only).',
      table: { defaultValue: { summary: '1' } },
    },
    square: {
      control: 'boolean',
      description: 'Removes the rounded corners.',
    },
  },
  args: {
    variant: 'elevation',
    elevation: 1,
    square: false,
    children: <></>,
  },
} satisfies Meta<typeof Paper>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => (
    <Paper {...args} sx={{ width: 220, height: 120, display: 'grid', placeItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Grill station
      </Typography>
    </Paper>
  ),
};

/** The elevation scale — how shadow depth reads at increasing levels. */
export const ElevationScale: Story = {
  parameters: {
    docs: { description: { story: 'Elevation 0, 1, 3, 6, 12, and 24 side by side.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', p: 2 }}>
      {[0, 1, 3, 6, 12, 24].map((level) => (
        <Paper
          key={level}
          elevation={level}
          sx={{ width: 96, height: 96, display: 'grid', placeItems: 'center' }}
        >
          <Typography variant="body2" color="text.secondary">
            {level}
          </Typography>
        </Paper>
      ))}
    </Box>
  ),
};

/** Outlined vs. elevated — flat bordered surface next to a shadowed one. */
export const OutlinedVsElevated: Story = {
  parameters: {
    docs: { description: { story: 'The flat `outlined` variant next to the default `elevation` variant.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
      <Paper variant="outlined" sx={{ width: 160, height: 110, display: 'grid', placeItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Outlined
        </Typography>
      </Paper>
      <Paper elevation={4} sx={{ width: 160, height: 110, display: 'grid', placeItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Elevation 4
        </Typography>
      </Paper>
    </Box>
  ),
};

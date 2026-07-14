import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Skeleton } from '@mui/material';

const meta = {
  title: 'Components/Feedback & Status/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Skeleton` — a placeholder that mirrors the shape of content while it loads, reducing layout shift and perceived wait. ' +
          'In the KDS it stands in for ticket cards while orders stream in from the POS, keeping the board stable during network latency. ' +
          'Edit the props in the **Controls** panel to preview each shape and animation, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Placeholder shape.',
      table: { defaultValue: { summary: 'text' } },
    },
    width: { control: 'number', description: 'Width in pixels.' },
    height: { control: 'number', description: 'Height in pixels.' },
    animation: {
      control: 'inline-radio',
      options: ['pulse', 'wave', false],
      description: 'Loading animation (or `false` to disable).',
      table: { defaultValue: { summary: 'pulse' } },
    },
  },
  args: {
    variant: 'rounded',
    width: 240,
    height: 60,
    animation: 'pulse',
  },
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change shape, size, and animation in the **Controls** panel. */
export const Playground: Story = {};

/** The four skeleton shapes side by side. */
export const Variants: Story = {
  parameters: {
    docs: { description: { story: 'Text, circular, rectangular, and rounded placeholders.' } },
  },
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
      <Skeleton variant="text" width={160} sx={{ fontSize: '1.5rem' }} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width={120} height={72} />
      <Skeleton variant="rounded" width={120} height={72} />
    </Box>
  ),
};

/** Several skeletons composed into a placeholder for a loading ticket card. */
export const LoadingTicketCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A ticket-card placeholder: a media block for the item image, a circular avatar for the server, header and body text lines, and a footer action — shown while the order loads from the POS.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        width: 280,
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Skeleton variant="rounded" width="100%" height={120} />
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" width="40%" />
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
      </Box>
      <Skeleton variant="rounded" width={96} height={36} sx={{ mt: 2 }} />
    </Box>
  ),
};

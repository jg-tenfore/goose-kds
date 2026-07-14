import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, Chip, Stack } from '@mui/material';
import type { ChipProps } from '@mui/material';
import Done from '@mui/icons-material/Done';
import Restaurant from '@mui/icons-material/Restaurant';

/** Playground args: `onDelete` is exposed as a boolean toggle rather than a handler. */
type ChipArgs = Omit<ChipProps, 'onDelete'> & { onDelete?: boolean };

const meta = {
  title: 'Components/Typography & Content/Chip',
  // Cast because the Playground exposes `onDelete` as a boolean toggle (ChipArgs) rather than a handler.
  component: Chip as unknown as React.ComponentType<ChipArgs>,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `Chip` — a compact element for tags, attributes, filters, and status labels such as course, allergen, or station markers on a ticket. ' +
          'It supports `filled` and `outlined` variants, semantic `color`s, two `size`s, and an optional leading `icon` or `avatar`. ' +
          'Add `onDelete` to make it removable and `onClick` to make it interactive. ' +
          'Edit the props in the **Controls** panel below to preview combinations live.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Text shown inside the chip.' },
    variant: {
      control: 'inline-radio',
      options: ['filled', 'outlined'],
      description: 'Visual style.',
      table: { defaultValue: { summary: 'filled' } },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Semantic color.',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      description: 'Chip density.',
      table: { defaultValue: { summary: 'medium' } },
    },
    disabled: { control: 'boolean', description: 'Disables interaction.' },
    onDelete: {
      control: 'boolean',
      description: 'When enabled, shows a delete affordance.',
    },
  },
  args: {
    label: 'Chip',
    variant: 'filled',
    color: 'default',
    size: 'medium',
    disabled: false,
    onDelete: false,
  },
} satisfies Meta<ChipArgs>;
export default meta;
type Story = StoryObj<typeof meta>;

/** A single Chip — change any prop in the **Controls** panel. Toggle `onDelete` for a removable chip. */
export const Playground: Story = {
  render: ({ onDelete, ...args }) => (
    <Chip {...args} onDelete={onDelete ? () => {} : undefined} />
  ),
};

/** Every semantic color in filled and outlined form. */
export const Colors: Story = {
  parameters: { docs: { description: { story: 'Filled (top) and outlined (bottom) chips across semantic colors.' } } },
  render: () => (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
        <Chip label="Default" />
        <Chip label="Primary" color="primary" />
        <Chip label="Success" color="success" />
        <Chip label="Warning" color="warning" />
        <Chip label="Error" color="error" />
        <Chip label="Info" color="info" />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
        <Chip label="Default" variant="outlined" />
        <Chip label="Primary" variant="outlined" color="primary" />
        <Chip label="Success" variant="outlined" color="success" />
        <Chip label="Warning" variant="outlined" color="warning" />
        <Chip label="Error" variant="outlined" color="error" />
        <Chip label="Info" variant="outlined" color="info" />
      </Stack>
    </Stack>
  ),
};

/** The two available sizes. */
export const Sizes: Story = {
  parameters: { docs: { description: { story: '`small` and `medium` (default) chips.' } } },
  render: () => (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <Chip label="Small" size="small" color="primary" />
      <Chip label="Medium" size="medium" color="primary" />
    </Stack>
  ),
};

/** Chips with a leading icon or an avatar. */
export const WithIconAndAvatar: Story = {
  parameters: { docs: { description: { story: 'A leading `icon` and an `avatar` slot.' } } },
  render: () => (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
      <Chip icon={<Done />} label="Ready" color="success" />
      <Chip icon={<Restaurant />} label="Dine-in" variant="outlined" />
      <Chip avatar={<Avatar>ES</Avatar>} label="Expo Station" />
    </Stack>
  ),
};

/** Interactive chips that respond to click and delete. */
export const DeletableAndClickable: Story = {
  parameters: { docs: { description: { story: 'Chips wired with `onClick` and `onDelete`.' } } },
  render: () => (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }} useFlexGap>
      <Chip label="Deletable" onDelete={() => {}} />
      <Chip label="Deletable outlined" variant="outlined" color="primary" onDelete={() => {}} />
      <Chip label="Clickable" onClick={() => {}} />
      <Chip label="Clickable + deletable" onClick={() => {}} onDelete={() => {}} color="primary" />
    </Stack>
  ),
};

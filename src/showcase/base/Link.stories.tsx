import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Link, Stack, Typography } from '@mui/material';
import OpenInNew from '@mui/icons-material/OpenInNew';

const meta = {
  title: 'Components/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Inline navigational text, built on MUI `Link`. ' +
          'Across the golf-diner KDS it carries lightweight cross-references — jumping from a ticket to its order detail, opening the item-availability doc, or linking a member profile — without the weight of a button. ' +
          'Control the `underline` behaviour, semantic `color`, and typographic `variant` to fit inline body copy or standalone actions.',
      },
    },
  },
  argTypes: {
    children: { control: 'text', description: 'Link text.' },
    underline: {
      control: 'inline-radio',
      options: ['none', 'hover', 'always'],
      description: 'When the underline appears.',
      table: { defaultValue: { summary: 'always' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'textPrimary', 'textSecondary', 'error', 'inherit'],
      description: 'Semantic text color.',
      table: { defaultValue: { summary: 'primary' } },
    },
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'subtitle1', 'button', 'caption'],
      description: 'Typography scale.',
      table: { defaultValue: { summary: 'inherit' } },
    },
  },
  args: {
    children: 'View order #1042',
    underline: 'always',
    color: 'primary',
    variant: 'body1',
  },
} satisfies Meta<typeof Link>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => <Link href="#" {...args} />,
};

/** A link reads naturally inside body copy. */
export const WithinParagraph: Story = {
  parameters: { docs: { description: { story: 'An inline link inside a sentence of running text.' } } },
  render: () => (
    <Typography variant="body1" sx={{ maxWidth: 420 }}>
      Ticket #1042 is running long. Open the{' '}
      <Link href="#" underline="hover">
        item availability
      </Link>{' '}
      panel to check the 86&apos;d list before firing the next course.
    </Typography>
  ),
};

/** A row of standalone links, e.g. a footer or quick-jump strip. */
export const RowOfLinks: Story = {
  parameters: { docs: { description: { story: 'Several links laid out horizontally as a quick-jump strip.' } } },
  render: () => (
    <Stack direction="row" spacing={3}>
      <Link href="#" underline="hover">Open</Link>
      <Link href="#" underline="hover">Completed</Link>
      <Link href="#" underline="hover">All-day counts</Link>
      <Link href="#" underline="hover">Settings</Link>
    </Stack>
  ),
};

/** Pair a link with a trailing icon to signal an external or new-tab destination. */
export const WithIcon: Story = {
  parameters: { docs: { description: { story: 'A link with a trailing icon indicating it opens elsewhere.' } } },
  render: () => (
    <Link
      href="#"
      underline="hover"
      sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
    >
      Open member profile
      <OpenInNew fontSize="small" />
    </Link>
  ),
};

/** Semantic colors map links to context — primary for nav, error for destructive references. */
export const Colors: Story = {
  parameters: { docs: { description: { story: 'The same link across the semantic color options.' } } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Link href="#" color="primary">Primary — view order</Link>
      <Link href="#" color="secondary">Secondary — view station</Link>
      <Link href="#" color="textPrimary">Text primary — inline reference</Link>
      <Link href="#" color="error">Error — void ticket</Link>
    </Box>
  ),
};

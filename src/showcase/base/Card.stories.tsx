import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const meta = {
  title: 'Components/Layout & Structure/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Card` — a contained surface that groups a single subject (header, media, content, and actions) into one bordered/elevated block. ' +
          'In the KDS it backs summary tiles such as a **station load** metric, a **menu item** detail, or a **shift recap** card on the dashboard. ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['elevation', 'outlined'],
      description: 'Elevated (shadow) or outlined (border) surface.',
      table: { defaultValue: { summary: 'elevation' } },
    },
    raised: {
      control: 'boolean',
      description: 'Applies a stronger shadow (elevation variant only).',
    },
  },
  args: {
    variant: 'elevation',
    raised: false,
    children: <></>,
  },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => (
    <Card {...args} sx={{ width: 320 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <RestaurantIcon />
          </Avatar>
        }
        title="Clubhouse Burger"
        subheader="Grill station"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          8 oz patty, aged cheddar, brioche bun. Avg prep time 6 min.
        </Typography>
      </CardContent>
    </Card>
  ),
};

/** A simple content card with a media banner. */
export const Basic: Story = {
  parameters: {
    docs: { description: { story: 'Header, media banner, and a block of body copy.' } },
  },
  render: (args) => (
    <Card {...args} sx={{ width: 320 }}>
      <CardMedia sx={{ height: 120, bgcolor: 'action.hover' }} title="Menu photo" />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Turn Dog
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quarter-pound all-beef frank with the works. A halfway-house favorite between nines.
        </Typography>
      </CardContent>
    </Card>
  ),
};

/** Card with an actions row of buttons. */
export const WithActions: Story = {
  parameters: {
    docs: { description: { story: 'A `CardActions` footer holding primary and secondary buttons.' } },
  },
  render: (args) => (
    <Card {...args} sx={{ width: 320 }}>
      <CardHeader title="Ticket #142" subheader="Table 7 · 2 items" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Waiting on Fryer — basket of wings still in the queue.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          Bump
        </Button>
        <Button size="small" color="inherit">
          Recall
        </Button>
      </CardActions>
    </Card>
  ),
};

/** A compact stat / metric card for dashboard KPIs. */
export const StatCard: Story = {
  parameters: {
    docs: { description: { story: 'A minimal metric card — big number plus label and trend.' } },
  },
  render: (args) => (
    <Card {...args} sx={{ width: 220 }}>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          Avg ticket time
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 600 }}>
          6:42
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="success.main">
            ↓ 0:38 vs. yesterday
          </Typography>
        </Box>
      </CardContent>
    </Card>
  ),
};

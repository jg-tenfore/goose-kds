import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';

const meta = {
  title: 'Application Components/Card Headers',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardHeaders: Story = {
  render: () => (
    <Card sx={{ width: 340 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>#42</Avatar>}
        action={
          <IconButton>
            <MoreVert />
          </IconButton>
        }
        title="Ticket #42 — Dine-in"
        subheader="Fired 4m ago · Grill"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          2× Clubhouse Burger · 1× Fries · No onions
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Recall</Button>
        <Button size="small" variant="contained">
          Complete
        </Button>
      </CardActions>
    </Card>
  ),
};

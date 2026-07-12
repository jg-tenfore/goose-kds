import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Menu from '@mui/icons-material/Menu';

const meta = {
  title: 'Application Components/Header Navigations',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderNavigations: Story = {
  render: () => (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          🪿 Goose KDS
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit">Open</Button>
        <Button color="inherit">Completed</Button>
        <Button color="inherit">All-day</Button>
        <Avatar sx={{ ml: 2, width: 32, height: 32 }}>IK</Avatar>
      </Toolbar>
    </AppBar>
  ),
};

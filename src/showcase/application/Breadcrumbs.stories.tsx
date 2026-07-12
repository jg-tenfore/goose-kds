import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const meta = {
  title: 'Application Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Breadcrumbs_: Story = {
  name: 'Breadcrumbs',
  render: () => (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" href="#">
        Settings
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Stations
      </Link>
      <Typography color="text.primary">Grill 1</Typography>
    </Breadcrumbs>
  ),
};

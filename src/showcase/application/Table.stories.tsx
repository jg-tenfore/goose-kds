import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ROWS = [
  ['#41', 'Grill', 'Dine-in', '6m', 'Late'],
  ['#42', 'Fry', 'Pickup', '3m', 'Warning'],
  ['#43', 'Cold', 'Dine-in', '1m', 'Normal'],
  ['#44', 'Beverage', 'Delivery', '0m', 'Normal'],
];

const color = (s: string) =>
  s === 'Late' ? 'error' : s === 'Warning' ? 'warning' : 'default';

const meta = {
  title: 'Application Components/Table',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Table_: Story = {
  name: 'Table',
  render: () => (
    <TableContainer component={Paper} variant="outlined" sx={{ width: 560 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticket</TableCell>
            <TableCell>Station</TableCell>
            <TableCell>Dining option</TableCell>
            <TableCell>Elapsed</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ROWS.map((r) => (
            <TableRow key={r[0]} hover>
              <TableCell>{r[0]}</TableCell>
              <TableCell>{r[1]}</TableCell>
              <TableCell>{r[2]}</TableCell>
              <TableCell>{r[3]}</TableCell>
              <TableCell>
                <Chip label={r[4]} size="small" color={color(r[4]) as 'error' | 'warning' | 'default'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

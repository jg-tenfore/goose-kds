import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// MUI X Data Grid (community). Sorting, filtering, pagination, selection out of the box.
const statusColor = (s: string) =>
  s === 'Late' ? 'error' : s === 'Warning' ? 'warning' : s === 'Priority' ? 'info' : 'default';

const columns: GridColDef[] = [
  { field: 'ticket', headerName: 'Ticket', width: 90 },
  { field: 'station', headerName: 'Station', width: 120 },
  { field: 'dining', headerName: 'Dining option', width: 140 },
  { field: 'source', headerName: 'Source', width: 110 },
  { field: 'elapsed', headerName: 'Elapsed', width: 100, type: 'number' },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => (
      <Chip
        label={params.value as string}
        size="small"
        color={statusColor(params.value as string) as 'error' | 'warning' | 'info' | 'default'}
      />
    ),
  },
];

const rows = [
  { id: 1, ticket: '#41', station: 'Grill', dining: 'Dine-in', source: 'POS', elapsed: 6, status: 'Late' },
  { id: 2, ticket: '#42', station: 'Fry', dining: 'Pickup', source: 'Kiosk', elapsed: 4, status: 'Warning' },
  { id: 3, ticket: '#43', station: 'Cold', dining: 'Dine-in', source: 'Mobile', elapsed: 2, status: 'Priority' },
  { id: 4, ticket: '#44', station: 'Beverage', dining: 'Delivery', source: 'POS', elapsed: 1, status: 'Normal' },
  { id: 5, ticket: '#45', station: 'Grill', dining: 'Dine-in', source: 'POS', elapsed: 0, status: 'Normal' },
  { id: 6, ticket: '#46', station: 'Expo', dining: 'Pickup', source: 'Mobile', elapsed: 3, status: 'Warning' },
  { id: 7, ticket: '#47', station: 'Fry', dining: 'Dine-in', source: 'Kiosk', elapsed: 5, status: 'Late' },
];

const meta = {
  title: 'Components/Layout & Structure/Data Grid',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DataGrid_: Story = {
  name: 'Data Grid',
  render: () => (
    <Box sx={{ height: 420, width: 720 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        density="comfortable"
        checkboxSelection
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
      />
    </Box>
  ),
};

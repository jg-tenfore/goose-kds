import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Autocomplete,
  Box,
  Checkbox,
  TextField,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

// Kitchen stations a ticket can be routed to on the Goose KDS.
const stations = ['Grill', 'Fryer', 'Expo', 'Cold Line', 'Beverage', 'Dessert'];

// Menu items grouped by station, for the grouped-options variant.
type MenuItem = { label: string; station: string };
const menu: MenuItem[] = [
  { label: 'Clubhouse Burger', station: 'Grill' },
  { label: 'Turkey Club', station: 'Grill' },
  { label: 'Basket of Fries', station: 'Fryer' },
  { label: 'Fried Pickles', station: 'Fryer' },
  { label: 'Caesar Salad', station: 'Cold Line' },
  { label: 'Fruit Cup', station: 'Cold Line' },
  { label: 'Arnold Palmer', station: 'Beverage' },
  { label: 'Cold Brew', station: 'Beverage' },
];

const meta = {
  title: 'Components/Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'MUI `Autocomplete` pairs a `TextField` with a filtered, type-ahead popup — ideal on the KDS for picking a **station** to route a ticket to, ' +
          'tagging an order with menu items, or searching a long list without scrolling. ' +
          'It supports single- and multi-select, free-solo entry for ad-hoc values, grouped options, and inline checkboxes. ' +
          'Adjust the props in the **Controls** panel to preview each mode live.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disables the field.' },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium'],
      description: 'Control density.',
      table: { defaultValue: { summary: 'medium' } },
    },
    disableClearable: { control: 'boolean', description: 'Hide the clear (×) button.' },
    fullWidth: { control: 'boolean', description: 'Expand to the container width.' },
  },
  args: {
    disabled: false,
    size: 'medium',
    disableClearable: false,
    fullWidth: false,
    options: stations,
    sx: { width: 320 },
    renderInput: (params) => <TextField {...params} label="Route to station" placeholder="Select a station" />,
  },
} satisfies Meta<typeof Autocomplete>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Single-select — start typing to filter the list of KDS stations. */
export const Playground: Story = {};

/** Multi-select renders each choice as a removable Chip. */
export const MultipleWithChips: Story = {
  parameters: {
    docs: { description: { story: 'Tag a ticket with several stations at once; selections appear as removable chips.' } },
  },
  render: (args) => (
    <Autocomplete
      multiple
      size={args.size}
      disabled={args.disabled}
      sx={{ width: 320 }}
      options={stations}
      defaultValue={['Grill', 'Fryer']}
      renderInput={(params) => <TextField {...params} label="Route to stations" placeholder="Add stations" />}
    />
  ),
};

/** Free-solo lets expo staff type a value that isn't in the list. */
export const FreeSolo: Story = {
  parameters: {
    docs: { description: { story: 'Free-solo allows ad-hoc entries — e.g. an off-menu special that has no preset option.' } },
  },
  render: (args) => (
    <Autocomplete
      freeSolo
      size={args.size}
      disabled={args.disabled}
      sx={{ width: 320 }}
      options={menu.map((m) => m.label)}
      renderInput={(params) => <TextField {...params} label="Item" placeholder="Type or pick an item" />}
    />
  ),
};

/** Grouped options bucket menu items under their station heading. */
export const Grouped: Story = {
  parameters: {
    docs: { description: { story: 'Options grouped by station make a long menu easier to scan.' } },
  },
  render: (args) => (
    <Autocomplete
      size={args.size}
      disabled={args.disabled}
      sx={{ width: 320 }}
      options={[...menu].sort((a, b) => a.station.localeCompare(b.station))}
      groupBy={(option: MenuItem) => option.station}
      getOptionLabel={(option: MenuItem) => option.label}
      renderInput={(params) => <TextField {...params} label="Menu item" placeholder="Search the menu" />}
    />
  ),
};

// Named component so the checkbox demo can keep its own state without breaking
// react-hooks/rules-of-hooks.
function CheckboxAutocompleteDemo() {
  const [value, setValue] = useState<string[]>(['Grill']);
  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={stations}
      value={value}
      onChange={(_e, next) => setValue(next)}
      sx={{ width: 320 }}
      renderOption={(props, option, { selected }) => {
        const { key, ...rest } = props;
        return (
          <Box component="li" key={key} {...rest}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </Box>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Stations on this display" placeholder="Choose stations" />}
    />
  );
}

/** Inline checkboxes keep the popup open for fast multi-select. */
export const WithCheckboxes: Story = {
  parameters: {
    docs: { description: { story: 'Checkbox options with `disableCloseOnSelect` let a manager tick several stations in one pass.' } },
  },
  render: () => <CheckboxAutocompleteDemo />,
};

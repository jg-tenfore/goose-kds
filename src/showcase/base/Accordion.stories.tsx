import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const meta = {
  title: 'Components/Layout & Structure/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Native MUI `Accordion` (with `AccordionSummary` + `AccordionDetails`) for progressively disclosing grouped content behind an expandable header. ' +
          'In the KDS it is handy for **Settings / Setup** panels — collapsing rarely-touched sections like station routing, sound, and printer options so the operator sees one group at a time. ' +
          'Edit the props in the **Controls** panel below to preview every combination live, then **Show code** to copy the result.',
      },
    },
  },
  argTypes: {
    disableGutters: {
      control: 'boolean',
      description: 'Removes the extra margin/gutter added when the panel expands.',
    },
    square: {
      control: 'boolean',
      description: 'Disables the rounded corners for a squared-off edge.',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Renders the panel expanded on first mount (uncontrolled).',
    },
  },
  args: {
    disableGutters: false,
    square: false,
    defaultExpanded: false,
    children: <></>,
  },
} satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fully interactive — change any prop in the **Controls** panel. */
export const Playground: Story = {
  render: (args) => (
    <Accordion {...args} sx={{ width: 360 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Station routing</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" color="text.secondary">
          Choose which stations the Grill, Fryer, and Beverage tickets are sent to.
        </Typography>
      </AccordionDetails>
    </Accordion>
  ),
};

/** Several settings sections stacked — the common "grouped options" layout. */
export const MultiplePanels: Story = {
  parameters: {
    docs: { description: { story: 'Multiple independent panels, each toggling on its own.' } },
  },
  render: (args) => (
    <Box sx={{ width: 380 }}>
      <Accordion {...args} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Station routing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Route Grill, Fryer, and Beverage tickets to their prep stations.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion {...args}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Sound & alerts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            New-ticket chime, overdue alarm, and volume.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion {...args}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Printers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Assign a receipt printer to each station.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  ),
};

const SECTIONS = [
  { id: 'routing', label: 'Station routing', body: 'Route tickets to Grill, Fryer, and Beverage stations.' },
  { id: 'sound', label: 'Sound & alerts', body: 'New-ticket chime, overdue alarm, and volume.' },
  { id: 'printers', label: 'Printers', body: 'Assign a receipt printer to each station.' },
];

/** Controlled single-open ("exclusive") accordion — opening one closes the others. */
function ControlledAccordion() {
  const [open, setOpen] = useState<string | false>('routing');
  return (
    <Box sx={{ width: 380 }}>
      {SECTIONS.map((section) => (
        <Accordion
          key={section.id}
          expanded={open === section.id}
          onChange={(_, isExpanded) => setOpen(isExpanded ? section.id : false)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{section.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {section.body}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

/** Only one panel open at a time, driven by `useState` and the controlled `expanded` prop. */
export const SingleOpen: Story = {
  parameters: {
    docs: { description: { story: 'Controlled accordion where expanding a panel collapses the previously open one.' } },
  },
  render: () => <ControlledAccordion />,
};

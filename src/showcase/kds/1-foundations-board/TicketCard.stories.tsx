import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsTicketCard } from '../../../kds/components/KdsTicketCard';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';
import type { Ticket } from '../../../kds/types';

const byId = (id: string) => seedTickets.find((t) => t.id === id)!;

const meta = {
  title: 'KDS Screens/1 · Foundations & Board/Ticket Card & Detail',
  component: KdsTicketCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('dark')}>
        <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'inline-flex' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof KdsTicketCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Multi-course ticket with modifiers, courses, fire chip, and overflow footer. */
export const Standard: Story = { args: { ticket: byId('t-108') } };

/** Prioritized — accent stripe + labeled banner (legible without color alone). */
export const Prioritized: Story = { args: { ticket: byId('t-25') } };

/** Late — with a fire-timer feel via state banner. */
export const Late: Story = { args: { ticket: byId('t-cambria') } };

/** Recalled — brought back after completion, with an allergy/VIP elevation. */
export const Recalled: Story = { args: { ticket: byId('t-kurt') } };

/** Long content that overflows into the next column ("Continued…"). */
export const Warning: Story = { args: { ticket: byId('t-jonny') } };

const allergyTicket: Ticket = {
  id: 'demo-allergy',
  label: 'Table 12',
  source: 'pos',
  fulfillment: 'for-here',
  elapsedLabel: '2m',
  state: 'active',
  courses: [
    {
      name: '',
      items: [
        {
          id: 'x1',
          quantity: 1,
          name: 'Pad Thai',
          modifiers: [{ label: 'Add Shrimp', kind: 'add' }],
          allergy: 'PEANUT ALLERGY',
        },
      ],
    },
  ],
};

/** Allergy elevation — critical note is surfaced, never silently truncated. */
export const AllergyElevation: Story = { args: { ticket: allergyTicket } };

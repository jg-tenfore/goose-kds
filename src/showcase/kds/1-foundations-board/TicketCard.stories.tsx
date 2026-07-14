import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsTicketCard } from '../../../kds/components/KdsTicketCard';
import { createKdsTheme } from '../../../kds/theme';
import { seedTickets } from '../../../kds/fixtures';

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

/** Standard takeout ticket — modifiers, multiple items (turn-window mobile order). */
export const Standard: Story = { args: { ticket: byId('t-mobile-a47') } };

/** Prioritized — group with an imminent tee time; accent stripe + labeled banner. */
export const Prioritized: Story = { args: { ticket: byId('t-shotgun') } };

/** Late — takeout past the wait window while the kitchen is backed up. */
export const Late: Story = { args: { ticket: byId('t-mobile-a51') } };

/** Recalled — bumped too early, brought back for a remake. */
export const Recalled: Story = { args: { ticket: byId('t-t3') } };

/** Warning — dine-in approaching the wait window. */
export const Warning: Story = { args: { ticket: byId('t-t6') } };

/** Coursed ticket (Starters/Mains) with fire chip and "Continued…" overflow. */
export const Coursed: Story = { args: { ticket: byId('t-t9') } };

/** Allergy elevation — critical note is surfaced, never silently truncated. */
export const AllergyElevation: Story = { args: { ticket: byId('t-t1') } };

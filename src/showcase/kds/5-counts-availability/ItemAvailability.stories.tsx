import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material';
import { createKdsTheme } from '../../../kds/theme';
import { ItemAvailabilityPanel } from '../../../kds/counts/ItemAvailabilityPanel';
import { seedAvailability } from '../../../kds/counts/availability-model';

/**
 * Item Availability (TF-181 + TF-183) — manager-controlled available / limited /
 * 86 toggles, permission-gated and logged (item_availability_changed). Interactive:
 * change an availability toggle to watch upstream sources sync (pending → synced
 * or failed), while local-only sources stay clearly labeled. A failed sync is
 * surfaced loudly — the upstream menu may still be selling the item.
 * Setting: TenFore Grill — "The Turn".
 */
const meta = {
  title: 'KDS Screens/5 · Counts & Availability/Item Availability',
  component: ItemAvailabilityPanel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('dark')}>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ItemAvailabilityPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Manager view (default). Toggle an upstream item (e.g. Cheeseburger) to see it
 * go Syncing… → Synced. Local-only items (Bratwurst, Soft Pretzel) show "Local
 * only" and never claim to reach the register. The seed list starts with one
 * pre-failed row (Fish & Chips) so the failure alert is visible at rest.
 */
export const ManagerDefault: Story = {
  name: 'Manager · interactive (syncs succeed)',
  args: { canManage: true, syncBehavior: 'succeed', items: seedAvailability },
};

/**
 * Failure path — every new upstream sync fails. Toggle any upstream item and it
 * lands in "Sync failed" with a Retry button; the top alert lists everything the
 * upstream menu may still accept.
 */
export const SyncFailures: Story = {
  name: 'Manager · sync failures + retry',
  args: { canManage: true, syncBehavior: 'fail', items: seedAvailability },
};

/**
 * Permission-gated (read-only). No manager sign-in — toggles are disabled and a
 * lock note explains why. The pre-failed row still surfaces its alert.
 */
export const ReadOnly: Story = {
  name: 'Read-only · no manager permission',
  args: { canManage: false, items: seedAvailability },
};

/** Light variant of the manager view. */
export const Light: Story = {
  name: 'Manager · light',
  args: { canManage: true, syncBehavior: 'succeed', items: seedAvailability },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('light')}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

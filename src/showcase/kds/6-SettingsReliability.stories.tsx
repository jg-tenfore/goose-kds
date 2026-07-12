import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/6 · Settings & Reliability',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Settings: Story = {
  name: 'Settings / Setup',
  args: {
    title: 'Settings / Setup',
    description: 'Self-serve device configuration — station, routing rules, layout, timers — no code needed.',
    contains: ['Device identity + station assignment', 'Routing rule authoring (test before publish)', 'Layout / text size / board mode / header style', 'Timer thresholds, sound, completion/recall behavior', 'Role/PIN guardrails'],
    issues: ['CRANE-149', 'CRANE-187'],
  },
};

export const PinLock: Story = {
  name: 'PIN Lock',
  args: {
    title: 'PIN Lock',
    description: 'Locked-screen sign-in and protected-action gate for a shared kitchen device.',
    contains: ['Locked / entering / invalid / success states', 'Lockout + reset path', 'Auto-lock timeout', 'Role boundaries'],
    issues: ['CRANE-150'],
  },
};

export const OfflineSync: Story = {
  name: 'Offline / Sync',
  args: {
    title: 'Offline / Sync',
    description: 'Trust through sync visibility — usable offline, reconnect-safe, no duplicate work.',
    contains: ['Offline banner + last-sync + sync states', 'Local cache survival on refresh', 'Queued-action replay (no dupes)', 'Local-network path for in-house orders'],
    issues: ['CRANE-185', 'CRANE-186'],
  },
};

export const Reporting: Story = {
  name: 'Reporting / Manager Dashboard',
  args: {
    title: 'Reporting / Manager Dashboard',
    description: 'Simple post-shift read + live kitchen health from the audit event stream.',
    contains: ['Completed by hour, avg prep time', 'Late count, recall count, priority count, route exceptions', 'Station load / oldest ticket (live)'],
    issues: ['CRANE-184'],
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScreenPlaceholder } from './ScreenPlaceholder';

const meta = {
  title: 'KDS Screens/4 · Expo, Timers & Alerts',
  component: ScreenPlaceholder,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ScreenPlaceholder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ExpoBoard: Story = {
  name: 'Expo Board',
  args: {
    title: 'Expo Board',
    description: 'Consolidated cross-station readiness so expo can coordinate handoff without walking the line.',
    contains: ['All items per ticket with station + status', 'Ready-to-complete signal', 'Complete-order + manual override (audit)', 'Prioritize / flag from expo'],
    issues: ['CRANE-173', 'CRANE-174'],
  },
};

export const TimerStates: Story = {
  name: 'Timer States',
  args: {
    title: 'Timer States',
    description: 'Normal / warning / late urgency, driven by server time and legible without color alone.',
    contains: ['Elapsed + promised time', 'Warning + late thresholds', 'Accessible (non-color) treatment', 'New-ticket sound per device'],
    issues: ['CRANE-175', 'CRANE-176', 'CRANE-177'],
  },
};

export const CancelledModified: Story = {
  name: 'Cancelled / Modified Treatments',
  args: {
    title: 'Cancelled / Modified Board Treatments',
    description: 'Board-level treatments for orders that die or change mid-prep, with acknowledgement.',
    contains: ['Cancelled-in-progress acknowledgement', 'Added/removed/changed markers', 'Alert-fatigue guardrails'],
    issues: ['CRANE-178'],
  },
};

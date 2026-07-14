import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ThemeProvider } from '@mui/material';
import { KdsRoutingRulesPanel } from '../../../kds/ingestion/KdsRoutingRulesPanel';
import { routingRules, routingFallback } from '../../../kds/ingestion/fixtures';
import { createKdsTheme } from '../../../kds/theme';

/**
 * **Routing (config in Settings)** (TF-165 · station routing engine + fallback).
 *
 * Routing is *engine + rules*: the engine is non-visual — it evaluates each item
 * and fans it out to the right station screen(s). This informational panel
 * documents the config the engine applies: match by source / dining option /
 * item / category / fulfillment, shared-visibility items shown on multiple
 * screens, and a guaranteed **fallback** so an unmatched item is never dropped
 * (it lands on Expo and logs a route exception). Rule *authoring* lives under
 * Settings › Routing — this is a config panel, not a live board.
 */
const meta = {
  title: 'KDS Screens/2 · Order Ingestion & Routing/Routing (config in Settings)',
  component: KdsRoutingRulesPanel,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('dark')}>
        <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof KdsRoutingRulesPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

/** The active routing rules for TenFore Grill — The Turn, plus the fallback. */
export const RulesPanel: Story = {
  name: 'Routing rules panel',
  args: { rules: routingRules, fallback: routingFallback },
};

/** Light mode variant of the config panel. */
export const LightMode: Story = {
  name: 'Light mode',
  decorators: [
    (Story) => (
      <ThemeProvider theme={createKdsTheme('light')}>
        <Box sx={{ p: 3, bgcolor: 'board.canvas', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  args: { rules: routingRules, fallback: routingFallback },
};

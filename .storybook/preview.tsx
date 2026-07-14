import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '@fontsource-variable/roboto';
import { theme } from '../src/theme';

// Goose KDS runs on landscape kitchen tablets, so stories default to a
// landscape tablet frame. Switch/reset via the viewport control in the toolbar.
const KDS_VIEWPORTS = {
  tabletLandscape: {
    name: 'Tablet · Landscape',
    styles: { width: '1280px', height: '800px' },
    type: 'tablet' as const,
  },
  tabletPortrait: {
    name: 'Tablet · Portrait',
    styles: { width: '800px', height: '1280px' },
    type: 'tablet' as const,
  },
  ipadLandscape: {
    name: 'iPad · Landscape',
    styles: { width: '1024px', height: '768px' },
    type: 'tablet' as const,
  },
};

const preview: Preview = {
  // Generate a Docs page for every story (previously only ~18 stories opted in).
  tags: ['autodocs'],
  initialGlobals: {
    viewport: { value: 'tabletLandscape', isRotated: false },
  },
  parameters: {
    viewport: {
      options: KDS_VIEWPORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    // Explicit sidebar order (otherwise Storybook sorts alphabetically).
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction'],
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Border', 'Effect Styles', 'Icons', 'Logos', 'Images'],
          'Components',
          [
            'Actions',
            'Navigation',
            'Forms',
            'Feedback & Status',
            'Layout & Structure',
            'Media & Visuals',
            'Typography & Content',
          ],
          'App Chrome',
          'Account',
          ['Log in', 'Sign up', 'Forgot password', 'Verification'],
          'KDS Screens',
          [
            '1 · Foundations & Board',
            ['Active Board (Open / Pending)', 'Completed View', 'Ticket Card & Detail', 'Board Modes', 'Recently-Fulfilled Strip'],
            '2 · Order Ingestion & Routing',
            ['Incoming Order Preview', 'Order Change Markers', 'Cancelled Order State', 'Routing (config in Settings)'],
            '3 · Fulfillment Actions',
            ['Item / Ticket Completion', 'Undo Window', 'Recall / Unfulfill', 'Prioritize'],
            '4 · Expo, Timers & Alerts',
            ['Expo Board', 'Timer States', 'Cancelled / Modified Treatments'],
            '5 · Counts & Availability',
            ['All-Day Counts', 'Production Item Count v1', 'Item Availability'],
            '6 · Settings & Reliability',
            ['Settings / Setup', 'PIN Lock', 'Offline / Sync', 'Reporting / Manager Dashboard'],
          ],
          '*',
        ],
      },
    },
  },
  // Every story renders inside the KDS theme + a date-picker localization context,
  // so MUI and MUI X components are all themed and functional.
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Story />
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;

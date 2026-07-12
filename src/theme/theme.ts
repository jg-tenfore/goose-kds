import { createTheme } from '@mui/material/styles';

/**
 * Goose KDS design-system theme.
 *
 * This is the single place you customize the MUI component library:
 *   1. `palette` / `typography` / `shape` — global design tokens
 *   2. `components.*.styleOverrides` / `defaultProps` — per-component tweaks
 *
 * Everything rendered in the app and in Storybook is wrapped in a
 * <ThemeProvider theme={theme}>, so edits here flow everywhere.
 *
 * The colors below are TenFore-flavored placeholders — swap them for the
 * official brand tokens when they're finalized.
 */

// --- Custom tokens ----------------------------------------------------------
// KDS ticket-urgency states, promoted to first-class theme colors so components
// can read them like any other palette entry (theme.palette.status.late, etc.).
declare module '@mui/material/styles' {
  interface Palette {
    status: {
      normal: string;
      warning: string;
      late: string;
      recalled: string;
      priority: string;
    };
  }
  interface PaletteOptions {
    status?: Partial<Palette['status']>;
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2E7D32' }, // TenFore green (placeholder)
    secondary: { main: '#00695C' },
    // KDS urgency tokens — used by ticket cards, timers, chips.
    status: {
      normal: '#2E7D32',
      warning: '#F2C94C',
      late: '#EB5757',
      recalled: '#9B51E0',
      priority: '#2F80ED',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Roboto Variable", Roboto, system-ui, "Segoe UI", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 999 } },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
});

export default theme;

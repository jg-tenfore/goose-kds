import { createTheme } from '@mui/material/styles';

/**
 * Goose KDS design-system theme.
 *
 * Customize the MUI component library here:
 *   1. `palette` / `typography` / `shape` — global design tokens
 *   2. `components.*.defaultProps` / `styleOverrides` — per-component tweaks
 *
 * Everything (app + Storybook) renders inside <ThemeProvider theme={theme}>, so
 * edits here flow everywhere.
 *
 * TOUCH-FIRST SIZING: the KDS runs on mounted touch screens used with gloves, so
 * defaults are deliberately LARGE (see the `components` block below).
 */

// --- Custom tokens ----------------------------------------------------------
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
    fontSize: 15, // slightly larger base (default 14) for readability from a distance
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    // --- Actions -----------------------------------------------------------
    MuiButton: {
      defaultProps: { disableElevation: true, size: 'large' },
      styleOverrides: {
        root: { borderRadius: 999 },
        sizeLarge: { padding: '10px 22px', fontSize: '1rem', minHeight: 48 },
      },
    },
    MuiButtonGroup: { defaultProps: { size: 'large' } },
    MuiIconButton: {
      defaultProps: { size: 'large' },
      styleOverrides: { root: { '& .MuiSvgIcon-root': { fontSize: 26 } } },
    },
    MuiFab: { defaultProps: { size: 'large' } },
    MuiToggleButtonGroup: { defaultProps: { size: 'large' } },
    MuiToggleButton: { styleOverrides: { root: { padding: '10px 18px', fontSize: '1rem' } } },
    MuiPagination: { defaultProps: { size: 'large' } },

    // --- Inputs & fields ---------------------------------------------------
    MuiTextField: { defaultProps: { size: 'medium' } },
    MuiInputBase: { styleOverrides: { root: { fontSize: '1.05rem' } } },
    MuiOutlinedInput: { styleOverrides: { input: { paddingTop: 15, paddingBottom: 15 } } },
    MuiInputLabel: { styleOverrides: { root: { fontSize: '1.05rem' } } },
    MuiFormControlLabel: { styleOverrides: { label: { fontSize: '1.05rem' } } },

    // --- Selection controls (bigger hit areas + icons) ---------------------
    MuiCheckbox: {
      styleOverrides: { root: { padding: 10, '& .MuiSvgIcon-root': { fontSize: 28 } } },
    },
    MuiRadio: {
      styleOverrides: { root: { padding: 10, '& .MuiSvgIcon-root': { fontSize: 28 } } },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { padding: 8 },
        switchBase: { padding: 12 },
        thumb: { width: 20, height: 20 },
      },
    },
    MuiSlider: {
      styleOverrides: {
        thumb: { width: 22, height: 22 },
        rail: { height: 6 },
        track: { height: 6 },
      },
    },

    // --- Lists, menus, tabs, chips ----------------------------------------
    MuiMenuItem: { styleOverrides: { root: { minHeight: 48, fontSize: '1.02rem' } } },
    MuiListItemButton: { styleOverrides: { root: { minHeight: 48 } } },
    MuiTab: { styleOverrides: { root: { minHeight: 56, fontSize: '1rem' } } },
    MuiTabs: { styleOverrides: { root: { minHeight: 56 } } },
    MuiChip: {
      styleOverrides: {
        root: { height: 34, fontSize: '0.95rem' },
        label: { paddingLeft: 12, paddingRight: 12 },
      },
    },

    // --- Surfaces ----------------------------------------------------------
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 12 } },
    },
  },
});

export default theme;

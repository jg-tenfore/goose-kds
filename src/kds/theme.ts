import { createTheme, type Theme } from '@mui/material/styles';
import { theme as baseTheme } from '../theme/theme';

/**
 * KDS board theme (TF-159 chrome + TF-160 cards).
 *
 * Faithful to the Square model the team likes: the board **canvas and chrome**
 * (top bar, toolbar, sidebar) are dark by default, while ticket **cards stay on
 * a light surface** in both themes so they read from across the kitchen. The
 * `board` palette token below carries the canvas/card colors; state color comes
 * from the shared `status` tokens (header itself is neutral).
 *
 * Layered on the base DS theme so all the touch-first sizing carries over.
 */

declare module '@mui/material/styles' {
  interface Palette {
    board: {
      /** Board background behind the cards. */
      canvas: string;
      /** Ticket-card surface (light in both themes). */
      card: string;
      /** Ticket-card text. */
      cardText: string;
      /** Muted ticket-card text (seat/table, notes). */
      cardTextMuted: string;
      /** Modifier / "add / no" emphasis text. */
      modifier: string;
      /** Ticket-card divider + border. */
      cardBorder: string;
    };
  }
  interface PaletteOptions {
    board?: Partial<Palette['board']>;
  }
}

const CARD_TOKENS = {
  card: '#ffffff',
  cardText: '#1a1a1a',
  cardTextMuted: '#6b7280',
  modifier: '#d1495b', // Square-style red for add/no modifiers
  cardBorder: '#e3e6ea',
};

export type KdsThemeMode = 'dark' | 'light';

export function createKdsTheme(mode: KdsThemeMode = 'dark'): Theme {
  const isDark = mode === 'dark';

  return createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
      status: baseTheme.palette.status,
      background: {
        default: isDark ? '#0b0b0c' : '#eceef1',
        paper: isDark ? '#161719' : '#ffffff',
      },
      text: isDark
        ? { primary: '#f4f5f7', secondary: 'rgba(255,255,255,0.6)' }
        : { primary: '#1a1a1a', secondary: 'rgba(0,0,0,0.6)' },
      divider: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      board: {
        canvas: isDark ? '#000000' : '#eceef1',
        ...CARD_TOKENS,
      },
    },
    // Preserve base component tweaks (touch sizing) but keep chrome flat/square.
    components: {
      ...baseTheme.components,
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'default' },
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#000000' : '#ffffff',
            backgroundImage: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: isDark ? '#0f1012' : '#ffffff', backgroundImage: 'none' },
        },
      },
    },
  });
}

export const kdsDarkTheme = createKdsTheme('dark');
export const kdsLightTheme = createKdsTheme('light');

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { KdsTopBar } from '../../kds/components/KdsTopBar';
import { KdsBoardToolbar } from '../../kds/components/KdsBoardToolbar';
import { createKdsTheme, type KdsThemeMode } from '../../kds/theme';
import type { BoardView } from '../../kds/types';

/**
 * The KDS board chrome header — exactly as used on the board screens:
 *  - **Top bar**: clock · station name · order-source count · connectivity.
 *  - **Board toolbar**: menu / refresh, the Completed ↔ Open segmented toggle,
 *    and pagination (first / prev / page / next / last).
 */
function BoardHeaderDemo({ mode = 'dark' as KdsThemeMode }: { mode?: KdsThemeMode }) {
  const [view, setView] = useState<BoardView>('open');
  const theme = createKdsTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: 260, bgcolor: theme.palette.board.canvas }}>
        <KdsTopBar time="11:42 AM" stationName="TenFore Grill — The Turn" orderSources={62} online />
        <KdsBoardToolbar view={view} openCount={43} onViewChange={setView} page={1} pageCount={3} />
      </Box>
    </ThemeProvider>
  );
}

const meta = {
  title: 'App Chrome/Board Header',
  component: BoardHeaderDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The application chrome at the top of every KDS board: the status **top bar** (KdsTopBar) plus the **board toolbar** (KdsBoardToolbar) with its menu/refresh buttons, the Completed ↔ Open segmented toggle, and pagination. The toggle is interactive.',
      },
    },
  },
} satisfies Meta<typeof BoardHeaderDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Dark board chrome (default). */
export const Dark: Story = { args: { mode: 'dark' } };

/** Light variant. */
export const Light: Story = { args: { mode: 'light' } };

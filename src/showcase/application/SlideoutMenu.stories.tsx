import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Box, Button, ThemeProvider } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { KdsSidebar } from '../../kds/components/KdsSidebar';
import { createKdsTheme, type KdsThemeMode } from '../../kds/theme';

/**
 * The KDS slideout menu (KdsSidebar) — opened from the board toolbar's menu
 * button. Holds the at-a-glance **All-day counts** and **Item availability**
 * panels used on the board screens.
 */
function SlideoutDemo({ mode = 'dark' as KdsThemeMode }: { mode?: KdsThemeMode }) {
  const [open, setOpen] = useState(true);
  const theme = createKdsTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh', bgcolor: theme.palette.board.canvas, p: 2 }}>
        <Button variant="contained" startIcon={<MenuRoundedIcon />} onClick={() => setOpen(true)}>
          Open menu
        </Button>
        <KdsSidebar open={open} onClose={() => setOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

const meta = {
  title: 'App Chrome/Slideout Menu',
  component: SlideoutDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The KDS slideout menu, opened from the board toolbar’s menu button. It surfaces the All-day counts and Item availability panels. Reopen it with the button after closing.',
      },
    },
  },
} satisfies Meta<typeof SlideoutDemo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Dark board chrome (default). */
export const Dark: Story = { args: { mode: 'dark' } };

/** Light variant. */
export const Light: Story = { args: { mode: 'light' } };

import { Box, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import type { BoardView } from '../types';

export interface KdsBoardToolbarProps {
  view: BoardView;
  openCount: number;
  onViewChange?: (view: BoardView) => void;
  onMenu?: () => void;
  onRefresh?: () => void;
  page?: number;
  pageCount?: number;
}

/** Board header: menu/refresh (left), Completed/Open toggle (center), paging (right). */
export function KdsBoardToolbar({
  view,
  openCount,
  onViewChange,
  onMenu,
  onRefresh,
  page = 1,
  pageCount = 1,
}: KdsBoardToolbarProps) {
  const { palette } = useTheme();
  const isDark = palette.mode === 'dark';
  const chromeBtn = {
    // Bright icon (default IconButton uses dim action.active — invisible on black).
    color: palette.text.primary,
    bgcolor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.06)',
    borderRadius: 1.5,
    '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.26)' : 'rgba(0,0,0,0.1)' },
    '&.Mui-disabled': { color: isDark ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.26)', bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)' },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1,
        bgcolor: palette.mode === 'dark' ? '#000' : '#ffffff',
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <IconButton sx={chromeBtn} onClick={onMenu} aria-label="Open menu">
        <MenuRoundedIcon />
      </IconButton>
      <IconButton sx={chromeBtn} onClick={onRefresh} aria-label="Refresh board">
        <RefreshRoundedIcon />
      </IconButton>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          exclusive
          value={view}
          onChange={(_, v) => v && onViewChange?.(v)}
          sx={{
            bgcolor: palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            borderRadius: 2,
            p: 0.5,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: '8px !important',
              color: palette.text.secondary,
              px: 4,
              '&.Mui-selected': {
                bgcolor: palette.mode === 'dark' ? 'rgba(255,255,255,0.16)' : '#fff',
                color: palette.text.primary,
                boxShadow: palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(0,0,0,0.15)',
              },
            },
          }}
        >
          <ToggleButton value="completed">Completed</ToggleButton>
          <ToggleButton value="open">{openCount} Open</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <IconButton sx={chromeBtn} disabled={page <= 1} aria-label="First page">
          <FirstPageRoundedIcon />
        </IconButton>
        <IconButton sx={chromeBtn} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeftRoundedIcon />
        </IconButton>
        <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700, color: palette.text.primary }}>
          {page}
        </Typography>
        <IconButton sx={chromeBtn} disabled={page >= pageCount} aria-label="Next page">
          <ChevronRightRoundedIcon />
        </IconButton>
        <IconButton sx={chromeBtn} disabled={page >= pageCount} aria-label="Last page">
          <LastPageRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

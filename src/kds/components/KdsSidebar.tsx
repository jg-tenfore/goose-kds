import { Box, Drawer, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

export interface KdsSidebarProps {
  open: boolean;
  onClose: () => void;
}

// Placeholder content — the real All-Day Counts and Item Availability live in the
// "Counts & Availability" project. The shell just reserves the slot for them.
const ALL_DAY = [
  { label: '2 Anchor Steam BTL', tone: 'normal' as const },
  { label: '1 Avo Toast', tone: 'muted' as const },
  { label: '8 Budweiser Can', tone: 'late' as const },
  { label: '10 Burger', tone: 'muted' as const },
  { label: '1 Chicken Wrap', tone: 'late' as const },
];
const AVAILABILITY = ['Bacardi Rum', 'Burrata', 'Chocolate Lava Cake', 'Cosmopolitan', 'Hamburger'];

export function KdsSidebar({ open, onClose }: KdsSidebarProps) {
  const { palette } = useTheme();
  const toneColor = (tone: 'normal' | 'muted' | 'late') =>
    tone === 'late' ? palette.status.late : tone === 'normal' ? palette.status.normal : palette.text.secondary;

  return (
    <Drawer open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { width: 300 } }}>
      <Stack spacing={3} sx={{ p: 2 }}>
        <Box>
          <Typography variant="overline" sx={{ color: palette.text.secondary }}>
            All day
          </Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {ALL_DAY.map((row) => (
              <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircleRoundedIcon sx={{ fontSize: 12, color: toneColor(row.tone) }} />
                <Typography variant="body1">{row.label}</Typography>
              </Box>
            ))}
            <Typography variant="body2" sx={{ color: palette.status.priority, fontWeight: 700, mt: 0.5 }}>
              View all counts
            </Typography>
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline" sx={{ color: palette.text.secondary }}>
            Item availability
          </Typography>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {AVAILABILITY.map((name) => (
              <Typography key={name} variant="body1" sx={{ color: palette.text.secondary }}>
                {name}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  );
}

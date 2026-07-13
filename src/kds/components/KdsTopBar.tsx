import { Box, Chip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

export interface KdsTopBarProps {
  time: string;
  stationName: string;
  orderSources?: number;
  online?: boolean;
}

/** Thin status strip: clock + station (left), order-source count + connectivity (right). */
export function KdsTopBar({ time, stationName, orderSources, online = true }: KdsTopBarProps) {
  const { palette } = useTheme();
  const onColor = palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.65)';
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 2,
        py: 0.75,
        bgcolor: palette.mode === 'dark' ? '#000' : '#ffffff',
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 700, color: palette.text.primary }}>
        {time}
      </Typography>
      <Typography variant="body2" sx={{ color: onColor }} noWrap>
        {stationName}
      </Typography>
      <Box sx={{ flex: 1 }} />
      {orderSources != null && (
        <Chip
          size="small"
          label={`${orderSources} order sources`}
          sx={{ height: 26, bgcolor: palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: onColor }}
        />
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: online ? palette.status.normal : palette.status.late }} />
        <Typography variant="body2" sx={{ color: onColor }}>
          {online ? 'Online' : 'Offline'}
        </Typography>
      </Box>
    </Box>
  );
}

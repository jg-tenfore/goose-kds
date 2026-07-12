import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import Construction from '@mui/icons-material/Construction';

export type ScreenSpec = {
  title: string;
  description: string;
  contains: string[];
  issues: string[];
};

/**
 * A placeholder for a KDS application screen. These scaffold the six feature
 * projects from the "Goose KDS — Development" Linear initiative so the team can
 * see the app architecture and build real screens into each slot.
 */
export function ScreenPlaceholder({ title, description, contains, issues }: ScreenSpec) {
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper variant="outlined" sx={{ maxWidth: 680, width: '100%', p: 4, borderStyle: 'dashed' }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }} useFlexGap>
            <Construction color="disabled" />
            <Typography variant="h5">{title}</Typography>
            <Chip size="small" color="warning" variant="outlined" label="To build" />
          </Stack>
          <Typography color="text.secondary">{description}</Typography>
          <Divider />
          <Box>
            <Typography variant="overline" color="text.secondary">
              Will contain
            </Typography>
            <Box component="ul" sx={{ mt: 0.5, mb: 0, pl: 3 }}>
              {contains.map((c) => (
                <li key={c}>
                  <Typography variant="body2">{c}</Typography>
                </li>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="overline" color="text.secondary">
              Linear
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap' }} useFlexGap>
              {issues.map((i) => (
                <Chip key={i} size="small" variant="outlined" label={i} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

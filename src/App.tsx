import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const STATUS_KEYS = ['normal', 'warning', 'late', 'recalled', 'priority'] as const;

function App() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 700 }}>
            🪿 Goose KDS — Design System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 5 }}>
        <Stack spacing={4}>
          <Typography variant="body1" color="text.secondary">
            A MUI (Material UI) + Emotion component library, themed for the TenFore KDS.
            Customize it in <code>src/theme/theme.ts</code> and explore every component,
            fully themed, in Storybook — <code>npm run storybook</code>.
          </Typography>

          <Box>
            <Typography variant="overline" color="text.secondary">
              Buttons (themed)
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1, flexWrap: 'wrap' }} useFlexGap>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
            </Stack>
          </Box>

          <Card>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                KDS ticket-urgency tokens
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, flexWrap: 'wrap' }}
                useFlexGap
              >
                {STATUS_KEYS.map((key) => (
                  <Chip
                    key={key}
                    label={key}
                    sx={{
                      bgcolor: theme.palette.status[key],
                      color: theme.palette.getContrastText(theme.palette.status[key]),
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;

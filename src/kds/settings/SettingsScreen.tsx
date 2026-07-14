import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DevicesOtherRoundedIcon from '@mui/icons-material/DevicesOtherRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  ROLE_LABELS,
  STATIONS,
  type BoardModeSetting,
  type CompletionBehavior,
  type HeaderStyle,
  type KdsRole,
  type RecallBehavior,
  type RoutingRule,
  type StationId,
  type StationScope,
  type TextSize,
} from './types';

const DEFAULT_RULES: RoutingRule[] = [
  { id: 'r1', name: 'Hot food → Grill', match: 'Category: Grill · Sources: all', route: 'grill', enabled: true, status: 'published' },
  { id: 'r2', name: 'Mobile order-ahead → Turn Window', match: 'Source: Online · Dining: To Go', route: 'turn-window', enabled: true, status: 'published' },
  { id: 'r3', name: 'On-course delivery → Bev Cart', match: 'Dining: Delivery · Item: Beverages', route: 'bev-cart', enabled: true, status: 'published' },
  { id: 'r4', name: 'Kiosk beverages → Bev Cart', match: 'Source: Kiosk · Category: Drinks', route: 'bev-cart', enabled: false, status: 'draft' },
];

/** Section wrapper: icon + title + optional lock chip, in a bordered card. */
function Section({
  icon,
  title,
  subtitle,
  locked,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card variant="outlined" sx={{ bgcolor: 'background.paper' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center',  mb: 0.5 }}>
          <Box sx={{ color: 'text.secondary', display: 'flex' }}>{icon}</Box>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {title}
          </Typography>
          {locked && (
            <Chip
              size="small"
              icon={<LockRoundedIcon />}
              label="Manager+"
              sx={{ '& .MuiChip-icon': { fontSize: 16 } }}
            />
          )}
        </Stack>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {!subtitle && <Box sx={{ mb: 1.5 }} />}
        {children}
      </CardContent>
    </Card>
  );
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
      {children}
      {hint && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75 }}>
          {hint}
        </Typography>
      )}
    </Box>
  );
}

export interface SettingsScreenProps {
  /** When true, protected sections (routing/guardrails) show locked chips. */
  showGuardrails?: boolean;
}

/**
 * Self-serve device configuration for a KDS screen (TF-149) with role/PIN
 * guardrails (TF-187). Grouped into Device, Routing (test-before-publish),
 * Display, Behavior, and Guardrails. Interactive local state; nothing persists.
 */
export function SettingsScreen({ showGuardrails = true }: SettingsScreenProps) {
  const { palette } = useTheme();

  const [deviceName, setDeviceName] = useState('The Turn — Grill 1');
  const [location] = useState('TenFore Grill · Pebble Ridge GC');
  const [scope, setScope] = useState<StationScope>('one');
  const [station, setStation] = useState<StationId>('grill');

  const [rules, setRules] = useState<RoutingRule[]>(DEFAULT_RULES);
  const [testInput, setTestInput] = useState('Kiosk · Iced Tea · To Go');

  const [boardMode, setBoardMode] = useState<BoardModeSetting>('flow');
  const [textSize, setTextSize] = useState<TextSize>('lg');
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>('dining-color');
  const [density, setDensity] = useState(1);

  const [warnThreshold, setWarnThreshold] = useState(15);
  const [lateThreshold, setLateThreshold] = useState(25);
  const [newTicketSound, setNewTicketSound] = useState(true);
  const [completion, setCompletion] = useState<CompletionBehavior>('bump-hide');
  const [recall, setRecall] = useState<RecallBehavior>('reopen-in-place');
  const [showHeld, setShowHeld] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  const [pinRequired, setPinRequired] = useState(true);
  const [minRoleToEdit, setMinRoleToEdit] = useState<KdsRole>('shift-lead');
  const [autoLockMin, setAutoLockMin] = useState(5);

  const [dirty, setDirty] = useState(false);
  const markDirty = () => setDirty(true);

  const draftCount = rules.filter((r) => r.status === 'draft').length;

  // Simple test-preview: which rule would catch the sample order.
  const matched = testMatch(testInput, rules);

  const toggleRule = (id: string) => {
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
    markDirty();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'board.canvas', color: 'text.primary' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          px: { xs: 2, md: 4 },
          py: 2,
          bgcolor: palette.mode === 'dark' ? '#000' : '#fff',
          borderBottom: `1px solid ${palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {deviceName} · {location}
          </Typography>
        </Box>
        {dirty && <Chip color="warning" variant="outlined" label="Unsaved changes" />}
        <Button color="inherit" onClick={() => setDirty(false)} disabled={!dirty}>
          Discard
        </Button>
        <Button variant="contained" onClick={() => setDirty(false)} disabled={!dirty}>
          Save & Publish
        </Button>
      </Box>

      {/* Body */}
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* --- Device & station (TF-149) --- */}
        <Section
          icon={<DevicesOtherRoundedIcon />}
          title="Device & Station"
          subtitle="Name this screen and choose which station's work it shows."
        >
          <Stack spacing={2.5}>
            <TextField
              label="Device name"
              value={deviceName}
              onChange={(e) => {
                setDeviceName(e.target.value);
                markDirty();
              }}
              fullWidth
              error={deviceName.trim() === ''}
              helperText={deviceName.trim() === '' ? 'Device name is required.' : 'Shown in the top bar and reports.'}
            />
            <Field label="Station scope" hint="One station, several, everything, or the expo pass.">
              <ToggleButtonGroup
                exclusive
                value={scope}
                onChange={(_, v: StationScope | null) => {
                  if (v) {
                    setScope(v);
                    markDirty();
                  }
                }}
                sx={{ flexWrap: 'wrap' }}
              >
                <ToggleButton value="one">One station</ToggleButton>
                <ToggleButton value="multiple">Multiple</ToggleButton>
                <ToggleButton value="all">All stations</ToggleButton>
                <ToggleButton value="expo">Expo</ToggleButton>
              </ToggleButtonGroup>
            </Field>
            <FormControl fullWidth disabled={scope === 'all' || scope === 'expo'}>
              <InputLabel id="station-label">Assigned station</InputLabel>
              <Select
                labelId="station-label"
                label="Assigned station"
                value={station}
                onChange={(e) => {
                  setStation(e.target.value as StationId);
                  markDirty();
                }}
              >
                {STATIONS.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>{s.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {s.hint}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Section>

        {/* --- Routing rules (TF-149 authoring + test-before-publish) --- */}
        <Section
          icon={<AltRouteRoundedIcon />}
          title="Routing Rules"
          subtitle="Decide which orders land on this board. Test a sample order before you publish."
          locked={showGuardrails}
        >
          <Stack spacing={1.25}>
            {rules.map((r) => (
              <Box
                key={r.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  border: `1px solid ${palette.divider}`,
                  bgcolor: r.enabled ? 'transparent' : palette.action.hover,
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600 }} noWrap>
                      {r.name}
                    </Typography>
                    {r.status === 'draft' && (
                      <Chip size="small" color="warning" variant="outlined" label="Draft" />
                    )}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                    {r.match} → {STATIONS.find((s) => s.id === r.route)?.label}
                  </Typography>
                </Box>
                <IconButton aria-label="Edit rule" size="small">
                  <EditRoundedIcon />
                </IconButton>
                <Switch checked={r.enabled} onChange={() => toggleRule(r.id)} />
              </Box>
            ))}
            <Button startIcon={<AddRoundedIcon />} sx={{ alignSelf: 'flex-start' }}>
              Add routing rule
            </Button>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          {/* Test-before-publish preview */}
          <Field label="Test a sample order" hint="Simulates routing with the current rules — no changes go live until you publish.">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { sm: 'center' } }}>
              <TextField
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                fullWidth
                placeholder="Source · Item · Dining option"
              />
              <Button variant="outlined" startIcon={<ScienceRoundedIcon />} sx={{ whiteSpace: 'nowrap' }}>
                Run test
              </Button>
            </Stack>
          </Field>
          <Box
            sx={{
              mt: 1.5,
              p: 2,
              borderRadius: 2,
              bgcolor: palette.action.hover,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {matched ? (
              <>
                <CheckCircleRoundedIcon sx={{ color: palette.status.normal }} />
                <Typography variant="body2">
                  Routes to <b>{STATIONS.find((s) => s.id === matched.route)?.label}</b> via{' '}
                  <b>{matched.name}</b>.
                </Typography>
              </>
            ) : (
              <>
                <AltRouteRoundedIcon sx={{ color: palette.status.warning }} />
                <Typography variant="body2">
                  No rule matched — falls back to <b>Expo</b> (default catch-all).
                </Typography>
              </>
            )}
          </Box>
          {draftCount > 0 && (
            <Typography variant="caption" color="warning.main" sx={{ display: 'block', mt: 1.5 }}>
              {draftCount} draft rule{draftCount > 1 ? 's' : ''} not yet live — publish to apply.
            </Typography>
          )}
        </Section>

        {/* --- Display (TF-149) --- */}
        <Section
          icon={<ViewQuiltRoundedIcon />}
          title="Display"
          subtitle="How the board looks on this screen — legible from across the kitchen."
        >
          <Stack spacing={2.5}>
            <Field label="Board mode">
              <ToggleButtonGroup
                exclusive
                value={boardMode}
                onChange={(_, v: BoardModeSetting | null) => {
                  if (v) {
                    setBoardMode(v);
                    markDirty();
                  }
                }}
              >
                <ToggleButton value="flow">Flow (columns)</ToggleButton>
                <ToggleButton value="grid">Grid (tiles)</ToggleButton>
              </ToggleButtonGroup>
            </Field>
            <Field label="Text size">
              <ToggleButtonGroup
                exclusive
                value={textSize}
                onChange={(_, v: TextSize | null) => {
                  if (v) {
                    setTextSize(v);
                    markDirty();
                  }
                }}
              >
                <ToggleButton value="sm">S</ToggleButton>
                <ToggleButton value="md">M</ToggleButton>
                <ToggleButton value="lg">L</ToggleButton>
                <ToggleButton value="xl">XL</ToggleButton>
              </ToggleButtonGroup>
            </Field>
            <Field label="Header style" hint="Neutral keeps headers gray; dining/source color-codes them.">
              <FormControl fullWidth>
                <Select
                  value={headerStyle}
                  onChange={(e) => {
                    setHeaderStyle(e.target.value as HeaderStyle);
                    markDirty();
                  }}
                >
                  <MenuItem value="neutral">Neutral (no color)</MenuItem>
                  <MenuItem value="dining-color">Color by dining option</MenuItem>
                  <MenuItem value="source-color">Color by source</MenuItem>
                </Select>
              </FormControl>
            </Field>
            <Field label={`Layout density`} hint="Tighter fits more tickets; looser is easier at a glance.">
              <Slider
                value={density}
                onChange={(_, v) => {
                  setDensity(v as number);
                  markDirty();
                }}
                min={0}
                max={2}
                step={1}
                marks={[
                  { value: 0, label: 'Compact' },
                  { value: 1, label: 'Default' },
                  { value: 2, label: 'Comfortable' },
                ]}
              />
            </Field>
          </Stack>
        </Section>

        {/* --- Behavior (TF-149) --- */}
        <Section
          icon={<TuneRoundedIcon />}
          title="Timers & Behavior"
          subtitle="Wait-time thresholds, sounds, and what happens on bump / recall."
        >
          <Stack spacing={3}>
            <Field
              label={`Warning at ${warnThreshold}m · Late at ${lateThreshold}m`}
              hint="Turn-window waits usually run 15–25 min; late fires past the promise."
            >
              <Box sx={{ px: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Warning threshold
                </Typography>
                <Slider
                  value={warnThreshold}
                  onChange={(_, v) => {
                    const nv = v as number;
                    setWarnThreshold(nv);
                    if (nv >= lateThreshold) setLateThreshold(nv + 1);
                    markDirty();
                  }}
                  min={5}
                  max={40}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}m`}
                  sx={{ color: palette.status.warning }}
                />
                <Typography variant="caption" color="text.secondary">
                  Late threshold
                </Typography>
                <Slider
                  value={lateThreshold}
                  onChange={(_, v) => {
                    const nv = v as number;
                    setLateThreshold(Math.max(nv, warnThreshold + 1));
                    markDirty();
                  }}
                  min={5}
                  max={45}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}m`}
                  sx={{ color: palette.status.late }}
                />
              </Box>
            </Field>
            <Divider />
            <FormControlLabel
              control={
                <Switch
                  checked={newTicketSound}
                  onChange={(e) => {
                    setNewTicketSound(e.target.checked);
                    markDirty();
                  }}
                />
              }
              label="Play a chime on new tickets"
            />
            <Field label="On bump (complete)">
              <FormControl fullWidth>
                <Select
                  value={completion}
                  onChange={(e) => {
                    setCompletion(e.target.value as CompletionBehavior);
                    markDirty();
                  }}
                >
                  <MenuItem value="bump-hide">Hide from board</MenuItem>
                  <MenuItem value="bump-strike">Strike through, keep briefly</MenuItem>
                  <MenuItem value="bump-move">Move to Completed view</MenuItem>
                </Select>
              </FormControl>
            </Field>
            <Field label="On recall">
              <FormControl fullWidth>
                <Select
                  value={recall}
                  onChange={(e) => {
                    setRecall(e.target.value as RecallBehavior);
                    markDirty();
                  }}
                >
                  <MenuItem value="reopen-in-place">Reopen in original position</MenuItem>
                  <MenuItem value="reopen-front">Reopen at front of queue</MenuItem>
                  <MenuItem value="confirm-first">Require confirmation first</MenuItem>
                </Select>
              </FormControl>
            </Field>
            <FormControlLabel
              control={
                <Switch
                  checked={showHeld}
                  onChange={(e) => {
                    setShowHeld(e.target.checked);
                    markDirty();
                  }}
                />
              }
              label="Show held items on the board"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={privacyMode}
                  onChange={(e) => {
                    setPrivacyMode(e.target.checked);
                    markDirty();
                  }}
                />
              }
              label="Privacy mode (hide guest names)"
            />
          </Stack>
        </Section>

        {/* --- Guardrails (TF-187) --- */}
        <Section
          icon={<ShieldRoundedIcon />}
          title="Roles & Guardrails"
          subtitle="Keep an accidental floor tap from changing routing or timers."
          locked={showGuardrails}
        >
          <Stack spacing={2.5}>
            <FormControlLabel
              control={
                <Switch
                  checked={pinRequired}
                  onChange={(e) => {
                    setPinRequired(e.target.checked);
                    markDirty();
                  }}
                />
              }
              label="Require PIN for protected actions"
            />
            <Field
              label="Minimum role to change settings"
              hint="Cooks run the board; shift leads and up change configuration."
            >
              <FormControl fullWidth disabled={!pinRequired}>
                <Select
                  value={minRoleToEdit}
                  onChange={(e) => {
                    setMinRoleToEdit(e.target.value as KdsRole);
                    markDirty();
                  }}
                >
                  {(Object.keys(ROLE_LABELS) as KdsRole[]).map((r) => (
                    <MenuItem key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Field>
            <Field label={`Auto-lock after ${autoLockMin} min idle`} hint="Locks the screen when the station is unattended.">
              <Slider
                value={autoLockMin}
                onChange={(_, v) => {
                  setAutoLockMin(v as number);
                  markDirty();
                }}
                min={1}
                max={30}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}m`}
              />
            </Field>
            <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Tooltip title="Opens the PIN pad to set a new manager PIN">
                <Button variant="outlined" startIcon={<LockRoundedIcon />}>
                  Change manager PIN
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Section>
      </Box>
    </Box>
  );
}

/** Toy matcher for the test-before-publish preview (case-insensitive keyword hit). */
function testMatch(input: string, rules: RoutingRule[]): RoutingRule | null {
  const q = input.toLowerCase();
  const enabled = rules.filter((r) => r.enabled);
  const hit = enabled.find((r) => {
    const terms = r.match.toLowerCase().replace(/category:|source:|dining:|item:|·/g, ' ').split(/\s+/).filter(Boolean);
    return terms.some((t) => t.length > 2 && q.includes(t));
  });
  return hit ?? null;
}

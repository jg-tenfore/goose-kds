import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { InfoRow, RadioCard, SectionHeader, SelectAllButtons, SettingsCard, SubHeading, ToggleRow } from './settings-ui';

type SectionKey =
  | 'general'
  | 'source'
  | 'items'
  | 'layout'
  | 'tickets'
  | 'appearance'
  | 'coursing'
  | 'timers'
  | 'printers';

// ------------------------------------------------------------------ Left nav
const NAV: { key: SectionKey; label: string }[] = [
  { key: 'general', label: 'General' },
  { key: 'layout', label: 'Layout' },
  { key: 'tickets', label: 'Tickets' },
  { key: 'appearance', label: 'Ticket Appearance' },
  { key: 'coursing', label: 'Coursing' },
  { key: 'timers', label: 'Timers & alerts' },
  { key: 'printers', label: 'Printers' },
];
const ROUTING_CHILDREN: { key: SectionKey; label: string }[] = [
  { key: 'source', label: 'Source & fulfillment' },
  { key: 'items', label: 'Items & categories' },
];

// ------------------------------------------------------------------ Sections
function GeneralSection() {
  return (
    <Box>
      <SectionHeader title="General" />
      <SettingsCard>
        <InfoRow label="Display name" value="The Turn — Grill 1" />
        <InfoRow label="Display type" value="Expeditor" />
        <InfoRow label="43 open tickets" value="Clear tickets" onAction={() => {}} danger divider={false} />
      </SettingsCard>
      <Button fullWidth variant="outlined" size="large" sx={{ mt: 3 }}>
        Sign out of TenFore
      </Button>
      <Box sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
        <Typography variant="body2">Signed in at Pebble Ridge GC</Typography>
        <Typography variant="body2">App version 6.65</Typography>
      </Box>
    </Box>
  );
}

function SourceSection() {
  const [pos, setPos] = useState(true);
  const [online, setOnline] = useState(true);
  const [when, setWhen] = useState('placed');
  const [futureDining, setFutureDining] = useState(true);
  const [dining, setDining] = useState({ 'For Here': true, 'To Go': true, Delivery: true, 'Pick Up': true });
  const setAll = (v: boolean) => setDining({ 'For Here': v, 'To Go': v, Delivery: v, 'Pick Up': v });
  const keys = Object.keys(dining) as (keyof typeof dining)[];

  return (
    <Box>
      <SectionHeader title="Source & fulfillment" />
      <SubHeading title="Order source" description="Choose which orders are sent to this kitchen display." />
      <SettingsCard>
        <ToggleRow
          label="View point of sale orders"
          checked={pos}
          onChange={setPos}
          hint={
            <>
              Receives orders from all points of sale ·{' '}
              <Link component="button" type="button" sx={{ fontWeight: 700 }}>
                Edit
              </Link>
            </>
          }
        />
        <ToggleRow label="View online, kiosk and delayed fulfillment orders" checked={online} onChange={setOnline} divider={false} />
      </SettingsCard>

      <Box sx={{ mt: 2 }}>
        <RadioCard
          value={when}
          onChange={setWhen}
          options={[
            { value: 'placed', label: "Show orders when they're placed" },
            { value: 'progress', label: 'Show orders when marked in progress' },
            { value: 'pickup', label: 'Show orders based on pickup time' },
          ]}
        />
      </Box>

      <SubHeading title="Dining Options" description="Choose what type of orders to show based on dining option." />
      <SettingsCard>
        <ToggleRow
          label="Include future dining options"
          hint="If selected, future and unlisted dining options will also be included."
          checked={futureDining}
          onChange={setFutureDining}
          divider={false}
        />
      </SettingsCard>
      <SelectAllButtons onSelectAll={() => setAll(true)} onDeselectAll={() => setAll(false)} />
      <SettingsCard>
        {keys.map((k, i) => (
          <ToggleRow key={k} label={k} checked={dining[k]} onChange={(v) => setDining((d) => ({ ...d, [k]: v }))} divider={i < keys.length - 1} />
        ))}
      </SettingsCard>
    </Box>
  );
}

const CATEGORIES = ['Cold Line BOH', 'Drinks', 'Grill', 'Hot Entrees', 'Liquor', 'Uncategorized items'];

function ItemsSection() {
  const [future, setFuture] = useState(true);
  const [cats, setCats] = useState<Record<string, boolean>>(Object.fromEntries(CATEGORIES.map((c) => [c, true])));
  const setAll = (v: boolean) => setCats(Object.fromEntries(CATEGORIES.map((c) => [c, v])));
  return (
    <Box>
      <SectionHeader title="Items & categories" description="Select kitchen routing categories to display on this KDS device." />
      <SettingsCard>
        <ToggleRow
          label="Include future kitchen routing categories"
          hint="If selected, future and unlisted kitchen routing categories will also be included."
          checked={future}
          onChange={setFuture}
          divider={false}
        />
      </SettingsCard>
      <SelectAllButtons onSelectAll={() => setAll(true)} onDeselectAll={() => setAll(false)} />
      <SubHeading title="Kitchen routing categories" />
      <SettingsCard>
        {CATEGORIES.map((c, i) => (
          <ToggleRow key={c} label={c} checked={cats[c]} onChange={(v) => setCats((s) => ({ ...s, [c]: v }))} divider={i < CATEGORIES.length - 1} />
        ))}
      </SettingsCard>
    </Box>
  );
}

const LAYOUTS = [
  { key: 'flex', label: 'FLEX RAIL', rec: 'Recommended for seeing all items on a ticket without scrolling' },
  { key: 'tile', label: 'TILE FILL', rec: 'Recommended for seeing many tickets at once' },
  { key: '1rail', label: '1 RAIL', rec: 'Recommended for complex orders with many items per ticket' },
  { key: '2rails', label: '2 RAILS', rec: 'A balance of ticket count and detail' },
  { key: '3rails', label: '3 RAILS', rec: 'Maximum ticket density for high volume' },
];

function LayoutDiagram({ variant, selected }: { variant: string; selected: boolean }) {
  const cell = { bgcolor: selected ? 'primary.main' : 'action.selected', borderRadius: 0.5 };
  const cols = variant === 'flex' ? 4 : variant === 'tile' ? 3 : variant === '1rail' ? 5 : variant === '2rails' ? 5 : 6;
  const rows = variant === '1rail' ? 1 : variant === '2rails' ? 2 : variant === '3rails' ? 3 : 2;
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: '1fr', gap: 0.4, p: 0.75, width: 96, height: 64 }}>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <Box key={i} sx={{ ...cell, opacity: variant === 'flex' && i % 3 === 0 ? 0.5 : 1 }} />
      ))}
    </Box>
  );
}

const TEXT_SIZES = [
  { value: 'small', label: 'Small', rem: '0.9rem' },
  { value: 'medium', label: 'Medium', rem: '1.05rem' },
  { value: 'large', label: 'Large', rem: '1.35rem' },
];

function LayoutSection() {
  const [layout, setLayout] = useState('flex');
  const [columns, setColumns] = useState('5');
  const [textSize, setTextSize] = useState('medium');
  const rec = LAYOUTS.find((l) => l.key === layout)?.rec;
  const previewRem = TEXT_SIZES.find((s) => s.value === textSize)?.rem ?? '1.05rem';
  return (
    <Box>
      <SectionHeader title="Layout" description="Configure your layout to best serve your kitchen workflows." />
      <SubHeading title="Ticket layout" />
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {LAYOUTS.map((l) => {
          const sel = layout === l.key;
          return (
            <Box key={l.key} sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setLayout(l.key)}>
              <Card
                variant="outlined"
                sx={{ borderColor: sel ? 'primary.main' : 'divider', borderWidth: 2, bgcolor: sel ? 'action.hover' : 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <LayoutDiagram variant={l.key} selected={sel} />
              </Card>
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 0.5, display: 'block', mt: 0.5 }}>
                {l.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Alert severity="info" sx={{ mt: 2 }}>
        {rec}
      </Alert>
      <SubHeading title="Columns" />
      <RadioCard value={columns} onChange={setColumns} options={[{ value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }]} />

      <SubHeading title="Text size" />
      <Card variant="outlined" sx={{ p: 3 }}>
        <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Paper elevation={1} sx={{ px: 2.5, py: 1.5, minWidth: 220, fontSize: previewRem }}>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Typography component="span" sx={{ fontWeight: 700, fontSize: 'inherit' }}>
                1
              </Typography>
              <Box>
                <Typography component="span" sx={{ fontWeight: 700, fontSize: 'inherit', display: 'block' }}>
                  House Salad
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.85em' }}>
                  Side Dressing
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <ToggleButtonGroup exclusive fullWidth value={textSize} onChange={(_, v) => v && setTextSize(v)}>
          {TEXT_SIZES.map((s) => (
            <ToggleButton key={s.value} value={s.value}>
              {s.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Card>
    </Box>
  );
}

function TicketsSection() {
  const [bump, setBump] = useState('ticket');
  const [undo, setUndo] = useState(true);
  const [recall, setRecall] = useState(true);
  const [details, setDetails] = useState({ 'Show elapsed timer': true, 'Show item modifiers': true, 'Show seat / table numbers': true, 'Show allergy flags': true });
  const keys = Object.keys(details) as (keyof typeof details)[];
  return (
    <Box>
      <SectionHeader title="Tickets" description="Control how tickets behave and what each ticket shows." />
      <SubHeading title="Completion" />
      <RadioCard
        value={bump}
        onChange={setBump}
        options={[
          { value: 'ticket', label: 'Bump whole ticket', hint: 'One touch completes the entire ticket.' },
          { value: 'item', label: 'Bump items individually', hint: 'Tap each line item to complete it on this station.' },
        ]}
      />
      <Box sx={{ mt: 2 }}>
        <SettingsCard>
          <ToggleRow label="Show undo after bump" hint="A short window to reverse an accidental completion." checked={undo} onChange={setUndo} />
          <ToggleRow label="Allow recall from Completed" checked={recall} onChange={setRecall} divider={false} />
        </SettingsCard>
      </Box>
      <SubHeading title="Ticket details" description="Choose what appears on every ticket card." />
      <SettingsCard>
        {keys.map((k, i) => (
          <ToggleRow key={k} label={k} checked={details[k]} onChange={(v) => setDetails((s) => ({ ...s, [k]: v }))} divider={i < keys.length - 1} />
        ))}
      </SettingsCard>
    </Box>
  );
}

const DINING_COLORS = [
  { name: 'For Here', color: 'Blue', dot: '#4aa3df' },
  { name: 'To Go', color: 'Teal', dot: '#3fbfad' },
  { name: 'Delivery', color: 'Purple', dot: '#b493e6' },
  { name: 'Pick Up', color: 'Sand', dot: '#e8c9a0' },
];

function AppearanceSection() {
  const [header, setHeader] = useState('compact');
  const [assignColor, setAssignColor] = useState(true);
  return (
    <Box>
      <SectionHeader title="Ticket header" description="Select a layout for all tickets" />
      <Card variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 3, display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Paper elevation={1} sx={{ px: 3, py: 1.5, minWidth: 280 }}>
            {header === 'compact' ? (
              <>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem' }}>Name</Typography>
                <Typography variant="body2" color="text.secondary">
                  4:35&nbsp;&nbsp;Prepare by 11/15/23, 1:30 P…
                </Typography>
                <Divider sx={{ mt: 1 }}>Pickup</Divider>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.4rem' }}>Name</Typography>
                  <Typography variant="body2" color="text.secondary">
                    4:35
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.4rem' }}>Pickup</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Server name
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
        <ToggleButtonGroup exclusive fullWidth value={header} onChange={(_, v) => v && setHeader(v)}>
          <ToggleButton value="compact">Compact</ToggleButton>
          <ToggleButton value="emphasize">Emphasize Dining Option</ToggleButton>
        </ToggleButtonGroup>
      </Card>

      <SettingsCard>
        <ToggleRow
          label="Assign color to ticket headers"
          hint="Customize your ticket colors so you can identify them with a glance"
          checked={assignColor}
          onChange={setAssignColor}
          divider={false}
        />
      </SettingsCard>

      <Collapse in={assignColor}>
        <SubHeading title="Dining options" />
        <SettingsCard>
          {DINING_COLORS.map((d, i) => (
            <ListItem
              key={d.name}
              divider={i < DINING_COLORS.length - 1}
              secondaryAction={
                <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1.5, pr: 0.5, py: 0.5, borderRadius: 2 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: d.dot }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {d.color}
                  </Typography>
                  <IconButton size="small">
                    <EditRoundedIcon fontSize="small" />
                  </IconButton>
                </Paper>
              }
            >
              <ListItemText primary={d.name} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItem>
          ))}
        </SettingsCard>
      </Collapse>
    </Box>
  );
}

function CoursingSection() {
  const [mode, setMode] = useState('both');
  return (
    <Box>
      <SectionHeader title="Coursing" description="Courses are used to organize checks and kitchen tickets so items can be prepared and served at the right time." />
      <SubHeading title="Hold/fire coursing layout" description="This setting will apply if you've enabled coursing and allowed servers to hold and fire courses." />
      <RadioCard
        value={mode}
        onChange={setMode}
        options={[
          { value: 'both', label: 'Show fired and held courses', hint: 'Show both fired and held courses on the same ticket on KDS.' },
          { value: 'fired', label: 'Only show fired courses', hint: 'Held courses appear as a separate ticket when fired.' },
        ]}
      />
    </Box>
  );
}

function TimersSection() {
  const [sound, setSound] = useState(true);
  const timers = [
    { name: 'Yellow timer', color: '#f2c94c', value: '10 Minutes' },
    { name: 'Red timer', color: '#eb5757', value: '15 Minutes' },
  ];
  return (
    <Box>
      <SectionHeader title="Timers & alerts" description="Customize ticket timers and alerts on this display." />
      <SubHeading title="Active ticket timer after" />
      <SettingsCard>
        {timers.map((t, i) => (
          <ListItem key={t.name} divider={i < timers.length - 1} secondaryAction={<Button sx={{ fontWeight: 700 }}>{t.value}</Button>}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: t.color }} />
            </ListItemIcon>
            <ListItemText primary={t.name} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
          </ListItem>
        ))}
      </SettingsCard>
      <SubHeading title="Play sound when" />
      <SettingsCard>
        <ToggleRow label="New tickets arrive" checked={sound} onChange={setSound} divider={false} />
      </SettingsCard>
    </Box>
  );
}

const PRINTERS = [
  { name: 'Kitchen Printer 1', where: 'Grill station', status: 'Connected' },
  { name: 'Label Printer', where: 'Turn window', status: 'Connected' },
  { name: 'Expo Printer', where: 'Pass', status: 'Offline' },
];

function PrintersSection() {
  const [autoPrint, setAutoPrint] = useState(true);
  const [printOnComplete, setPrintOnComplete] = useState(false);
  return (
    <Box>
      <SectionHeader title="Printers" description="Pair kitchen printers and choose when tickets print from this display." />
      <SubHeading title="Paired printers" />
      <SettingsCard>
        {PRINTERS.map((p, i) => {
          const online = p.status === 'Connected';
          return (
            <ListItem
              key={p.name}
              divider={i < PRINTERS.length - 1}
              secondaryAction={
                <Button disabled={!online} sx={{ fontWeight: 700 }}>
                  Test print
                </Button>
              }
            >
              <ListItemIcon sx={{ minWidth: 44 }}>
                <PrintRoundedIcon color={online ? 'action' : 'disabled'} />
              </ListItemIcon>
              <ListItemText
                primary={p.name}
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                secondary={
                  <>
                    {p.where} · <Box component="span" sx={{ color: online ? 'success.main' : 'error.main', fontWeight: 700 }}>{p.status}</Box>
                  </>
                }
              />
            </ListItem>
          );
        })}
      </SettingsCard>
      <Button startIcon={<AddRoundedIcon />} sx={{ mt: 2, fontWeight: 700 }}>
        Add printer
      </Button>
      <SubHeading title="Printing behavior" />
      <SettingsCard>
        <ToggleRow label="Auto-print new tickets" checked={autoPrint} onChange={setAutoPrint} />
        <ToggleRow label="Print a copy on complete" checked={printOnComplete} onChange={setPrintOnComplete} divider={false} />
      </SettingsCard>
    </Box>
  );
}

const SECTIONS: Record<SectionKey, () => React.ReactElement> = {
  general: GeneralSection,
  source: SourceSection,
  items: ItemsSection,
  layout: LayoutSection,
  tickets: TicketsSection,
  appearance: AppearanceSection,
  coursing: CoursingSection,
  timers: TimersSection,
  printers: PrintersSection,
};

// ------------------------------------------------------------------ Shell
export interface SettingsModalProps {
  initialSection?: SectionKey;
  onClose?: () => void;
}

export function SettingsModal({ initialSection = 'general', onClose }: SettingsModalProps) {
  const [section, setSection] = useState<SectionKey>(initialSection);
  const [routingOpen, setRoutingOpen] = useState(initialSection === 'source' || initialSection === 'items');
  const Section = SECTIONS[section];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, py: 1.5, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', left: 12 }} aria-label="Close settings">
          <CloseRoundedIcon />
        </IconButton>
        <Typography sx={{ fontWeight: 800, fontSize: '1.15rem' }}>Settings</Typography>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {/* Left nav */}
        <Box sx={{ width: 300, flexShrink: 0, borderRight: 1, borderColor: 'divider', overflow: 'auto', p: 1.5, bgcolor: 'background.paper' }}>
          <List disablePadding>
            <ListItemButton selected={section === 'general'} onClick={() => setSection('general')} sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemText primary="General" slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
            </ListItemButton>
            <ListItemButton onClick={() => setRoutingOpen((o) => !o)} sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemText primary="Routing" slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              {routingOpen ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </ListItemButton>
            <Collapse in={routingOpen}>
              {ROUTING_CHILDREN.map((c) => (
                <ListItemButton key={c.key} selected={section === c.key} onClick={() => setSection(c.key)} sx={{ borderRadius: 2, mb: 0.5, pl: 4 }}>
                  <ListItemText primary={c.label} slotProps={{ primary: { sx: { fontWeight: section === c.key ? 700 : 500 } } }} />
                </ListItemButton>
              ))}
            </Collapse>
            {NAV.slice(1).map((n) => (
              <ListItemButton key={n.key} selected={section === n.key} onClick={() => setSection(n.key)} sx={{ borderRadius: 2, mb: 0.5 }}>
                <ListItemText primary={n.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 3, md: 6 }, py: 4, bgcolor: 'background.default' }}>
          <Box sx={{ maxWidth: 760, mx: 'auto' }}>
            <Section />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

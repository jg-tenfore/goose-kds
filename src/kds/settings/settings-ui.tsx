import type { ReactNode } from 'react';
import { Box, Button, Card, FormControlLabel, List, ListItem, ListItemText, Radio, RadioGroup, Switch, Typography } from '@mui/material';

/** Page title + optional description at the top of each settings section. */
export function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

/** Sub-heading placed above a card group. */
export function SubHeading({ title, description }: { title: string; description?: string }) {
  return (
    <Box sx={{ mt: 3, mb: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
}

/** An outlined Card wrapping a native MUI List of setting rows. */
export function SettingsCard({ children, sx }: { children: ReactNode; sx?: object }) {
  return (
    <Card variant="outlined" sx={sx}>
      <List disablePadding>{children}</List>
    </Card>
  );
}

/** Toggle row — native ListItem with a trailing Switch. */
export function ToggleRow({
  label,
  hint,
  checked,
  onChange,
  divider = true,
}: {
  label: string;
  hint?: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  divider?: boolean;
}) {
  return (
    <ListItem divider={divider} secondaryAction={<Switch edge="end" checked={checked} onChange={(e) => onChange(e.target.checked)} />}>
      <ListItemText primary={label} secondary={hint} slotProps={{ primary: { sx: { fontWeight: 600 } } }} sx={{ pr: 6 }} />
    </ListItem>
  );
}

/** Label + value / action row (used for General). */
export function InfoRow({
  label,
  value,
  onAction,
  danger,
  divider = true,
}: {
  label: string;
  value: ReactNode;
  onAction?: () => void;
  danger?: boolean;
  divider?: boolean;
}) {
  return (
    <ListItem
      divider={divider}
      secondaryAction={
        onAction ? (
          <Button onClick={onAction} sx={{ fontWeight: 700, color: danger ? 'error.main' : 'primary.main' }}>
            {value}
          </Button>
        ) : (
          <Typography color="text.secondary">{value}</Typography>
        )
      }
    >
      <ListItemText primary={label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
    </ListItem>
  );
}

export type RadioOption = { value: string; label: string; hint?: string };

/** A radio group inside a Card — native left-aligned radios (Material default). */
export function RadioCard({ options, value, onChange }: { options: RadioOption[]; value: string; onChange: (v: string) => void }) {
  return (
    <Card variant="outlined" sx={{ px: 2 }}>
      <RadioGroup value={value} onChange={(_, v) => onChange(v)}>
        {options.map((o, i) => (
          <FormControlLabel
            key={o.value}
            value={o.value}
            control={<Radio />}
            label={
              <Box sx={{ py: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{o.label}</Typography>
                {o.hint && (
                  <Typography variant="body2" color="text.secondary">
                    {o.hint}
                  </Typography>
                )}
              </Box>
            }
            sx={{ alignItems: 'flex-start', m: 0, borderTop: i ? 1 : 0, borderColor: 'divider' }}
          />
        ))}
      </RadioGroup>
    </Card>
  );
}

/** Select all / Deselect all — native outlined buttons. */
export function SelectAllButtons({ onSelectAll, onDeselectAll }: { onSelectAll: () => void; onDeselectAll: () => void }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, my: 2 }}>
      <Button variant="outlined" fullWidth onClick={onSelectAll}>
        Select all
      </Button>
      <Button variant="outlined" fullWidth onClick={onDeselectAll}>
        Deselect all
      </Button>
    </Box>
  );
}

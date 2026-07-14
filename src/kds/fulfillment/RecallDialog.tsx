import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { RECALL_SCOPE_HINTS, RECALL_SCOPE_LABELS, type RecallScope } from './types';

export interface RecallDialogProps {
  open: boolean;
  /** Ticket label being recalled, e.g. "Mobile A44 · Kim". */
  ticketLabel: string;
  /** When true, a ready/handoff status already went out — warn about downstream. */
  recallAfterReady?: boolean;
  onCancel: () => void;
  onConfirm: (scope: RecallScope) => void;
}

/**
 * Recall / Unfulfill dialog (TF-172).
 *
 * Non-destructive: the completion history is preserved; recall only brings the
 * ticket back to the active board with a recalled marker. Scope controls how far
 * it pulls back (expo only / prep / all). When a ready status already went out,
 * a warning surfaces that downstream may be stale.
 */
export function RecallDialog({ open, ticketLabel, recallAfterReady = false, onCancel, onConfirm }: RecallDialogProps) {
  const [scope, setScope] = useState<RecallScope>('all');

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ReplayRoundedIcon sx={{ color: 'status.recalled' }} />
        Recall ticket
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Bring <strong>{ticketLabel}</strong> back to the active board. Completion history is preserved for audit.
        </Typography>

        {recallAfterReady && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            A “Ready” status already went out to the runner. Recalling here won’t retract it — let the front know.
          </Alert>
        )}

        <FormControl>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
            Recall to
          </Typography>
          <RadioGroup value={scope} onChange={(e) => setScope(e.target.value as RecallScope)}>
            {(Object.keys(RECALL_SCOPE_LABELS) as RecallScope[]).map((key) => (
              <Box key={key} sx={{ mb: 0.5 }}>
                <FormControlLabel
                  value={key}
                  control={<Radio />}
                  label={<Typography sx={{ fontWeight: 700 }}>{RECALL_SCOPE_LABELS[key]}</Typography>}
                />
                <Typography variant="caption" sx={{ display: 'block', ml: 4, mt: -0.5, color: 'text.secondary' }}>
                  {RECALL_SCOPE_HINTS[key]}
                </Typography>
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(scope)}
          variant="contained"
          startIcon={<ReplayRoundedIcon />}
          sx={{ bgcolor: 'status.recalled', '&:hover': { bgcolor: 'status.recalled', filter: 'brightness(1.1)' } }}
        >
          Recall
        </Button>
      </DialogActions>
    </Dialog>
  );
}

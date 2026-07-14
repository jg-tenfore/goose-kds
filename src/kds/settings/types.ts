/**
 * Local data types for the Settings & Reliability surfaces (TF-149, TF-150,
 * TF-184, TF-185, TF-186, TF-187).
 *
 * Defined here so these screens do not touch the shared `src/kds/types.ts`
 * domain model. Setting throughout: **TenFore Grill — "The Turn"**, the
 * diner-style grill at a golf course (turn window, grill, bev cart, expo).
 */

// --- Settings / Setup (TF-149) ----------------------------------------------

export type StationId = 'grill' | 'turn-window' | 'bev-cart' | 'expo';

export interface StationOption {
  id: StationId;
  label: string;
  /** Short blurb shown as supporting text. */
  hint: string;
}

export const STATIONS: StationOption[] = [
  { id: 'grill', label: 'Grill', hint: 'Hot line — burgers, dogs, melts' },
  { id: 'turn-window', label: 'Turn Window', hint: 'Mobile order-ahead pickup' },
  { id: 'bev-cart', label: 'Bev Cart', hint: 'Runs food + drinks to holes' },
  { id: 'expo', label: 'Expo', hint: 'Sees every station — the pass' },
];

export type StationScope = 'one' | 'multiple' | 'all' | 'expo';
export type BoardModeSetting = 'flow' | 'grid';
export type TextSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeaderStyle = 'neutral' | 'dining-color' | 'source-color';
export type CompletionBehavior = 'bump-hide' | 'bump-strike' | 'bump-move';
export type RecallBehavior = 'reopen-in-place' | 'reopen-front' | 'confirm-first';

/** One authored routing rule (TF-149 rule authoring, test-before-publish). */
export interface RoutingRule {
  id: string;
  name: string;
  /** Human-readable match summary (source / dining option / category / item). */
  match: string;
  route: StationId;
  enabled: boolean;
  /** Draft rules are unpublished; published rules are live on the board. */
  status: 'published' | 'draft';
}

// --- PIN / roles (TF-150, TF-187) -------------------------------------------

export type KdsRole = 'prep' | 'shift-lead' | 'manager' | 'admin';

export const ROLE_LABELS: Record<KdsRole, string> = {
  prep: 'Prep / Cook',
  'shift-lead': 'Shift Lead',
  manager: 'Manager',
  admin: 'Admin',
};

/** PIN-pad lifecycle for the lock screen (TF-150 locked/entering/invalid/success). */
export type PinState = 'locked' | 'entering' | 'invalid' | 'success' | 'lockout';

// --- Offline / Sync (TF-185, TF-186) ----------------------------------------

export type SyncState = 'synced' | 'syncing' | 'offline' | 'stale' | 'error';

export interface QueuedAction {
  id: string;
  /** e.g. "Bumped Mobile A47", "Recalled Table 6". */
  label: string;
  /** When it was taken, offline, e.g. "2m ago". */
  at: string;
  status: 'queued' | 'replaying' | 'synced';
}

// --- Reporting (TF-184) ------------------------------------------------------

export interface HourBucket {
  /** e.g. "7a", "11a", "1p". */
  hour: string;
  completed: number;
}

export interface StationLoad {
  station: string;
  /** Open tickets on this station right now. */
  open: number;
  /** Oldest open ticket age, e.g. "22m". */
  oldest: string;
  /** Average prep time for completed tickets, e.g. "9m". */
  avgPrep: string;
}

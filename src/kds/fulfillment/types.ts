/**
 * Local types for the Fulfillment Actions stories (TF-151 / TF-170 / TF-171 / TF-172).
 *
 * These are DEMO-only extensions that live alongside the stories — the shared
 * ticket model in `../types.ts` is intentionally left untouched. They model the
 * audit events and recall scope the PRD calls for so the Storybook screens can
 * show the real interaction surface without a backend.
 */

/** Recall scope — how far a completed ticket is pulled back (TF-172). */
export type RecallScope = 'expo' | 'prep' | 'all';

export const RECALL_SCOPE_LABELS: Record<RecallScope, string> = {
  expo: 'Expo only',
  prep: 'Prep stations',
  all: 'All stations',
};

export const RECALL_SCOPE_HINTS: Record<RecallScope, string> = {
  expo: 'Ticket returns to the expo lane for a final check — prep is untouched.',
  prep: 'Ticket returns to the assigned prep stations for a remake.',
  all: 'Ticket returns to every station that touched it.',
};

/** Audit event kinds emitted by the fulfillment actions (persisted for reporting). */
export type AuditEventKind =
  | 'item_completed'
  | 'ticket_completed'
  | 'item_uncompleted'
  | 'ticket_recalled'
  | 'ticket_prioritized'
  | 'priority_cleared';

export interface AuditEvent {
  kind: AuditEventKind;
  /** Ticket id the event applies to. */
  ticketId: string;
  /** Item id for item-scoped events. */
  itemId?: string;
  /** Human label for the affected entity, e.g. "Mobile A47 · Ortiz". */
  target: string;
  /** Actor / station that took the action. */
  actor: string;
  /** Wall-clock label for the demo, e.g. "11:42:07 AM". */
  at: string;
  /** Extra context, e.g. recall scope or reason. */
  detail?: string;
}

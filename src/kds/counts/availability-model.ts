/**
 * Item availability model (TF-181 + TF-183).
 *
 * Two axes are tracked SEPARATELY and never conflated:
 *
 *   1. availability — what the kitchen decided: available / limited / unavailable.
 *   2. sync — whether that decision reached the ordering system upstream.
 *
 * The honesty rule (TF-183): a KDS-local 86 must never *look* like it stopped
 * new orders when it didn't. So every row carries a sync mode + status, and any
 * failed sync is surfaced loudly — the upstream menu may still be selling it.
 */

export type Availability = 'available' | 'limited' | 'unavailable';

/**
 * Does this item's order source support pushing availability upstream?
 *  - 'upstream'   → changes are meant to sync to the ordering system.
 *  - 'local-only' → source can't accept availability; the flag is KDS-local and
 *                   is always labeled as such (it informs the line, not the POS).
 */
export type SyncMode = 'upstream' | 'local-only';

/**
 * Where an upstream change stands. `n/a` is used for local-only items (nothing
 * to sync). `pending` is in-flight; `failed` means the retry budget is spent and
 * the upstream menu may still accept the item.
 */
export type SyncStatus = 'synced' | 'pending' | 'failed' | 'n/a';

export interface AvailabilityItem {
  id: string;
  name: string;
  /** Station label for grouping/scan, e.g. "Grill". */
  station: string;
  availability: Availability;
  syncMode: SyncMode;
  syncStatus: SyncStatus;
  /** Relative timestamp of the last availability change, for the audit line. */
  updatedLabel?: string;
  /** Who made the last change (audit — item_availability_changed). */
  updatedBy?: string;
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: 'Available',
  limited: 'Limited',
  unavailable: '86',
};

/**
 * Seed availability list for The Turn. Mix of upstream-synced sources (online /
 * kiosk items that can be 86'd at the ordering system) and local-only ones
 * (bev-cart / phone items the POS won't accept availability for), plus one row
 * pre-seeded into a FAILED sync so the failure alert can be shown at rest.
 */
export const seedAvailability: AvailabilityItem[] = [
  {
    id: 'av-clubhouse',
    name: 'Clubhouse Burger',
    station: 'Grill',
    availability: 'available',
    syncMode: 'upstream',
    syncStatus: 'synced',
    updatedLabel: '2h ago',
    updatedBy: 'Auto',
  },
  {
    id: 'av-cheeseburger',
    name: 'Cheeseburger',
    station: 'Grill',
    availability: 'available',
    syncMode: 'upstream',
    syncStatus: 'synced',
  },
  {
    id: 'av-wings',
    name: 'Wings (12)',
    station: 'Fryer',
    availability: 'limited',
    syncMode: 'upstream',
    syncStatus: 'synced',
    updatedLabel: '12m ago',
    updatedBy: 'M. Rivera',
  },
  {
    id: 'av-fishchips',
    name: 'Fish & Chips',
    station: 'Fryer',
    availability: 'unavailable',
    syncMode: 'upstream',
    // Pre-seeded failure: 86'd locally, but upstream never confirmed.
    syncStatus: 'failed',
    updatedLabel: '4m ago',
    updatedBy: 'M. Rivera',
  },
  {
    id: 'av-brat',
    name: 'Bratwurst',
    station: 'Grill',
    availability: 'available',
    // Bev-cart phone orders — source can't take availability.
    syncMode: 'local-only',
    syncStatus: 'n/a',
  },
  {
    id: 'av-pretzel',
    name: 'Soft Pretzel',
    station: 'Fryer',
    availability: 'limited',
    syncMode: 'local-only',
    syncStatus: 'n/a',
    updatedLabel: '20m ago',
    updatedBy: 'J. Park',
  },
  {
    id: 'av-shake',
    name: 'Chocolate Shake',
    station: 'Beverage',
    availability: 'available',
    syncMode: 'upstream',
    syncStatus: 'synced',
  },
  {
    id: 'av-cobb',
    name: 'Cobb Salad',
    station: 'Cold / Wraps',
    availability: 'available',
    syncMode: 'upstream',
    syncStatus: 'synced',
  },
];

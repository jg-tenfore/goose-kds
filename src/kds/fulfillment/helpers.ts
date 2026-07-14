import type { Ticket } from '../types';

/** Clock label for demo audit events, e.g. "11:42:07 AM". */
export function nowLabel(): string {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
}

/**
 * Return a copy of `ticket` with the given item ids marked `complete`.
 * Non-mutating so React state stays clean across re-renders.
 */
export function withCompletedItems(ticket: Ticket, completed: ReadonlySet<string>): Ticket {
  return {
    ...ticket,
    courses: ticket.courses.map((course) => ({
      ...course,
      items: course.items.map((item) => (completed.has(item.id) ? { ...item, state: 'complete' as const } : item)),
    })),
  };
}

/** Count of all line items across a ticket's courses. */
export function itemCount(ticket: Ticket): number {
  return ticket.courses.reduce((n, c) => n + c.items.length, 0);
}

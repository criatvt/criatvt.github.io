const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// DD-MMM-YYYY, anchored to UTC so a date-only string like "2026-05-30"
// renders the same day regardless of the reader's timezone.
export function formatDate(raw?: string): string {
  if (!raw) return "";
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return "";
  const d = new Date(t);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = MONTHS[d.getUTCMonth()];
  return `${day}-${month}-${d.getUTCFullYear()}`;
}

const dayFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

// "2025-04-11" -> "Fri 11 Apr". Parsed as UTC so server and browser agree.
export function formatDay(iso: string): string {
  return dayFormat.format(new Date(`${iso}T00:00:00Z`)).replace(",", "");
}

export function formatDateRange(checkIn: string, checkOut: string): string {
  return `${formatDay(checkIn)} – ${formatDay(checkOut)}`;
}

// 90 -> "1 h 30 min", 120 -> "2 h"
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function usd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

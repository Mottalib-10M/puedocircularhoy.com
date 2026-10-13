/** Dates civiles en ISO (AAAA-MM-JJ), sans heure ni fuseau : le calcul ne dépend que du jour local. */
export const iso = (y: number, m: number, d: number) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export const parts = (s: string) => s.slice(0, 10).split('-').map(Number) as [number, number, number];
/** 0 = domingo … 6 = sábado. */
export const weekday = (s: string) => { const [y, m, d] = parts(s); return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); };
export const addDays = (s: string, n: number) => { const [y, m, d] = parts(s); const t = new Date(Date.UTC(y, m - 1, d + n)); return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()); };
export const daysInMonth = (y: number, m: number) => new Date(Date.UTC(y, m, 0)).getUTCDate();
/** Rang du jour de semaine dans le mois : le 17 octobre 2026 est le 3e sábado. */
export const nthInMonth = (s: string) => Math.floor((parts(s)[2] - 1) / 7) + 1;
export const dayOfMonth = (s: string) => parts(s)[2];
export const inRange = (s: string, from: string, to: string) => s >= from && s <= to;
/** Les jours d'un mois, du 1er au dernier. */
export function monthDays(y: number, m: number): string[] {
  return Array.from({ length: daysInMonth(y, m) }, (_, i) => iso(y, m, i + 1));
}
/** Le jour civil courant dans un fuseau (America/Mexico_City, America/Bogota). Navigateur seulement :
 *  au premier rendu, les calculateurs utilisent __BUILD_DAY__ (RECETTE §17.5). */
export function todayIn(tz: string, now: Date = new Date()): string {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const g = (t: string) => p.find((x) => x.type === t)!.value;
  return `${g('year')}-${g('month')}-${g('day')}`;
}
/** Heure locale « HH:MM » dans un fuseau. */
export function timeIn(tz: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
}

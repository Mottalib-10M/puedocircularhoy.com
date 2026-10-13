/** Formats sans dépendance aux routes (pages, minis, moteurs). Variante par pays : es-MX groupe les miles
 *  par une virgule et écrit le point décimal ; es-CO groupe par un point et écrit la virgule (RECETTE §4.1). */
import { COUNTRY, type Country } from './topics';
const cache = new Map<string, Intl.NumberFormat>();
function nf(tag: string, o: Intl.NumberFormatOptions) { const k = tag + JSON.stringify(o); if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(tag, o)); return cache.get(k)!; }
export const num = (n: number, c: Country = 'mx', d = 0) => nf(COUNTRY[c].tag, { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: true }).format(n);
/** Montant en pesos, sans centimes sauf montant officiel qui en a : « $2,346 » (MX), « $711.750 » (CO). */
export const pesos = (n: number, c: Country = 'mx', d?: number) => {
  const dd = d ?? (Number.isInteger(n) ? 0 : 2);
  return '$' + nf(COUNTRY[c].tag, { minimumFractionDigits: dd, maximumFractionDigits: dd, useGrouping: true }).format(n);
};
export const mxn = (n: number, d?: number) => pesos(n, 'mx', d);
export const cop = (n: number, d?: number) => pesos(n, 'co', d);
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const mes = (m: number) => MESES[m - 1];
/** « 12 de octubre de 2026 » depuis une date ISO. */
export function fecha(iso: string, withYear = true) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return withYear ? `${d} de ${MESES[m - 1]} de ${y}` : `${d} de ${MESES[m - 1]}`;
}
/** « lunes 12 de octubre ». */
export function fechaDia(iso: string, withYear = false) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${DIAS[wd]} ${fecha(iso, withYear)}`;
}
/** « A, B y C » (« e » devant i-/hi-). */
export const listOf = (xs: string[]) => {
  if (xs.length < 2) return xs.join('');
  const last = xs[xs.length - 1];
  const y = /^(i|hi)(?!e)/i.test(last) ? 'e' : 'y';
  return `${xs.slice(0, -1).join(', ')} ${y} ${last}`;
};
/** « 1 y 2 », « 5 y 6 », « 1, 3, 5, 7 y 9 » pour des chiffres de plaque. */
export const digits = (xs: number[]) => listOf(xs.map(String));

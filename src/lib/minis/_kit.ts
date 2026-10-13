/**
 * Outils communs des mini-simulateurs (ignoré par le registre : préfixe « _»).
 * RÈGLE : un mini n'importe jamais src/lib/kit.ts ; il importe les paramètres et les moteurs.
 */
import P from '../../data/params-2026.json';
import CO from '../../data/co-ciudades-2026.json';
import type { MxParams, VerifParams } from '../engine/mx';
import type { Ciudad } from '../engine/co';
export { P };
export const MX = P.mx as unknown as MxParams;
export const VERIF = P.mx.verif as unknown as VerifParams & { vigencia: { desde: string; hasta: string } };
export const CIUDADES = CO.ciudades as unknown as Ciudad[];
export const FESTIVOS: string[] = (P as unknown as { co?: { festivos?: string[] } }).co?.festivos ?? [];
export const digitOpts = (pref = 'Termina en') => Array.from({ length: 10 }, (_, i) => ({ value: String((i + 1) % 10), label: `${pref} ${(i + 1) % 10}` }));
export function parseArg<T>(arg: string | undefined, fallback: T): T {
  if (!arg) return fallback;
  try { return JSON.parse(arg) as T; } catch { return fallback; }
}
/** Le jour de référence d'un mini : __BUILD_DAY__ (premier rendu identique au HTML servi). */
declare const __BUILD_DAY__: string;
export const BUILD_DAY: string = typeof __BUILD_DAY__ !== 'undefined' ? __BUILD_DAY__ : '2026-10-13';

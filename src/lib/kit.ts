/**
 * Ce qu'un fichier de page utilise pour écrire un chiffre, un jour ou une règle sans le taper en dur
 * (RECETTE §17.4, point 7) : les données, les moteurs, les formats.
 *   import { P, ciudad, mxn, multaHncPesos } from '../../lib/kit';
 * Côté serveur seulement.
 */
import P from '../data/params-2026.json';
import CO from '../data/co-ciudades-2026.json';
import { mxDia, mxProximo, colorDe, diaDe, multaHnc, multaVerif, costoVerif, type MxParams, type VerifParams, type Holo, type Color } from './engine/mx';
import { coDia, coMes, coProximo, coDiasRestringidos, restringidosDia, type Ciudad, type Vehiculo } from './engine/co';
import { addDays, monthDays, weekday, nthInMonth, iso } from './engine/dates';
import { num, pesos, mxn, cop, fecha, fechaDia, listOf, digits, mes, DIAS } from './fmt';

export { P };
export const MX = P.mx as unknown as MxParams & { verif: VerifParams & { vigencia: { desde: string; hasta: string } } };
export const VERIF = MX.verif;
export const CIUDADES = CO.ciudades as unknown as Ciudad[];
const need = <T>(x: T | undefined, what: string): T => { if (x === undefined) throw new Error(`Donnée absente : ${what}`); return x; };
export const ciudad = (slug: string): Ciudad => need(CIUDADES.find((c) => c.slug === slug), `ville ${slug}`);
export const FESTIVOS: string[] = (P as unknown as { co?: { festivos?: string[] } }).co?.festivos ?? [];
export const CO_P = (P as unknown as { co?: Record<string, unknown> }).co ?? {};

/* México */
export const uma = () => P.mx.uma.diaria;
/** Amende HNC en pesos, pour 20, 25 et 30 UMA (art. 47 du Reglamento de Tránsito). */
export const multaHncPesos = () => multaHnc(P.mx.uma.diaria, P.mx.multaHncVeces);
export const multaVerifPesos = () => multaVerif(VERIF);
export const costoVerifPesos = () => costoVerif(VERIF);
export const color = (d: number) => colorDe(MX, d);
export const diaHnc = (d: number) => DIAS[diaDe(MX, d)];
export const digitosColor = (c: Color) => MX.hnc.colores[c].digitos;
export const hnc = (f: string, d: number, h: Holo) => mxDia(MX, f, d, h);
export const hncProximo = (f: string, d: number, h: Holo) => mxProximo(MX, f, d, h, addDays);
/** Samedis d'un mois où un chiffre holograma 1 ne circule pas. */
export const sabadosHolo1 = (y: number, m: number, d: number) => monthDays(y, m).filter((f) => weekday(f) === 6 && mxDia(MX, f, d, '1').circula === false);
export const sabadosMes = (y: number, m: number) => monthDays(y, m).filter((f) => weekday(f) === 6);
export const verifMesesTxt = (c: Color, s: 1 | 2) => VERIF.semestres[String(s) as '1' | '2'][c].map(mes);

/* Colombia */
export const pyp = (slug: string, f: string, d: number, v: Vehiculo = 'carro') => coDia(ciudad(slug), f, d, v, FESTIVOS);
export const pypMes = (slug: string, y: number, m: number, d: number, v: Vehiculo = 'carro') => coMes(ciudad(slug), y, m, d, v, FESTIVOS);
export const pypProximo = (slug: string, f: string, d: number, v: Vehiculo = 'carro') => coProximo(ciudad(slug), f, d, v, FESTIVOS);
export const pypDiasMes = (slug: string, y: number, m: number, d: number, v: Vehiculo = 'carro') => coDiasRestringidos(ciudad(slug), y, m, d, v, FESTIVOS);
/** Table lunes → viernes des chiffres restreints d'une ville à une date (période en cours). */
export function pypSemana(slug: string, f: string, v: Vehiculo = 'carro'): Array<[string, number[]]> {
  const c = ciudad(slug); const r = v === 'moto' ? c.motos : c.carro;
  if (!r) return [];
  const p = r.periodos.find((x) => f >= x.desde && f <= x.hasta);
  if (!p?.semana) return [];
  return (['1', '2', '3', '4', '5'] as const).map((k) => [DIAS[Number(k)], p.semana![k] ?? []]);
}
export const restringidos = (slug: string, f: string) => restringidosDia(ciudad(slug).carro, f)?.restringidos ?? [];
export const festivosEntre = (a: string, b: string) => FESTIVOS.filter((f) => f >= a && f <= b);
/** « 6:00 a. m. a 9:00 p. m. » depuis les heures 24 h. */
export function horario(h: Array<[string, string]>) {
  const t = (s: string) => { const [H, M] = s.split(':').map(Number); const ap = H < 12 ? 'a. m.' : H === 12 ? 'm.' : 'p. m.'; return `${H % 12 === 0 ? 12 : H % 12}:${String(M).padStart(2, '0')} ${ap}`; };
  return h.map(([a, b]) => `${t(a)} a ${t(b)}`).join(' y ');
}
/** « 5:00 a 22:00 h » (usage mexicain). */
export const horas24 = (h: [string, string]) => `${Number(h[0].slice(0, 2))}:${h[0].slice(3)} a ${Number(h[1].slice(0, 2))}:${h[1].slice(3)} h`;

export { num, pesos, mxn, cop, fecha, fechaDia, listOf, digits, mes, DIAS, addDays, weekday, nthInMonth, monthDays, iso };
export const KIT = { P, MX, VERIF, CIUDADES, ciudad, FESTIVOS, uma, multaHncPesos, multaVerifPesos, costoVerifPesos, color, diaHnc, digitosColor, hnc, hncProximo, sabadosHolo1, sabadosMes, verifMesesTxt, pyp, pypMes, pypProximo, pypDiasMes, pypSemana, restringidos, festivosEntre, horario, horas24, num, pesos, mxn, cop, fecha, fechaDia, listOf, digits, mes, DIAS, addDays, weekday, nthInMonth, monthDays, iso };
export type Kit = typeof KIT;

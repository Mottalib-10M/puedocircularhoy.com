/**
 * Hoy No Circula (Valle de México). Paramètres : src/data/params-2026.json > mx (décret du Programa Hoy No
 * Circula, G.O.D.F. du 19/06/2014 ; programme de verificación du 2e semestre 2026, G.O. CDMX du 01/07/2026 ;
 * PCAA, G.O. CDMX du 28/05/2019). Fonctions pures.
 *
 * La contingence ne se prévoit pas : c'est un SCÉNARIO choisi par l'utilisateur d'après l'aviso de la CAMe.
 * Deux choses n'y sont connues que par le communiqué du jour : la terminación (par ou non) restreinte pour le
 * holograma 1, et, un samedi ou un dimanche, la couleur d'engomado retenue pour les hologrammes 0 et 00.
 * Sans elles, le moteur répond « depende del comunicado » au lieu de deviner.
 */
import { weekday, nthInMonth } from './dates';

export type Holo = 'exento' | '00' | '0' | '1' | '2' | 'foraneo' | 'pase' | 'moto';
export type Color = 'amarillo' | 'rosa' | 'rojo' | 'verde' | 'azul';
export interface MxParams {
  hnc: {
    horas: [string, string];
    /** Lunes = '1' … viernes = '5' : chiffres qui ne circulent pas (hologrammes 1 et 2). */
    semana: Record<'1' | '2' | '3' | '4' | '5', number[]>;
    colores: Record<Color, { dia: number; digitos: number[] }>;
    /** Holograma 1 : rang des samedis sans circulation pour les plaques impaires et paires. */
    sabadoHolo1: { impar: number[]; par: number[] };
    /** Véhicules d'autres États sans holograma reconnu : en plus, de lunes a viernes de 05:00 a 11:00. */
    foraneoManana: [string, string];
  };
}
export interface Contingencia { activa: boolean; fase: 1 | 2; /** Terminación restringida pour le holograma 1, d'après le communiqué. */ holo1?: 'par' | 'non'; /** Week-end : couleur retenue pour 0 et 00, d'après le communiqué. */ colorFinde?: Color }
export type Motivo =
  | 'exento' | 'domingo' | 'libre' | 'dia-engomado' | 'sabado-holo1' | 'sabado-holo2' | 'quinto-sabado'
  | 'foraneo-manana' | 'cont-holo2' | 'cont-holo1' | 'cont-color' | 'cont-moto' | 'cont-depende';
export interface MxResultado { circula: boolean | 'depende'; motivo: Motivo; horas: Array<[string, string]> }

export const esPar = (d: number) => d % 2 === 0;
export function colorDe(p: MxParams, digit: number): Color {
  return (Object.keys(p.hnc.colores) as Color[]).find((c) => p.hnc.colores[c].digitos.includes(digit))!;
}
/** Jour de semaine (1-5) sans circulation pour un chiffre. */
export const diaDe = (p: MxParams, digit: number) => p.hnc.colores[colorDe(p, digit)].dia;

/** Restriction ordinaire (sans contingence). */
function ordinario(p: MxParams, fecha: string, digit: number, holo: Holo): MxResultado {
  const H = p.hnc.horas;
  const wd = weekday(fecha);
  if (['exento', '00', '0', 'pase', 'moto'].includes(holo)) return { circula: true, motivo: 'exento', horas: [] };
  if (wd === 0) return { circula: true, motivo: 'domingo', horas: [] };
  if (wd >= 1 && wd <= 5) {
    if (diaDe(p, digit) === wd) return { circula: false, motivo: 'dia-engomado', horas: [H] };
    if (holo === 'foraneo') return { circula: 'depende', motivo: 'foraneo-manana', horas: [p.hnc.foraneoManana] };
    return { circula: true, motivo: 'libre', horas: [] };
  }
  // sábado
  if (holo === '2' || holo === 'foraneo') return { circula: false, motivo: 'sabado-holo2', horas: [H] };
  const n = nthInMonth(fecha);
  if (n === 5) return { circula: true, motivo: 'quinto-sabado', horas: [] };
  const lista = esPar(digit) ? p.hnc.sabadoHolo1.par : p.hnc.sabadoHolo1.impar;
  return lista.includes(n) ? { circula: false, motivo: 'sabado-holo1', horas: [H] } : { circula: true, motivo: 'libre', horas: [] };
}

/** Le jour pour une plaque. `foraneo` : le chiffre circule-t-il entre 11:00 et 22:00 ? `circula` vaut alors
 *  'depende' avec l'horaire du matin : il ne circule pas de 05:00 à 11:00 (S2 §14.2 IV). */
export function mxDia(p: MxParams, fecha: string, digit: number, holo: Holo, c?: Contingencia): MxResultado {
  const base = ordinario(p, fecha, digit, holo);
  if (!c?.activa || holo === 'exento') return base;
  if (base.circula === false) return base;
  const H = p.hnc.horas;
  const wd = weekday(fecha);
  if (holo === 'moto') {
    if (c.fase !== 2) return base;
    if (!c.holo1) return { circula: 'depende', motivo: 'cont-depende', horas: [H] };
    return (c.holo1 === 'par') === esPar(digit) ? { circula: false, motivo: 'cont-moto', horas: [H] } : base;
  }
  if (holo === '2' || holo === 'foraneo' || holo === 'pase') return { circula: false, motivo: 'cont-holo2', horas: [H] };
  if (holo === '1') {
    if (!c.holo1) return { circula: 'depende', motivo: 'cont-depende', horas: [H] };
    return (c.holo1 === 'par') === esPar(digit) ? { circula: false, motivo: 'cont-holo1', horas: [H] } : { circula: true, motivo: 'libre', horas: [] };
  }
  // 0 y 00 : la terminación que le toca al Hoy No Circula ese día ; el fin de semana, el color que anuncie la CAMe.
  if (wd >= 1 && wd <= 5) return diaDe(p, digit) === wd ? { circula: false, motivo: 'cont-color', horas: [H] } : { circula: true, motivo: 'libre', horas: [] };
  if (!c.colorFinde) return { circula: 'depende', motivo: 'cont-depende', horas: [H] };
  return p.hnc.colores[c.colorFinde].digitos.includes(digit) ? { circula: false, motivo: 'cont-color', horas: [H] } : { circula: true, motivo: 'libre', horas: [] };
}

/** Prochain jour sans circulation (sans contingence), à partir de `fecha` incluse. */
export function mxProximo(p: MxParams, fecha: string, digit: number, holo: Holo, addDays: (f: string, n: number) => string, max = 40): string | null {
  for (let i = 0; i < max; i++) { const f = addDays(fecha, i); if (ordinario(p, f, digit, holo).circula === false) return f; }
  return null;
}

/** Calendrier de verificación : mois de la période d'un chiffre au semestre donné (1 ou 2). */
export interface VerifParams { semestres: Record<'1' | '2', Record<Color, number[]>>; prorroga15: Record<Color, string>; uma: number; multaUma: number; costoUma: number; iva: number }
export function verifMeses(v: VerifParams, color: Color, semestre: 1 | 2) { return v.semestres[String(semestre) as '1' | '2'][color]; }
/** Multa por verificación extemporánea : 20 UMA (S2 §10.1.1). */
export const multaVerif = (v: VerifParams) => Math.round(v.multaUma * v.uma * 100) / 100;
/** Coût d'une vérification : 5.625 UMA + IVA (S2 §7.1). */
export const costoVerif = (v: VerifParams) => Math.round(v.costoUma * v.uma * (1 + v.iva) * 100) / 100;
/** Amende HNC (Reglamento de Tránsito CDMX, art. 47) : 20, 25 ou 30 UMA. */
export const multaHnc = (uma: number, veces: number[]) => veces.map((x) => Math.round(x * uma * 100) / 100);

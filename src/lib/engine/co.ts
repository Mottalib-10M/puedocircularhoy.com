/**
 * Pico y placa (Colombie). Une ville = une entrée de src/data/co-ciudades-2026.json, tirée du décret de
 * l'alcaldía (numéro, date, période de validité). Deux schémas existent :
 *  - « paridad » (Bogotá) : les chiffres restreints dépendent de la parité du jour du mois ;
 *  - « semana » : deux chiffres (ou plus) par jour de la semaine, avec une rotation datée.
 * Hors de la période de validité publiée, le moteur ne devine pas : il répond « sin datos ».
 */
import { weekday, dayOfMonth, inRange, monthDays, addDays, parts } from './dates';

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Vehiculo = 'carro' | 'moto';
/** Lunes = '1' … sábado = '6' : chiffres RESTREINTS ce jour-là. */
export type Semana = Partial<Record<'1' | '2' | '3' | '4' | '5' | '6', number[]>>;
export interface Periodo { desde: string; hasta: string; semana?: Semana; par?: number[]; impar?: number[] }
export interface Regla {
  esquema: 'semana' | 'paridad' | 'ninguno';
  periodos: Periodo[];
  /** Plages horaires « HH:MM » (24 h). */
  horas: Array<[string, string]>;
  sabado: boolean;
  /** Samedis à rotation propre (Bucaramanga) : deux chiffres par samedi, cycle continu depuis `ancla`. */
  sabadoCiclo?: { ancla: string; ciclo: number[][]; horas: Array<[string, string]> };
  festivos: boolean;
  /** Chiffre de la plaque qui compte : le dernier pour les voitures ; le premier ou le dernier pour les motos selon la ville. */
  digito: 'ultimo' | 'primero';
}
export interface Ciudad {
  slug: string; nombre: string; depto: string;
  /** Règle des voitures particulières ; `motos` si la ville restreint aussi les motos (sinon null). */
  carro: Regla;
  motos: Regla | null;
  /** Phrase sur les motos (exceptées, chiffre qui compte, ou règle non publiée). */
  motosNota: string;
  /** Période couverte par les données vérifiées (au-delà : sin datos). */
  vigencia: { desde: string; hasta: string };
  decreto: string;
  fuente: string;
  nota?: string;
}
export type Estado = 'restringido' | 'libre' | 'festivo' | 'fin-de-semana' | 'sin-datos' | 'sin-medida';
export interface ResultadoDia { fecha: string; estado: Estado; horas: Array<[string, string]>; restringidos: number[]; periodo?: Periodo }

const utc = (f: string) => { const [y, m, d] = parts(f); return Date.UTC(y, m - 1, d); };
const wdKey = (iso: string) => String(weekday(iso)) as keyof Semana;

/** Chiffres restreints un jour donné par une règle (sans tenir compte des fériés). */
export function restringidosDia(r: Regla, fecha: string): { restringidos: number[]; periodo?: Periodo } | null {
  const p = r.periodos.find((x) => inRange(fecha, x.desde, x.hasta));
  if (!p) return null;
  if (r.esquema === 'paridad') return { restringidos: (dayOfMonth(fecha) % 2 === 0 ? p.par : p.impar) ?? [], periodo: p };
  return { restringidos: p.semana?.[wdKey(fecha)] ?? [], periodo: p };
}

export function coDia(c: Ciudad, fecha: string, digit: number, vehiculo: Vehiculo, festivos: string[]): ResultadoDia {
  const r = vehiculo === 'moto' ? c.motos : c.carro;
  if (!r || r.esquema === 'ninguno') return { fecha, estado: 'sin-medida', horas: [], restringidos: [] };
  if (!inRange(fecha, c.vigencia.desde, c.vigencia.hasta)) return { fecha, estado: 'sin-datos', horas: [], restringidos: [] };
  const wd = weekday(fecha);
  if (!r.festivos && festivos.includes(fecha)) return { fecha, estado: 'festivo', horas: [], restringidos: [] };
  if (wd === 6 && r.sabadoCiclo) {
    const s = r.sabadoCiclo; const n = Math.round((utc(fecha) - utc(s.ancla)) / 86400000 / 7);
    if (n < 0) return { fecha, estado: 'sin-datos', horas: [], restringidos: [] };
    const rest = s.ciclo[n % s.ciclo.length];
    const hit = rest.includes(digit);
    return { fecha, estado: hit ? 'restringido' : 'libre', horas: hit ? s.horas : [], restringidos: rest };
  }
  if (wd === 0 || (wd === 6 && !r.sabado)) return { fecha, estado: 'fin-de-semana', horas: [], restringidos: [] };
  const d = restringidosDia(r, fecha);
  if (!d) return { fecha, estado: 'sin-datos', horas: [], restringidos: [] };
  const hit = d.restringidos.includes(digit);
  return { fecha, estado: hit ? 'restringido' : 'libre', horas: hit ? r.horas : [], restringidos: d.restringidos, periodo: d.periodo };
}

/** Le mois entier pour un chiffre. */
export function coMes(c: Ciudad, y: number, m: number, digit: number, vehiculo: Vehiculo, festivos: string[]): ResultadoDia[] {
  return monthDays(y, m).map((f) => coDia(c, f, digit, vehiculo, festivos));
}

/** Prochain jour de restriction à partir de `fecha` (incluse), dans la limite de la période vérifiée. */
export function coProximo(c: Ciudad, fecha: string, digit: number, vehiculo: Vehiculo, festivos: string[], max = 62): ResultadoDia | null {
  for (let i = 0; i < max; i++) {
    const f = addDays(fecha, i);
    const x = coDia(c, f, digit, vehiculo, festivos);
    if (x.estado === 'restringido') return x;
    if (x.estado === 'sin-datos' || x.estado === 'sin-medida') return null;
  }
  return null;
}

/** Nombre de jours restreints dans un mois (pour les tableaux). */
export const coDiasRestringidos = (c: Ciudad, y: number, m: number, digit: number, vehiculo: Vehiculo, festivos: string[]) =>
  coMes(c, y, m, digit, vehiculo, festivos).filter((x) => x.estado === 'restringido').length;

/** Samedis sans circuler du mois en cours et du suivant, pour une terminaison et un holograma. */
import type { MiniSpec } from '../mini-types';
import { MX, digitOpts } from './_kit';
import { mxDia, type Holo } from '../engine/mx';
import { monthDays, weekday, parts } from '../engine/dates';
import { mes } from '../fmt';
export default function (): MiniSpec {
  return {
    tz: 'America/Mexico_City', title: '¿Qué sábados descansa mi auto?', cta: 'Ver el calendario del mes', ctaHref: '/es/calendario-hoy-no-circula/',
    inputs: [{ id: 'd', label: 'Último número de la placa', def: 3, options: digitOpts() }, { id: 'h', label: 'Holograma', def: 1, options: [{ value: '1', label: 'Holograma 1' }, { value: '2', label: 'Holograma 2' }] }],
    run: (v, hoy) => {
      const [y, m] = parts(hoy); const nm = m === 12 ? 1 : m + 1; const ny = m === 12 ? y + 1 : y;
      const holo = (v.h === 2 ? '2' : '1') as Holo;
      const sab = (yy: number, mm: number) => monthDays(yy, mm).filter((f) => weekday(f) === 6);
      const no = (yy: number, mm: number) => sab(yy, mm).filter((f) => mxDia(MX, f, v.d, holo).circula === false).map((f) => parts(f)[2]);
      const a = no(y, m), b = no(ny, nm);
      return { head: [`Sábados sin circular en ${mes(m)}`, a.length ? a.join(', ') : 'ninguno'], tone: a.length ? 'no' : 'si', rows: [[`En ${mes(nm)}`, b.length ? b.join(', ') : 'ninguno'], ['Sábados del mes', String(sab(y, m).length)], ['Horario', `${MX.hnc.horas[0]} a ${MX.hnc.horas[1]} h`]], note: 'Sin contingencia ambiental.' };
    },
  };
}

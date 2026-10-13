/** Hoy No Circula du jour pour une terminaison et un holograma (sans contingence). */
import type { MiniSpec } from '../mini-types';
import { MX, digitOpts } from './_kit';
import { mxDia, mxProximo, colorDe, type Holo } from '../engine/mx';
import { addDays } from '../engine/dates';
import { fechaDia } from '../fmt';
const HO: Holo[] = ['00', '0', '1', '2', 'foraneo'];
export default function (): MiniSpec {
  return {
    tz: 'America/Mexico_City', title: '¿Circulo hoy en el Valle de México?', cta: 'Consulta completa con contingencia', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 'd', label: 'Último número de la placa', def: 2, options: digitOpts() }, { id: 'h', label: 'Holograma', def: 2, options: [{ value: '0', label: 'Holograma 00' }, { value: '1', label: 'Holograma 0' }, { value: '2', label: 'Holograma 1' }, { value: '3', label: 'Holograma 2' }, { value: '4', label: 'Sin holograma reconocido' }] }],
    run: (v, hoy) => {
      const holo = HO[v.h] ?? '1'; const r = mxDia(MX, hoy, v.d, holo); const p = mxProximo(MX, addDays(hoy, 1), v.d, holo, addDays);
      return { head: [`Hoy ${fechaDia(hoy)}`, r.circula === true ? 'Sí circula' : r.circula === false ? 'No circula' : 'Circula desde las 11:00'], tone: r.circula === true ? 'si' : r.circula === false ? 'no' : 'warn', rows: [['Engomado', colorDe(MX, v.d)], ['Próximo día sin circular', p ? fechaDia(p) : 'ninguno próximo']], note: 'Sin contingencia ambiental.' };
    },
  };
}

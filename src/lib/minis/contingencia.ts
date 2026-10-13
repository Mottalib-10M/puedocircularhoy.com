/** Qui circule en Fase I ou II (PCAA 2019, Tabla 3), un jour de semaine ou de week-end. */
import type { MiniSpec } from '../mini-types';
import { MX, digitOpts } from './_kit';
import { mxDia, colorDe, type Holo } from '../engine/mx';
import { addDays, weekday } from '../engine/dates';
import { fechaDia } from '../fmt';
const HO: Holo[] = ['00', '0', '1', '2', 'foraneo', 'moto'];
export default function (): MiniSpec {
  return {
    tz: 'America/Mexico_City', title: 'Si mañana hay contingencia, ¿circulo?', cta: 'Consultar con mi placa', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 'd', label: 'Último número de la placa', def: 7, options: digitOpts() }, { id: 'h', label: 'Holograma', def: 2, options: [{ value: '0', label: 'Holograma 00' }, { value: '1', label: 'Holograma 0' }, { value: '2', label: 'Holograma 1' }, { value: '3', label: 'Holograma 2' }, { value: '4', label: 'Foráneo sin holograma' }, { value: '5', label: 'Motocicleta' }] }, { id: 'f', label: 'Fase', def: 1, options: [{ value: '1', label: 'Fase I' }, { value: '2', label: 'Fase II' }] }],
    run: (v, hoy) => {
      const dia = addDays(hoy, 1); const holo = HO[v.h] ?? '1'; const fase = v.f === 2 ? 2 : 1;
      const base = mxDia(MX, dia, v.d, holo, { activa: true, fase });
      const finde = weekday(dia) === 0 || weekday(dia) === 6;
      const txt = base.circula === true ? 'Sí circula' : base.circula === false ? 'No circula' : 'Depende del comunicado';
      const rows: Array<[string, string]> = [['Engomado', colorDe(MX, v.d)]];
      if (holo === '1' || holo === 'moto') { rows.push(['Si restringen nones', mxDia(MX, dia, v.d, holo, { activa: true, fase, holo1: 'non' }).circula === false ? 'no circula' : 'circula']); rows.push(['Si restringen pares', mxDia(MX, dia, v.d, holo, { activa: true, fase, holo1: 'par' }).circula === false ? 'no circula' : 'circula']); }
      if ((holo === '0' || holo === '00') && finde) rows.push(['Fin de semana', 'el engomado lo fija la CAMe']);
      return { head: [`Contingencia ${fase === 2 ? 'Fase II' : 'Fase I'} el ${fechaDia(dia)}`, txt], tone: base.circula === true ? 'si' : base.circula === false ? 'no' : 'warn', rows, note: 'Escenario: la CAMe decide cada día si activa la contingencia.' };
    },
  };
}

/** Festivos d'un mois (Ley 51 de 1983) : ce jour-là, pas de pico y placa dans les villes couvertes. */
import type { MiniSpec } from '../mini-types';
import { FESTIVOS } from './_kit';
import { parts } from '../engine/dates';
import { fechaDia, mes } from '../fmt';
export default function (): MiniSpec {
  return {
    tz: 'America/Bogota', title: '¿Qué festivos quedan este mes?', cta: 'Ver el calendario del pico y placa', ctaHref: '/es/calendario-pico-y-placa/',
    inputs: [{ id: 'm', label: 'Mes de 2026', def: 11, options: Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: mes(i + 1) })) }],
    run: (v, hoy) => {
      const f = FESTIVOS.filter((x) => parts(x)[1] === v.m);
      const next = FESTIVOS.find((x) => x >= hoy);
      return { head: [`Festivos de ${mes(v.m)} de 2026`, f.length ? String(f.length) : 'ninguno'], tone: f.length ? 'si' : 'na', rows: [...f.map((x) => ['Sin pico y placa', fechaDia(x)] as [string, string]), ['Próximo festivo', next ? fechaDia(next) : 'ninguno en 2026']], note: 'Ley 51 de 1983: casi todos se trasladan al lunes.' };
    },
  };
}

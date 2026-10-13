/** Motos : la ville restreint-elle les motos, par quel chiffre, et aujourd'hui ? */
import type { MiniSpec } from '../mini-types';
import { CIUDADES, FESTIVOS } from './_kit';
import { coDia } from '../engine/co';
import { fechaDia, digits } from '../fmt';
export default function (): MiniSpec {
  const cs = CIUDADES;
  return {
    tz: 'America/Bogota', title: '¿Mi moto tiene pico y placa hoy?', cta: 'Consulta completa', ctaHref: '/es/pico-y-placa/',
    inputs: [{ id: 'c', label: 'Ciudad', def: Math.max(0, cs.findIndex((c) => c.slug === 'medellin')), options: cs.map((c, i) => ({ value: String(i), label: c.nombre })) }, { id: 'd', label: 'Número de la placa que cuenta', def: 5, options: Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: String(i) })) }],
    run: (v, hoy) => {
      const c = cs[v.c] ?? cs[0];
      if (!c.motos) return { head: [`Motos en ${c.nombre}`, 'Sin pico y placa'], tone: 'si', rows: [['Regla', c.motosNota]] };
      const r = coDia(c, hoy, v.d, 'moto', FESTIVOS);
      const no = r.estado === 'restringido';
      return { head: [`Hoy ${fechaDia(hoy)} en ${c.nombre}`, no ? 'Tiene pico y placa' : r.estado === 'sin-datos' ? 'Rotación no publicada' : 'Puede circular'], tone: no ? 'no' : r.estado === 'sin-datos' ? 'na' : 'si', rows: [['Número que cuenta', c.motos.digito === 'primero' ? 'el primero' : 'el último'], ['Restringidas hoy', r.restringidos.length ? digits(r.restringidos) : 'ninguna']] };
    },
  };
}

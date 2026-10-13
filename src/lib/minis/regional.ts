/** Pico y placa regional de Bogotá : entrée selon la parité de la plaque et l'heure, les lundis fériés. */
import type { MiniSpec } from '../mini-types';
import { P, digitOpts, FESTIVOS } from './_kit';
import { fechaDia } from '../fmt';
export default function (): MiniSpec {
  const R = (P as unknown as { co: { regional: { pares: [string, string]; impares: [string, string] } } }).co.regional;
  const horas = Array.from({ length: 13 }, (_, i) => i + 10).map((x) => ({ value: String(x), label: `${x}:00` }));
  return {
    tz: 'America/Bogota', title: '¿A qué hora puedo entrar a Bogotá el festivo?', cta: 'Ver el pico y placa de Bogotá', ctaHref: '/es/pico-y-placa-bogota/',
    inputs: [{ id: 'd', label: 'Último número de la placa', def: 3, options: digitOpts() }, { id: 'h', label: 'Hora de llegada al corredor', def: 14, options: horas }],
    run: (v, hoy) => {
      const par = v.d % 2 === 0; const H = (t: string) => Number(t.slice(0, 2));
      const enVentana = v.h >= H(R.pares[0]) && v.h < H(R.impares[1]);
      const puede = !enVentana || (par ? v.h < H(R.pares[1]) : v.h >= H(R.impares[0]));
      const prox = FESTIVOS.find((f) => f >= hoy);
      return { head: [`Placa ${par ? 'par' : 'impar'} a las ${v.h}:00`, puede ? 'Puedes entrar' : 'Espera tu franja'], tone: puede ? 'si' : 'no', rows: [['Franja de las pares', `${R.pares[0]} a ${R.pares[1]}`], ['Franja de las impares', `${R.impares[0]} a ${R.impares[1]}`], ['Próximo festivo', prox ? fechaDia(prox) : 'sin fecha cargada']], note: 'Solo el último día de los puentes festivos o cuando lo anuncie la Alcaldía.' };
    },
  };
}

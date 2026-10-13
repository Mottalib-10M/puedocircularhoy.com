/** Amende C.14 (Ley 769 de 2002, art. 131) en 2026, en UVB, et coût total avec plusieurs comparendos. */
import type { MiniSpec } from '../mini-types';
import { P } from './_kit';
import { cop, num } from '../fmt';
export default function (): MiniSpec {
  const C = (P as unknown as { co: { multaC14: number; uvb2026: number } }).co;
  return {
    tz: 'America/Bogota', title: '¿Cuánto cuesta la multa por pico y placa?', cta: 'Consulta tu pico y placa', ctaHref: '/es/pico-y-placa/',
    inputs: [{ id: 'n', label: 'Comparendos C.14', def: 1, options: [1, 2, 3].map((x) => ({ value: String(x), label: String(x) })) }],
    run: (v) => ({ head: ['Multa C.14 en 2026', cop(C.multaC14 * v.n)], tone: 'no', rows: [['Valor de una C.14', cop(C.multaC14)], ['Equivale a', `${num(C.multaC14 / C.uvb2026, 'co', 1)} UVB de ${cop(C.uvb2026)}`], ['Además', 'inmovilización del vehículo']], note: 'Tabla oficial de multas 2026 (Barranquilla); grúa y patios se pagan aparte.' }),
  };
}

/** Pico y Placa Solidario (Bogotá) : valeur de base 2026 et facteur du municipio d'immatriculation. */
import type { MiniSpec } from '../mini-types';
import { P } from './_kit';
import { cop, num } from '../fmt';
export default function (): MiniSpec {
  const S = (P as unknown as { co: { solidario: { dia: number; mes: number; semestre: number; factorFuera: number } } }).co.solidario;
  return {
    tz: 'America/Bogota', title: '¿Cuánto cuesta el Pico y Placa Solidario?', cta: 'Ver el pico y placa de Bogotá', ctaHref: '/es/pico-y-placa-bogota/',
    inputs: [{ id: 'p', label: 'Permiso', def: 1, options: [{ value: '0', label: '1 día' }, { value: '1', label: '1 mes' }, { value: '2', label: '6 meses' }] }, { id: 'f', label: 'Matrícula del carro', def: 0, options: [{ value: '0', label: 'Bogotá' }, { value: '1', label: 'Otro municipio' }] }],
    run: (v) => {
      const base = [S.dia, S.mes, S.semestre][v.p] ?? S.mes;
      return { head: ['Valor base 2026', cop(base)], tone: 'na', rows: [['Factor por matrícula fuera de Bogotá', v.f ? `× ${num(S.factorFuera, 'co', 1)}` : 'no aplica'], ['Base con ese factor', v.f ? cop(Math.round(base * S.factorFuera)) : cop(base)], ['Pago', 'PSE en movilidadbogota.gov.co']], note: 'El precio final aplica también factores por avalúo, modelo y combustible que fija la Secretaría.' };
    },
  };
}

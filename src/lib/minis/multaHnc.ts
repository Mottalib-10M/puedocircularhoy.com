/** Amende de l'art. 47 du Reglamento de Tránsito (20, 25 ou 30 UMA) et sanction SEDEMA de 20 UMA. */
import type { MiniSpec } from '../mini-types';
import { P } from './_kit';
import { multaHnc } from '../engine/mx';
import { mxn } from '../fmt';
export default function (): MiniSpec {
  const U = P.mx.uma.diaria; const V = P.mx.multaHncVeces;
  return {
    tz: 'America/Mexico_City', title: '¿Cuánto me cuesta circular en mi día?', cta: 'Evitarla: consulta tu día', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 'v', label: 'Multa aplicada por el agente', def: V[0], options: V.map((x) => ({ value: String(x), label: `${x} UMA` })) }],
    run: (v) => {
      const [m] = multaHnc(U, [v.v]);
      return { head: ['Multa de tránsito', mxn(m, 0)], tone: 'no', rows: [['UMA 2026', mxn(U)], ['Rango posible', `${mxn(multaHnc(U, [V[0]])[0], 0)} a ${mxn(multaHnc(U, [V[2]])[0], 0)}`], ['Sanción ambiental aparte (SEDEMA)', mxn(multaHnc(U, [P.mx.verif.multaUma])[0], 0)]], note: 'Reglamento de Tránsito, artículo 47.' };
    },
  };
}

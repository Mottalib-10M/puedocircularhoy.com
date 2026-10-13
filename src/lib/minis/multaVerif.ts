/** Ce que coûte une vérification en retard : multa de 20 UMA + vérification (5.625 UMA + IVA). */
import type { MiniSpec } from '../mini-types';
import { MX, VERIF, digitOpts } from './_kit';
import { colorDe, costoVerif, multaVerif } from '../engine/mx';
import { daysInMonth, iso, parts } from '../engine/dates';
import { mxn, fecha, mes } from '../fmt';
export default function (): MiniSpec {
  return {
    tz: 'America/Mexico_City', title: '¿Ya se me pasó la verificación?', cta: 'Ver el calendario de verificación', ctaHref: '/es/verificacion-vehicular/',
    inputs: [{ id: 'd', label: 'Último número de la placa', def: 3, options: digitOpts() }],
    run: (v, hoy) => {
      const c = colorDe(MX, v.d); const [y, m] = parts(hoy); const s = m <= 6 ? 1 : 2;
      const [, m2] = VERIF.semestres[String(s) as '1' | '2'][c];
      const fin = iso(y, m2, daysInMonth(y, m2)); const tarde = hoy > fin;
      return { head: [tarde ? 'Plazo vencido el' : 'Tu plazo vence el', fecha(fin)], tone: tarde ? 'no' : 'si', rows: [['Engomado', c], ['Último mes', mes(m2)], ['Multa extemporánea', mxn(multaVerif(VERIF), 0)], ['Total con la verificación', mxn(multaVerif(VERIF) + costoVerif(VERIF), 0)]], note: 'Programa de verificación del 2.º semestre de 2026.' };
    },
  };
}

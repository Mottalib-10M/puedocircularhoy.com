/** Holograma probable selon l'année modèle (programme de verificación 2S2026, §8.3 à 8.5). */
import type { MiniSpec } from '../mini-types';
import { P } from './_kit';
export default function (): MiniSpec {
  const H = P.mx.hologramas;
  const years = Array.from({ length: 2027 - 1985 }, (_, i) => 2026 - i).map((y) => ({ value: String(y), label: String(y) }));
  return {
    tz: 'America/Mexico_City', title: '¿Qué holograma le toca a mi auto?', cta: 'Ver si circulas hoy', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 'y', label: 'Año del modelo', def: 2012, options: years }, { id: 'c', label: 'Combustible', def: 0, options: [{ value: '0', label: 'Gasolina' }, { value: '1', label: 'Diésel' }, { value: '2', label: 'Híbrido (HEV o PHEV)' }, { value: '3', label: 'Eléctrico' }] }],
    run: (v) => {
      if (v.c === 3) return { head: ['Holograma posible', 'Exento'], tone: 'si', rows: [['Vigencia', 'permanente'], ['Hoy No Circula', 'no aplica']] };
      if (v.c === 2) return { head: ['Holograma posible', 'Exento'], tone: 'si', rows: [['Vigencia en la CDMX', `${H.exento.hibridoAnios} años, con una renovación`], ['Hoy No Circula', 'no aplica']], note: 'Híbridos suaves (MHEV): se verifican como gasolina.' };
      if (v.c === 1) return v.y >= H['0'].dieselDesde ? { head: ['Holograma posible', '0'], tone: 'si', rows: [['Condición', 'opacidad dentro del límite'], ['Hoy No Circula', 'circula diario']] } : { head: ['Holograma posible', '1 o 2'], tone: 'warn', rows: [['Condición', 'según la opacidad medida'], ['Hoy No Circula', 'un día entre semana']] };
      if (v.y >= H['0'].modeloDesde) return { head: ['Holograma posible', '0 (o 00)'], tone: 'si', rows: [['Condición', 'aprobar la prueba del verificentro'], ['Vigencia del 0', `${H['0'].vigenciaMeses} meses`], ['Hoy No Circula', 'circula diario']], note: 'El 00 se reserva a autos nuevos o de bajas emisiones homologadas.' };
      if (v.y >= H['1'].modeloDesde) return { head: ['Holograma posible', '1'], tone: 'warn', rows: [['Modelos', `${H['1'].modeloDesde} a ${H['1'].modeloHasta}`], ['Hoy No Circula', 'un día entre semana y dos sábados']] };
      return { head: ['Holograma posible', '2'], tone: 'no', rows: [['Modelos', `${H['2'].modeloHasta} y anteriores`], ['Hoy No Circula', 'un día entre semana y todos los sábados']] };
    },
  };
}

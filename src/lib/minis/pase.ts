/** Pase Turístico : le véhicule peut-il le demander ? (programme 2S2026, §4.22, §19.1.7). */
import type { MiniSpec } from '../mini-types';
import { P } from './_kit';
export default function (): MiniSpec {
  const PS = P.mx.pase;
  const years = Array.from({ length: 30 }, (_, i) => 2027 - i).map((y) => ({ value: String(y), label: String(y) }));
  const origen = ['Otro estado (Jalisco, Nuevo León, Veracruz…)', 'Estado de México, Hidalgo, Morelos, Puebla, Querétaro o Tlaxcala', 'Ciudad de México', 'Extranjero'];
  return {
    tz: 'America/Mexico_City', title: '¿Puedo pedir el Pase Turístico?', cta: 'Ver qué días circulo sin pase', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 'o', label: 'Placas de', def: 0, options: origen.map((o, i) => ({ value: String(i), label: o })) }, { id: 'y', label: 'Año del modelo', def: 2016, options: years }],
    run: (v) => {
      if (v.o === 1 || v.o === 2) return { head: ['Pase Turístico', 'No disponible'], tone: 'no', rows: [['Motivo', 'tus placas son de la CDMX o de un estado excluido'], ['Alternativa', 'verificar y circular con tu holograma']] };
      if (v.y < PS.modeloMin) return { head: ['Pase Turístico', 'No disponible'], tone: 'no', rows: [['Motivo', `solo modelos ${PS.modeloMin} y posteriores`], ['Sin pase', 'se te trata como holograma 2']] };
      return { head: ['Pase Turístico', 'Puedes pedirlo'], tone: 'si', rows: [['Opción 1', `${PS.dias14} pase de 14 días por semestre`], ['Opción 2', `${PS.dias7} pases de 7 días por semestre`], ['Costo', 'gratuito'], ['En contingencia', 'se trata como holograma 2']] };
    },
  };
}

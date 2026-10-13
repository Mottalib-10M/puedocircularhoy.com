import { definePage } from '../../lib/page-types';
import { P, cop } from '../../lib/kit';

const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-barranquilla',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 70,
  slug: 'pico-y-placa-barranquilla',
  nav: 'Barranquilla',
  card: 'Sin pico y placa general para particulares en 2026; medidas de Carnaval y zona de motos en el centro.',
  title: 'Pico y placa Barranquilla 2026: sin restricción general',
  description: 'Pico y placa en Barranquilla 2026: no hay restricción general para carros particulares; solo medidas temporales de Carnaval y una zona del centro vedada a motos.',
  h1: 'Pico y placa en Barranquilla',
  intro: 'La pregunta más buscada tiene una respuesta corta: los carros particulares no tienen pico y placa permanente.',
  resume: `Barranquilla no tiene en 2026 un pico y placa permanente para carros particulares. Las medidas que la Alcaldía decretó este año fueron temporales: el Decreto 0036 del 26 de enero de 2026 restringió a los particulares en la Vía 40 durante el montaje de los palcos del Carnaval, hasta que la Resolución 0012 de 2026 la levantó el 19 de febrero, y estableció un pico y placa en toda la ciudad del viernes 13 al lunes 16 de febrero, los días del Carnaval. Para las motos tampoco hay pico y placa, pero el Decreto 0703 del 30 de octubre de 2025 les prohíbe circular por un perímetro del centro, entre la calle 30, la carrera 38, la calle 45 y la carrera 46, hasta el 31 de octubre de 2026. Los taxis tuvieron su restricción levantada por el Decreto 0450 de 2025. Si un decreto nuevo crea una restricción, la herramienta lo dirá con su fecha; hoy responde que no hay medida.`,
  tool: 'pyp',
  toolProps: { city: 'barranquilla', lockCity: true },
  faqs: [
    { q: '¿Hay pico y placa en Barranquilla para carros particulares?', a: 'No de forma permanente en 2026. Las únicas restricciones para particulares de este año fueron las del Carnaval, con el Decreto 0036 de 2026: en la Vía 40 durante el montaje de palcos y en toda la ciudad del 13 al 16 de febrero. Fuera de esos días, los carros particulares circulan sin restricción por número de placa.' },
    { q: '¿Por dónde no pueden pasar las motos en Barranquilla?', a: 'Por el perímetro del centro que delimita el Decreto 0703 de 2025: calle 30, carrera 38, calle 45 o avenida Murillo y carrera 46. La medida va del 1 de noviembre de 2025 al 31 de octubre de 2026, con excepciones para quien inscribe acompañantes y tramita el permiso. Después de esa fecha, revisa si la Alcaldía la prorroga.' },
    { q: '¿Cuánto es la multa C14 en Barranquilla en 2026?', a: `La tabla oficial de multas de tránsito de la Alcaldía para la vigencia 2026 fija la infracción C14, transitar por sitios restringidos o en horas prohibidas, en ${cop(C14)}, además de la inmovilización del vehículo. Es la misma infracción que se aplica por pico y placa en el resto del país, convertida a UVB.` },
  ],
  body: (h) => `
<h2>Por qué Barranquilla es distinta</h2>
<p>Muchas calculadoras de pico y placa ofrecen Barranquilla en su lista y devuelven un resultado sin decir qué regla aplican. La respuesta honesta es que no hay regla general que aplicar: la Alcaldía restringe por número de placa solo en momentos concretos, como el Carnaval, y lo hace por decreto con fechas de inicio y de fin. Fuera de esos decretos, la herramienta contesta que no hay pico y placa.</p>
<h2>Las medidas temporales de 2026</h2>
<p>El Decreto 0036 de 2026 combinó dos medidas. En la Vía 40, donde se montan los palcos del desfile, los particulares tuvieron restricción desde el 2 de febrero hasta que la Resolución 0012 la levantó el jueves 19. Y del viernes 13 al lunes 16 de febrero hubo pico y placa en toda la ciudad para particulares, para ordenar el tráfico de los cuatro días de fiesta. Si en 2027 se repite, la página lo dirá con el texto del decreto nuevo.</p>
<h2>Motos y taxis</h2>
<p>Las motos no tienen pico y placa por número, pero sí una zona del centro donde no pueden circular hasta el 31 de octubre de 2026, salvo con permiso y acompañante inscrito. En los taxis, el Decreto 0450 del 7 de julio de 2025 levantó la restricción por último número que regía desde 2009. Para comparar con otras ciudades, ver ${h.a('pico-y-placa', 'pico y placa hoy')} y ${h.a('pico-y-placa-motos', 'pico y placa para motos')}; para el valor de la infracción, ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa', 'pico-y-placa-motos', 'multa-pico-y-placa', 'pico-y-placa-cartagena'],
  sources: ['baq_carnaval_2026', 'baq_motos_2026', 'baq_multas_2026'],
});

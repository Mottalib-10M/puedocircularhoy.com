import { definePage } from '../../lib/page-types';
import { ciudad, horario, digits, pypSemana, fecha } from '../../lib/kit';

const C = ciudad('villavicencio');
const sem = pypSemana('villavicencio', '2026-10-13');

export default definePage({
  id: 'pico-y-placa-villavicencio',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 90,
  slug: 'pico-y-placa-villavicencio',
  nav: 'Villavicencio',
  card: 'Decreto 015 de 2026: dos franjas en el polígono del centro, hasta el 22 de diciembre.',
  title: 'Pico y placa Villavicencio 2026: polígono y horario hoy',
  description: `Pico y placa en Villavicencio 2026 (Decreto 015): ${sem.map(([d, xs]) => `${d.slice(0, 2)} ${digits(xs)}`).join(', ')}, de ${horario(C.carro.horas)}, dentro del polígono.`,
  h1: 'Pico y placa en Villavicencio',
  intro: 'Restricción solo dentro del polígono del centro y solo en las horas de mayor tráfico.',
  resume: `En Villavicencio el pico y placa de 2026 lo fija el Decreto 015 de 2026, del ${fecha(C.vigencia.desde)} al ${fecha(C.vigencia.hasta)}, en el mismo polígono del centro que en 2025. Los carros particulares tienen restricción de lunes a viernes en dos franjas, de ${horario(C.carro.horas)}, según el último número de la placa: ${sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}. Se puede circular por las vías que bordean el polígono, porque la medida solo cubre su interior. La sanción es la infracción C.14 con inmovilización. La Alcaldía anunció además una restricción excepcional de particulares el sábado 31 de octubre de 2026, Día de los Niños, que la herramienta no calcula porque no conocemos su horario. La página oficial no precisa qué ocurre los festivos ni con las motos: la herramienta supone, como en las demás ciudades, que el festivo no tiene pico y placa, y lo señala.`,
  tool: 'pyp',
  toolProps: { city: 'villavicencio', lockCity: true },
  faqs: [
    { q: '¿Puedo pasar por Villavicencio en mi día de pico y placa?', a: 'Sí, si no entras al polígono del centro: el Decreto 015 de 2026 permite circular por las vías que lo bordean. La restricción vale dentro del polígono y solo en las dos franjas de la mañana y la tarde; al mediodía se circula también por dentro. Para un trayecto hacia Acacías o Puerto López por las vías perimetrales, el número de tu placa no importa.' },
    { q: '¿Hay pico y placa en Villavicencio en diciembre?', a: `Hasta el ${fecha(C.vigencia.hasta)}, que es la fecha de fin del Decreto 015 de 2026. Después, la Alcaldía suele levantar la medida para las fiestas y publicar el decreto del año siguiente en enero; la herramienta responde que no hay rotación publicada para esas fechas.` },
    { q: '¿Qué pasa el 31 de octubre en Villavicencio con el pico y placa?', a: 'La Alcaldía anunció una restricción excepcional para los particulares el sábado 31 de octubre de 2026, Día de los Niños, con los taxis libres. No pudimos leer su horario ni las placas afectadas, así que la herramienta no la aplica. Ese día confirma con la Secretaría de Movilidad antes de entrar al centro.' },
  ],
  body: (h) => `
<h2>La tabla del año</h2>
${h.table(['Día', 'No circulan las placas terminadas en'], sem.map(([d, xs]) => [d, digits(xs)]), `Decreto 015 de 2026, de ${horario(C.carro.horas)}.`)}
<p>Las franjas de Villavicencio son cortas y caen en las horas en que la ciudad se congestiona. Quien trabaja en el centro con un horario de oficina las cruza dos veces: al entrar y al salir. Quien llega a media mañana y se va antes de las cinco, no.</p>
<h2>Taxis y otras reglas</h2>
<p>Los taxis tienen su propia restricción, de lunes a domingo, de 6:00 a. m. a medianoche, que esta herramienta no calcula. Las motos no figuran en la página oficial del pico y placa de 2026. Para comparar con Bogotá, a donde muchos viajan los lunes festivos, ver ${h.a('pico-y-placa-regional-bogota', 'pico y placa regional de Bogotá')}; para la multa, ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa-regional-bogota', 'pico-y-placa-bogota', 'pico-y-placa', 'multa-pico-y-placa'],
  sources: ['vvc_decreto_015_2026', 'ley_769_2002'],
});

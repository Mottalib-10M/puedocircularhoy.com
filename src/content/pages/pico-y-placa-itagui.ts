import { definePage } from '../../lib/page-types';
import { ciudad, horario, digits, pypSemana } from '../../lib/kit';

const I = ciudad('itagui');
const sem = pypSemana('itagui', '2026-10-13');

export default definePage({
  id: 'pico-y-placa-itagui',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 25,
  slug: 'pico-y-placa-itagui',
  nav: 'Itagüí y Valle de Aburrá',
  card: 'Decreto 1011 de 2026: la tabla metropolitana, con la Autopista Sur libre en Itagüí.',
  title: 'Pico y placa Itagüí 2026: Envigado, Bello y Sabaneta hoy',
  description: `Pico y placa en Itagüí y el Valle de Aburrá 2026: la misma rotación que Medellín, ${sem[0][0]} ${digits(sem[0][1])}, de ${horario(I.carro.horas)}, con la Autopista Sur exenta.`,
  h1: 'Pico y placa en Itagüí y el Valle de Aburrá',
  intro: 'Itagüí, Envigado, Sabaneta, La Estrella, Caldas, Bello, Copacabana, Girardota y Barbosa comparten la tabla de Medellín.',
  resume: `Los diez municipios del Valle de Aburrá aplican en el segundo semestre de 2026 la rotación que aprobó el Consejo Metropolitano de Movilidad el 15 de julio de 2026: ${sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}, de ${horario(I.carro.horas)} en días hábiles. Itagüí la adoptó con el Decreto 1011 de 2026, que deroga el Decreto 065 del 30 de enero de 2026 y rige desde el 3 de agosto: carros por el último número de la placa, motos por el primero. La medida cubre todo el casco urbano de Itagüí salvo el tramo de la Autopista Sur, que ya había quedado libre en marzo de 2026 con el Decreto 195. La herramienta aplica el decreto de Itagüí; para Envigado, Bello, Sabaneta y los demás municipios usa la misma tabla, que es la metropolitana, pero sus decretos municipales no los leímos y pueden tener vías exentas propias.`,
  tool: 'pyp',
  toolProps: { city: 'itagui', lockCity: true },
  faqs: [
    { q: '¿Envigado tiene el mismo pico y placa que Medellín?', a: 'La tabla es la misma: la rotación del segundo semestre de 2026 la aprobó el Consejo Metropolitano de Movilidad para los diez municipios del Valle de Aburrá. Lo que puede variar son las vías exentas, como la Avenida Regional, y los días de período pedagógico, que fija cada decreto municipal. Verifica en la Secretaría de Movilidad de Envigado si circulas por una vía límite.' },
    { q: '¿La Autopista Sur tiene pico y placa en Itagüí?', a: 'No. El Decreto 195 de marzo de 2026 eliminó la restricción en la carrera 42, la Autopista Sur, dentro de Itagüí, y el Decreto 1011 de 2026 la vuelve a excluir: la medida se aplica en toda la jurisdicción urbana exceptuando ese tramo. En el resto del casco urbano rige la tabla metropolitana.' },
    { q: '¿Qué multa ponen en Itagüí por pico y placa?', a: 'El Decreto 1011 de 2026 remite a la infracción C.14 del Código Nacional de Tránsito, con multa de quince salarios mínimos diarios en su texto e inmovilización del vehículo. En 2026 las multas de tránsito se cobran convertidas a UVB; el valor de la C.14 está en la página de la multa por pico y placa.' },
  ],
  body: (h) => `
<h2>Un acuerdo metropolitano, diez decretos</h2>
<p>El pico y placa del Valle de Aburrá funciona como una sola medida porque los secretarios de movilidad de los diez municipios aprueban juntos la rotación en el Consejo Metropolitano de Movilidad. Cada alcaldía la adopta después con su propio decreto. Para quien cruza todos los días de Bello a Envigado o de Itagüí a Medellín, eso significa un solo día de descanso, el mismo en todo el recorrido.</p>
${h.table(['Día', 'Carros (último número)', 'Motos (primer número)'], sem.map(([d, xs]) => [d, digits(xs), digits(xs)]), 'Decreto 1011 de 2026 de Itagüí, misma tabla que el Decreto 1490 de 2026 de Medellín.')}
<h2>Lo propio de Itagüí</h2>
<p>El decreto de Itagüí escribe que la medida «no regirá durante los fines de semana, ni los días festivos establecidos por la ley» y fija el mismo período pedagógico que Medellín, del 3 al 6 de agosto de 2026. Su particularidad es la Autopista Sur: la carrera 42 quedó libre de pico y placa desde marzo de 2026, de modo que se puede atravesar el municipio por ella en tu día de restricción, pero no entrar a los barrios.</p>
<p>Los taxis rotan cada dos semanas, de 6:00 a. m. a 8:00 p. m., con su propio calendario. Para Medellín, con sus vías exentas y la lista de exenciones por combustible, ver ${h.a('pico-y-placa-medellin', 'pico y placa en Medellín')}.</p>
`,
  related: ['pico-y-placa-medellin', 'pico-y-placa-motos', 'calendario-pico-y-placa', 'multa-pico-y-placa'],
  sources: ['itagui_decreto_1011_2026', 'med_decreto_1490_2026', 'med_comunicado_2026'],
});

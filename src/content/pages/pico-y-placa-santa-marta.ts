import { definePage } from '../../lib/page-types';
import { ciudad, horario, digits, pypSemana, fecha } from '../../lib/kit';

const C = ciudad('santa-marta');
const sem = pypSemana('santa-marta', '2026-10-13');

export default definePage({
  id: 'pico-y-placa-santa-marta',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 80,
  slug: 'pico-y-placa-santa-marta',
  nav: 'Santa Marta',
  card: 'Decreto 213 de 2026: tres franjas para los carros de Santa Marta, día entero para los de afuera.',
  title: 'Pico y placa Santa Marta 2026: horarios y carros de afuera',
  description: `Pico y placa en Santa Marta 2026 (Decreto 213): ${sem.map(([d, xs]) => `${d.slice(0, 2)} ${digits(xs)}`).join(', ')}; tres franjas para carros locales, día entero para foráneos.`,
  h1: 'Pico y placa en Santa Marta',
  intro: 'El horario depende de dónde está matriculado el carro.',
  resume: `En Santa Marta el pico y placa lo regula el Decreto 213 del 8 de mayo de 2026, que rige seis meses desde su publicación, es decir hasta comienzos de noviembre de 2026; la herramienta lo aplica hasta el ${fecha(C.vigencia.hasta)}. La tabla es ${sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}, por el último número de la placa, para automóviles, camperos, camionetas y microbuses particulares. Lo singular es el horario: los carros matriculados en Santa Marta tienen restricción en tres franjas, de ${horario(C.carro.horas)}, mientras que los matriculados en otra ciudad la tienen de 7:00 a. m. a 8:00 p. m. sin interrupción. El día de llegada, quien muestra el recibo del peaje de Neguanje, Tasajera o Tucurinca circula libre. No se aplica en festivos, y los eléctricos e híbridos están exentos. La medida rige dentro del anillo vial que forman la carrera 1, el Batallón Córdoba, el cerro Ziruma, la Troncal del Caribe y la vía alterna.`,
  tool: 'pyp',
  toolProps: { city: 'santa-marta', lockCity: true },
  faqs: [
    { q: '¿Si vengo de vacaciones a Santa Marta tengo pico y placa?', a: 'El día que llegas no, si conservas el recibo del peaje de Neguanje, Tasajera o Tucurinca de ese día. Desde el día siguiente, y si tu carro está matriculado fuera de Santa Marta, la restricción de tu número va de 7:00 a. m. a 8:00 p. m. sin pausas dentro del anillo vial. Fuera del anillo, como en las vías hacia el Rodadero o Taganga por la Troncal, revisa los límites del decreto.' },
    { q: '¿Hasta cuándo va el Decreto 213 de Santa Marta?', a: `El artículo 8 dice que rige desde su publicación y hasta por seis meses. Firmado el 8 de mayo de 2026, vence a comienzos de noviembre; no conocemos la fecha exacta de publicación, por eso la herramienta responde hasta el ${fecha(C.vigencia.hasta)}. Para las fechas siguientes espera el decreto nuevo o su prórroga.` },
    { q: '¿Las motos tienen pico y placa en Santa Marta?', a: 'El Decreto 213 de 2026 regula automóviles, camperos, camionetas, microbuses y vehículos similares de servicio particular, pero no trata las motos. La herramienta no calcula restricción de motos en Santa Marta; si la Alcaldía dicta una medida para motos, la cargaremos con su texto.' },
  ],
  body: (h) => `
<h2>La tabla y las tres franjas</h2>
${h.table(['Día', 'No circulan las placas terminadas en'], sem.map(([d, xs]) => [d, digits(xs)]), 'Decreto 213 de 2026, Alcaldía de Santa Marta.')}
<p>Para un samario la restricción se reparte en la mañana, el mediodía y la tarde; entre franja y franja el carro puede moverse. Para un visitante, el día de su número es un día sin carro dentro del anillo vial. La diferencia busca aliviar el centro y el sector turístico en temporada sin castigar a quien vive en la ciudad.</p>
<h2>Excepciones</h2>
<p>El decreto exceptúa a los vehículos con motores eléctricos o gasoeléctricos, a los adaptados para personas con discapacidad, a los oficiales y de emergencia, entre otros. Hubo quince días de pedagogía antes de sancionar con la infracción C.14. Ver ${h.a('multa-pico-y-placa', 'multa por pico y placa')} y ${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')}.</p>
<p>Si viajas a otra ciudad del Caribe, Barranquilla no tiene pico y placa general y Cartagena tiene horario partido: ver ${h.a('pico-y-placa-barranquilla', 'Barranquilla')} y ${h.a('pico-y-placa-cartagena', 'Cartagena')}.</p>
`,
  related: ['pico-y-placa-cartagena', 'pico-y-placa-barranquilla', 'pico-y-placa', 'multa-pico-y-placa'],
  sources: ['smr_decreto_213_2026', 'ley_769_2002'],
});

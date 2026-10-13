import { definePage } from '../../lib/page-types';
import { FESTIVOS, fechaDia, CIUDADES } from '../../lib/kit';

const restantes = FESTIVOS.filter((f) => f >= '2026-10-13');

export default definePage({
  id: 'pico-y-placa-festivos',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 80,
  slug: 'pico-y-placa-festivos',
  nav: 'Pico y placa en festivos',
  card: 'Los 18 festivos de 2026, la Ley Emiliani y qué ciudades restringen en sábado.',
  title: 'Pico y placa festivos 2026: lunes festivos y Ley Emiliani',
  description: `Pico y placa en festivos 2026: ninguna ciudad cubierta lo aplica en los ${FESTIVOS.length} festivos de la Ley 51 de 1983. Próximo: ${fechaDia(restantes[0])}; Bogotá: regional.`,
  h1: 'Pico y placa en días festivos',
  intro: 'El festivo se traslada al lunes y el pico y placa descansa con él.',
  resume: `Los ${FESTIVOS.length} festivos de 2026 en Colombia salen de la Ley 51 de 1983, la Ley Emiliani, que traslada al lunes siguiente siete fiestas fijas y tres móviles cuando no caen en lunes. En todas las ciudades que cubre la herramienta el decreto del pico y placa excluye los festivos: Bogotá habla de lunes a viernes excepto festivos, Medellín de días hábiles, Cali de sábados, domingos y feriados establecidos por la ley, y Pereira escribe que no regirá los festivos. Así, un lunes festivo no hay pico y placa urbano ni para carros ni para motos. Quedan en 2026 ${restantes.map((f) => fechaDia(f)).join(', ')}. El 8 de diciembre cae en martes y no se traslada, porque la Inmaculada Concepción no está en la lista de fiestas que se mueven. En Bogotá, el último día de cada puente rige el pico y placa regional de entrada a la ciudad, una medida distinta que la herramienta explica aparte.`,
  mini: 'festivosCo',
  faqs: [
    { q: '¿El 8 de diciembre hay pico y placa?', a: 'No, porque es festivo. En 2026 el día de la Inmaculada Concepción cae en martes y no se traslada al lunes: la Ley 51 de 1983 lo deja en su fecha. Ese martes no hay pico y placa urbano en las ciudades cubiertas. El lunes 7 de diciembre es un día hábil normal con su restricción.' },
    { q: '¿Qué festivos se pasan al lunes en Colombia?', a: 'Según la Ley 51 de 1983, el 6 de enero, el 19 de marzo, el 29 de junio, el 15 de agosto, el 12 de octubre, el 1 y el 11 de noviembre, y las fiestas móviles de la Ascensión, Corpus Christi y Sagrado Corazón se trasladan al lunes siguiente cuando no caen en lunes. El 1 de enero, el 1 de mayo, el 20 de julio, el 7 de agosto, el 8 y el 25 de diciembre y la Semana Santa no se mueven.' },
    { q: '¿En Bucaramanga hay pico y placa el sábado festivo?', a: 'En 2026 ningún festivo cae en sábado. La Alcaldía de Bucaramanga aplica la medida en días hábiles y en los sábados de su ciclo, pero no publicó una regla expresa para un sábado festivo. La herramienta trata el festivo como libre en todas las ciudades, que es lo que dicen los decretos que lo mencionan.' },
  ],
  body: (h) => `
<h2>Los festivos de 2026</h2>
${h.table(['Fecha', 'Pico y placa'], FESTIVOS.map((f) => [fechaDia(f, true), 'No hay']), 'Calculados con la Ley 51 de 1983 y la Pascua del 5 de abril de 2026; coinciden con los festivos que mencionan los calendarios oficiales de Bogotá y Medellín.')}
<h2>Por qué casi todos caen en lunes</h2>
<p>La Ley 51 de 1983 buscaba fines de semana largos para el turismo interno: siete fiestas de fecha fija y las tres que dependen de la Pascua se mueven al lunes cuando no caen en lunes. Con ella nacieron los puentes festivos, y con los puentes, el problema del regreso a las ciudades el lunes por la tarde. La Pascua de 2026 fue el 5 de abril, así que la Ascensión pasó al 18 de mayo, Corpus Christi al 8 de junio y el Sagrado Corazón al 15 de junio.</p>
<h2>Qué dice cada decreto</h2>
<p>No hay una norma nacional que suspenda el pico y placa en festivos: lo dice cada decreto local, con palabras distintas. Bogotá lo aplica de lunes a viernes, excepto días festivos y sábados. Medellín y el Valle de Aburrá, durante los días hábiles. Cali excluye sábados, domingos y feriados establecidos por la ley. Pereira escribe que no regirá durante los sábados, domingos ni festivos. Cartagena, que no aplica fines de semana ni festivos. La herramienta aplica la misma regla en todas las ciudades cubiertas: ${CIUDADES.map((c) => c.nombre).join(', ')}.</p>
<h2>El pico y placa de los regresos</h2>
<p>Que no haya pico y placa urbano no significa que el lunes festivo no tenga restricciones. Bogotá aplica el ${h.a('pico-y-placa-regional-bogota', 'pico y placa regional')} en los nueve corredores de entrada el último día de cada puente, por placa par e impar. Algunas ciudades, como Cartagena en enero de 2026, han aplicado además medidas temporales en temporada alta. Para ver los días libres de tu placa en el mes, usa el ${h.a('calendario-pico-y-placa', 'calendario del pico y placa')}.</p>
<h2>Y en 2027</h2>
<p>Los festivos de 2027 se pueden calcular con la misma ley, con la Pascua del 28 de marzo de 2027, pero las rotaciones de 2027 aún no están publicadas. Cuando lo estén, la herramienta cargará los festivos del año con las tablas nuevas.</p>
`,
  related: ['pico-y-placa-regional-bogota', 'calendario-pico-y-placa', 'pico-y-placa-manana', 'pico-y-placa'],
  sources: ['ley_51_1983', 'bog_octubre_2026', 'med_decreto_1490_2026', 'per_decreto_540_2024'],
});

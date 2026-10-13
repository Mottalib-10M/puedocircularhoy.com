import { definePage } from '../../lib/page-types';
import { CIUDADES, FESTIVOS, fechaDia, ciudad, horario } from '../../lib/kit';

const prox = FESTIVOS.filter((f) => f >= '2026-10-13').slice(0, 3);

export default definePage({
  id: 'pico-y-placa-manana',
  group: 'pyp-reglas',
  kind: 'pillar',
  order: 20,
  slug: 'pico-y-placa-manana',
  nav: 'Pico y placa mañana',
  card: 'La consulta de la víspera: si mañana te toca, en tu ciudad, con festivos y sábados.',
  title: 'Pico y placa mañana 2026: ¿te toca? Consulta por ciudad',
  description: 'Pico y placa mañana 2026 en Bogotá, Medellín, Cali, Bucaramanga y más ciudades: tu placa y tu ciudad, y sabes la víspera si circulas, con festivos y sábados.',
  h1: 'Pico y placa mañana',
  intro: 'Para organizar el día siguiente la noche antes: la herramienta calcula directamente mañana.',
  resume: `Esta consulta responde para mañana, con la fecha de Bogotá, y aplica el decreto vigente de cada ciudad a tu placa: en Bogotá la paridad de la fecha de mañana, en Medellín, Cali, Bucaramanga, Cartagena, Pereira, Santa Marta y Villavicencio el día de la semana con su rotación. Si mañana es sábado, domingo o festivo, la respuesta es que no hay pico y placa, salvo en Bucaramanga, donde los sábados hay restricción de ${horario(ciudad('bucaramanga').carro.sabadoCiclo!.horas)}. Los próximos festivos que la herramienta ya descuenta son ${prox.map((f) => fechaDia(f)).join(', ')}. Una advertencia práctica: si mañana empieza una rotación nueva, como pasó en Bucaramanga el lunes 5 de octubre de 2026, la consulta de la víspera ya usa la tabla nueva, porque cada periodo está cargado con su fecha de inicio.`,
  tool: 'pyp',
  toolProps: { city: 'bogota', manana: true },
  faqs: [
    { q: '¿Mañana hay pico y placa si es festivo?', a: 'No, en ninguna de las ciudades que cubre la herramienta: todos los decretos excluyen los festivos de la Ley 51 de 1983. En Bogotá, el último día de un puente festivo rige en cambio el pico y placa regional de entrada a la ciudad, por placa par o impar y por franja horaria, en nueve corredores viales.' },
    { q: '¿A qué hora conviene consultar el pico y placa de mañana?', a: 'A cualquier hora: la regla de mañana ya está en el decreto y no depende de un anuncio del día. La excepción son las medidas extraordinarias, como un pico y placa ampliado por obras o eventos, que las alcaldías anuncian con pocos días de aviso. Si vas a hacer un viaje largo, revisa también las redes de la secretaría de movilidad.' },
    { q: '¿Por qué mañana me toca si el lunes ya me tocó en Bogotá?', a: 'Porque en Bogotá cuenta la paridad de la fecha, no el día de la semana. Si el lunes es 13 y el martes 14, cambian de impar a par y cambian las placas restringidas; pero entre el 31 de un mes y el 1 del siguiente, dos impares seguidos, la misma placa descansa dos días. La herramienta hace la cuenta exacta.' },
    { q: '¿La consulta de mañana sirve para las motos?', a: 'Sí, donde hay pico y placa de motos: Medellín, el Valle de Aburrá y Pereira restringen por el primer número de la placa, y Cartagena por el último con un horario más largo. Al elegir moto la herramienta cambia de tabla y de horario. En las ciudades sin pico y placa de motos, lo indica bajo el campo.' },
  ],
  body: (h) => `
<h2>Qué cambia de un día al siguiente</h2>
<p>En las ciudades con tabla por día de la semana, mañana es simplemente el día siguiente de la tabla, salvo que caiga en fin de semana, en festivo o en el primer día de una rotación nueva. En Bogotá, en cambio, el paso de un día al siguiente invierte siempre las placas restringidas, porque alterna par e impar, con la excepción del paso del 31 al 1.</p>
<p>La herramienta guarda para cada ciudad las fechas de inicio y fin de cada tabla publicada. Así, la víspera del cambio de rotación de una ciudad, la respuesta para mañana ya sale con la tabla nueva, y la víspera del fin de una vigencia sin decreto siguiente, avisa que no hay rotación publicada.</p>
<h2>Para planear la semana</h2>
<p>Si necesitas más de un día, el ${h.a('calendario-pico-y-placa', 'calendario del pico y placa')} pinta el mes entero de tu placa, con festivos y sábados. Para la consulta del día, ${h.a('pico-y-placa', 'pico y placa hoy')}. Las ciudades cubiertas son ${CIUDADES.map((c) => h.a(`pico-y-placa-${c.slug}`, c.nombre)).join(', ')}.</p>
`,
  related: ['pico-y-placa', 'calendario-pico-y-placa', 'pico-y-placa-festivos', 'pico-y-placa-bogota'],
  sources: ['bog_octubre_2026', 'med_decreto_1490_2026', 'bga_rotacion_t4', 'ley_51_1983'],
});

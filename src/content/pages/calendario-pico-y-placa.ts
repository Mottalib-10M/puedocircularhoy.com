import { definePage } from '../../lib/page-types';
import { pypDiasMes, ciudad, FESTIVOS, fechaDia, digits } from '../../lib/kit';

const rows = ['bogota', 'medellin', 'cali', 'bucaramanga', 'pereira'].map((s) => [s, ciudad(s).nombre, pypDiasMes(s, 2026, 11, 1), pypDiasMes(s, 2026, 11, 6)] as const);
const fNov = FESTIVOS.filter((f) => f.startsWith('2026-11'));

export default definePage({
  id: 'calendario-pico-y-placa',
  group: 'pyp-reglas',
  kind: 'pillar',
  order: 30,
  slug: 'calendario-pico-y-placa',
  nav: 'Calendario del pico y placa',
  card: 'El mes entero de tu placa en tu ciudad, con festivos, sábados y cambios de rotación.',
  title: 'Calendario pico y placa 2026: tu placa mes a mes por ciudad',
  description: 'Calendario del pico y placa 2026 por ciudad: elige el mes, tu ciudad y tu placa y ve cada día con restricción, con festivos, sábados de Bucaramanga y cambios de rotación.',
  h1: 'Calendario del pico y placa',
  intro: 'Todos los días del mes para tu placa, calculados con el decreto de tu ciudad.',
  resume: `El calendario marca, para el mes que elijas, cada día en que tu placa tiene pico y placa en tu ciudad, y los días libres por fin de semana o festivo. Los números cambian mucho de una ciudad a otra: en noviembre de 2026, con placa terminada en 1, hay ${rows.map(([, n, a]) => `${a} días de restricción en ${n}`).join(', ')}; con placa terminada en 6, ${rows.map(([, n, , b]) => `${b} en ${n}`).join(', ')}. La diferencia sale de los esquemas: Bogotá alterna par e impar todos los días hábiles, las demás ciudades fijan un día por semana y Bucaramanga suma algunos sábados. Noviembre tiene además ${fNov.length} festivos en lunes, ${fNov.map((f) => fechaDia(f)).join(' y ')}, que no cuentan. Si el mes elegido cruza el fin de la vigencia de una rotación, los días posteriores aparecen como «sin datos» hasta que la alcaldía publique la siguiente.`,
  tool: 'pyp-cal',
  toolProps: { city: 'bogota' },
  faqs: [
    { q: '¿Cuántos días al mes tengo pico y placa en Bogotá?', a: `Depende del mes y de tu placa, porque cuenta la paridad de cada fecha hábil. En noviembre de 2026 una placa terminada en 1 tiene ${rows[0][2]} días y una terminada en 6 tiene ${rows[0][3]}. En ciudades con un día fijo por semana, como Medellín o Cali, lo normal son cuatro o cinco días al mes, menos los festivos.` },
    { q: '¿Puedo imprimir el calendario de pico y placa del mes?', a: 'Sí. El botón de imprimir de la herramienta saca la página con el calendario del mes que tengas en pantalla, y el enlace copiado guarda tu ciudad y tu placa para volver a abrirlo. Al imprimir, revisa que el mes elegido esté dentro de la vigencia de la rotación de tu ciudad.' },
    { q: '¿El calendario incluye el pico y placa de taxis?', a: 'No. El calendario cubre los carros particulares y, donde existe, las motos. Los taxis de Bogotá, Medellín, Itagüí y Cartagena tienen rotaciones propias, a veces quincenales, que publican las secretarías de movilidad en calendarios aparte.' },
  ],
  body: (h) => `
<h2>Leer el calendario</h2>
<p>Cada casilla roja es un día en que tu placa no puede circular en el horario de la ciudad; las blancas son días libres, y las grises, días para los que la alcaldía todavía no ha publicado la rotación. El resumen de arriba cuenta los días de restricción del mes. En Bucaramanga aparecen marcados también los sábados que le tocan a tu placa, con horario reducido.</p>
${h.table(['Ciudad', 'Placa 1, noviembre de 2026', 'Placa 6, noviembre de 2026'], rows.map(([s, n, a, b]) => [h.a(`pico-y-placa-${s}`, n), a, b]), 'Días con restricción calculados por el motor con los decretos vigentes; festivos excluidos.', ['l', 'r', 'r'])}
<h2>Por qué no hay un calendario anual</h2>
<p>Porque casi ninguna ciudad publica el año entero de una vez. Medellín y Cali dan una tabla por semestre, Bucaramanga por trimestre y Cartagena por periodos más cortos. Un calendario anual mezclaría la tabla vigente con una inventada. Este calendario se detiene donde termina la información oficial, y la herramienta lo dice con «sin datos».</p>
<p>Para una consulta rápida del día, usa ${h.a('pico-y-placa', 'pico y placa hoy')}; para la víspera, ${h.a('pico-y-placa-manana', 'pico y placa mañana')}. Los festivos de 2026 que descuenta el calendario están en ${h.a('pico-y-placa-festivos', 'pico y placa en festivos')}.</p>
`,
  related: ['pico-y-placa', 'pico-y-placa-manana', 'pico-y-placa-festivos', 'pico-y-placa-bogota', 'pico-y-placa-bucaramanga'],
  sources: ['bog_octubre_2026', 'med_decreto_1490_2026', 'cali_boletin_2s2026', 'bga_rotacion_t4', 'ley_51_1983'],
});

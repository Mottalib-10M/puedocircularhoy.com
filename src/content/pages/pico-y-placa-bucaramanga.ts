import { definePage } from '../../lib/page-types';
import { P, ciudad, horario, digits, pypSemana, fecha, fechaDia, sabadosMes, pyp, cop } from '../../lib/kit';

const B = ciudad('bucaramanga');
const t4 = pypSemana('bucaramanga', '2026-10-13');
const t3 = pypSemana('bucaramanga', '2026-09-14');
const sab = B.carro.sabadoCiclo!;
const sabOct = sabadosMes(2026, 10).map((f) => [fechaDia(f), digits(pyp('bucaramanga', f, 0).restringidos)]);
const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-bucaramanga',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 40,
  slug: 'pico-y-placa-bucaramanga',
  nav: 'Bucaramanga',
  card: 'Rotación trimestral desde el 5 de octubre de 2026 y pico y placa también los sábados.',
  title: 'Pico y placa Bucaramanga hoy 2026: rotación y sábados',
  description: `Pico y placa en Bucaramanga 2026: desde el 5 de octubre ${t4.map(([d, xs]) => `${d.slice(0, 2)} ${digits(xs)}`).join(', ')}, de ${horario(B.carro.horas).replace(/:00/g, '')}, y también los sábados.`,
  h1: 'Pico y placa en Bucaramanga hoy',
  intro: 'La única ciudad de la lista con pico y placa también los sábados, y con rotación cada trimestre.',
  resume: `En Bucaramanga la rotación del pico y placa cambia el primer lunes hábil de cada trimestre, según la Resolución 854 del 30 de diciembre de 2025 de la Dirección de Tránsito. Desde el lunes 5 de octubre de 2026 rige la cuarta y última rotación del año: ${t4.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}, de ${horario(B.carro.horas)} en días hábiles. A diferencia de Bogotá, Medellín o Cali, los sábados también hay restricción, de ${horario(sab.horas)}, con dos números por sábado en orden consecutivo: en octubre de 2026, ${sabOct.map(([f, x]) => `${x} el ${f}`).join('; ')}. Los domingos y festivos no hay pico y placa. Quien matriculó un carro particular nuevo en Bucaramanga en 2026 puede pedir un año de exoneración con la Resolución 189 de 2026, y la multa es la infracción C.14, ${cop(C14)} en 2026, con inmovilización.`,
  tool: 'pyp',
  toolProps: { city: 'bucaramanga', lockCity: true },
  faqs: [
    { q: '¿Qué placas tienen pico y placa el sábado en Bucaramanga?', a: `Dos números por sábado, en orden consecutivo y sin saltos: ${sab.ciclo.map((x) => digits(x)).join(', ')}, y vuelta a empezar. La Alcaldía publicó el orden de octubre de 2026 y dijo que continúa así los sábados siguientes del trimestre. El horario del sábado es más corto, de ${horario(sab.horas)}.` },
    { q: '¿Cuándo vuelve a cambiar la rotación en Bucaramanga?', a: `El primer lunes hábil de cada trimestre. La rotación que empezó el 5 de octubre de 2026 es la última de la Resolución 854 de 2025; la herramienta la aplica hasta el ${fecha(B.vigencia.hasta)}. La tabla de 2027 sale con una resolución nueva, normalmente a finales de diciembre, y se carga en cuanto se publica.` },
    { q: '¿Cómo me eximo un año del pico y placa en Bucaramanga?', a: 'La Resolución 189 de 2026 da un año sin pico y placa a los carros particulares que hacen la matrícula inicial o el traslado de cuenta a Bucaramanga entre el 2 de enero y el 31 de diciembre de 2026, en la franja que fija la resolución. Las motos no están incluidas en esa exoneración y siguen sujetas a sus reglas.' },
    { q: '¿El pico y placa de Bucaramanga vale en Floridablanca?', a: 'El Consejo Metropolitano de Movilidad unificó en 2025 el pico y placa de Bucaramanga, Floridablanca, Girón y Piedecuesta, y la Alcaldía de Floridablanca publica el mismo horario de lunes a viernes. No pudimos leer los textos de Girón y Piedecuesta, así que la herramienta solo responde para Bucaramanga.' },
  ],
  body: (h) => `
<h2>Las dos tablas de la segunda mitad del año</h2>
${h.table(['Día', 'Del 6 de julio al 2 de octubre', 'Desde el 5 de octubre'], t4.map(([d, xs], i) => [d, digits(t3[i][1]), digits(xs)]), 'Resolución 854 de 2025, Dirección de Tránsito de Bucaramanga. Último número de la placa, carros particulares.')}
<p>El cambio de trimestre desplaza los números un día: lo que era del lunes pasa al martes, y así sucesivamente. Quien tenía pico y placa los lunes en septiembre lo tiene ahora los martes. Es el error más común del primer lunes de cada trimestre, y la razón por la que la herramienta guarda las dos tablas con sus fechas.</p>
<h2>El sábado, una regla aparte</h2>
<p>El ciclo de los sábados no sigue la tabla de la semana: avanza un par de números cada sábado y no se reinicia con el trimestre. Lo arranca el sábado ${fechaDia(sab.ancla, true)} con ${digits(sab.ciclo[0])}, según el calendario metropolitano que publica Floridablanca, y la herramienta lo sigue sábado a sábado. Cinco sábados después le toca otra vez al mismo par.</p>
<h2>Motos y otras situaciones</h2>
<p>Las motos tienen su propia medida en Bucaramanga, pero la tabla de motos no figura en las páginas oficiales que leímos; por eso la herramienta no la calcula. Para los eléctricos rige la exención de la Ley 1964 de 2019. Para el valor de la multa y la inmovilización, ver ${h.a('multa-pico-y-placa', 'multa por pico y placa')}, y para el mes entero de tu placa, el ${h.a('calendario-pico-y-placa', 'calendario del pico y placa')}.</p>
`,
  related: ['calendario-pico-y-placa', 'pico-y-placa', 'multa-pico-y-placa', 'pico-y-placa-electricos-hibridos'],
  sources: ['bga_rotacion_t4', 'bga_rotacion_t3', 'bga_exoneracion', 'ley_769_2002'],
});

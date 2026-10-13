import { definePage } from '../../lib/page-types';
import { P, ciudad, horario, digits, pypSemana, fecha, cop } from '../../lib/kit';

const C = ciudad('cali');
const sem = pypSemana('cali', '2026-10-13');
const tabla = sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ');
const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-cali',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 30,
  slug: 'pico-y-placa-cali',
  nav: 'Cali',
  card: 'Segundo semestre de 2026: dos números por día, de 6:00 a. m. a 7:00 p. m., motos exceptuadas.',
  title: 'Pico y placa Cali hoy 2026: rotación del 2.º semestre',
  description: `Pico y placa en Cali 2026, segundo semestre: ${sem.map(([d, xs]) => `${d.slice(0, 2)} ${digits(xs)}`).join(', ')}, de ${horario(C.carro.horas).replace(/:00/g, '')} sin pausa, y las motos exceptuadas.`,
  h1: 'Pico y placa en Cali hoy',
  intro: 'Rotación del segundo semestre de 2026, del 1 de julio al 31 de diciembre, en el perímetro urbano.',
  resume: `En Cali el pico y placa del segundo semestre de 2026 restringe dos números por día hábil, de ${horario(C.carro.horas)} sin interrupción: ${tabla}. La Secretaría de Movilidad Distrital anunció la rotación el 23 de junio de 2026 y la aplica del ${fecha(C.vigencia.desde)} al ${fecha(C.vigencia.hasta)}; el proyecto de decreto publicado el 16 de junio la fija en el perímetro urbano, incluidos los vehículos que entran o salen de él, y deroga el decreto del primer semestre. No se aplica sábados, domingos ni festivos. Las motocicletas están exceptuadas, igual que los híbridos y eléctricos registrados como tales, la carga de cinco toneladas o más y los vehículos cuyo dueño paga la tasa por congestión del Acuerdo 0563 de 2023. La infracción es la C.14, ${cop(C14)} en 2026.`,
  tool: 'pyp',
  toolProps: { city: 'cali', lockCity: true },
  faqs: [
    { q: '¿Las motos tienen pico y placa en Cali?', a: 'No. El proyecto de decreto del segundo semestre de 2026 incluye a las motocicletas en la lista de vehículos exceptuados de la medida, que se aplica a los vehículos de servicio particular de toda clase. Eso no exime a las motos de otras restricciones que la Secretaría de Movilidad pueda decretar en zonas o fechas concretas.' },
    { q: '¿Qué es la tasa por congestión en Cali?', a: 'Es un pago creado por el Acuerdo Distrital 0563 de 2023 que permite circular en el día de pico y placa. Quien la paga queda en la lista de vehículos exceptuados del decreto del semestre. Su valor y el trámite los fija la Secretaría de Movilidad de Cali; esta herramienta no lo calcula y supone que tu carro no la tiene.' },
    { q: '¿Cuándo cambia el pico y placa en Cali?', a: `Cada semestre. La rotación actual va del 1 de julio al 31 de diciembre de 2026 y la del primer semestre de 2027 se publica, como en años anteriores, a finales de diciembre. Para fechas posteriores al ${fecha(C.vigencia.hasta)}, la herramienta responde que la rotación no está publicada hasta cargar el decreto nuevo.` },
  ],
  body: (h) => `
<h2>La tabla del semestre</h2>
${h.table(['Día', 'No circulan las placas terminadas en'], sem.map(([d, xs]) => [d, digits(xs)]), `Secretaría de Movilidad de Cali, rotación del ${fecha(C.vigencia.desde)} al ${fecha(C.vigencia.hasta)}, de ${horario(C.carro.horas)}.`)}
<p>El horario de Cali es continuo, de la mañana a la noche, como el de Bogotá y a diferencia del de Cartagena, que se divide en dos franjas. Entrar o salir del perímetro urbano en tu día también cuenta: el proyecto de decreto incluye a los vehículos que transitan hacia dentro o hacia fuera del perímetro.</p>
<h2>Un detalle sobre la norma</h2>
<p>La rotación la publicó la Secretaría de Movilidad en su boletín del 23 de junio de 2026, y el texto completo que leímos es el proyecto de decreto puesto a consulta el 16 de junio. La tabla del boletín y la del proyecto coinciden. Si el decreto firmado introduce un cambio, lo cargamos con su fecha.</p>
<h2>Personas con discapacidad y otras excepciones</h2>
<p>Los vehículos ya autorizados para transportar a una persona con discapacidad o movilidad reducida están exceptuados, pero solo si la persona va a bordo: sin ella, el agente puede imponer la C.14. Los vehículos oficiales, diplomáticos y de emergencia también quedan fuera. Para eléctricos e híbridos, ver ${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')}; para el valor de la multa, ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa', 'calendario-pico-y-placa', 'pico-y-placa-motos', 'multa-pico-y-placa', 'pico-y-placa-medellin'],
  sources: ['cali_boletin_2s2026', 'cali_borrador_2s2026', 'ley_769_2002'],
});

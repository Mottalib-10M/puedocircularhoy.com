import { definePage } from '../../lib/page-types';
import { P, CIUDADES, ciudad, horario, digits, fecha, cop, num, pypSemana } from '../../lib/kit';

const CO = (P as unknown as { co: { multaC14: number; solidario: { factorAntes: number; factorFuera: number } } }).co;
const reglas = CIUDADES.filter((c) => c.carro.esquema !== 'ninguno');
const medSem = pypSemana('medellin', '2026-10-13');

export default definePage({
  id: 'pico-y-placa',
  group: 'pyp-reglas',
  kind: 'pillar',
  order: 10,
  slug: 'pico-y-placa',
  nav: 'Pico y placa hoy',
  card: 'Tu ciudad y tu placa: si tienes pico y placa hoy, mañana y cuándo te vuelve a tocar.',
  title: 'Pico y placa hoy 2026: tu ciudad, tu placa y mañana',
  description: `Pico y placa hoy 2026 en Bogotá, Medellín, Cali, Bucaramanga, Cartagena y Pereira: elige ciudad y placa y ve si te toca hoy y mañana, con el decreto vigente.`,
  h1: 'Pico y placa hoy: ¿me toca?',
  intro: 'Elige tu ciudad y el número de tu placa: la respuesta sale para hoy y para mañana, con la hora de Bogotá y el decreto de tu alcaldía.',
  resume: `En Colombia no hay un pico y placa nacional: cada alcaldía lo fija por decreto, con su horario y su rotación. Bogotá restringe a los carros particulares según el día del mes, de ${horario(ciudad('bogota').carro.horas)}: los días pares no circulan las placas terminadas en ${digits(ciudad('bogota').carro.periodos[0].par!)} y los impares las terminadas en ${digits(ciudad('bogota').carro.periodos[0].impar!)}. Medellín y los municipios del Valle de Aburrá restringen dos números por día de la semana, de ${horario(ciudad('medellin').carro.horas)}, y aplican la misma tabla a las motos por el primer número de la placa. Cali, Bucaramanga, Cartagena y Pereira tienen sus propias tablas, y Barranquilla no tiene pico y placa general para particulares. Los sábados, domingos y festivos no hay restricción, salvo los sábados de Bucaramanga. Circular en pico y placa es la infracción C.14 y cuesta ${cop(CO.multaC14)} en 2026, más la grúa.`,
  tool: 'pyp',
  toolProps: { city: 'bogota' },
  faqs: [
    { q: '¿El pico y placa aplica el lunes festivo?', a: 'No en las ciudades que cubre la herramienta: todos los decretos leídos excluyen los festivos de la Ley 51 de 1983, que casi siempre se trasladan al lunes. Bogotá aplica ese día otra medida, el pico y placa regional, que ordena la entrada a la ciudad por la tarde según placa par o impar en nueve corredores. La herramienta ya conoce los festivos de 2026.' },
    { q: '¿Qué número de la placa cuenta para el pico y placa?', a: 'En los carros, el último. En las motos depende de la ciudad: Medellín, los municipios del Valle de Aburrá y Pereira restringen por el primer número de la placa de la moto, con la misma tabla que los carros. En Cartagena las motos usan el último número y su propio horario. La herramienta cambia la etiqueta del campo cuando eliges moto.' },
    { q: '¿Cuándo cambia la rotación del pico y placa?', a: 'Cada ciudad tiene su calendario. Medellín, Itagüí y Cali publican una tabla por semestre, Bucaramanga la cambia el primer lunes hábil de cada trimestre y Cartagena en periodos más cortos. Bogotá mantiene desde 2023 su regla de pares e impares y Pereira una tabla fija desde 2024. La página de cada ciudad dice hasta qué fecha llegan los datos de la herramienta.' },
    { q: '¿Tengo pico y placa con un carro de otra ciudad?', a: `Sí. La medida se aplica por la placa del vehículo que circula en la ciudad, sin importar dónde esté matriculado. En Bogotá, además, el Pico y Placa Solidario de un vehículo matriculado fuera de la ciudad cuesta más: el factor por municipio pasó de ${num(CO.solidario.factorAntes, 'co', 1)} a ${num(CO.solidario.factorFuera, 'co', 1)} en 2026. Pereira exceptúa por un día a quien llega de otra ciudad con el tiquete de peaje del día.` },
    { q: '¿Los carros eléctricos tienen pico y placa?', a: 'No. El artículo 6 de la Ley 1964 de 2019 exime a los vehículos eléctricos y de cero emisiones de las medidas de restricción como el pico y placa, salvo las que se dicten por seguridad. Los híbridos dependen de cada ciudad: Medellín y Cali los exceptúan según el combustible del RUNT, y Bogotá pide inscribirlos en la Secretaría de Movilidad.' },
    { q: '¿Qué pasa si la alcaldía no ha publicado la rotación siguiente?', a: 'La herramienta no la inventa. Cuando la fecha consultada cae después del último periodo publicado, responde «rotación no publicada» y te remite al decreto de la ciudad. Cargamos la tabla nueva el día en que la alcaldía la publica y la fechamos en la página. Si ves un decreto nuevo antes que nosotros, escríbenos desde contacto.' },
  ],
  body: (h) => `
<h2>Cómo funciona la consulta</h2>
<p>La herramienta toma el día en curso en Colombia, busca en el archivo de ciudades la regla vigente ese día y la aplica al número de tu placa. Si el día es sábado, domingo o festivo, y la ciudad no restringe esos días, la respuesta es que puedes circular. Si cae fuera del periodo que publicó la alcaldía, lo dice. Para ver el mes completo usa el ${h.a('calendario-pico-y-placa', 'calendario del pico y placa')}, y para la consulta de la víspera, ${h.a('pico-y-placa-manana', 'pico y placa mañana')}.</p>
<h2>Las reglas cargadas hoy</h2>
${h.table(['Ciudad', 'Horario', 'Norma', 'Datos hasta'], reglas.map((c) => [h.a(`pico-y-placa-${c.slug}`, c.nombre), horario(c.carro.horas), c.decreto.split(' (')[0].split(',')[0], fecha(c.vigencia.hasta)]), 'Carros particulares. Las motos, los sábados y las excepciones están en la página de cada ciudad.')}
<p>Dos esquemas conviven. Bogotá usa la paridad del día del mes: no importa si es lunes o jueves, sino si la fecha es par o impar. Las demás ciudades asignan dos números a cada día de la semana; en Medellín, por ejemplo, el ${medSem[0]?.[0] ?? 'lunes'} no circulan ${digits(medSem[0]?.[1] ?? [])} y el ${medSem[4]?.[0] ?? 'viernes'} ${digits(medSem[4]?.[1] ?? [])}. Esa tabla rota con cada decreto nuevo, por eso una lista copiada de hace seis meses suele estar mal.</p>
<h2>Motos, taxis y excepciones</h2>
<p>Las motos no siguen la misma suerte en todas partes. En el Valle de Aburrá y en Pereira tienen pico y placa por el primer número; en Cali están exceptuadas; en Bogotá la medida de particulares no las incluye; en Cartagena tienen un horario mucho más largo que los carros. Lo resume ${h.a('pico-y-placa-motos', 'pico y placa para motos')}. Los taxis tienen rotaciones propias en Bogotá, Medellín y Cartagena que esta herramienta no calcula.</p>
<p>Las excepciones también son locales, salvo una: los eléctricos están exentos por ley en todo el país (${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')}). En Bogotá se puede pagar el ${h.a('pico-y-placa-solidario', 'Pico y Placa Solidario')} para circular sin restricción, y en Cali la tasa por congestión cumple una función parecida.</p>
<h2>La multa</h2>
<p>Circular en pico y placa es la infracción C.14 del artículo 131 del Código Nacional de Tránsito: «transitar por sitios restringidos o en horas prohibidas por la autoridad competente», con inmovilización del vehículo. Desde que las multas pasaron de salarios mínimos a UVB, el valor de 2026 es ${cop(CO.multaC14)} en la tabla oficial. Ver ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa-bogota', 'pico-y-placa-medellin', 'pico-y-placa-cali', 'pico-y-placa-manana', 'calendario-pico-y-placa', 'multa-pico-y-placa'],
  sources: ['bog_octubre_2026', 'med_decreto_1490_2026', 'cali_boletin_2s2026', 'bga_rotacion_t4', 'ley_769_2002', 'ley_1964_2019', 'baq_multas_2026'],
});

import { definePage } from '../../lib/page-types';
import { P, ciudad, horario, digits, cop, pypMes, festivosEntre, fechaDia } from '../../lib/kit';

const B = ciudad('bogota');
const per = B.carro.periodos[0];
const CO = (P as unknown as { co: { solidario: { dia: number; mes: number }; bogotaTaxis: [string, string] } }).co;
const nov = pypMes('bogota', 2026, 11, 1).filter((x) => x.estado === 'restringido').length;
const libreImpar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].filter((d) => !per.impar!.includes(d));
const librePar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].filter((d) => !per.par!.includes(d));
const fest = festivosEntre('2026-10-13', B.vigencia.hasta);

export default definePage({
  id: 'pico-y-placa-bogota',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 10,
  slug: 'pico-y-placa-bogota',
  nav: 'Bogotá',
  card: 'Días pares e impares, de 6:00 a. m. a 9:00 p. m., Solidario y pico y placa regional.',
  title: 'Pico y placa Bogotá hoy 2026: día par o impar y placa',
  description: `Pico y placa en Bogotá 2026: en días pares no circulan las placas ${digits(per.par!)} y en impares ${digits(per.impar!)}, de ${horario(B.carro.horas)}. Consulta hoy y mañana.`,
  h1: 'Pico y placa en Bogotá hoy',
  intro: 'En Bogotá no cuenta el día de la semana sino la fecha: par o impar.',
  resume: `En Bogotá el pico y placa de los carros particulares depende de la fecha del mes. Los días pares no pueden circular las placas terminadas en ${digits(per.par!)}, y los días impares las terminadas en ${digits(per.impar!)}, de ${horario(B.carro.horas)}, de lunes a viernes. Los sábados, los domingos y los festivos no hay pico y placa. La regla viene del Decreto 003 de 2023, en vigor desde el 10 de enero de 2023 y sin fecha de fin, y la Alcaldía la repite en su calendario oficial de octubre de 2026: el martes 13 circulan las placas ${digits(libreImpar)} y el lunes 26 las ${digits(librePar)}. Con placa terminada en 1, en noviembre de 2026 tienes ${nov} días de restricción. Si necesitas el carro todos los días, el Pico y Placa Solidario cuesta desde ${cop(CO.solidario.dia)} por día en valor base.`,
  tool: 'pyp',
  toolProps: { city: 'bogota', lockCity: true },
  faqs: [
    { q: '¿Hoy es día par o impar para el pico y placa en Bogotá?', a: `Mira el número del día en el calendario, no el día de la semana: el 14 es par y el 15 impar, caigan en lunes o en jueves. En los días pares no circulan las placas terminadas en ${digits(per.par!)}; en los impares, las terminadas en ${digits(per.impar!)}. La herramienta hace la cuenta con la fecha de Bogotá y descarta sábados, domingos y festivos.` },
    { q: '¿Qué pasa el día 31 en el pico y placa de Bogotá?', a: `El 31 es impar, así que se aplica como cualquier día impar: no circulan las placas terminadas en ${digits(per.impar!)}, siempre que sea de lunes a viernes y no festivo. Al pasar al 1 del mes siguiente, que también es impar, la misma restricción se repite dos días seguidos para esas placas. Es el único caso en que eso ocurre.` },
    { q: '¿Las motos tienen pico y placa en Bogotá?', a: 'No. La medida de la Alcaldía de Bogotá para vehículos particulares se refiere a automóviles, y las páginas oficiales de 2026 que leímos no incluyen restricción para motos. Las motos sí deben respetar otras normas, como las restricciones de parrillero o de circulación en ciertas vías cuando la Secretaría de Movilidad las decreta.' },
    { q: '¿A qué hora empieza el pico y placa de taxis en Bogotá?', a: `Los taxis tienen una rotación propia, con dos números restringidos por día, de ${horario([CO.bogotaTaxis])}. Por ejemplo, el viernes 9 de octubre de 2026 podían circular los taxis con placas terminadas en 1 a 8, según la Alcaldía. Esta herramienta calcula solo el pico y placa de particulares; para taxis consulta el calendario oficial del mes.` },
  ],
  body: (h) => `
<h2>Por qué Bogotá no se parece a las demás ciudades</h2>
<p>En Medellín o en Cali te aprendes un día fijo de la semana durante seis meses. En Bogotá el día cambia cada semana, porque depende de la paridad de la fecha: quien tiene placa terminada en 3 descansa el martes 6, el jueves 8 y el lunes 12 si no es festivo, y la semana siguiente le tocan otros días. Por eso conviene mirar la consulta cada mañana o el ${h.a('calendario-pico-y-placa', 'calendario del mes')}, que marca los días de tu placa.</p>
<p>El horario es largo, de ${horario(B.carro.horas)}, y continuo: no hay franja libre al mediodía como en Cartagena.</p>
<h2>Festivos y pico y placa regional</h2>
<p>Los festivos no tienen pico y placa urbano. Los que quedan este año en la herramienta son: ${fest.map((f) => fechaDia(f)).join(', ')}. Cuando el festivo cierra un puente, la Alcaldía activa el ${h.a('pico-y-placa-regional-bogota', 'pico y placa regional')} para ordenar la entrada a la ciudad por la tarde según la paridad de la placa.</p>
<h2>Cómo circular todos los días</h2>
<p>La Alcaldía reconoce tres caminos: pagar el ${h.a('pico-y-placa-solidario', 'Pico y Placa Solidario')}, tener un carro eléctrico o híbrido de fábrica inscrito ante la Secretaría de Movilidad, o viajar con tres personas o más en un vehículo registrado para ello. El permiso Solidario se tramita solo en movilidadbogota.gov.co y se paga por PSE; su valor base de 2026 es de ${cop(CO.solidario.dia)} por un día y ${cop(CO.solidario.mes)} por un mes.</p>
<h2>Lo que puede cambiar</h2>
<p>El Decreto 003 de 2023 no tiene fecha de fin, pero la Alcaldía puede modificarlo avisando con diez días de anticipación. La herramienta tiene cargada la regla hasta el ${h.fecha(B.vigencia.hasta)}; si sale un decreto nuevo, se actualiza con su fecha. Para la multa y la grúa, ver ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa-solidario', 'pico-y-placa-regional-bogota', 'calendario-pico-y-placa', 'pico-y-placa-electricos-hibridos', 'multa-pico-y-placa', 'pico-y-placa-medellin'],
  sources: ['bog_octubre_2026', 'bog_decreto_003_2023', 'bog_excepciones', 'bog_solidario_2026', 'bog_taxis'],
});

import { definePage } from '../../lib/page-types';
import { MX, digitosColor, digits, horas24, verifMesesTxt, listOf, fecha } from '../../lib/kit';

const D = digitosColor('azul');
const H = horas24(MX.hnc.horas);
const V2 = verifMesesTxt('azul', 2);

export default definePage({
  id: 'hoy-no-circula-viernes',
  group: 'hnc',
  kind: 'pillar',
  order: 44,
  slug: 'hoy-no-circula-viernes',
  nav: 'Viernes: engomado azul',
  card: `Terminación ${digits(D)}, placas solo con letras y permisos sin placas: el viernes.`,
  title: `Hoy No Circula viernes 2026: engomado azul, placas ${digits(D)}`,
  description: `Hoy No Circula los viernes 2026: no circulan el engomado azul, terminación ${digits(D)}, las placas solo con letras y los permisos sin placas, de ${H}.`,
  h1: 'Hoy No Circula los viernes: engomado azul',
  intro: 'El viernes reúne al engomado azul y a todas las placas que no terminan en número.',
  resume: `Los viernes no circulan los autos de engomado azul, con placa terminada en ${digits(D)}, que tienen holograma 1 o 2, de ${H}. El viernes también es el día de las placas que no encajan en la tabla: el decreto de 2014 manda que las placas formadas solo por letras descansen con el engomado azul y cuenten como terminación par para los sábados del holograma 1, y el programa de verificación de 2026 trata los permisos para circular sin placas como holograma 2, sin circular el viernes ni ningún sábado, y además de lunes a jueves de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}. En verificación, el azul es el último color del semestre: verifica en ${listOf(V2)} y su prórroga de quince días, en los casos que prevé el programa, llega hasta el ${fecha(MX.verif.prorroga15.azul)}, ya en el año siguiente. Con holograma 0, 00 o exento, el viernes se circula mientras no haya contingencia.`,
  tool: 'hnc',
  toolProps: { digit: 9, holo: '1' },
  faqs: [
    { q: 'Mi placa no tiene números, ¿qué día no circulo?', a: 'El viernes. El decreto del Programa Hoy No Circula de 2014 dice que las placas formadas exclusivamente por letras se aplican el día del engomado azul, el de las terminaciones 9 y 0, y se consideran terminación par. Con holograma 1, además, descansan el segundo y el cuarto sábado de cada mes, como las placas pares.' },
    { q: '¿Puedo circular con permiso sin placas en la CDMX?', a: `Sí, pero con restricciones de holograma 2: el programa de verificación de 2026 dice que esos vehículos no circulan un día entre semana, el viernes, ni ningún sábado, y además de lunes a jueves de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}. Un auto nuevo matriculado en la Ciudad de México tiene, en cambio, 30 días libres desde su tarjeta de circulación.` },
    { q: '¿Cuándo verifica el engomado azul?', a: `En ${listOf(V2)} en el segundo semestre de 2026, y en ${listOf(verifMesesTxt('azul', 1))} en el primero. Las placas sin números verifican también en el periodo de las terminaciones 9 y 0. Si hay rechazo en los últimos siete días u otra causa prevista, la prórroga llega hasta el ${fecha(MX.verif.prorroga15.azul)}.` },
  ],
  body: (h) => `
<h2>Todo lo que descansa el viernes</h2>
${h.table(['Vehículo', 'Viernes', 'Otros días'], [[`Terminación ${digits(D)} con holograma 1`, 'No circula', 'Dos sábados al mes'], [`Terminación ${digits(D)} con holograma 2`, 'No circula', 'Todos los sábados'], ['Placa solo con letras', 'No circula', 'Como placa par en sábado'], ['Permiso para circular sin placas', 'No circula', `Todos los sábados y de lunes a jueves de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}`], ['Holograma 0, 00 o exento', 'Circula', 'Circula salvo contingencia']], `Decreto del Programa Hoy No Circula (2014), apartado X, y programa de verificación del 2.º semestre de 2026, apartado 14.`)}
<h2>El cierre del año</h2>
<p>El azul verifica en ${listOf(V2)}, las semanas en que más gente viaja. Si sales de la ciudad en diciembre con el plazo por vencer, organiza la cita antes: verificar después del cierre exige pagar la multa extemporánea, que no exime del Hoy No Circula. Ver ${h.a('verificacion-vehicular', 'verificación vehicular')} y ${h.a('multa-verificacion-extemporanea', 'multa por verificar tarde')}.</p>
<p>Los demás días: ${h.a('hoy-no-circula-lunes', 'lunes')}, ${h.a('hoy-no-circula-martes', 'martes')}, ${h.a('hoy-no-circula-miercoles', 'miércoles')}, ${h.a('hoy-no-circula-jueves', 'jueves')}.</p>
`,
  related: ['hoy-no-circula-jueves', 'hoy-no-circula-lunes', 'verificacion-vehicular', 'pase-turistico', 'hoy-no-circula-sabado'],
  sources: ['hnc_decreto', 'verif_2s2026', 'verif_1s2026', 'pcaa_2019'],
});

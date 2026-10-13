import { definePage } from '../../lib/page-types';
import { MX, P, digitosColor, digits, horas24, verifMesesTxt, listOf, fechaDia, fecha } from '../../lib/kit';

const D = digitosColor('rosa');
const H = horas24(MX.hnc.horas);
const V2 = verifMesesTxt('rosa', 2);
const ej = P.mx.contingencia.ejemplo;

export default definePage({
  id: 'hoy-no-circula-martes',
  group: 'hnc',
  kind: 'pillar',
  order: 41,
  slug: 'hoy-no-circula-martes',
  nav: 'Martes: engomado rosa',
  card: `Terminación ${digits(D)}: el martes, y el engomado de la contingencia de septiembre de 2026.`,
  title: `Hoy No Circula martes 2026: engomado rosa, placas ${digits(D)}`,
  description: `Hoy No Circula los martes 2026: no circulan los autos de engomado rosa, terminación ${digits(D)}, con holograma 1 o 2, de ${H}. Consulta tu placa para hoy y mañana.`,
  h1: 'Hoy No Circula los martes: engomado rosa',
  intro: `Placas terminadas en ${digits(D)}: el martes es tu día de descanso con holograma 1 o 2.`,
  resume: `Los martes no circulan los autos de engomado rosa, con placa terminada en ${digits(D)}, que tienen holograma 1 o 2, de ${H}, en la Ciudad de México y la zona metropolitana. Con holograma 0, 00 o exento, el martes es un día como cualquier otro mientras no haya contingencia. El rosa tuvo un papel en la contingencia del ${fechaDia(ej.aplica)} de 2026: era domingo, y la Comisión Ambiental de la Megalópolis eligió el engomado rosa para dejar sin circular a los hologramas 0 y 00, además de todos los hologramas 2 y de los holograma 1 de terminación non. Eso muestra lo que pasa en fin de semana: el engomado que descansa lo fija el comunicado y va rotando. En la verificación, el rosa verifica en ${listOf(V2)} en el segundo semestre de 2026, con prórroga solo en los casos que prevé el programa.`,
  tool: 'hnc',
  toolProps: { digit: 7, holo: '1' },
  faqs: [
    { q: '¿Qué placas no circulan el martes?', a: `Las terminadas en ${digits(D)}, engomado rosa, con holograma 1 o 2, de ${H}. Si tu placa solo tiene letras, no descansas el martes sino el viernes, porque el decreto de 2014 trata esas placas como engomado azul. Los autos de otros estados sin holograma reconocido con terminación ${digits(D)} también descansan el martes.` },
    { q: '¿Por qué en septiembre no circularon los hologramas 0 rosa un domingo?', a: `Porque hubo contingencia ambiental. El ${fechaDia(ej.fecha)} de 2026 la CAMe activó la Fase I por ozono a las 15:00, con ${ej.ppb} partes por billón en una estación, y para el domingo siguiente eligió el engomado rosa entre los hologramas 0 y 00. En fin de semana el programa de contingencias va rotando el color desde el amarillo.` },
    { q: '¿Hasta cuándo verifica el engomado rosa en 2026?', a: `En el segundo semestre de 2026 el rosa verifica en ${listOf(V2)}. La prórroga de 15 días que prevé el programa, hasta el ${fecha(MX.verif.prorroga15.rosa)}, solo aplica en casos como un rechazo en los últimos siete días o una falla del sistema; fuera de ellos, verificar después cuesta la multa extemporánea.` },
  ],
  body: (h) => `
<h2>Qué cambia el martes según tu holograma</h2>
${h.table(['Holograma', 'Martes', 'Sábados del mes'], [['00 y 0', 'Circula', 'Circula'], ['1', `No circula si termina en ${digits(D)}`, 'Nones primero y tercero, pares segundo y cuarto'], ['2', `No circula si termina en ${digits(D)}`, 'No circula ninguno'], ['Foráneo sin holograma', `No circula si termina en ${digits(D)}; los demás días, no antes de las ${MX.hnc.foraneoManana[1]}`, 'No circula ninguno']], `Programa Hoy No Circula, de ${H}.`)}
<p>La terminación 7 es non y la 8 es par, así que dos autos rosa con holograma 1 no descansan los mismos sábados: el 7 descansa el primero y el tercero, el 8 el segundo y el cuarto. Lo detalla ${h.a('hoy-no-circula-sabado', 'Hoy No Circula sabatino')}.</p>
<h2>El rosa en contingencia</h2>
<p>Entre semana, un holograma 0 o 00 rosa deja de circular el martes de contingencia, porque es su día de engomado. En fin de semana depende del comunicado. El caso del ${fechaDia(ej.aplica)} es el ejemplo real que usamos para probar el motor: ${h.a('contingencia-ambiental', 'contingencia ambiental')}.</p>
<p>Los demás días: ${h.a('hoy-no-circula-lunes', 'lunes')}, ${h.a('hoy-no-circula-miercoles', 'miércoles')}, ${h.a('hoy-no-circula-jueves', 'jueves')}, ${h.a('hoy-no-circula-viernes', 'viernes')}.</p>
`,
  related: ['hoy-no-circula-lunes', 'hoy-no-circula-miercoles', 'contingencia-ambiental', 'hoy-no-circula-sabado', 'verificacion-vehicular'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019', 'came_2026_09_12'],
});

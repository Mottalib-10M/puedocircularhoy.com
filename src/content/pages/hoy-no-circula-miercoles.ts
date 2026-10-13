import { definePage } from '../../lib/page-types';
import { P, MX, digitosColor, digits, horas24, verifMesesTxt, listOf, fecha, mxn, multaVerifPesos } from '../../lib/kit';

const D = digitosColor('rojo');
const H = horas24(MX.hnc.horas);
const V2 = verifMesesTxt('rojo', 2);

export default definePage({
  id: 'hoy-no-circula-miercoles',
  group: 'hnc',
  kind: 'pillar',
  order: 42,
  slug: 'hoy-no-circula-miercoles',
  nav: 'Miércoles: engomado rojo',
  card: `Terminación ${digits(D)}: el miércoles, y la verificación que vence al cerrar octubre.`,
  title: `Hoy No Circula miércoles 2026: engomado rojo, placas ${digits(D)}`,
  description: `Hoy No Circula los miércoles 2026: no circula el engomado rojo, terminación ${digits(D)}, con holograma 1 o 2, de ${H}; su verificación cierra en ${V2[1]}.`,
  h1: 'Hoy No Circula los miércoles: engomado rojo',
  intro: `Placas terminadas en ${digits(D)}: miércoles sin auto con holograma 1 o 2, y verificación en ${listOf(V2)}.`,
  resume: `Los miércoles no circulan los autos de engomado rojo, con placa terminada en ${digits(D)}, que tienen holograma 1 o 2, de ${H}. Con holograma 0, 00 o exento circulan, salvo un miércoles de contingencia ambiental, cuando los hologramas 0 y 00 de engomado rojo también se quedan. En el segundo semestre de 2026 el engomado rojo verifica en ${listOf(V2)}: el plazo vence el último día de ${V2[1]}, y la prórroga de quince días que prevé el programa, hasta el ${fecha(MX.verif.prorroga15.rojo)}, solo se concede en casos tasados, como un rechazo en los últimos siete días del periodo o una falla del sistema. Quien deja pasar el plazo paga la multa por verificación extemporánea, ${mxn(multaVerifPesos(), 0)} en 2026, y mientras no verifique su auto se trata como holograma 2: sin circular su día entre semana y ningún sábado.`,
  tool: 'hnc',
  toolProps: { digit: 3, holo: '1' },
  faqs: [
    { q: '¿Qué engomado no circula el miércoles?', a: `El rojo, que corresponde a las placas terminadas en ${digits(D)}. Con holograma 1 o 2 no circulan de ${H}. La terminación 3 es non y la 4 es par, así que con holograma 1 sus sábados de descanso son distintos: el 3 descansa el primer y tercer sábado, el 4 el segundo y el cuarto.` },
    { q: 'Tengo engomado rojo y no he verificado, ¿qué pasa en noviembre?', a: `Si el periodo de ${listOf(V2)} terminó sin verificar, tu auto se trata como holograma 2 hasta que lo hagas: descansa el miércoles y todos los sábados. Para verificar fuera de plazo hay que pagar antes la multa extemporánea de ${mxn(multaVerifPesos(), 0)} con la línea de captura de Finanzas de la CDMX; el pago vale ${P.mx.multaExtemporaneaVigenciaDias} días naturales.` },
    { q: '¿Un holograma 0 rojo circula el miércoles de contingencia?', a: 'No. Con contingencia ambiental activa, el Programa de Contingencias de 2019 deja sin circular entre semana a los hologramas 0 y 00 cuya terminación tiene restricción ese día en el Hoy No Circula. El miércoles es el día del rojo, así que un 0 o 00 con placa terminada en 3 o 4 no sale ese día.' },
  ],
  body: (h) => `
<h2>Octubre, mes de cierre para el rojo</h2>
<p>El calendario de verificación avanza un color por mes y cada color tiene dos meses. En el segundo semestre de 2026 al rojo le tocaron ${listOf(V2)}, así que a mediados de octubre muchos dueños de autos rojos descubren que les queda poco. El verificentro asigna cita en línea y en los últimos días del periodo las citas escasean. El simulador de ${h.a('verificacion-vehicular', 'verificación vehicular')} dice cuántos días quedan y lo que cuesta llegar tarde.</p>
${h.table(['Situación', 'Miércoles', 'Sábados'], [['Holograma 1 vigente', 'No circula', 'Dos al mes, según par o non'], ['Holograma 2 vigente', 'No circula', 'Ninguno'], ['Sin verificar a tiempo', 'No circula', 'Ninguno (se trata como holograma 2)'], ['Holograma 0 o 00 vigente', 'Circula', 'Circula']], `Engomado rojo, terminación ${digits(D)}, sin contingencia.`)}
<h2>Si te paran un miércoles</h2>
<p>Circular en tu día cuesta entre ${P.mx.multaHncVeces[0]} y ${P.mx.multaHncVeces[2]} UMA según el artículo 47 del Reglamento de Tránsito, y la SEDEMA puede sumar su propia sanción de ${P.mx.verif.multaUma} UMA por circular en día restringido. Las cifras están en ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}. Los demás días: ${h.a('hoy-no-circula-lunes', 'lunes')}, ${h.a('hoy-no-circula-martes', 'martes')}, ${h.a('hoy-no-circula-jueves', 'jueves')}, ${h.a('hoy-no-circula-viernes', 'viernes')}.</p>
`,
  related: ['hoy-no-circula-martes', 'hoy-no-circula-jueves', 'verificacion-vehicular', 'multa-verificacion-extemporanea', 'multa-hoy-no-circula'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019', 'reglamento_transito'],
});

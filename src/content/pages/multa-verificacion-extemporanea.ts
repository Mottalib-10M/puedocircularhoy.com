import { definePage } from '../../lib/page-types';
import { P, MX, VERIF, mxn, multaVerifPesos, costoVerifPesos, fecha, listOf, verifMesesTxt } from '../../lib/kit';

const dias = P.mx.multaExtemporaneaVigenciaDias;

export default definePage({
  id: 'multa-verificacion-extemporanea',
  group: 'verif',
  kind: 'guide',
  order: 40,
  slug: 'multa-verificacion-extemporanea',
  nav: 'Multa por verificar tarde',
  card: `${VERIF.multaUma} UMA en 2026, ${dias} días para verificar tras pagarla y el Hoy No Circula mientras tanto.`,
  title: 'Multa verificación extemporánea 2026: monto, pago y plazos',
  description: `Multa por verificación extemporánea 2026 en la CDMX: ${VERIF.multaUma} UMA, ${mxn(multaVerifPesos(), 0)}, válida ${dias} días; mientras no verificas, tu auto se trata como holograma 2.`,
  h1: 'Multa por verificación extemporánea',
  intro: 'Qué pagar, en qué orden y qué pasa con el Hoy No Circula si se te pasó el periodo.',
  resume: `Si el periodo de verificación de tu engomado terminó sin que verificaras, en la Ciudad de México tienes que pagar primero la multa por verificación extemporánea, de ${VERIF.multaUma} veces la UMA, es decir ${mxn(multaVerifPesos(), 0)} con la UMA de 2026, y después verificar dentro de los ${dias} días naturales siguientes al pago, que es el tiempo que vale. La verificación se paga aparte, ${mxn(costoVerifPesos(), 0)} con IVA, así que llegar tarde cuesta en total ${mxn(multaVerifPesos() + costoVerifPesos(), 0)}. El pago de la multa no exime del Hoy No Circula: mientras el auto no tenga holograma vigente, el programa de verificación lo trata como holograma 2, sin circular su día entre semana ni ningún sábado. La línea de captura se genera en el portal de la Secretaría de Administración y Finanzas. Los autos nuevos con holograma 00 no pagan esta multa en los dos primeros años después de su primera venta.`,
  mini: 'multaVerif',
  faqs: [
    { q: '¿Cuánto es la multa por verificar tarde en la CDMX en 2026?', a: `${VERIF.multaUma} veces la Unidad de Medida y Actualización, ${mxn(multaVerifPesos(), 0)} con la UMA de 2026, según el apartado 10.1.1 del programa de verificación del segundo semestre de 2026. El monto es el mismo para todos los hologramas. Se paga con línea de captura antes de presentarse al verificentro.` },
    { q: '¿Cuánto tiempo tengo para verificar después de pagar la multa?', a: `${dias} días naturales contados desde el día siguiente al pago, según el mismo apartado del programa. Si se vencen sin verificar, el pago deja de valer y hay que volver a pagar la multa para poder verificar. Conviene sacar la cita en el verificentro antes de pagar.` },
    { q: '¿Puedo circular mientras no verifico?', a: 'Sí, pero con las restricciones del holograma 2: no circulas el día de tu engomado ni ningún sábado, de 5:00 a 22:00, y en contingencia no circulas ningún día. El programa de 2026 lo dice expresamente para los vehículos de la Ciudad de México sin holograma vigente, incluidos los que ya pagaron la multa extemporánea.' },
    { q: '¿Hay prórroga para no pagar la multa?', a: 'Solo en los casos del apartado 5.1.9 del programa, como un rechazo en los últimos siete días del periodo o una falla del sistema, con quince días más. Para el segundo semestre de 2026, el límite con prórroga del engomado verde es el 15 de diciembre y el del azul el 15 de enero de 2027. Fuera de esos casos, el retraso se paga.' },
  ],
  body: (h) => `
<h2>El orden correcto</h2>
<ol>
<li>Comprueba tu periodo: el engomado y el último número de la placa dicen tus meses. En el segundo semestre de 2026, el amarillo verificó en ${listOf(verifMesesTxt('amarillo', 2))} y el azul verifica en ${listOf(verifMesesTxt('azul', 2))}.</li>
<li>Saca la línea de captura de la multa en el portal de Finanzas de la Ciudad de México y págala.</li>
<li>Agenda la cita en un verificentro dentro de los ${dias} días siguientes al pago.</li>
<li>Verifica: con el holograma nuevo, el auto deja de tratarse como holograma 2.</li>
</ol>
${h.table(['Concepto', 'UMA', 'Pesos 2026'], [['Multa por verificación extemporánea', String(VERIF.multaUma), mxn(multaVerifPesos(), 0)], ['Verificación (cualquier holograma)', `${VERIF.costoUma} + IVA`, mxn(costoVerifPesos(), 0)], ['Total al llegar tarde', '', mxn(multaVerifPesos() + costoVerifPesos(), 0)]], `Programa de verificación del 2.º semestre de 2026, apartados 7.1 y 10.1.1; UMA 2026 de ${mxn(P.mx.uma.diaria)}.`, ['l', 'r', 'r'])}
<h2>Por qué la multa no basta</h2>
<p>La multa solo te permite verificar fuera de plazo; no te devuelve el holograma que tenías. Hasta que el verificentro te dé uno nuevo, el auto tiene las restricciones del holograma 2, que son las más duras del programa: además del día entre semana, todos los sábados. Quien tenía un holograma 0 y deja pasar el periodo pierde de un día para otro la libertad de circular diario. Ver ${h.a('holograma-2', 'holograma 2')}.</p>
<h2>Casos particulares</h2>
<p>Los autos nuevos tienen 30 días libres desde la tarjeta de circulación y 180 días para su primera verificación; después de los 30 días y hasta verificar, se tratan como holograma 2. Los autos con holograma 00 no pagan multa extemporánea en los dos primeros años tras su primera venta. Las placas sin números verifican en el periodo de las terminaciones 9 y 0. Los autos del Estado de México verifican con su propio programa.</p>
<h2>El nuevo reglamento de 2026</h2>
<p>El 19 de mayo de 2026 la Gaceta Oficial publicó un nuevo Reglamento de la Ley Ambiental de la Ciudad de México en materia de verificación vehicular, que sustituye al del antiguo Distrito Federal. El programa del segundo semestre, publicado después, mantiene la multa en ${VERIF.multaUma} UMA. Si un aviso posterior la cambia, el archivo de parámetros se actualiza y esta página con él.</p>
<p>Para tu calendario, ${h.a('verificacion-vehicular', 'verificación vehicular')}; para la multa de tránsito por circular en tu día, ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}.</p>
`,
  related: ['verificacion-vehicular', 'holograma-2', 'multa-hoy-no-circula', 'hoy-no-circula-miercoles'],
  sources: ['verif_2s2026', 'uma_2026', 'multa_linea_captura', 'reglamento_verif_2026'],
});

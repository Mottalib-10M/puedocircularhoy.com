import { definePage } from '../../lib/page-types';
import { MX, VERIF, verifMesesTxt, listOf, fecha, mxn, multaVerifPesos, costoVerifPesos, digitosColor, digits } from '../../lib/kit';
import type { Color } from '../../lib/engine/mx';

const COL: Color[] = ['amarillo', 'rosa', 'rojo', 'verde', 'azul'];

export default definePage({
  id: 'verificacion-vehicular',
  group: 'verif',
  kind: 'pillar',
  order: 10,
  slug: 'verificacion-vehicular',
  nav: 'Verificación vehicular',
  card: 'Calendario del 2.º semestre de 2026 por engomado, costo, prórroga y multa por llegar tarde.',
  title: 'Verificación vehicular 2026: calendario por engomado y costo',
  description: `Verificación vehicular 2026 en la CDMX: calendario del 2.º semestre por engomado, costo de ${mxn(costoVerifPesos(), 0)} con IVA y multa de ${mxn(multaVerifPesos(), 0)} si llegas tarde.`,
  h1: 'Verificación vehicular: ¿cuándo me toca?',
  intro: 'Elige el último número de tu placa: la herramienta te dice si te toca ahora, cuándo vence y cuánto cuesta.',
  resume: `En la Ciudad de México cada auto verifica dos veces al año, en el bimestre de su engomado. El programa del segundo semestre de 2026, publicado en la Gaceta Oficial el ${fecha(VERIF.vigencia.desde)} y vigente hasta el ${fecha(VERIF.vigencia.hasta)}, fija: amarillo (${digits(digitosColor('amarillo'))}) en ${listOf(verifMesesTxt('amarillo', 2))}, rosa (${digits(digitosColor('rosa'))}) en ${listOf(verifMesesTxt('rosa', 2))}, rojo (${digits(digitosColor('rojo'))}) en ${listOf(verifMesesTxt('rojo', 2))}, verde (${digits(digitosColor('verde'))}) en ${listOf(verifMesesTxt('verde', 2))} y azul (${digits(digitosColor('azul'))}) en ${listOf(verifMesesTxt('azul', 2))}. La verificación cuesta ${VERIF.costoUma} UMA más IVA, ${mxn(costoVerifPesos(), 0)} con la UMA de 2026, y los reintentos tras un rechazo en el mismo verificentro son gratuitos. Verificar fuera de plazo exige pagar antes una multa de ${VERIF.multaUma} UMA, ${mxn(multaVerifPesos(), 0)}, y mientras no se verifica el auto se trata como holograma 2 en el Hoy No Circula. Las motos no verifican.`,
  tool: 'verif',
  toolProps: { digit: 1 },
  faqs: [
    { q: '¿Cuánto cuesta verificar en la CDMX en 2026?', a: `${VERIF.costoUma} veces la UMA más IVA, para cualquier holograma, el rechazo o la evaluación técnica: con la UMA de 2026 son ${mxn(costoVerifPesos(), 0)}. El segundo, cuarto y siguientes intentos tras un rechazo en el mismo verificentro no se cobran. El holograma exento para un auto de otro estado tiene un costo distinto, y para los de la CDMX es gratuito.` },
    { q: '¿Qué pasa si se me pasa la verificación?', a: `Pagas la multa por verificación extemporánea, ${VERIF.multaUma} UMA (${mxn(multaVerifPesos(), 0)} en 2026), con la línea de captura de Finanzas, y verificas dentro de los 30 días naturales siguientes al pago. Mientras tanto el auto se trata como holograma 2: no circula su día entre semana ni ningún sábado, y la multa no te exime del Hoy No Circula.` },
    { q: '¿Hay prórroga para la verificación?', a: 'Sí, de 15 días, pero solo en los casos que fija el programa, como un rechazo en los últimos siete días del periodo o una falla del sistema. No es una prórroga general: quien simplemente no fue a tiempo paga la multa. Las fechas límite con prórroga del segundo semestre de 2026 están en la tabla de esta página.' },
    { q: '¿Las placas del Estado de México verifican con este calendario?', a: 'El Estado de México tiene su propio programa de verificación, publicado en su Gaceta del Gobierno, y no pudimos leerlo porque los sitios del gobierno mexiquense no respondieron a nuestras consultas. La Ciudad de México reconoce los hologramas expedidos en el Estado de México, pero un auto mexiquense no puede verificar voluntariamente en la CDMX.' },
  ],
  body: (h) => `
<h2>El calendario completo de 2026</h2>
${h.table(['Engomado', 'Terminación', '1.er semestre', '2.º semestre', 'Límite con prórroga'], COL.map((c) => [c[0].toUpperCase() + c.slice(1), digits(digitosColor(c)), listOf(verifMesesTxt(c, 1)), listOf(verifMesesTxt(c, 2)), fecha(MX.verif.prorroga15[c])]), 'Programas de verificación de 2026 (Gaceta Oficial del 2 de enero y del 1 de julio de 2026). Placas sin números: periodo de la terminación 9 o 0.')}
<p>El holograma que te den depende del año del modelo y de la prueba: ${h.a('que-holograma-me-toca', 'qué holograma me toca')}. Si llegas tarde, el detalle de la multa y del trámite está en ${h.a('multa-verificacion-extemporanea', 'multa por verificar tarde')}. Para tu día de Hoy No Circula, ${h.a('hoy-no-circula', 'Hoy No Circula hoy')}.</p>
`,
  related: ['multa-verificacion-extemporanea', 'que-holograma-me-toca', 'hoy-no-circula', 'holograma-0', 'hoy-no-circula-edomex'],
  sources: ['verif_2s2026', 'verif_1s2026', 'uma_2026', 'multa_linea_captura', 'reglamento_verif_2026'],
});

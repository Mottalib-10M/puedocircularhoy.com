import { definePage } from '../../lib/page-types';
import { P, MX, digitosColor, digits, horas24, verifMesesTxt, listOf, fecha, costoVerifPesos, mxn } from '../../lib/kit';

const D = digitosColor('verde');
const H = horas24(MX.hnc.horas);
const V2 = verifMesesTxt('verde', 2);
const V1 = verifMesesTxt('verde', 1);
const P_0 = P.mx.hologramas['0'].modeloDesde;

export default definePage({
  id: 'hoy-no-circula-jueves',
  group: 'hnc',
  kind: 'pillar',
  order: 43,
  slug: 'hoy-no-circula-jueves',
  nav: 'Jueves: engomado verde',
  card: `Terminación ${digits(D)}: el jueves, y la verificación que se abre en ${V2[0]}.`,
  title: `Hoy No Circula jueves 2026: engomado verde, placas ${digits(D)}`,
  description: `Hoy No Circula los jueves 2026: no circulan los autos de engomado verde, terminación ${digits(D)}, con holograma 1 o 2, de ${H}. Verifican en ${listOf(V2)}.`,
  h1: 'Hoy No Circula los jueves: engomado verde',
  intro: `Placas terminadas en ${digits(D)}: el jueves es tu día, y ${V2[0]} tu mes de verificar.`,
  resume: `Los jueves no circulan los autos de engomado verde, es decir con placa terminada en ${digits(D)}, que tienen holograma 1 o 2, de ${H}, en la Ciudad de México y su zona conurbada. Los hologramas 0, 00 y exento circulan el jueves salvo contingencia ambiental. El verde verifica en ${listOf(V2)} en el segundo semestre de 2026 y en ${listOf(V1)} en el primero, y su prórroga de quince días llega hasta el ${fecha(MX.verif.prorroga15.verde)}. Verificar a tiempo es lo que permite conservar o mejorar el holograma: un auto modelo ${P_0} o posterior que aprueba la prueba sale con holograma 0 y deja de tener Hoy No Circula. La verificación cuesta ${mxn(costoVerifPesos(), 0)} con IVA en 2026, y los reintentos tras un rechazo en el mismo verificentro son gratis.`,
  tool: 'hnc',
  toolProps: { digit: 1, holo: '1' },
  faqs: [
    { q: '¿Qué autos no circulan el jueves en la Ciudad de México?', a: `Los de engomado verde, con placa terminada en ${digits(D)}, si tienen holograma 1 o 2, de ${H}. Las placas de otros estados con esa terminación y sin un holograma que la CDMX reconozca tampoco. Con holograma 0, 00 o exento, motos y pase turístico se circula el jueves, salvo contingencia.` },
    { q: 'Mi auto verde tiene holograma 1, ¿puedo sacar el 0 en esta verificación?', a: `Depende del año del modelo y de la prueba. El holograma 0 se da a autos de gasolina modelo ${P_0} y posteriores que aprueban la prueba del verificentro; un modelo más antiguo se queda en 1 o 2 según sus emisiones. Si tu auto cumple y lo verificas en ${listOf(V2)}, dejas de tener Hoy No Circula el jueves desde ese día.` },
    { q: '¿El jueves de contingencia circula el holograma 00 verde?', a: 'No. Con contingencia ambiental, el Programa de Contingencias de 2019 deja sin circular entre semana a los hologramas 0 y 00 de la terminación que tiene restricción ese día en el Hoy No Circula. El jueves le toca al verde, así que un 00 con placa terminada en 1 o 2 no sale ese jueves.' },
  ],
  body: (h) => `
<h2>El verde en el calendario del año</h2>
${h.table(['Mes', 'Qué toca al engomado verde'], [[listOf(V1), 'Verificación del primer semestre'], [listOf(V2), 'Verificación del segundo semestre'], ['Cada jueves', `Hoy No Circula con holograma 1 o 2, de ${H}`]], 'Programas de verificación de 2026 y decreto del Hoy No Circula.')}
<p>Las terminaciones 1 y 2 son non y par: con holograma 1, la terminación 1 descansa el primer y el tercer sábado y la 2 el segundo y el cuarto. Si tienes los dos autos en casa, nunca descansan el mismo sábado.</p>
<h2>Cómo llegar al holograma 0</h2>
<p>El holograma depende del año del modelo y de la prueba de emisiones, no del engomado. Un auto de gasolina modelo ${P_0} o más reciente que pasa la prueba obtiene el 0, que vale seis meses y exenta del Hoy No Circula. Para ver qué holograma le corresponde a tu auto, usa ${h.a('que-holograma-me-toca', 'qué holograma me toca')}. Los demás días: ${h.a('hoy-no-circula-lunes', 'lunes')}, ${h.a('hoy-no-circula-martes', 'martes')}, ${h.a('hoy-no-circula-miercoles', 'miércoles')}, ${h.a('hoy-no-circula-viernes', 'viernes')}.</p>
`,
  related: ['hoy-no-circula-miercoles', 'hoy-no-circula-viernes', 'verificacion-vehicular', 'que-holograma-me-toca', 'holograma-0'],
  sources: ['hnc_decreto', 'verif_2s2026', 'verif_1s2026', 'pcaa_2019'],
});

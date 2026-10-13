import { definePage } from '../../lib/page-types';
import { P, MX, horas24, sabadosHolo1, fechaDia, diaHnc } from '../../lib/kit';

const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);
const non = sabadosHolo1(2026, 11, 1).map((f) => fechaDia(f));
const par = sabadosHolo1(2026, 11, 2).map((f) => fechaDia(f));

export default definePage({
  id: 'holograma-1',
  group: 'hnc',
  kind: 'pillar',
  order: 52,
  slug: 'holograma-1',
  nav: 'Holograma 1',
  card: `Modelos ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta}: un día entre semana y dos sábados al mes.`,
  title: 'Holograma 1 2026: Hoy No Circula entre semana y sábados',
  description: `Holograma 1 en 2026: no circula un día entre semana según su engomado y dos sábados al mes, nones el 1.º y 3.º, pares el 2.º y 4.º, de ${H}. Consulta tu placa.`,
  h1: 'Holograma 1: qué días no circula',
  intro: 'Un día entre semana y dos sábados al mes, según el engomado y si la terminación es par o non.',
  resume: `Con holograma 1 un auto no circula un día entre semana, el de su engomado, y dos sábados al mes, de ${H}. Los sábados se reparten por paridad: las terminaciones nones (1, 3, 5, 7, 9) descansan el primer y el tercer sábado del mes, y las pares (0, 2, 4, 6, 8) el segundo y el cuarto. Cuando el mes tiene cinco sábados, el quinto puede circular, salvo aviso contrario por la calidad del aire. En noviembre de 2026, por ejemplo, una placa non descansa ${non.join(' y ')}, y una par ${par.join(' y ')}. El holograma 1 se da a los autos de gasolina modelo ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta} que cumplen los límites de emisiones, y a los más antiguos que cumplen los límites más estrictos de su tabla. En contingencia, la CAMe restringe además a la mitad de los holograma 1, por terminación par o non, alternando con la activación anterior.`,
  tool: 'hnc',
  toolProps: { holo: '1', digit: 4 },
  faqs: [
    { q: '¿Qué sábados no circula el holograma 1?', a: 'Depende de la terminación de la placa. Las nones, 1, 3, 5, 7 y 9, descansan el primer y el tercer sábado del mes; las pares, 0, 2, 4, 6 y 8, el segundo y el cuarto. Las placas formadas solo por letras cuentan como pares. El quinto sábado, cuando existe, el holograma 1 puede circular salvo aviso de la autoridad.' },
    { q: '¿Cómo pasar de holograma 1 a holograma 0?', a: `El holograma 0 exige un auto modelo ${HO['0'].modeloDesde} o posterior que apruebe la prueba. Si tu auto es de ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta}, el programa le asigna como máximo el 1, aunque esté bien afinado; mejorar su mantenimiento evita bajar al 2, pero no da el 0. Los autos más recientes con holograma 1 pueden haber fallado la prueba: conviene revisarlos antes de la siguiente verificación.` },
    { q: '¿El holograma 1 circula en contingencia ambiental?', a: 'La mitad sí y la mitad no. El Programa de Contingencias de 2019 restringe a los holograma 1 por terminación par o non, de manera alternada con base en la última activación. El comunicado de la CAMe dice cuál de las dos descansa. En la herramienta, marca la fase y elige la terminación que indique el comunicado.' },
  ],
  body: (h) => `
<h2>Un mes con holograma 1</h2>
<p>Un auto con holograma 1 pierde, en un mes normal, cuatro o cinco días entre semana y dos sábados. La terminación decide cuáles: el día entre semana sale del engomado y los sábados de la paridad. El ${h.a('calendario-hoy-no-circula', 'calendario Hoy No Circula')} pinta el mes completo para tu placa, con los quintos sábados libres.</p>
${h.table(['Terminación', 'Día entre semana', 'Sábados sin circular'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => [String(d), diaHnc(d), (d % 2 === 0 ? MX.hnc.sabadoHolo1.par : MX.hnc.sabadoHolo1.impar).map((n) => `${n}.º`).join(' y ')]), `Holograma 1, de ${H}. Decreto del Programa Hoy No Circula, Tabla 1.`)}
<p>Los demás hologramas: ${h.a('holograma-00', 'holograma 00')}, ${h.a('holograma-0', 'holograma 0')}, ${h.a('holograma-2', 'holograma 2')}. Para el detalle de los fines de semana, ${h.a('hoy-no-circula-sabado', 'Hoy No Circula sabatino')}.</p>
`,
  related: ['hoy-no-circula-sabado', 'holograma-2', 'holograma-0', 'calendario-hoy-no-circula', 'contingencia-ambiental'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019'],
});

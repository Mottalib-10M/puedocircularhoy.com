import { definePage } from '../../lib/page-types';
import { MX, P, horas24, listOf } from '../../lib/kit';

const H = horas24(MX.hnc.horas);
const B = P.mx.contingencia.boletines;

export default definePage({
  id: 'hoy-no-circula-manana',
  group: 'hnc',
  kind: 'pillar',
  order: 20,
  slug: 'hoy-no-circula-manana',
  nav: 'Hoy No Circula mañana',
  card: 'La consulta de la víspera: tu placa mañana y a qué hora sale el aviso de contingencia.',
  title: 'Hoy No Circula mañana 2026: ¿circula tu auto? Consulta',
  description: `Hoy No Circula mañana 2026: elige terminación y holograma y sabe la víspera si circulas, de ${H}, y a qué hora anuncia la CAMe una contingencia.`,
  h1: 'Hoy No Circula mañana',
  intro: 'La herramienta responde directamente para mañana, con la fecha de la Ciudad de México.',
  resume: `Para saber si tu auto circula mañana basta con la terminación de la placa y el holograma: la regla ordinaria del Hoy No Circula no cambia de un día a otro y se puede calcular con días de anticipación, de ${H}. Lo que no se sabe con anticipación es la contingencia ambiental. La Comisión Ambiental de la Megalópolis emite boletines a las ${listOf(B)}, y cuando activa una fase la restricción adicional empieza a las 5:00 del día siguiente; el aviso preventivo por ozono sale entre las 14:00 y las 15:00. Por eso la consulta de la víspera tiene dos partes: la respuesta ordinaria, que da la herramienta, y el comunicado de la tarde, que hay que mirar. Si la CAMe activó la contingencia, marca la fase en la herramienta y elige la terminación o el engomado que diga el comunicado.`,
  tool: 'hnc',
  toolProps: { manana: true, holo: '1', digit: 5 },
  faqs: [
    { q: '¿A qué hora se sabe si mañana hay doble Hoy No Circula?', a: `La CAMe publica boletines a las ${listOf(B)} y la restricción de una contingencia empieza a las 5:00 del día siguiente a la activación. En la práctica, si a las 20:00 no hay contingencia activada, mañana rige solo el Hoy No Circula ordinario. Si la contingencia ya está activa, el boletín dice si se mantiene o se levanta.` },
    { q: '¿Mañana es sábado y tengo holograma 1, circulo?', a: 'Depende de qué sábado del mes sea y de tu terminación: las nones descansan el primero y el tercero, las pares el segundo y el cuarto, y el quinto sábado circula. La herramienta calcula el rango del sábado de mañana; también lo puedes ver en el calendario del mes o en la página del Hoy No Circula sabatino.' },
    { q: '¿Puedo usar la consulta de mañana para un viaje desde otro estado?', a: 'Sí, eligiendo «placa de otro estado sin holograma» si tu holograma no lo reconoce la Ciudad de México. Ese día, además de tu día de engomado y los sábados, no podrás circular de lunes a viernes de 5:00 a 11:00. Si vienes pocos días, el Pase Turístico te libra de esas restricciones fuera de contingencia.' },
  ],
  body: (h) => `
<h2>La víspera en tres pasos</h2>
<p>Primero, la regla ordinaria: la herramienta de arriba ya calcula mañana con tu terminación y tu holograma. Segundo, la contingencia: después del boletín de las 15:00 o de las 20:00, revisa si la CAMe activó una fase; el aviso se publica en sus comunicados y en aire.cdmx.gob.mx. Tercero, si hay contingencia, márcala en la herramienta: la respuesta cambia según tu holograma y lo que diga el comunicado.</p>
<p>Si mañana es día festivo, el programa sigue salvo aviso de suspensión publicado por la autoridad ambiental; no lo des por suspendido sin ver el aviso. Para la semana completa usa el ${h.a('calendario-hoy-no-circula', 'calendario Hoy No Circula')}; para hoy, ${h.a('hoy-no-circula', 'Hoy No Circula hoy')}, y para la contingencia, ${h.a('contingencia-ambiental', 'contingencia ambiental hoy')}.</p>
`,
  related: ['hoy-no-circula', 'calendario-hoy-no-circula', 'contingencia-ambiental', 'hoy-no-circula-sabado'],
  sources: ['hnc_decreto', 'pcaa_2019', 'came_prensa', 'aire_contingencias'],
});

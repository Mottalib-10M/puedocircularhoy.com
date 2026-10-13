import { definePage } from '../../lib/page-types';
import { MX, P, horas24, sabadosHolo1, sabadosMes, fechaDia } from '../../lib/kit';

const H = horas24(MX.hnc.horas);
const S = MX.hnc.sabadoHolo1;
const meses: Array<[number, number, string]> = [[2026, 10, 'Octubre'], [2026, 11, 'Noviembre'], [2026, 12, 'Diciembre']];

export default definePage({
  id: 'hoy-no-circula-sabado',
  group: 'hnc',
  kind: 'pillar',
  order: 25,
  slug: 'hoy-no-circula-sabado',
  nav: 'Hoy No Circula sabatino',
  card: 'Holograma 1 por par o non, holograma 2 todos los sábados, y el quinto sábado libre.',
  title: 'Hoy No Circula sábado 2026: holograma 1, 2 y quinto sábado',
  description: `Hoy No Circula sabatino 2026: el holograma 1 non descansa el ${S.impar.join('.º y ')}.º sábado, el par el ${S.par.join('.º y ')}.º, y el holograma 2 todos, de ${H}. Revisa tu sábado.`,
  h1: 'Hoy No Circula sabatino',
  intro: 'El sábado no depende del engomado sino del holograma y de si la placa es par o non.',
  resume: `El sábado el Hoy No Circula sigue otra lógica que entre semana: no importa el color del engomado, sino el holograma y la paridad de la terminación. Con holograma 1, las placas nones (1, 3, 5, 7, 9) descansan el ${S.impar.join('.º y el ')}.º sábado del mes y las pares (0, 2, 4, 6, 8), así como las placas solo con letras, el ${S.par.join('.º y el ')}.º, de ${H}. Con holograma 2, y para los autos de otros estados sin holograma reconocido, no se circula ningún sábado. Cuando el mes tiene un quinto sábado, el holograma 1 puede circular ese día, salvo aviso contrario de la autoridad por la calidad del aire. Los hologramas 0, 00 y exento circulan todos los sábados mientras no haya contingencia. En sábado de contingencia, la CAMe elige además un engomado para los hologramas 0 y 00, empezando por el amarillo y rotando en cada activación de fin de semana.`,
  tool: 'hnc-cal',
  toolProps: { holo: '1' },
  faqs: [
    { q: '¿Cómo sé si hoy es primer, segundo o tercer sábado?', a: 'Cuenta los sábados desde el día 1 del mes: el primer sábado cae entre el 1 y el 7, el segundo entre el 8 y el 14, el tercero entre el 15 y el 21, el cuarto entre el 22 y el 28, y el quinto, cuando existe, entre el 29 y el 31. Un sábado 17 es siempre el tercero; un sábado 10, el segundo.' },
    { q: '¿Si tengo holograma 1 y placa par circulo este sábado?', a: `Si es el ${S.par.join('.º o el ')}.º sábado del mes, no, de ${H}. Si es el primero, el tercero o el quinto, sí. Las placas que terminan en letra se tratan como pares. El calendario de esta página marca tus sábados del mes al elegir tu terminación.` },
    { q: '¿Qué autos no circulan el quinto sábado?', a: 'Los holograma 2 y los autos foráneos sin holograma reconocido, que no circulan ningún sábado. El holograma 1 sí puede circular el quinto sábado según el programa de verificación de 2026, que deja a salvo un aviso de la autoridad por las condiciones ambientales. En sábado de contingencia, aplican además las restricciones de la fase.' },
  ],
  body: (h) => `
<h2>Los sábados de los próximos meses</h2>
${h.table(['Mes', 'Sábados', 'Holograma 1 non no circula', 'Holograma 1 par no circula'], meses.map(([y, m, n]) => [n, String(sabadosMes(y, m).length), sabadosHolo1(y, m, 1).map((f) => fechaDia(f)).join(', '), sabadosHolo1(y, m, 2).map((f) => fechaDia(f)).join(', ')]), `Holograma 2 y foráneos sin holograma: ningún sábado. Calculado por el motor, de ${H}.`)}
<p>El calendario de arriba permite elegir otro mes y otra terminación. Los transportes colectivos de pasajeros tienen una regla sabatina propia, de 10:00 a 22:00, con dos terminaciones por sábado; esta herramienta calcula solo autos particulares.</p>
<p>Para el sábado de contingencia, ver ${h.a('doble-hoy-no-circula', 'Doble Hoy No Circula')}; para cada holograma, ${h.a('holograma-1', 'holograma 1')} y ${h.a('holograma-2', 'holograma 2')}.</p>
`,
  related: ['holograma-1', 'holograma-2', 'calendario-hoy-no-circula', 'doble-hoy-no-circula', 'hoy-no-circula'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019'],
});

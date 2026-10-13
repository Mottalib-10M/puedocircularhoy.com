import { definePage } from '../../lib/page-types';
import { MX, horas24, sabadosMes, sabadosHolo1, fechaDia, monthDays, hnc } from '../../lib/kit';

const H = horas24(MX.hnc.horas);
const cuenta = (d: number, h: '1' | '2') => monthDays(2026, 11).filter((f) => hnc(f, d, h).circula === false).length;
const s5 = ['2026-10', '2026-11', '2026-12'].map((m) => [m, sabadosMes(Number(m.slice(0, 4)), Number(m.slice(5))).length] as const);

export default definePage({
  id: 'calendario-hoy-no-circula',
  group: 'hnc',
  kind: 'pillar',
  order: 30,
  slug: 'calendario-hoy-no-circula',
  nav: 'Calendario Hoy No Circula',
  card: `El mes entero de tu placa y tu holograma, con sábados y quintos sábados marcados.`,
  title: 'Calendario Hoy No Circula 2026: tu placa día por día',
  description: `Calendario Hoy No Circula 2026: elige mes, terminación y holograma y ve cada día sin circular, entre semana y sábados, con los quintos sábados libres.`,
  h1: 'Calendario Hoy No Circula',
  intro: `Cada día del mes para tu placa y tu holograma, sin contingencias.`,
  resume: `El calendario marca en rojo cada día del mes en que tu auto no circula de ${H}, según la terminación de la placa y el holograma. En noviembre de 2026, una placa terminada en 1 con holograma 1 tiene ${cuenta(1, '1')} días sin circular y con holograma 2 ${cuenta(1, '2')}; una terminada en 6, ${cuenta(6, '1')} y ${cuenta(6, '2')}. La diferencia sale de los sábados: el holograma 1 descansa dos sábados al mes según su paridad y el holograma 2 todos. Los meses con cinco sábados dan un sábado libre al holograma 1: en el último trimestre de 2026, ${s5.filter(([, n]) => n === 5).map(([m]) => m === '2026-10' ? 'octubre' : m === '2026-11' ? 'noviembre' : 'diciembre').join(' y ') || 'ningún mes'} los tiene. El calendario no incluye contingencias, porque se activan la víspera y nadie las puede anticipar. Los hologramas 0, 00 y exento aparecen libres todo el mes.`,
  tool: 'hnc-cal',
  toolProps: { holo: '1' },
  faqs: [
    { q: `¿Cuántos días al mes no circula un auto con holograma 1?`, a: `Entre seis y siete: cuatro o cinco días entre semana, según cuántas veces caiga en el mes su día de engomado, y dos sábados. En los meses con cinco sábados, el quinto queda libre. El calendario hace la cuenta exacta para tu terminación y el mes que elijas.` },
    { q: `¿El calendario Hoy No Circula cambia cada año?`, a: `La tabla por engomado y la regla de los sábados vienen del decreto de 2014 y no han cambiado; lo que cambia de un mes a otro es en qué fechas caen los días. Lo que sí cambia cada semestre es el calendario de verificación, que tiene su propia página. Si la autoridad publica un aviso que suspende el programa algún día, el calendario no lo refleja.` },
    { q: `¿Puedo ver el calendario de un holograma 2 foráneo?`, a: `Sí: elige «placa de otro estado sin holograma». El calendario marca su día de engomado y todos los sábados como días sin circular, y los demás días hábiles como «desde 11:00», porque esos autos tampoco circulan de lunes a viernes de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}.` },
  ],
  body: (h) => `
<h2>Cómo se arma el mes</h2>
<p>Para cada día, el motor mira tres cosas: si es domingo, en cuyo caso no hay restricción; si es día entre semana, en cuyo caso compara tu terminación con el engomado del día; y si es sábado, en cuyo caso calcula qué sábado del mes es y lo cruza con tu holograma y la paridad de tu placa. Los sábados son la parte que más confunde, y por eso el calendario los pinta uno por uno.</p>
${h.table(['Mes', 'Sábados', 'Holograma 1 non', 'Holograma 1 par'], s5.map(([m, n]) => { const [y, mm] = [Number(m.slice(0, 4)), Number(m.slice(5))]; return [m === '2026-10' ? 'Octubre de 2026' : m === '2026-11' ? 'Noviembre de 2026' : 'Diciembre de 2026', String(n), sabadosHolo1(y, mm, 1).map((f) => fechaDia(f)).join(', '), sabadosHolo1(y, mm, 2).map((f) => fechaDia(f)).join(', ')]; }), 'Sábados sin circular del holograma 1, calculados por el motor.')}
<p>Para la consulta rápida del día, ${h.a('hoy-no-circula', 'Hoy No Circula hoy')}; para la regla completa de los fines de semana, ${h.a('hoy-no-circula-sabado', 'Hoy No Circula sabatino')}.</p>
`,
  related: ['hoy-no-circula', 'hoy-no-circula-sabado', 'hoy-no-circula-manana', 'holograma-1', 'holograma-2'],
  sources: ['hnc_decreto', 'verif_2s2026'],
});

import { definePage } from '../../lib/page-types';
import { P, MX, horas24 } from '../../lib/kit';

const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);

export default definePage({
  id: 'holograma-0',
  group: 'hnc',
  kind: 'pillar',
  order: 51,
  slug: 'holograma-0',
  nav: 'Holograma 0',
  card: `Modelos ${HO['0'].modeloDesde} en adelante que pasan la prueba: circulan diario, ${HO['0'].vigenciaMeses} meses de vigencia.`,
  title: 'Holograma 0 2026: requisitos, vigencia y Hoy No Circula',
  description: `Holograma 0 en 2026: para autos de gasolina modelo ${HO['0'].modeloDesde} y posteriores que pasan la prueba; vale ${HO['0'].vigenciaMeses} meses y circula todos los días salvo contingencia ambiental.`,
  h1: 'Holograma 0: requisitos y días que circula',
  intro: 'El holograma de la mayoría de los autos recientes: sin Hoy No Circula, con verificación cada semestre.',
  resume: `El holograma 0 se da a los autos de gasolina, y a los híbridos suaves que se verifican como tales, de año modelo ${HO['0'].modeloDesde} y posteriores que aprueban la prueba del verificentro; para los modelos ${HO['0'].modeloDesde} a 2009 con estándar A se mide además la emisión de gases. En diésel, el 0 se da desde el modelo ${HO['0'].dieselDesde} con opacidad dentro del límite. Su vigencia es de ${HO['0'].vigenciaMeses} meses, así que el auto vuelve a verificar cada semestre en el bimestre de su engomado. Con holograma 0 el auto queda exento de todas las limitaciones del Hoy No Circula: circula cualquier día y cualquier sábado. Solo descansa con contingencia ambiental, el día de su engomado entre semana de ${H}, o el engomado que fije la CAMe en fin de semana. Un auto modelo ${HO['0'].modeloDesde} o posterior que falla la prueba no obtiene automáticamente el 1: se evalúan sus emisiones y puede salir rechazado.`,
  tool: 'hnc',
  toolProps: { holo: '0', digit: 3 },
  faqs: [
    { q: '¿Qué autos pueden tener holograma 0?', a: `Los de gasolina o híbridos suaves modelo ${HO['0'].modeloDesde} y posteriores que aprueban la prueba de diagnóstico a bordo, con prueba de gases adicional para algunos modelos de ${HO['0'].modeloDesde} a 2009, y los diésel modelo ${HO['0'].dieselDesde} o posteriores con opacidad de hasta 1.0. Lo establece el programa de verificación del segundo semestre de 2026, apartado 8.3.` },
    { q: '¿Cada cuánto se verifica con holograma 0?', a: `Cada semestre: el holograma 0 vale ${HO['0'].vigenciaMeses} meses. La verificación se hace en el bimestre del engomado, por ejemplo septiembre y octubre para el rojo en el segundo semestre de 2026. Si no se verifica a tiempo, el auto pierde la exención del Hoy No Circula y se trata como holograma 2 hasta regularizarse.` },
    { q: '¿Con holograma 0 circulo los sábados?', a: 'Sí, todos los sábados, incluido el quinto, mientras no haya contingencia ambiental. El holograma 0 exenta de todas las limitaciones del programa, entre semana y en sábado. En un sábado o domingo de contingencia, deja de circular si su engomado es el que elige el comunicado de la CAMe ese día.' },
  ],
  body: (h) => `
<h2>Lo que separa al 0 del 1</h2>
<p>La frontera principal es el año del modelo, ${HO['0'].modeloDesde}, y la prueba que se aplica según la tecnología del auto. Un auto que pasa del holograma 1 al 0 gana todos los días entre semana y los sábados, y la consulta diaria del Hoy No Circula deja de afectarle; un auto que pierde el 0 por no verificar a tiempo vuelve a tener restricción.</p>
${h.table(['', 'Holograma 0', 'Holograma 1'], [['Modelos', `${HO['0'].modeloDesde} y posteriores`, `${HO['1'].modeloDesde} a ${HO['1'].modeloHasta}`], ['Día entre semana', 'Circula', 'Descansa el de su engomado'], ['Sábados', 'Circula', 'Descansa dos al mes'], ['Contingencia', 'Descansa el día de su engomado', 'Descansa según el comunicado']], 'Programa de verificación del 2.º semestre de 2026 y Programa Hoy No Circula.')}
<p>Para ver qué holograma le toca a tu auto según el año, usa ${h.a('que-holograma-me-toca', 'qué holograma me toca')}. Los otros: ${h.a('holograma-00', 'holograma 00')}, ${h.a('holograma-1', 'holograma 1')}, ${h.a('holograma-2', 'holograma 2')}.</p>
`,
  related: ['holograma-00', 'holograma-1', 'que-holograma-me-toca', 'verificacion-vehicular'],
  sources: ['verif_2s2026', 'hnc_decreto', 'pcaa_2019'],
});

import { definePage } from '../../lib/page-types';
import { P, MX, digitosColor, horas24, mxn, multaHncPesos, digits, fecha } from '../../lib/kit';

const [m20, , m30] = multaHncPesos();
const H = horas24(MX.hnc.horas);
const HO = P.mx.hologramas;

export default definePage({
  id: 'hoy-no-circula',
  group: 'hnc',
  kind: 'pillar',
  order: 10,
  slug: 'hoy-no-circula',
  nav: 'Hoy No Circula hoy',
  card: `Tu placa y tu holograma: si circulas hoy, mañana y cuál es tu próximo día sin auto.`,
  title: 'Hoy No Circula hoy 2026: tu placa, holograma y mañana',
  description: `Hoy No Circula 2026 en la CDMX y el Edomex: elige tu terminación y tu holograma y ve si circulas hoy y mañana, de ${H}, con sábados y contingencias.`,
  h1: 'Hoy No Circula: ¿circula mi auto hoy?',
  intro: `Elige el último número de tu placa y tu holograma: la respuesta sale para hoy y para mañana, con la hora de la Ciudad de México.`,
  resume: `Con holograma 1 o 2 tu auto descansa un día entre semana según el último número de la placa: los lunes la terminación ${digits(digitosColor('amarillo'))} (engomado amarillo), los martes ${digits(digitosColor('rosa'))} (rosa), los miércoles ${digits(digitosColor('rojo'))} (rojo), los jueves ${digits(digitosColor('verde'))} (verde) y los viernes ${digits(digitosColor('azul'))} (azul), de ${H}. El holograma 1 descansa además dos sábados al mes, los nones el primero y el tercero, los pares el segundo y el cuarto; el holograma 2 no circula ningún sábado. Los hologramas 0 y 00, los exentos, las motos y los autos con Pase Turístico circulan diario mientras no haya contingencia ambiental. La herramienta aplica el decreto del Programa Hoy No Circula publicado en la Gaceta Oficial el 19 de junio de 2014 y las disposiciones complementarias del programa de verificación del segundo semestre de 2026. Circular en tu día cuesta de ${mxn(m20, 0)} a ${mxn(m30, 0)}.`,
  tool: 'hnc',
  toolProps: { holo: '1', digit: 5 },
  faqs: [
    { q: `¿A qué hora empieza y termina el Hoy No Circula?`, a: `La restricción va de ${H}, igual entre semana que en sábado. Antes de las 5:00 y después de las 22:00 puedes mover el auto aunque sea tu día. La excepción son los autos de otros estados sin holograma reconocido: de lunes a viernes tampoco circulan de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}, aunque no sea el día de su terminación, según el apartado 14 del programa de verificación de 2026.` },
    { q: `Mi placa termina en letra, ¿qué día descanso?`, a: `El decreto de 2014 dice que las placas formadas solo por letras se tratan como las de engomado azul: descansan el viernes y cuentan como terminación par para los sábados del holograma 1. Si tu placa tiene números y letras, cuenta el último número que aparece. Ante una duda con una placa especial, la Secretaría del Medio Ambiente resuelve con la tarjeta de circulación.` },
    { q: `El engomado de mi auto no coincide con la terminación, ¿cuál manda?`, a: `Manda el número. El programa de verificación del segundo semestre de 2026 dice que el Hoy No Circula se respeta conforme al último dígito numérico de la matrícula. Un engomado equivocado o despegado no te cambia el día: la herramienta usa la terminación que eliges y te dice el color que le corresponde, para que lo compares con el de tu parabrisas.` },
    { q: `¿El Hoy No Circula aplica en días festivos?`, a: `Sí, salvo que la autoridad ambiental publique un aviso que lo suspenda. El decreto prevé esos avisos para festivos, días inhábiles o vacaciones cuando la calidad del aire lo permite, pero no hay una lista fija: un festivo sin aviso es un día normal de restricción. Revisa la Gaceta Oficial o el sitio de calidad del aire la víspera.` },
    { q: `¿Dónde reviso si hay contingencia antes de salir?`, a: `La Comisión Ambiental de la Megalópolis publica la activación en sus comunicados, y la Secretaría del Medio Ambiente la repite en aire.cdmx.gob.mx y en la aplicación Aire CDMX. Los boletines salen a las 10:00, 15:00 y 20:00, y la restricción empieza a las 5:00 del día siguiente. Si hay contingencia, marca la fase en la herramienta y elige la terminación que indique el comunicado.` },
    { q: `¿Puedo circular con holograma 1 el quinto sábado del mes?`, a: `Sí. Cuando el mes tiene cinco sábados, el programa de verificación de 2026 permite circular al holograma 1 el quinto, salvo que la CAMe o la Secretaría anuncien otra cosa por la calidad del aire. El holograma 2 no tiene ese respiro: no circula ningún sábado, tampoco el quinto. La herramienta y el calendario del mes ya marcan los quintos sábados.` },
  ],
  body: (h) => `
<h2>Cómo lee la herramienta tu placa</h2>
<p>Todo sale de dos datos. El último número de la placa fija el color de tu engomado y tu día entre semana; el holograma de la verificación decide si ese día te afecta y cuántos sábados descansas. Por eso la herramienta no pide la placa completa: con la terminación basta, y no sale de tu teléfono.</p>
${h.table(['Día', 'Engomado', 'Terminación'], [['Lunes', 'Amarillo', digits(digitosColor('amarillo'))], ['Martes', 'Rosa', digits(digitosColor('rosa'))], ['Miércoles', 'Rojo', digits(digitosColor('rojo'))], ['Jueves', 'Verde', digits(digitosColor('verde'))], ['Viernes', 'Azul', digits(digitosColor('azul'))]], `Día sin circular de los hologramas 1 y 2, de ${H}. Fuente: decreto del Programa Hoy No Circula, Tablas 1 y 2.`)}
<p>El sábado funciona distinto. Con holograma 1 cuenta si la terminación es non o par y qué sábado del mes es: los nones descansan el primero y el tercero, los pares el segundo y el cuarto. Con holograma 2, o sin holograma reconocido, no se circula ningún sábado. El domingo no hay restricción salvo contingencia. Todo el detalle de los fines de semana está en ${h.a('hoy-no-circula-sabado', 'Hoy No Circula sabatino')}.</p>
<h2>Lo que cambia según tu holograma</h2>
<p>El holograma lo da el verificentro según el año del modelo y las emisiones medidas. El 00 se reserva a autos nuevos o muy limpios y dura hasta ${HO['00'].vigenciaAnios} años; el 0 se da a modelos ${HO['0'].modeloDesde} en adelante que pasan la prueba; el 1 a modelos de ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta} dentro de los límites; el 2 a modelos de ${HO['2'].modeloHasta} y anteriores. Cada uno tiene su página: ${h.a('holograma-00', 'holograma 00')}, ${h.a('holograma-0', 'holograma 0')}, ${h.a('holograma-1', 'holograma 1')} y ${h.a('holograma-2', 'holograma 2')}.</p>
<p>Las motos están exentas del programa, igual que los eléctricos y los híbridos con holograma exento; los autos de otros estados se tratan como holograma 2 si no traen un holograma que la Ciudad de México reconozca, salvo con ${h.a('pase-turistico', 'Pase Turístico')}.</p>
<h2>Lo que la herramienta no puede adivinar</h2>
<p>La contingencia ambiental no se programa: la CAMe la activa cuando el ozono o las partículas superan el umbral, y la restricción adicional arranca a las 5:00 del día siguiente. Para el holograma 1, el comunicado dice si descansan los pares o los nones, alternando con la activación anterior; un sábado o un domingo dice también qué engomado deja en casa a los hologramas 0 y 00. Por eso la herramienta pregunta: marca la fase y elige lo que diga el comunicado. Sin ese dato responde «depende del comunicado» en vez de inventar. Lo explica ${h.a('contingencia-ambiental', 'contingencia ambiental hoy')}.</p>
<h2>Las fechas de las reglas</h2>
<p>El calendario por engomado viene del decreto publicado en la Gaceta Oficial del Distrito Federal el 19 de junio de 2014, en vigor desde el 1 de julio de 2014. El programa de verificación del segundo semestre de 2026, publicado el ${fecha('2026-07-01')}, lo complementa con las reglas de autos foráneos, autos nuevos, permisos sin placas y el quinto sábado, y rige hasta el ${fecha(MX.verif.vigencia.hasta)}. Cuando se publique el programa del primer semestre de 2027, la página se revisa contra él.</p>
<p>La multa por circular en tu día está en el artículo 47 del Reglamento de Tránsito: ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}. Para ver el mes completo de tu placa, usa el ${h.a('calendario-hoy-no-circula', 'calendario Hoy No Circula')}.</p>
`,
  related: ['hoy-no-circula-manana', 'calendario-hoy-no-circula', 'hoy-no-circula-sabado', 'contingencia-ambiental', 'verificacion-vehicular', 'multa-hoy-no-circula'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019', 'reglamento_transito', 'uma_2026'],
});

import { definePage } from '../../lib/page-types';
import { P, MX, horas24 } from '../../lib/kit';

const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);
const AN = P.mx.autoNuevo;

export default definePage({
  id: 'exentos-hoy-no-circula',
  group: 'hnc',
  kind: 'guide',
  order: 90,
  slug: 'exentos-hoy-no-circula',
  nav: 'Exentos: eléctricos, híbridos y motos',
  card: `Eléctricos, híbridos, motos, autos antiguos, discapacidad y autos nuevos: quién circula diario.`,
  title: 'Exentos del Hoy No Circula 2026: híbridos, eléctricos, motos',
  description: 'Exentos del Hoy No Circula 2026: eléctricos, híbridos HEV y PHEV, motos, autos antiguos y placas para discapacidad, y qué pasa con cada uno en contingencia.',
  h1: 'Quién está exento del Hoy No Circula',
  intro: `La lista oficial de exenciones, y la diferencia entre estar exento del programa y de la contingencia.`,
  resume: `El programa de verificación del segundo semestre de 2026 enumera, en su apartado 14.1, los vehículos exentos de las limitaciones del Hoy No Circula. Entre ellos están los eléctricos o con celda de combustible, los híbridos HEV, PHEV y REEV con motor de gasolina y eléctrico, las motocicletas, los vehículos con matrícula de auto antiguo o clásico expedida por la Ciudad de México, los que tienen placas para personas con discapacidad o el Permiso Especial para Circular, los de demostración o traslado, los tractores agrícolas y la maquinaria, y los autos con Pase Turístico o con hologramas 00 y 0. Pero exento del programa no siempre es exento de la contingencia: en una Fase I o II siguen circulando los eléctricos, los híbridos y los vehículos con holograma exento o matrícula ecológica, mientras que las motos pierden la mitad en Fase II y los autos con Pase Turístico o sin holograma se tratan como holograma 2. Los híbridos suaves no son exentos: se verifican como gasolina.`,
  mini: 'exentos',
  faqs: [
    { q: `¿Las motos tienen Hoy No Circula en la CDMX?`, a: `No. Las motocicletas están exentas del Hoy No Circula y también de la verificación vehicular, según el programa de verificación de 2026. La única restricción que las alcanza es la de la Fase II de contingencia ambiental, cuando el 50 por ciento de las motos deja de circular por terminación de placa, de ${MX.hnc.horas[0]} a ${MX.hnc.horas[1]}; las motos eléctricas siguen exentas.` },
    { q: `¿Mi híbrido circula diario en la Ciudad de México?`, a: `Si es HEV, PHEV o REEV y tiene holograma exento, sí, todos los días, incluso en contingencia. El holograma exento de un híbrido vale ${HO.exento.hibridoAnios} años en la Ciudad de México, con una renovación. Si es un híbrido suave o MHEV, se verifica como gasolina y depende de su holograma, 0 o 00 por lo general.` },
    { q: `¿Un auto nuevo tiene Hoy No Circula?`, a: `Un auto nuevo matriculado en la Ciudad de México está exento durante los primeros ${AN.diasLibres} días desde la expedición de la tarjeta de circulación. Después, y hasta que verifique, se trata como holograma 2. Tiene ${AN.plazoVerifDias} días para verificar por primera vez; en esa verificación puede obtener el 0 o el 00.` },
    { q: `¿Las placas para personas con discapacidad tienen Hoy No Circula?`, a: `No. El programa exenta a los vehículos con placas para personas con discapacidad y a los que tienen el Permiso Especial para Circular, y el Programa de Contingencias de 2019 los mantiene exentos también en contingencia. El Reglamento de Tránsito los exceptúa de la multa del artículo 47 cuando cuentan con la autorización correspondiente.` },
  ],
  body: (h) => `
<h2>La lista, con lo que pasa en contingencia</h2>
${h.table(['Vehículo', 'Hoy No Circula', 'Contingencia ambiental'], [['Eléctrico o celda de combustible', 'Exento', 'Exento'], ['Híbrido HEV, PHEV o REEV con holograma exento', 'Exento', 'Exento'], ['Híbrido suave (MHEV)', 'Según su holograma', 'Según su holograma'], ['Motocicleta', 'Exenta', 'Fase I: exenta; Fase II: la mitad no circula'], ['Matrícula de auto antiguo o clásico (CDMX)', 'Exento', 'Como holograma 2'], ['Placas o permiso para persona con discapacidad', 'Exento', 'Exento'], ['Holograma 00 o 0', 'Exento', 'No circula el día de su engomado'], ['Pase Turístico', 'Exento', 'Como holograma 2'], [`Auto nuevo de la CDMX, primeros ${AN.diasLibres} días`, 'Exento', 'Como vehículo sin holograma']], 'Programa de verificación del 2.º semestre de 2026, apartados 14.1 y 14.2; Programa de Contingencias de 2019, apartado XII.')}
<h2>Eléctricos e híbridos</h2>
<p>El programa distingue con cuidado los tipos de híbrido. Los HEV combinan un motor de gasolina con uno eléctrico que mueve el auto; los PHEV se enchufan para cargar la batería; los REEV usan el motor de gasolina para generar electricidad. Esos tres obtienen el holograma exento. Los MHEV, o híbridos suaves, tienen un pequeño motor eléctrico de ayuda que no mueve el auto por sí solo: para el programa son autos de gasolina y verifican como tales. Muchas fichas comerciales los llaman simplemente «híbridos», así que conviene leer la tarjeta de circulación o la constancia de verificación.</p>
<h2>Motos</h2>
<p>Las motocicletas no tienen Hoy No Circula ni verificación en la Ciudad de México. Su única restricción por placa aparece en la Fase II de contingencia, cuando la mitad deja de circular según la terminación, alternando par y non, de ${H}, y las motos sin placa no pueden circular. En Fase I, como confirmó la CAMe en septiembre de 2026, todas circulan.</p>
<h2>Autos antiguos y otros casos</h2>
<p>La exención del auto antiguo exige la matrícula de auto antiguo o clásico expedida por el Gobierno de la Ciudad de México; un auto viejo con placas normales tiene el holograma que le corresponda, por lo general el 2. Los vehículos de demostración o traslado, la maquinaria de construcción y los tractores agrícolas también están exentos. Los de servicios de emergencia, médicos, de seguridad, el transporte escolar autorizado y los convoyes funerarios están exentos por el propio decreto de 2014.</p>
<p>Para el resto de los autos, el día de descanso lo da la herramienta de ${h.a('hoy-no-circula', 'Hoy No Circula hoy')}; para la contingencia, ${h.a('doble-hoy-no-circula', 'Doble Hoy No Circula')}; y para saber qué holograma te toca, ${h.a('que-holograma-me-toca', 'qué holograma me toca')}.</p>
`,
  related: ['que-holograma-me-toca', 'doble-hoy-no-circula', 'pase-turistico', 'holograma-00', 'hoy-no-circula'],
  sources: ['verif_2s2026', 'pcaa_2019', 'hnc_decreto', 'reglamento_transito'],
});

import { definePage } from '../../lib/page-types';
import { P, MX, horas24, sabadosMes } from '../../lib/kit';

const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);
const nSab = sabadosMes(2026, 10).length;

export default definePage({
  id: 'holograma-2',
  group: 'hnc',
  kind: 'pillar',
  order: 53,
  slug: 'holograma-2',
  nav: 'Holograma 2',
  card: `Modelos ${HO['2'].modeloHasta} y anteriores, foráneos sin holograma y autos sin verificar: un día y todos los sábados.`,
  title: 'Holograma 2 2026: no circula ningún sábado ni un día',
  description: `Holograma 2 en 2026: no circula un día entre semana según su engomado ni ningún sábado, de ${H}, y es el primero en quedarse en casa en contingencia.`,
  h1: 'Holograma 2: el más restringido',
  intro: `Un día entre semana y todos los sábados, y fuera de circulación en cualquier contingencia.`,
  resume: `Con holograma 2 un auto no circula un día entre semana, el de su engomado, ni ningún sábado del mes, incluido el quinto, de ${H}. En octubre de 2026, que tiene ${nSab} sábados, eso suma ${nSab} sábados sin auto además de cuatro o cinco días entre semana. El holograma 2 corresponde a los autos de gasolina modelo ${HO['2'].modeloHasta} y anteriores que cumplen sus límites de emisiones, y a los diésel que solo alcanzan sus límites más altos. Pero la misma regla se aplica a otros vehículos sin ese holograma: los autos de otros estados sin un holograma que la Ciudad de México reconozca, los que no verificaron a tiempo, aunque paguen la multa, los autos nuevos después de ${P.mx.autoNuevo.diasLibres} días sin verificar y los permisos para circular sin placas. En contingencia, Fase I o Fase II, ningún holograma 2 circula, cualquiera que sea su terminación.`,
  tool: 'hnc',
  toolProps: { holo: '2', digit: 6 },
  faqs: [
    { q: `¿El holograma 2 circula el quinto sábado?`, a: `No. El decreto de 2014 dice que el holograma 2 deja de circular todos los sábados, y el programa de verificación de 2026 lo repite: un día entre semana y todos los sábados del mes. El respiro del quinto sábado es solo para el holograma 1. El domingo, en cambio, el holograma 2 circula si no hay contingencia.` },
    { q: `No verifiqué a tiempo, ¿mi auto es holograma 2?`, a: `Para el Hoy No Circula, sí: el programa de verificación del segundo semestre de 2026 trata a los vehículos de la Ciudad de México sin holograma vigente, incluso si ya pagaron la multa extemporánea, como si tuvieran holograma 2. Descansan su día entre semana y todos los sábados hasta que verifiquen.` },
    { q: `¿Qué pasa con el holograma 2 en contingencia ambiental?`, a: `No circula ningún holograma 2, de ${MX.hnc.horas[0]} a ${MX.hnc.horas[1]}, mientras dure la contingencia, sea Fase I o Fase II. Es la primera medida de la Tabla 3 del Programa de Contingencias de 2019. La misma regla se aplica a los autos de otros estados sin holograma reconocido y a los que circulan con Pase Turístico.` },
  ],
  body: (h) => `
<h2>Quién termina con la regla del holograma 2</h2>
${h.table(['Vehículo', 'Por qué'], [[`Gasolina modelo ${HO['2'].modeloHasta} o anterior`, 'Holograma 2 de la verificación'], ['Placas de otro estado sin holograma reconocido', 'Programa de verificación 2026, apartado 14.2 IV'], ['Auto de la CDMX sin verificar a tiempo', 'Apartado 14.2 V, aunque pague la multa'], [`Auto nuevo después de ${P.mx.autoNuevo.diasLibres} días sin verificar`, 'Apartado 14.2 VII'], ['Permiso para circular sin placas', 'Apartado 14.2 III']], 'Programa de verificación vehicular del 2.º semestre de 2026.')}
<p>Para los autos foráneos sin holograma la restricción es todavía mayor: además de su día y los sábados, no circulan de lunes a viernes de ${MX.hnc.foraneoManana[0]} a ${MX.hnc.foraneoManana[1]}. Si vienes de fuera por pocos días, el ${h.a('pase-turistico', 'Pase Turístico')} evita esas restricciones fuera de contingencia.</p>
<p>Compara con ${h.a('holograma-1', 'holograma 1')} y ${h.a('holograma-0', 'holograma 0')}, o mira el mes completo en el ${h.a('calendario-hoy-no-circula', 'calendario Hoy No Circula')}.</p>
`,
  related: ['holograma-1', 'pase-turistico', 'hoy-no-circula-sabado', 'multa-verificacion-extemporanea', 'contingencia-ambiental'],
  sources: ['hnc_decreto', 'verif_2s2026', 'pcaa_2019'],
});

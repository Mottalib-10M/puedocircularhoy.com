import { definePage } from '../../lib/page-types';
import { P, MX, horas24 } from '../../lib/kit';

const PS = P.mx.pase;
const H = horas24(MX.hnc.horas);
const [fm0, fm1] = MX.hnc.foraneoManana;

export default definePage({
  id: 'pase-turistico',
  group: 'hnc',
  kind: 'guide',
  order: 80,
  slug: 'pase-turistico',
  nav: 'Pase Turístico y autos foráneos',
  card: `Gratis, 14 días o dos de 7 por semestre, modelos ${PS.modeloMin} en adelante, sin placas de la megalópolis.`,
  title: 'Pase Turístico CDMX 2026: autos foráneos y Hoy No Circula',
  description: `Pase Turístico 2026 para autos de otros estados: gratis, 14 días o dos de 7 por semestre, modelos ${PS.modeloMin} y posteriores. Sin él, tu auto foráneo descansa como holograma 2.`,
  h1: 'Pase Turístico y autos de otros estados',
  intro: 'Cómo circula en la Ciudad de México un auto con placas de fuera, con pase y sin pase.',
  resume: `Un auto con placas de otro estado que no trae un holograma reconocido por la Ciudad de México se trata como holograma 2: no circula el día de su engomado ni ningún sábado, y además, de lunes a viernes, no circula de ${fm0} a ${fm1}. El Pase Turístico evita esas restricciones fuera de contingencia. Es gratuito, se pide en paseturistico.cdmx.gob.mx y se puede obtener una vez por semestre con vigencia de 14 días, o dos veces por semestre con 7 días cada una, para autos particulares de hasta ${PS.antiguedadMax} años, es decir modelos ${PS.modeloMin} y posteriores. No se genera para placas de la Ciudad de México, el Estado de México, Hidalgo, Morelos, Puebla, Querétaro ni Tlaxcala, cuyos hologramas ya reconoce la capital; para Guanajuato rige un convenio. En contingencia ambiental, el auto con pase se trata otra vez como holograma 2 y no circula.`,
  mini: 'pase',
  faqs: [
    { q: '¿Cuánto cuesta el Pase Turístico de la CDMX?', a: 'Nada: es gratuito. Se solicita en línea en paseturistico.cdmx.gob.mx con los datos del vehículo. Un auto puede tener un pase de 14 días o dos de 7 días por semestre. Hay que cuidarse de páginas que cobran por tramitarlo: el trámite oficial no tiene costo.' },
    { q: '¿Qué autos no pueden pedir el Pase Turístico?', a: `Los que tienen placas de la Ciudad de México, el Estado de México, Hidalgo, Morelos, Puebla, Querétaro o Tlaxcala, y los de más de ${PS.antiguedadMax} años de antigüedad, anteriores al modelo ${PS.modeloMin}. Los autos de la megalópolis circulan con su holograma, que la Ciudad de México reconoce. Los muy antiguos de otros estados se tratan como holograma 2.` },
    { q: '¿Con Pase Turístico circulo en contingencia?', a: 'No. El Programa de Contingencias de 2019 aplica a los vehículos con Pase Turístico la misma restricción que a los holograma 2: no circulan mientras dura la contingencia, de 5:00 a 22:00. Si vienes en temporada de ozono, entre febrero y junio, revisa los boletines de la CAMe antes de mover el auto.' },
    { q: 'Mi auto es de Jalisco y tiene holograma 0 de allá, ¿vale en la CDMX?', a: 'No como holograma 0. La Ciudad de México reconoce los hologramas de los estados de la Comisión Ambiental de la Megalópolis y de los que tienen convenio, como Guanajuato, pero no las verificaciones de otros estados. Sin pase, tu auto se trata como holograma 2. Con Pase Turístico, circula libre fuera de contingencia durante su vigencia.' },
  ],
  body: (h) => `
<h2>Tres situaciones para un auto de fuera</h2>
${h.table(['Situación', 'Entre semana', 'Sábados', 'Contingencia'], [['Holograma de la megalópolis o de Guanajuato', 'Según su holograma', 'Según su holograma', 'Según su holograma'], ['Otro estado, sin pase', `No circula su día; los demás días, no antes de las ${fm1}`, 'No circula ninguno', 'No circula'], ['Otro estado, con Pase Turístico vigente', 'Circula', 'Circula', 'No circula']], `Programa de verificación del 2.º semestre de 2026, apartados 14.2 IV, 14.3 y 19.1.7; Programa de Contingencias de 2019. Horario general: ${H}.`)}
<p>La mañana es lo que más sorprende a los visitantes: sin pase, un auto de Querétaro no circula de lunes a viernes antes de las ${fm1}, aunque no sea su día de engomado. Un viaje de trabajo con una cita a las nueve en Santa Fe necesita pase o salir después de las ${fm1}.</p>
<h2>Cómo elegir entre 14 días o dos de 7</h2>
<p>El programa permite, por semestre, un pase de 14 días o dos pases de 7. Si vienes una sola vez dos semanas, el de 14 encaja; si haces dos viajes cortos en el semestre, por ejemplo en verano y en diciembre, conviene pedir uno de 7 para cada viaje. No se pueden encadenar más pases en el mismo semestre. Durante los puentes oficiales y el Programa Paisano existe además un Pase Turístico Paisano, pensado para quien entra con un permiso de importación temporal.</p>
<h2>Verificar voluntariamente en la Ciudad de México</h2>
<p>Si vienes con frecuencia, otra vía es la verificación voluntaria: los autos de otros estados, de placas federales y extranjeras pueden verificar en un verificentro de la Ciudad de México y obtener un holograma reconocido, con el mismo costo que los capitalinos. Los autos del Estado de México no pueden hacerlo. Ver ${h.a('verificacion-vehicular', 'verificación vehicular')}.</p>
<h2>Antes de manejar</h2>
<p>Con o sin pase, consulta tu día en ${h.a('hoy-no-circula', 'Hoy No Circula hoy')} eligiendo «placa de otro estado sin holograma» o «con Pase Turístico», y revisa la ${h.a('contingencia-ambiental', 'contingencia ambiental')} la víspera. La multa por circular en horario restringido es la misma que para un auto capitalino: ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}.</p>
`,
  related: ['hoy-no-circula', 'holograma-2', 'contingencia-ambiental', 'hoy-no-circula-edomex', 'verificacion-vehicular'],
  sources: ['verif_2s2026', 'pase_turistico', 'pcaa_2019'],
});

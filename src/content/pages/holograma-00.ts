import { definePage } from '../../lib/page-types';
import { P, MX, horas24 } from '../../lib/kit';

const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);

export default definePage({
  id: 'holograma-00',
  group: 'hnc',
  kind: 'pillar',
  order: 50,
  slug: 'holograma-00',
  nav: 'Holograma 00',
  card: `Circula diario y vale hasta ${HO['00'].vigenciaAnios} años; deja de circular en contingencia el día de su engomado.`,
  title: 'Holograma 00 2026: Hoy No Circula, vigencia y contingencia',
  description: `Holograma 00 en 2026: circula todos los días sin Hoy No Circula, vale hasta ${HO['00'].vigenciaAnios} años y solo descansa con contingencia ambiental. Revisa tu placa y tu día.`,
  h1: 'Holograma 00: cuándo circula y cuándo no',
  intro: 'El mejor holograma del programa: libre de Hoy No Circula, salvo en contingencia.',
  resume: `El holograma 00 exenta al auto de todas las limitaciones del Programa Hoy No Circula: circula de lunes a domingo, a cualquier hora, mientras no haya contingencia ambiental. Lo da el verificentro como incentivo a los vehículos de gasolina, diésel, gas o híbridos suaves que figuran en la lista de la SEDEMA por sus emisiones homologadas, y su vigencia es de hasta ${HO['00'].vigenciaAnios} años; un auto nuevo no paga multa por verificación extemporánea en los dos primeros años tras su primera venta. La única situación en la que un 00 deja de circular es la contingencia ambiental: entre semana descansa el día de su engomado, de ${H}, y en sábado o domingo el engomado que anuncie la Comisión Ambiental de la Megalópolis. La herramienta ya tiene el 00 seleccionado: marca la contingencia para ver tu caso.`,
  tool: 'hnc',
  toolProps: { holo: '00', digit: 7 },
  faqs: [
    { q: '¿Cuánto dura el holograma 00?', a: `Hasta ${HO['00'].vigenciaAnios} años, según el programa de verificación del segundo semestre de 2026; el número de veces que un auto puede obtenerlo depende de su homologación de emisiones (Tier 3, Euro 6, Tier 2 con buen rendimiento o normas nacionales). Al terminar la vigencia hay que verificar en el periodo del engomado para obtener el holograma siguiente.` },
    { q: '¿El holograma 00 circula en Doble Hoy No Circula?', a: 'No siempre. En contingencia, los hologramas 0 y 00 dejan de circular entre semana el día de su engomado, como si fueran holograma 1 o 2 ese día, y en fin de semana según el engomado que fije el comunicado de la CAMe. Solo el holograma exento sigue circulando en contingencia.' },
    { q: '¿Mi auto nuevo trae holograma 00?', a: 'Un auto nuevo matriculado en la Ciudad de México circula libre los primeros 30 días desde su tarjeta de circulación y debe verificar dentro de los 180 días; en la primera verificación puede obtener el 00 si su modelo y su homologación lo permiten. Mientras no verifica, después del día 30, se trata como holograma 2.' },
  ],
  body: (h) => `
<h2>Por qué no necesitas el Hoy No Circula diario, pero sí el aviso de contingencia</h2>
<p>Con 00, la consulta diaria del Hoy No Circula no te afecta; la que importa es la de la contingencia. La CAMe publica sus boletines a las 10:00, 15:00 y 20:00, y la restricción empieza a las 5:00 del día siguiente. Si hay Fase I o Fase II, tu auto descansa el día de su engomado entre semana.</p>
${h.table(['Situación', 'Holograma 00'], [['Día normal', 'Circula'], ['Sábado y domingo normales', 'Circula'], ['Contingencia, entre semana', 'No circula el día de su engomado'], ['Contingencia, fin de semana', 'No circula si el comunicado elige su engomado']], 'Programa Hoy No Circula (2014) y Programa de Contingencias (2019).')}
<p>Para comparar con los otros hologramas: ${h.a('holograma-0', 'holograma 0')}, ${h.a('holograma-1', 'holograma 1')} y ${h.a('holograma-2', 'holograma 2')}. Para saber cuál le corresponde a tu modelo, ${h.a('que-holograma-me-toca', 'qué holograma me toca')}.</p>
`,
  related: ['holograma-0', 'que-holograma-me-toca', 'contingencia-ambiental', 'verificacion-vehicular'],
  sources: ['verif_2s2026', 'hnc_decreto', 'pcaa_2019'],
});

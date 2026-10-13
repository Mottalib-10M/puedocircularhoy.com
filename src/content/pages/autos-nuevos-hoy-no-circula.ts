import { definePage } from '../../lib/page-types';
import { P, MX, horas24, mxn, costoVerifPesos } from '../../lib/kit';

const AN = P.mx.autoNuevo;
const HO = P.mx.hologramas;
const H = horas24(MX.hnc.horas);

export default definePage({
  id: 'autos-nuevos-hoy-no-circula',
  group: 'hnc',
  kind: 'pillar',
  order: 85,
  slug: 'autos-nuevos-hoy-no-circula',
  nav: 'Autos nuevos',
  card: `${AN.diasLibres} días libres, ${AN.plazoVerifDias} días para verificar y el holograma que puede obtener un auto nuevo.`,
  title: 'Auto nuevo y Hoy No Circula 2026: días libres y verificación',
  description: `Auto nuevo en la CDMX 2026: circula libre ${AN.diasLibres} días desde la tarjeta de circulación, tiene ${AN.plazoVerifDias} días para verificar y mientras tanto queda como holograma 2.`,
  h1: 'Auto nuevo: cuándo empieza el Hoy No Circula',
  intro: 'Los primeros días del auto, el plazo de la primera verificación y el holograma que puede obtener.',
  resume: `Un auto nuevo matriculado en la Ciudad de México está exento del Hoy No Circula durante los primeros ${AN.diasLibres} días naturales desde que se expide su tarjeta de circulación, según el apartado 14.2 del programa de verificación del segundo semestre de 2026. Después, y hasta que verifique por primera vez, se trata como holograma 2: no circula el día de su engomado ni ningún sábado, de ${H}. El dueño tiene ${AN.plazoVerifDias} días desde la tarjeta para hacer la primera verificación, que cuesta ${mxn(costoVerifPesos(), 0)} con IVA en 2026. En esa verificación, un auto nuevo obtiene normalmente el holograma 0, o el 00 si su modelo está en la lista de la SEDEMA por sus emisiones homologadas; el 00 vale hasta ${HO['00'].vigenciaAnios} años y un auto con 00 no paga multa extemporánea en los dos primeros años después de su primera venta. Verificar en los primeros ${AN.diasLibres} días evita por completo pasar por el holograma 2.`,
  tool: 'hnc',
  toolProps: { holo: '2', digit: 4 },
  faqs: [
    { q: '¿Cuántos días puede circular un auto nuevo sin verificar?', a: `${AN.diasLibres} días naturales sin ninguna restricción del Hoy No Circula, contados desde la expedición de la tarjeta de circulación en la Ciudad de México. Del día ${AN.diasLibres + 1} al de la primera verificación, el auto se trata como holograma 2. El plazo para verificar por primera vez es de ${AN.plazoVerifDias} días.` },
    { q: '¿Mi auto nuevo sale con holograma 00?', a: 'No necesariamente. El 00 se da a los modelos que figuran en la lista de la SEDEMA por su homologación de emisiones, y el número de veces que pueden obtenerlo depende de ella. Si tu modelo no está en la lista y aprueba la prueba, recibe el holograma 0, que también lo libra del Hoy No Circula fuera de contingencia.' },
    { q: '¿Un auto nuevo con placas de otro estado tiene días libres?', a: 'Los días libres del programa son para los autos nuevos matriculados en la Ciudad de México. Un auto nuevo de otro estado circula en la capital con el holograma que obtenga en su estado si la Ciudad de México lo reconoce; si no lo tiene, se trata como foráneo sin holograma o puede pedir el Pase Turístico.' },
  ],
  body: (h) => `
<h2>Las fechas de un auto nuevo</h2>
${h.table(['Periodo', 'Hoy No Circula'], [[`Días 1 a ${AN.diasLibres} desde la tarjeta de circulación`, 'Exento'], [`Día ${AN.diasLibres + 1} hasta la primera verificación`, 'Como holograma 2: su día y todos los sábados'], ['Después de verificar con 0 o 00', 'Exento fuera de contingencia']], `Programa de verificación del 2.º semestre de 2026, apartado 14.2 VII. Plazo para la primera verificación: ${AN.plazoVerifDias} días.`)}
<p>La forma más simple de no perder ningún día es verificar dentro del primer mes. Pasado ese mes, el auto queda varias semanas con las restricciones más duras del programa, aunque sea un modelo del año. Para el holograma que puede obtener, ver ${h.a('holograma-00', 'holograma 00')} y ${h.a('que-holograma-me-toca', 'qué holograma me toca')}.</p>
`,
  related: ['holograma-00', 'que-holograma-me-toca', 'verificacion-vehicular', 'holograma-2'],
  sources: ['verif_2s2026', 'hnc_decreto'],
});

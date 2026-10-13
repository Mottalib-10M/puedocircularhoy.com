import { definePage } from '../../lib/page-types';
import { P, mxn, multaHncPesos, fecha } from '../../lib/kit';

const [m20, m25, m30] = multaHncPesos();
const V = P.mx.multaHncVeces;
const U = P.mx.uma;
const sed = Math.round(P.mx.verif.multaUma * U.diaria * 100) / 100;

export default definePage({
  id: 'multa-hoy-no-circula',
  group: 'hnc',
  kind: 'guide',
  order: 70,
  slug: 'multa-hoy-no-circula',
  nav: 'Multa por Hoy No Circula',
  card: `De ${V[0]} a ${V[2]} UMA en 2026, la sanción ambiental aparte y lo que dicen los textos sobre el corralón.`,
  title: 'Multa Hoy No Circula 2026: de 20 a 30 UMA y el corralón',
  description: `Multa por Hoy No Circula 2026 en la CDMX: de ${mxn(m20, 0)} a ${mxn(m30, 0)}, ${V[0]} a ${V[2]} UMA según el artículo 47 del Reglamento de Tránsito, más la sanción ambiental.`,
  h1: 'Multa por circular en Hoy No Circula',
  intro: 'Cuánto cuesta en 2026, de dónde sale la cifra y qué pasa con el auto.',
  resume: `Circular en un día u horario restringido por el Hoy No Circula se sanciona en la Ciudad de México con el artículo 47 del Reglamento de Tránsito: una multa de ${V[0]}, ${V[1]} o ${V[2]} veces la Unidad de Medida y Actualización vigente. Con la UMA de 2026, ${mxn(U.diaria)} diarios desde el ${fecha(U.desde)}, eso da ${mxn(m20, 0)}, ${mxn(m25, 0)} o ${mxn(m30, 0)}. El mismo artículo se aplica al auto que emite humo ostensiblemente contaminante, sea cual sea el estado donde está matriculado. Además, el programa de verificación de 2026 prevé una sanción ambiental aparte de la SEDEMA, de ${P.mx.verif.multaUma} UMA, ${mxn(sed, 0)}, por no acreditar la verificación vigente o por circular en día u horario restringido. Sobre el corralón, los textos no coinciden: el decreto de 2014 prevé retirar el auto y llevarlo al depósito, pero el Reglamento de Tránsito vigente no incluye el artículo 47 entre los casos de remisión al depósito.`,
  mini: 'multaHnc',
  faqs: [
    { q: '¿Cuánto es la multa por no respetar el Hoy No Circula en 2026?', a: `Entre ${mxn(m20, 0)} y ${mxn(m30, 0)}: el artículo 47 del Reglamento de Tránsito de la Ciudad de México fija ${V[0]}, ${V[1]} o ${V[2]} veces la UMA, y la UMA vale ${mxn(U.diaria)} desde el ${fecha(U.desde)}. El agente aplica uno de los tres niveles. La SEDEMA puede imponer además su propia sanción por circular en día restringido.` },
    { q: '¿Te llevan al corralón por el Hoy No Circula?', a: 'Los textos se contradicen. El decreto del Programa Hoy No Circula de 2014 prevé retirar el vehículo y remitirlo al depósito hasta pagar la multa, y en contingencia hasta que esta termine. El Reglamento de Tránsito vigente, reformado en 2024, enumera los casos de remisión al depósito y no incluye el artículo 47. En la práctica, conviene no arriesgarse.' },
    { q: '¿La multa del Hoy No Circula aplica a autos de otros estados?', a: 'Sí. El artículo 47 sanciona a los conductores que incumplen los programas ambientales sea cual fuere la entidad federativa en la que fueron matriculados sus vehículos. Un auto foráneo sin holograma reconocido descansa como holograma 2, más las mañanas de lunes a viernes, y paga la misma multa si circula en esos horarios.' },
    { q: '¿Puedo pagar la multa del Hoy No Circula en línea?', a: 'Las multas de tránsito de la Ciudad de México se consultan y pagan con la placa en los servicios de la Secretaría de Administración y Finanzas, que genera la línea de captura. La sanción ambiental de la SEDEMA tiene su propio trámite. Antes de pagar, verifica el monto y el número de infracción en la boleta.' },
  ],
  body: (h) => `
<h2>Las tres cifras de 2026</h2>
${h.table(['Nivel', 'UMA', 'Monto 2026'], [['Mínimo', String(V[0]), mxn(m20, 0)], ['Intermedio', String(V[1]), mxn(m25, 0)], ['Máximo', String(V[2]), mxn(m30, 0)], ['Sanción ambiental SEDEMA (aparte)', String(P.mx.verif.multaUma), mxn(sed, 0)]], `UMA 2026: ${mxn(U.diaria)} diarios (INEGI, comunicado del 8 de enero de 2026), en vigor desde el ${fecha(U.desde)}.`, ['l', 'r', 'r'])}
<p>La UMA sustituyó al salario mínimo como referencia de las multas en 2016 y se actualiza cada año con la inflación; en 2026 subió 3.69 por ciento. Las multas en pesos cambian, por eso, cada febrero, aunque el reglamento no se toque. La herramienta toma la UMA del archivo de parámetros, y la página se recalcula cuando el INEGI publica la del año siguiente.</p>
<h2>El artículo 47, palabra por palabra</h2>
<p>El Reglamento de Tránsito de la Ciudad de México obliga a los conductores de vehículos motorizados a acatar los programas ambientales y a no circular en vehículos que tengan restricciones, ni en las ecozonas o zonas de movilidad sustentable, los días y horas correspondientes. Quien lo incumpla, o emita humo ostensiblemente contaminante, se sanciona con la multa de ${V[0]}, ${V[1]} o ${V[2]} UMA. El mismo artículo exceptúa a los vehículos de emergencia, a los de tecnologías sustentables, al transporte escolar, a los funerarios, a los de personas con discapacidad autorizados y a quien atiende una urgencia médica manifiesta.</p>
<h2>Dos sanciones distintas</h2>
<p>La multa de tránsito la impone un agente en la calle. La sanción ambiental de la SEDEMA viene del Programa de Vehículos Contaminantes, que forma parte del programa de verificación: ${P.mx.verif.multaUma} UMA por no acreditar la verificación vigente o por circular en día u horario restringido, y, si hay reincidencia sin regularizar, el máximo que permite el reglamento ambiental. Pueden acumularse.</p>
<h2>El corralón: lo que dicen los textos</h2>
<p>El decreto del Programa Hoy No Circula de 2014, apartado XII, prevé que los vehículos sean retirados de la circulación y remitidos al depósito, donde deben quedarse hasta pagar la multa, y en contingencia hasta que esta concluya. El Reglamento de Tránsito de 2015, con su reforma de 2024, dice en su artículo 67 que solo procede la remisión al depósito en los casos que enumera, y el incumplimiento del artículo 47 no está entre ellos, salvo que el auto tenga multas sin pagar de más de 30 días. No pudimos confirmar cuál de las dos reglas aplican hoy los agentes. Lo prudente es suponer que el auto puede terminar en el depósito.</p>
<h2>Cómo evitarla</h2>
<p>Consulta tu día con ${h.a('hoy-no-circula', 'Hoy No Circula hoy')} o la víspera con ${h.a('hoy-no-circula-manana', 'Hoy No Circula mañana')}, y revisa la contingencia antes de salir. Si tu auto puede obtener un holograma mejor, la mejor forma de evitar la multa es no tener restricción: ${h.a('que-holograma-me-toca', 'qué holograma me toca')}. Si la multa es por no haber verificado, ver ${h.a('multa-verificacion-extemporanea', 'multa por verificar tarde')}.</p>
`,
  related: ['hoy-no-circula', 'multa-verificacion-extemporanea', 'doble-hoy-no-circula', 'hoy-no-circula-manana', 'que-holograma-me-toca'],
  sources: ['reglamento_transito', 'uma_2026', 'verif_2s2026', 'hnc_decreto'],
});

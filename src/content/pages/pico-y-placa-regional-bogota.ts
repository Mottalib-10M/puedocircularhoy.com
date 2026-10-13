import { definePage } from '../../lib/page-types';
import { P, FESTIVOS, fechaDia, listOf } from '../../lib/kit';

const R = (P as unknown as { co: { regional: { pares: [string, string]; impares: [string, string]; corredores: string[] } } }).co.regional;
const prox = FESTIVOS.filter((f) => f >= '2026-10-13');

export default definePage({
  id: 'pico-y-placa-regional-bogota',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 60,
  slug: 'pico-y-placa-regional-bogota',
  nav: 'Pico y placa regional',
  card: 'La entrada a Bogotá el último día de los puentes: franjas por placa par e impar.',
  title: 'Pico y placa regional Bogotá 2026: horarios del festivo',
  description: `Pico y placa regional en Bogotá 2026: el lunes festivo entran las placas pares de ${R.pares[0]} a ${R.pares[1]} y las impares de ${R.impares[0]} a ${R.impares[1]} por nueve corredores.`,
  h1: 'Pico y placa regional de ingreso a Bogotá',
  intro: 'La regla del regreso de los puentes: a qué hora puedes entrar a Bogotá según tu placa.',
  resume: `El pico y placa regional ordena la entrada de vehículos a Bogotá el último día de los puentes festivos, o cuando la Administración Distrital lo establece. Entre las ${R.pares[0]} y las ${R.pares[1]} solo pueden ingresar los vehículos con placa terminada en número par, ${listOf(['0', '2', '4', '6', '8'])}, y entre las ${R.impares[0]} y las ${R.impares[1]}, los de placa impar. Fuera de esa ventana, por la mañana o por la noche, entran todos. La medida se aplica en los nueve corredores de ingreso a la ciudad: ${listOf(R.corredores)}. El 12 de octubre de 2026, lunes festivo, la Alcaldía la aplicó para todos los vehículos que circulaban por esos corredores. No se confunde con el pico y placa urbano de los días hábiles, que ese día no rige. Los festivos que quedan en 2026 son ${prox.map((f) => fechaDia(f)).join(', ')}.`,
  mini: 'regional',
  faqs: [
    { q: '¿A qué hora puedo entrar a Bogotá con placa impar el festivo?', a: `Antes de las ${R.pares[0]} o desde las ${R.impares[0]} y hasta las ${R.impares[1]}, cuando rige la franja de las impares. Entre las ${R.pares[0]} y las ${R.pares[1]} solo entran las pares por los corredores de ingreso. Después de las ${R.impares[1]} la entrada queda libre para todas las placas.` },
    { q: '¿El pico y placa regional se aplica a las motos?', a: 'Las páginas de la Alcaldía de octubre de 2026 hablan de carros particulares en unos apartes y, en el comunicado del 12 de octubre, de todos los vehículos que circulan por los corredores establecidos. Ante esa diferencia, si viajas en moto el día del regreso, confirma con la Secretaría de Movilidad o con los agentes en el corredor.' },
    { q: '¿Qué pasa si llego al peaje en la franja que no me toca?', a: 'Los controles están en los corredores de ingreso: si entras a Bogotá en la franja de la otra paridad, el agente puede imponer la infracción C.14 y ordenar la inmovilización. Lo práctico es parar antes del corredor y esperar el cambio de franja, o calcular la salida del destino para llegar en tu ventana.' },
  ],
  body: (h) => `
<h2>Por qué existe</h2>
<p>El último día de un puente, cientos de miles de carros regresan a Bogotá por las mismas pocas vías en las mismas horas de la tarde. El pico y placa regional reparte esa llegada en dos turnos: primero las placas pares, luego las impares. La idea es simple y se nota en el peaje: la mitad de los carros espera unas horas en el destino o en el camino en vez de sumarse al trancón.</p>
${h.table(['Franja', 'Pueden entrar'], [[`Antes de las ${R.pares[0]}`, 'Todas las placas'], [`${R.pares[0]} a ${R.pares[1]}`, 'Placas pares (0, 2, 4, 6, 8)'], [`${R.impares[0]} a ${R.impares[1]}`, 'Placas impares (1, 3, 5, 7, 9)'], [`Después de las ${R.impares[1]}`, 'Todas las placas']], 'Alcaldía de Bogotá, pico y placa regional del 12 de octubre de 2026.')}
<h2>Los nueve corredores</h2>
<p>La restricción se controla en las vías de entrada a la ciudad, no dentro de ella: ${listOf(R.corredores)}. Quien ya está dentro de Bogotá circula libremente ese día, porque el pico y placa urbano no aplica en festivo. Quien entra por una vía rural sin control tampoco está sujeto a la medida, pero esas vías suelen congestionarse precisamente por eso.</p>
<h2>Cómo planear el regreso</h2>
<p>Con placa par, conviene llegar a Bogotá entre las ${R.pares[0]} y las ${R.pares[1]}, o salir del destino temprano y entrar antes de las ${R.pares[0]}. Con placa impar, la ventana es de ${R.impares[0]} a ${R.impares[1]}, o antes de las ${R.pares[0]}. El simulador de esta página te dice si a la hora prevista puedes entrar. Para el resto del año, ver ${h.a('pico-y-placa-bogota', 'pico y placa en Bogotá')}; para los festivos que activan la medida, ${h.a('pico-y-placa-festivos', 'pico y placa en festivos')}.</p>
<h2>Otras ciudades con una medida parecida</h2>
<p>Soacha ha aplicado en años anteriores un pico y placa festivo en la Autopista Sur con las mismas franjas, para el retorno hacia Bogotá. No encontramos una página oficial de 2026 que lo confirme, así que la herramienta no lo calcula. Si viajas por la Autopista Sur, el control que te afecta seguro es el de ingreso a Bogotá.</p>
<p>El Pico y Placa Solidario está pensado para la restricción urbana de los días hábiles; ver ${h.a('pico-y-placa-solidario', 'Pico y Placa Solidario')}. Para la sanción, ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa-bogota', 'pico-y-placa-festivos', 'pico-y-placa-solidario', 'multa-pico-y-placa'],
  sources: ['bog_regional_2026', 'bog_octubre_2026', 'ley_51_1983'],
});

import { definePage } from '../../lib/page-types';
import { ciudad, fecha } from '../../lib/kit';

const C = ciudad('manizales');

export default definePage({
  id: 'pico-y-placa-manizales',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 95,
  slug: 'pico-y-placa-manizales',
  nav: 'Manizales',
  card: 'Sin pico y placa para particulares desde el 16 de septiembre de 2026, tras la medida temporal.',
  title: 'Pico y placa Manizales 2026: levantado desde septiembre',
  description: 'Pico y placa en Manizales 2026: la medida temporal que siguió al sismo de agosto se levantó el 16 de septiembre; hoy los carros particulares circulan libres.',
  h1: 'Pico y placa en Manizales',
  intro: 'Después de un mes de restricción por el sismo, Manizales volvió a no tener pico y placa para particulares.',
  resume: `Manizales no tiene pico y placa para carros particulares en tiempos normales, y así está otra vez desde el miércoles ${fecha(C.vigencia.desde)}. Tras el sismo del 10 de agosto de 2026, la Alcaldía impuso una restricción temporal con el Decreto Extraordinario 012 del 13 de agosto: desde el 14 de agosto, de 5:00 a. m. a 10:00 p. m., incluidos fines de semana y festivos, con las motos exentas, para aliviar las vías afectadas. El Decreto 0292 de 2026 la prorrogó hasta el 15 de septiembre, y al día siguiente la Alcaldía la levantó. La herramienta responde por eso que no hay pico y placa en Manizales. Si las obras de reparación obligan a una medida nueva, la cargaremos con su decreto y sus fechas. Mientras tanto, los cierres puntuales de vías por obras no dependen del número de la placa y los anuncia la Secretaría de Movilidad.`,
  tool: 'pyp',
  toolProps: { city: 'manizales', lockCity: true },
  faqs: [
    { q: '¿Por qué hubo pico y placa en Manizales en agosto de 2026?', a: 'Por el sismo del 10 de agosto de 2026, que dañó vías de la ciudad. La Alcaldía dictó el Decreto Extraordinario 012 del 13 de agosto para reducir el tráfico mientras se revisaban y reparaban, con restricción de 5:00 a. m. a 10:00 p. m. todos los días y las motos exentas. Fue una medida de emergencia, no un pico y placa ordinario.' },
    { q: '¿Desde cuándo no hay pico y placa en Manizales?', a: 'Desde el miércoles 16 de septiembre de 2026. El Decreto 0292 de 2026 había prorrogado la medida temporal hasta el 15 de septiembre, y la Alcaldía anunció que a partir del día siguiente se levantaba para los vehículos particulares. No conocemos ningún decreto posterior que la restablezca.' },
    { q: '¿Los taxis de Manizales tienen pico y placa?', a: 'No pudimos verificarlo en un texto oficial. Esta página y la herramienta tratan solo los vehículos particulares, que no tienen restricción desde el 16 de septiembre de 2026. Para taxis y transporte público, consulta directamente a la Secretaría de Movilidad de Manizales.' },
  ],
  body: (h) => `
<h2>Un mes de restricción y vuelta a la normalidad</h2>
<p>Manizales es de las capitales que nunca tuvo un pico y placa permanente para particulares, por su tamaño y por una topografía que concentra el tráfico en pocas vías. El de agosto y septiembre de 2026 fue una respuesta al sismo: con varias vías cerradas o en revisión, la Alcaldía redujo el número de carros en circulación todos los días de la semana, de la mañana a la noche.</p>
<p>La medida temporal tenía rasgos que no se ven en los pico y placa ordinarios: aplicaba sábados, domingos y festivos y exceptuaba a las motos, que ocupan menos espacio en vías estrechas. Se levantó el 16 de septiembre.</p>
<h2>Si vuelve una medida</h2>
<p>Una nueva restricción por obras o por emergencia tendría su propio decreto y sus fechas. En ese caso la herramienta mostrará la regla nueva con su número y su vigencia, como hace con las demás ciudades. Para el resto del Eje Cafetero, ver ${h.a('pico-y-placa-pereira', 'pico y placa en Pereira')}, que tiene una tabla fija desde 2024, y para la lista completa, ${h.a('pico-y-placa', 'pico y placa hoy')}.</p>
`,
  related: ['pico-y-placa-pereira', 'pico-y-placa', 'pico-y-placa-medellin'],
  sources: ['mzl_levanta_2026', 'ley_769_2002'],
});

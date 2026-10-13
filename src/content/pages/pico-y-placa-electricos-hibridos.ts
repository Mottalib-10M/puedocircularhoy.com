import { definePage } from '../../lib/page-types';
import { CIUDADES } from '../../lib/kit';

export default definePage({
  id: 'pico-y-placa-electricos-hibridos',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 90,
  slug: 'pico-y-placa-electricos-hibridos',
  nav: 'Eléctricos e híbridos',
  card: 'La exención nacional de los eléctricos y las reglas locales para híbridos y gas.',
  title: 'Pico y placa eléctricos e híbridos 2026: quién está exento',
  description: 'Pico y placa para eléctricos e híbridos 2026: los eléctricos están exentos por ley en el país; los híbridos dependen de la ciudad y del RUNT. Revisa el tuyo.',
  h1: 'Pico y placa para carros eléctricos e híbridos',
  intro: 'Eléctrico: exento en todo el país. Híbrido: depende de la ciudad y de lo que diga el RUNT.',
  resume: 'Los vehículos eléctricos y de cero emisiones están exentos del pico y placa en toda Colombia por el artículo 6 de la Ley 1964 de 2019, que los libra de cualquier restricción a la circulación que disponga la autoridad local, salvo las que se dicten por razones de seguridad. Los híbridos no tienen esa exención nacional: cada ciudad decide. Medellín y el Valle de Aburrá los exceptúan de forma automática cuando el RUNT registra un combustible como gasolina-eléctrico o diésel-eléctrico, junto con los vehículos a gas, hidrógeno o etanol. Cali exceptúa los híbridos y eléctricos parametrizados así en el registro. Bogotá exige que el híbrido sea de fábrica y que el propietario lo inscriba ante la Secretaría de Movilidad, que tiene veinte días hábiles para responder. Pereira y Santa Marta los exceptúan según la licencia de tránsito. En todos los casos, lo que cuenta es el combustible registrado, no lo que diga el concesionario.',
  mini: 'electricos',
  faqs: [
    { q: '¿Tengo que tramitar algo para que mi eléctrico no tenga pico y placa?', a: 'En principio no, porque la exención viene de la ley y el RUNT ya registra el combustible eléctrico. En Bogotá, la Alcaldía pide inscribir los eléctricos e híbridos en el registro de la Secretaría de Movilidad con SOAT y revisión técnico-mecánica vigentes; hazlo para evitar un comparendo por un control que no consulte el RUNT.' },
    { q: '¿Un híbrido ligero o mild hybrid está exento del pico y placa?', a: 'Solo si el RUNT lo registra con un combustible híbrido eléctrico. Muchos mild hybrid se matriculan como gasolina y, en ese caso, Medellín y Cali los tratan como cualquier carro de gasolina. Revisa el campo de combustible de tu licencia de tránsito: si dice gasolina, tienes pico y placa aunque el carro tenga una batería de ayuda.' },
    { q: '¿Los carros a gas tienen pico y placa en Medellín?', a: 'No. El Decreto 1490 de 2026 exceptúa de forma automática, según el combustible del RUNT, los vehículos con gas natural vehicular o gas-gasolina, además de los eléctricos, de hidrógeno, de etanol y los híbridos eléctricos. Pasto también exceptúa en su decreto a los vehículos a gas natural y gas propano.' },
  ],
  body: (h) => `
<h2>La ley nacional: solo los eléctricos</h2>
<p>La Ley 1964 de 2019 se escribió para promover la movilidad eléctrica, y su artículo 6 es tajante: los vehículos eléctricos y de cero emisiones quedan exentos de las medidas de restricción a la circulación, en cualquiera de sus modalidades, que disponga la autoridad de tránsito local, como el pico y placa, el día sin carro o las restricciones ambientales. La única salvedad son las medidas por razones de seguridad. Como es una ley, ninguna alcaldía puede imponer pico y placa a un eléctrico.</p>
<p>Los híbridos quedaron fuera de esa ley. Por eso su situación cambia de una ciudad a otra, y a veces dentro de una misma ciudad según cómo esté registrado el vehículo.</p>
${h.table(['Ciudad', 'Híbridos', 'Cómo se aplica'], [[h.a('pico-y-placa-bogota', 'Bogotá'), 'Exentos si son de fábrica', 'Inscripción en la Secretaría de Movilidad'], [h.a('pico-y-placa-medellin', 'Medellín y Valle de Aburrá'), 'Exentos', 'Automático según el combustible del RUNT'], [h.a('pico-y-placa-cali', 'Cali'), 'Exentos', 'Según el combustible registrado'], [h.a('pico-y-placa-pereira', 'Pereira'), 'Exentos', 'Según la licencia de tránsito'], [h.a('pico-y-placa-santa-marta', 'Santa Marta'), 'Exentos (gasoeléctricos)', 'Según el decreto 213 de 2026']], 'Decretos y páginas oficiales de cada ciudad, 2026.')}
<h2>El campo que lo decide todo: el combustible</h2>
<p>Las ciudades que exceptúan de forma automática no miran el modelo del carro ni la publicidad del fabricante: leen el campo de combustible en el Registro Único Nacional de Tránsito. En Medellín, el decreto enumera los valores que dan la exención, entre ellos eléctrico, gasolina-eléctrico y diésel-eléctrico. Un híbrido que el concesionario matriculó como gasolina no tiene exención, y corregir el registro es un trámite ante el organismo de tránsito con la ficha técnica del fabricante.</p>
<h2>Bogotá: inscripción y plazo</h2>
<p>Bogotá añade un paso. El propietario de un híbrido de fábrica debe preinscribirlo ante la Secretaría de Movilidad, con el vehículo en el RUNT y el SOAT y la revisión técnico-mecánica vigentes; la Secretaría tiene veinte días hábiles para aprobar. Mientras tanto, el carro tiene pico y placa como cualquier otro. La alternativa para los demás carros es pagar el ${h.a('pico-y-placa-solidario', 'Pico y Placa Solidario')}.</p>
<h2>Cómo comprobarlo antes de salir</h2>
<p>Busca en tu licencia de tránsito el campo de combustible y compáralo con la regla de tu ciudad en la tabla de arriba. Si dice eléctrico, estás exento en cualquier ciudad. Si dice gasolina-eléctrico o diésel-eléctrico, estás exento en Medellín, el Valle de Aburrá y Cali sin trámite, y en Bogotá después de la inscripción. Si dice gasolina, la herramienta te trata como carro de gasolina, aunque el fabricante lo venda como híbrido. En caso de comparendo, la licencia y el RUNT son la prueba que cuenta.</p>
<h2>Fuera de las ciudades cubiertas</h2>
<p>La herramienta aplica hoy las reglas de ${CIUDADES.length} ciudades. En una ciudad distinta, el eléctrico sigue exento por la ley nacional, y para el híbrido hay que leer el decreto local. Para las motos eléctricas la regla es la misma que para los carros: ver ${h.a('pico-y-placa-motos', 'pico y placa para motos')}.</p>
`,
  related: ['pico-y-placa-solidario', 'pico-y-placa-medellin', 'pico-y-placa-bogota', 'pico-y-placa-motos', 'multa-pico-y-placa'],
  sources: ['ley_1964_2019', 'med_decreto_1490_2026', 'cali_borrador_2s2026', 'bog_excepciones', 'per_decreto_540_2024'],
});

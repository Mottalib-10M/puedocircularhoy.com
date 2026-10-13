import { definePage } from '../../lib/page-types';
import { CIUDADES, ciudad, horario, digits, pypSemana, P, cop } from '../../lib/kit';

const conMotos = CIUDADES.filter((c) => c.motos);
const sinMotos = CIUDADES.filter((c) => !c.motos && c.carro.esquema !== 'ninguno' && !/propia/.test(c.motosNota));
const med = pypSemana('medellin', '2026-10-13', 'moto');
const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-motos',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 40,
  slug: 'pico-y-placa-motos',
  nav: 'Pico y placa para motos',
  card: 'Qué ciudades restringen las motos, por qué número de la placa y en qué horario.',
  title: 'Pico y placa motos 2026: primer o último número por ciudad',
  description: 'Pico y placa para motos 2026: Medellín, el Valle de Aburrá y Pereira restringen por el primer número, Cartagena por el último y Cali o Bogotá no las restringen.',
  h1: 'Pico y placa para motos',
  intro: 'La moto es el vehículo con más diferencias de una ciudad a otra.',
  resume: `De las ciudades que cubre la herramienta, ${conMotos.length} tienen pico y placa para motos en 2026: ${conMotos.map((c) => c.nombre).join(', ')}. En Medellín, en los municipios del Valle de Aburrá como Itagüí y en Pereira la moto se restringe por el primer número de su placa, con la misma tabla y el mismo horario que los carros; en Medellín eso es de ${horario(ciudad('medellin').motos!.horas)}. En Cartagena cuenta el último número, como en los carros, pero el horario de las motos es mucho más largo, de ${horario(ciudad('cartagena').motos!.horas)}. En cambio, ${sinMotos.map((c) => c.nombre).join(', ')} no aplican pico y placa a las motos particulares, y Cali las exceptúa por escrito en su decreto. Las motos eléctricas están exentas en todo el país por la Ley 1964 de 2019. La multa, cuando aplica, es la misma C.14 de los carros, ${cop(C14)} en 2026 con inmovilización, y la moto va a los patios.`,
  mini: 'motosCo',
  faqs: [
    { q: '¿Cómo sé cuál es el primer número de la placa de mi moto?', a: 'Las placas de moto en Colombia tienen tres letras, dos números y una letra, por ejemplo ABC12D. El primer número es el que va justo después de las tres letras: en ABC12D es el 1. En Medellín, el Valle de Aburrá y Pereira ese es el número que decide el día de pico y placa, no el último dígito.' },
    { q: '¿Mi moto de Bogotá tiene restricción por placa?', a: 'No. La medida de pico y placa de particulares que publica la Alcaldía de Bogotá se refiere a los automóviles, y en las páginas oficiales de 2026 no aparece restricción por placa para motos. Bogotá sí aplica otras reglas a las motos, como restricciones de parrillero en zonas y horarios concretos cuando la Secretaría de Movilidad las decreta.' },
    { q: '¿Las motos eléctricas pagan pico y placa?', a: 'No. El artículo 6 de la Ley 1964 de 2019 exime a todos los vehículos eléctricos y de cero emisiones del pico y placa y de otras restricciones de circulación, salvo las que se dicten por seguridad. El decreto de Medellín de 2026 lo repite para las motos eléctricas, con exención automática según el RUNT.' },
    { q: '¿Qué pasa si me paran en moto en mi día de pico y placa?', a: `El agente impone la infracción C.14 del Código Nacional de Tránsito, ${cop(C14)} en 2026, y ordena inmovilizar la moto, que va a los patios hasta que se pague o se resuelva el comparendo, con grúa y parqueadero a tu cargo. En Medellín hubo período pedagógico al comienzo de la rotación, del 3 al 6 de agosto de 2026, pero ya terminó.` },
  ],
  body: (h) => `
<h2>Tres maneras de tratar a las motos</h2>
<p>Las alcaldías colombianas han escogido caminos distintos. La primera opción es tratar a la moto como al carro, pero leyendo otro número: es la de Medellín, el Valle de Aburrá y Pereira, que usan el primer número de la placa de la moto. La razón es práctica: las placas de moto terminan en letra, así que el último carácter no sirve para repartir los días. La segunda opción es la de Cartagena: misma tabla que los carros por el último número, pero con un horario de casi todo el día, porque la medida también busca contener el mototaxismo. La tercera es no restringirlas por placa, como Bogotá, Cali, Santa Marta o Villavicencio. Bucaramanga tiene una medida propia para motos cuya tabla no aparece en las páginas oficiales que leímos.</p>
${h.table(['Ciudad', 'Pico y placa de motos', 'Número que cuenta', 'Horario'], CIUDADES.filter((c) => c.carro.esquema !== 'ninguno').map((c) => [h.a(`pico-y-placa-${c.slug}`, c.nombre), c.motos ? 'Sí' : /propia/.test(c.motosNota) ? 'Medida propia, tabla no publicada' : 'No', c.motos ? (c.motos.digito === 'primero' ? 'Primero' : 'Último') : '–', c.motos ? horario(c.motos.horas) : '–']), 'Motos particulares, según el decreto vigente de cada ciudad cargado en la herramienta.')}
<h2>Medellín y el Valle de Aburrá, el caso más exigente</h2>
<p>El Decreto 1490 de 2026 aplica a motocicletas, mototriciclos, tricimotos, ciclomotores y cuatriciclos, de dos o de cuatro tiempos, la misma tabla que a los carros: ${med.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}. Los diez municipios del Valle de Aburrá comparten la tabla, de modo que una moto que empieza en 3 descansa el jueves en Medellín, en Bello y en Envigado. Quien tiene carro y moto puede quedarse sin vehículo dos días por semana si sus números no coinciden; la herramienta permite comparar los dos cambiando el tipo de vehículo.</p>
<p>Las exenciones también son automáticas para las motos eléctricas registradas como tales en el RUNT. Las vías exentas del decreto, como el sistema vial del río, valen igual para motos y carros.</p>
<h2>Pereira: la tabla que no cambia</h2>
<p>El Decreto 0540 de 2024 de Pereira restringe a motos, motocarros, mototriciclos y cuatrimotos por el primer número, con la tabla fija de los carros y el mismo horario. Como la tabla no rota, el día de la moto se aprende una vez. Algunas notas de prensa de 2026 dicen que las motos quedaron exentas en Pereira; ningún texto oficial que hayamos leído lo confirma, así que la herramienta mantiene la regla del decreto.</p>
<h2>Cartagena: motos casi todo el día</h2>
<p>En Cartagena la moto y el carro descansan el mismo día, por el último número, pero la moto lo hace de ${horario(ciudad('cartagena').motos!.horas)}, mientras que el carro solo en dos franjas cortas. La rotación de Cartagena cambia por periodos; la herramienta aplica solo la última tabla que leímos en un texto del DATT y avisa cuando vence.</p>
<h2>Barranquilla y las zonas vedadas</h2>
<p>Barranquilla no tiene pico y placa de motos, pero sí una medida de otro tipo: el Decreto 0703 de 2025 prohíbe a las motos circular por un perímetro del centro hasta el 31 de octubre de 2026, con excepciones por permiso. No depende del número de la placa, por eso la herramienta no la trata como pico y placa y la explica en ${h.a('pico-y-placa-barranquilla', 'la página de Barranquilla')}.</p>
<h2>Si viajas en moto entre ciudades</h2>
<p>Lo que vale en tu ciudad no te sigue. Una moto de Bogotá, que allí no tiene pico y placa, sí lo tiene al entrar a Medellín según su primer número; una moto de Medellín que va a Cali queda libre. Antes de un viaje, consulta la ciudad de destino en ${h.a('pico-y-placa', 'pico y placa hoy')} con el vehículo en «moto».</p>
`,
  related: ['pico-y-placa-medellin', 'pico-y-placa-pereira', 'pico-y-placa-cartagena', 'pico-y-placa-electricos-hibridos', 'multa-pico-y-placa'],
  sources: ['med_decreto_1490_2026', 'per_decreto_540_2024', 'ctg_rotacion_2026', 'cali_borrador_2s2026', 'ley_1964_2019'],
});

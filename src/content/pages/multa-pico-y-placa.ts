import { definePage } from '../../lib/page-types';
import { P, cop, num } from '../../lib/kit';

const C = (P as unknown as { co: { multaC14: number; uvb2026: number; smmlv2026: number; smldvVeces: number } }).co;

export default definePage({
  id: 'multa-pico-y-placa',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 70,
  slug: 'multa-pico-y-placa',
  nav: 'Multa por pico y placa',
  card: 'Infracción C.14 en 2026: valor en UVB, inmovilización, patios y descuentos por curso.',
  title: 'Multa pico y placa 2026: valor de la C.14 e inmovilización',
  description: `Multa por pico y placa 2026 en Colombia: la infracción C.14 cuesta ${cop(C.multaC14)} en la tabla oficial, convertida a UVB, más la inmovilización del vehículo y los patios.`,
  h1: 'Multa por pico y placa en 2026',
  intro: 'Cuánto cuesta circular en tu día de restricción y por qué el valor ya no sale del salario mínimo.',
  resume: `Circular en pico y placa es la infracción C.14 del artículo 131 de la Ley 769 de 2002, el Código Nacional de Tránsito: «transitar por sitios restringidos o en horas prohibidas por la autoridad competente», con inmovilización del vehículo. El texto la fija en ${num(C.smldvVeces, 'co')} salarios mínimos diarios, pero desde que la Ley 2294 de 2023 creó la Unidad de Valor Básico, las multas que se calculaban con el salario mínimo se cobran convertidas a UVB, y el Ministerio de Transporte lo recordó para 2026 en su concepto del 20 de febrero. Con la UVB de 2026, de ${cop(C.uvb2026)}, la tabla oficial de multas de la Alcaldía de Barranquilla fija la C.14 en ${cop(C.multaC14)}. A eso se suman la grúa y los días de patios, que cobra cada ciudad. Por eso un cálculo con el salario mínimo de 2026, ${cop(C.smmlv2026)}, da una cifra más alta que la que se cobra: no es la base vigente.`,
  mini: 'multaPyp',
  faqs: [
    { q: '¿Cuánto es la multa por pico y placa en 2026?', a: `La infracción C.14 vale ${cop(C.multaC14)} en 2026 según la tabla oficial de multas de tránsito publicada por la Alcaldía de Barranquilla, y la misma infracción se aplica por pico y placa en todo el país. Se suma la inmovilización del vehículo, con grúa y parqueadero a cargo del propietario, que tienen tarifas distintas en cada ciudad.` },
    { q: '¿Por qué la multa de pico y placa no da quince salarios mínimos diarios?', a: 'Porque desde 2024 esas multas se calculan en UVB. El artículo 313 de la Ley 2294 de 2023 ordenó convertir a la Unidad de Valor Básico todos los cobros y multas que se fijaban en salarios mínimos, y el Ministerio de Transporte confirmó en 2026 que eso incluye las multas del artículo 131. Los decretos municipales siguen escribiendo quince salarios diarios por costumbre.' },
    { q: '¿Puedo pagar la multa de pico y placa con descuento?', a: 'El Código Nacional de Tránsito prevé descuentos si pagas pronto y haces el curso de normas de tránsito en un centro autorizado, dentro de los plazos que corren desde el comparendo. El porcentaje y los plazos dependen de la fecha de la notificación; consúltalos con el organismo de tránsito que impuso el comparendo antes de pagar.' },
    { q: '¿Me pueden poner la multa de pico y placa con una cámara?', a: 'Sí, en las ciudades que tienen cámaras de fotodetección autorizadas para esa infracción: el comparendo llega a la dirección registrada en el RUNT. En ese caso no hay inmovilización en el momento, porque nadie detiene el vehículo, pero la multa es la misma. Revisa que tus datos en el RUNT estén al día para enterarte a tiempo.' },
  ],
  body: (h) => `
<h2>La infracción C.14</h2>
<p>El artículo 131 del Código Nacional de Tránsito agrupa las infracciones por letras, de la A a la I, según su gravedad, y cada letra tenía un valor en salarios mínimos diarios. El pico y placa cae en la letra C, la de las infracciones de valor medio, con un agravante que la distingue de casi todas las demás: la inmovilización del vehículo. Por eso la multa es solo una parte del costo; la grúa y los patios pueden sumar tanto o más, según los días que tardes en retirarlo.</p>
${h.table(['Concepto', 'Valor 2026'], [['Infracción C.14 (tabla oficial)', cop(C.multaC14)], ['Unidad de Valor Básico (UVB)', cop(C.uvb2026)], ['La C.14 en UVB', num(C.multaC14 / C.uvb2026, 'co', 1)], ['Salario mínimo mensual (solo referencia)', cop(C.smmlv2026)]], 'Tabla de multas 2026 de la Alcaldía de Barranquilla; concepto del Ministerio de Transporte del 20 de febrero de 2026; Decreto 1469 de 2025.', ['l', 'r'])}
<h2>De salarios mínimos a UVB</h2>
<p>Hasta 2023, las multas de tránsito subían cada año con el salario mínimo. La Ley 2294 de 2023, del Plan Nacional de Desarrollo, separó esa relación: los cobros y sanciones que se fijaban en salarios se convierten en UVB, una unidad que se actualiza con otra regla. El Ministerio de Transporte lo explicó en un concepto de febrero de 2026, citando su circular de enero de 2026 y la resolución del Ministerio de Hacienda que fija la UVB de 2026.</p>
<p>La consecuencia práctica es que el valor que circula en muchas notas de prensa, calculado como quince veces el salario diario, es más alto que el que se cobra. Y que dos cifras parecidas pueden aparecer en dos ciudades por redondeos distintos al convertir: la prensa de Medellín ha citado una cifra unos pocos pesos distinta de la de Barranquilla. La que publicamos es la que leímos en una tabla oficial.</p>
<h2>La inmovilización</h2>
<p>Con la C.14 el agente ordena inmovilizar el vehículo y llevarlo a los patios autorizados. Para retirarlo hay que pagar o resolver el comparendo y pagar la grúa y los días de parqueadero, con tarifas que fija cada ciudad. Si el conductor no es el propietario, el trámite de salida lo hace el propietario o quien tenga su autorización.</p>
<h2>Cuándo no hay multa</h2>
<p>No hay infracción si el vehículo está exceptuado: eléctrico, con permiso Solidario en Bogotá, con la tasa por congestión en Cali, de una persona con discapacidad que va a bordo, o en una vía exenta del decreto. Tampoco en sábados, domingos y festivos en las ciudades que no restringen esos días. Para saber si tu caso entra, ver ${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')} y ${h.a('pico-y-placa-solidario', 'Pico y Placa Solidario')}.</p>
<p>La mejor forma de evitarla es saber la víspera si te toca: ${h.a('pico-y-placa-manana', 'pico y placa mañana')}.</p>
`,
  related: ['pico-y-placa', 'pico-y-placa-manana', 'pico-y-placa-solidario', 'pico-y-placa-electricos-hibridos', 'pico-y-placa-bogota'],
  sources: ['ley_769_2002', 'mt_concepto_uvb_2026', 'baq_multas_2026', 'smmlv_2026'],
});

import { definePage } from '../../lib/page-types';
import { P, ciudad, horario, digits, cop, pypSemana, fecha } from '../../lib/kit';

const M = ciudad('medellin');
const sem = pypSemana('medellin', '2026-10-13');
const tabla = sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ');
const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-medellin',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 20,
  slug: 'pico-y-placa-medellin',
  nav: 'Medellín',
  card: 'Decreto 1490 de 2026: dos números por día, carros por el último y motos por el primero.',
  title: 'Pico y placa Medellín hoy 2026: carros, motos y rotación',
  description: `Pico y placa en Medellín 2026 (Decreto 1490): ${tabla}, de ${horario(M.carro.horas)}. Carros por el último número, motos por el primero.`,
  h1: 'Pico y placa en Medellín hoy',
  intro: 'Rotación del segundo semestre de 2026, vigente desde el lunes 3 de agosto en Medellín y el Valle de Aburrá.',
  resume: `En Medellín el pico y placa del segundo semestre de 2026 restringe dos números por día hábil, de ${horario(M.carro.horas)}: ${tabla}. Para carros, camionetas, camperos y motocarros cuenta el último número de la placa; para motos, mototriciclos, cuatriciclos y ciclomotores, el primero, con la misma tabla. La rotación la fija el Decreto 1490 del 30 de julio de 2026 y rige desde el lunes 3 de agosto de 2026; los diez municipios del Valle de Aburrá la acordaron en el Consejo Metropolitano de Movilidad, así que la tabla es la misma en Itagüí, Envigado, Bello o Sabaneta. No aplica en sábados, domingos ni festivos. Los vehículos a gas, eléctricos e híbridos eléctricos registrados así en el RUNT están exentos sin trámite, y circular en tu día cuesta ${cop(C14)} más la inmovilización.`,
  tool: 'pyp',
  toolProps: { city: 'medellin', lockCity: true },
  faqs: [
    { q: '¿Por qué mi moto tiene pico y placa otro día que mi carro en Medellín?', a: 'Porque el Decreto 1490 de 2026 usa el primer número de la placa de la moto y el último del carro, con la misma tabla para ambos. Una moto ABC12D empieza en 1 y descansa el día del 1; un carro ABC123 termina en 3 y descansa el día del 3. En la herramienta, al elegir moto el campo pide el primer número.' },
    { q: '¿Hasta cuándo va la rotación actual del pico y placa en Medellín?', a: `El Decreto 1490 de 2026 establece la rotación del segundo semestre de 2026 y no escribe una fecha de fin; reemplazó al Decreto 0141 del 30 de enero de 2026. La herramienta responde con esta tabla hasta el ${fecha(M.vigencia.hasta)}. Para las fechas posteriores espera el decreto del primer semestre de 2027, que normalmente se publica a finales de enero.` },
    { q: '¿Qué vías de Medellín están exentas del pico y placa?', a: 'El artículo 9 del decreto deja fuera de la medida los corregimientos, el sistema vial del río (Autopista Sur, Avenida Regional y su paralela), los accesos a las terminales del Norte y del Sur y al aeropuerto Olaya Herrera, la calle 37 hacia Las Palmas y el túnel de Oriente, la conexión al túnel de Occidente, el corredor de La Iguaná y los puentes Horacio Toro y de Acevedo.' },
    { q: '¿Los carros a gas o híbridos tienen pico y placa en Medellín?', a: 'No, si el RUNT los registra con combustible GNV, gas-gasolina, eléctrico, hidrógeno, etanol, gasolina-eléctrico o diésel-eléctrico: la exención es automática y no hay que pedirla. Otros casos, como carga de más de 3,5 toneladas o el transporte de una persona con discapacidad, requieren solicitud y el permiso dura un año.' },
  ],
  body: (h) => `
<h2>La tabla del semestre</h2>
${h.table(['Día', 'Carros (último número)', 'Motos (primer número)'], sem.map(([d, xs]) => [d, digits(xs), digits(xs)]), `Decreto 1490 de 2026, artículos 1 y 2, de ${horario(M.carro.horas)}, desde el 3 de agosto de 2026.`)}
<p>La rotación es la misma en los diez municipios del Valle de Aburrá. Itagüí la adoptó con su propio Decreto 1011 de 2026 y conserva libre el tramo de la Autopista Sur en su jurisdicción: ver ${h.a('pico-y-placa-itagui', 'pico y placa en Itagüí y el Valle de Aburrá')}.</p>
<h2>Carros y motos con el mismo día</h2>
<p>La regla del primer número para las motos sorprende a quien llega de Bogotá, donde las motos no tienen pico y placa, o de Cali, donde están exceptuadas. En Medellín no solo tienen restricción: la tienen con el mismo horario que los carros. Si tienes carro y moto con números distintos, puede que los dos descansen el mismo día o que no te quede ninguno libre en dos días de la semana; la herramienta permite cambiar de vehículo para verlo. Lo compara con otras ciudades ${h.a('pico-y-placa-motos', 'pico y placa para motos')}.</p>
<h2>Período pedagógico y sanción</h2>
<p>El decreto dio un período pedagógico del 3 al 6 de agosto de 2026; desde el 10 de agosto se sanciona con la infracción C.14 del Código Nacional de Tránsito, ${cop(C14)} en 2026, y la inmovilización del vehículo. Los taxis tienen una rotación aparte, cada dos semanas, que esta herramienta no calcula.</p>
<p>Las exenciones automáticas por combustible se leen en el RUNT: si tu licencia de tránsito dice gasolina, no estás exento aunque el carro tenga un sistema de ayuda eléctrica no registrado. Ver ${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')}.</p>
`,
  related: ['pico-y-placa-itagui', 'pico-y-placa-motos', 'calendario-pico-y-placa', 'pico-y-placa-electricos-hibridos', 'multa-pico-y-placa', 'pico-y-placa-bogota'],
  sources: ['med_decreto_1490_2026', 'med_comunicado_2026', 'itagui_decreto_1011_2026', 'ley_769_2002'],
});

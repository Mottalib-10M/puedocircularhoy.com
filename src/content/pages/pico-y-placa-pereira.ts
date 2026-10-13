import { definePage } from '../../lib/page-types';
import { ciudad, horario, digits, pypSemana } from '../../lib/kit';

const C = ciudad('pereira');
const sem = pypSemana('pereira', '2026-10-13');

export default definePage({
  id: 'pico-y-placa-pereira',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 60,
  slug: 'pico-y-placa-pereira',
  nav: 'Pereira',
  card: 'Tabla fija desde 2024, sin rotación: carros por el último número y motos por el primero.',
  title: 'Pico y placa Pereira 2026: tabla fija, carros y motos',
  description: `Pico y placa en Pereira 2026 (Decreto 0540 de 2024): ${sem.map(([d, xs]) => `${d.slice(0, 2)} ${digits(xs)}`).join(', ')}, de ${horario(C.carro.horas)}. Motos por el primer número.`,
  h1: 'Pico y placa en Pereira',
  intro: 'Una de las pocas ciudades donde la tabla no rota: el mismo día todo el año.',
  resume: `En Pereira el pico y placa no cambia cada semestre: el Decreto 0540 del 26 de febrero de 2024 fijó una tabla estable, ${sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}, de ${horario(C.carro.horas)} de lunes a viernes, y la Alcaldía confirmó en octubre y en diciembre de 2024 que la medida seguía sin modificaciones. Para carros particulares y oficiales cuenta el último número de la placa; para motos, motocarros, mototriciclos y cuatrimotos, el primero, con la misma tabla. La restricción cubre el perímetro urbano y parte del suburbano, sin vías municipales excluidas, salvo las de la concesión Autopistas del Café y las variantes que enumera el decreto. No rige sábados, domingos ni festivos. Quien llega de otra ciudad con el tiquete de peaje del día queda exceptuado ese día. El decreto no tiene fecha de fin; la última confirmación oficial que leímos es de diciembre de 2024.`,
  tool: 'pyp',
  toolProps: { city: 'pereira', lockCity: true },
  faqs: [
    { q: '¿Cambió el pico y placa en Pereira en 2026?', a: 'No encontramos ningún decreto nuevo. La regla sigue siendo la del Decreto 0540 del 26 de febrero de 2024, que no tiene fecha de fin, y la Alcaldía repitió en octubre y diciembre de 2024 que la medida no cambiaba. Algunas notas de prensa de 2026 dan otros horarios o eximen a las motos; no lo confirma ningún texto oficial.' },
    { q: '¿Vengo de Manizales, tengo pico y placa en Pereira?', a: 'El día que llegas, no, si guardas el tiquete del peaje de ese día: el decreto exceptúa a los vehículos que vienen de otra ciudad por un día. A partir del día siguiente se te aplica la tabla según el último número de la placa. El acceso al aeropuerto Matecaña por la variante La Romelia también está excluido.' },
    { q: '¿Qué carros de carga están exentos en Pereira?', a: 'Los de una tonelada o más, incluidas las camionetas pick-up de doble cabina que cumplan esa capacidad. También están exentos los eléctricos e híbridos según la licencia de tránsito, los que transportan o son conducidos por una persona con discapacidad certificada, los oficiales y los de emergencia.' },
  ],
  body: (h) => `
<h2>La tabla de todo el año</h2>
${h.table(['Día', 'Carros (último número)', 'Motos (primer número)'], sem.map(([d, xs]) => [d, digits(xs), digits(xs)]), `Decreto 0540 de 2024, artículos 2 y 3, de ${horario(C.carro.horas)}.`)}
<p>La ventaja de una tabla fija es que se aprende una vez. La trampa es la moto: la placa de moto se lee por su primer número, así que una moto que empieza en 4 descansa el miércoles aunque termine en 9.</p>
<h2>Dónde rige</h2>
<p>El decreto aplica en el perímetro urbano y en parte del suelo suburbano definido por el Plan de Ordenamiento Territorial, y dice expresamente que no excluye ninguna vía municipal. Quedan fuera las vías de la concesión Autopistas del Café, la variante Condina, la variante La Romelia – El Pollo, El Tigre – Cerritos, Marsella – Turín y el tramo de la glorieta San Joaquín hacia Alcalá.</p>
<h2>Dosquebradas</h2>
<p>No pudimos leer la norma vigente de Dosquebradas, así que la herramienta no responde por ese municipio. Para otras ciudades del Eje Cafetero, ver ${h.a('pico-y-placa-manizales', 'Manizales')}, que no tiene pico y placa para particulares desde septiembre de 2026. Para la multa, ${h.a('multa-pico-y-placa', 'multa por pico y placa')}.</p>
`,
  related: ['pico-y-placa-manizales', 'pico-y-placa-motos', 'pico-y-placa', 'multa-pico-y-placa'],
  sources: ['per_decreto_540_2024', 'per_sin_cambios', 'ley_769_2002'],
});

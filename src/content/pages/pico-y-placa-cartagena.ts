import { definePage } from '../../lib/page-types';
import { P, ciudad, horario, digits, pypSemana, fecha, cop } from '../../lib/kit';

const C = ciudad('cartagena');
const sem = pypSemana('cartagena', '2026-09-14');
const C14 = (P as unknown as { co: { multaC14: number } }).co.multaC14;

export default definePage({
  id: 'pico-y-placa-cartagena',
  group: 'pyp-ciudad',
  kind: 'city',
  order: 50,
  slug: 'pico-y-placa-cartagena',
  nav: 'Cartagena',
  card: 'Horario en dos franjas para carros, de 5 a. m. a 11 p. m. para motos, y rotación por periodos.',
  title: 'Pico y placa Cartagena 2026: horario, motos y rotación',
  description: 'Pico y placa en Cartagena 2026 (Decreto 0015): carros en dos franjas, mañana y tarde, motos casi todo el día, con la rotación oficial y el cambio de octubre.',
  h1: 'Pico y placa en Cartagena',
  intro: 'Dos franjas cortas para los carros, un día casi entero para las motos.',
  resume: `En Cartagena el pico y placa de carros particulares y motos lo fija el Decreto 0015 de 2026 del Distrito, que aplica el DATT por periodos de rotación. Los carros tienen restricción en dos franjas, de ${horario(C.carro.horas)}, y las motos casi todo el día, de ${horario(C.motos!.horas)}, de lunes a viernes, sin fines de semana ni festivos. La rotación oficial que leímos rigió del ${fecha(C.vigencia.desde)} al ${fecha(C.vigencia.hasta)}: ${sem.map(([d, xs]) => `${d} ${digits(xs)}`).join(', ')}, igual para carros y motos por el último número. El Distrito anunció el 6 de octubre de 2026 un cambio de rotación, pero no pudimos leer el texto oficial: la página oficial de la Alcaldía no responde a nuestras consultas. Hasta leerlo, la herramienta responde «rotación no publicada» después del 2 de octubre en lugar de copiar la tabla de la prensa. La multa es la C.14, ${cop(C14)} en 2026.`,
  tool: 'pyp',
  toolProps: { city: 'cartagena', lockCity: true },
  faqs: [
    { q: '¿A qué horas es el pico y placa en Cartagena para carros?', a: `En dos franjas: de ${horario([C.carro.horas[0]])} y de ${horario([C.carro.horas[1]])}, de lunes a viernes. Fuera de ellas el carro circula aunque sea su día. El DATT desmintió el 16 de junio de 2026 que fuera a pasar a 24 horas en vacaciones de mitad de año y reiteró el horario fraccionado.` },
    { q: '¿Las motos tienen pico y placa en Cartagena?', a: `Sí, con la misma tabla que los carros y por el último número de la placa, pero con un horario mucho más largo: de ${horario(C.motos!.horas)}. Es la diferencia más grande con Medellín, donde las motos restringen por el primer número, y con Cali o Bogotá, donde no tienen pico y placa de particulares.` },
    { q: '¿Por qué la herramienta no da el pico y placa de octubre en Cartagena?', a: 'Porque la única rotación que leímos en un texto oficial terminó el 2 de octubre de 2026. El Distrito anunció un cambio el 6 de octubre, la prensa local publica una tabla nueva, y no la copiamos sin leer el texto del DATT. En cuanto lo leamos la cargamos con su fecha; mientras tanto, revisa los canales del DATT.' },
  ],
  body: (h) => `
<h2>La última rotación oficial que leímos</h2>
${h.table(['Día', 'Carros y motos (último número)'], sem.map(([d, xs]) => [d, digits(xs)]), `DATT, del ${fecha(C.vigencia.desde)} al ${fecha(C.vigencia.hasta)}.`)}
<p>Cartagena rota por periodos que no coinciden con los semestres: el de junio a octubre de 2026 duró poco más de tres meses. Por eso la página de cada rotación es lo único que vale, y una tabla de hace dos meses puede estar ya vencida.</p>
<h2>Horario partido, lógica de ciudad turística</h2>
<p>Las franjas de los carros coinciden con las horas de entrada y salida del trabajo. Al mediodía y por la noche, después de las 8:00 p. m., se circula libre. Las motos, en cambio, tienen restricción de la madrugada a la noche, porque la medida también busca controlar el mototaxismo. En enero de 2026 el Distrito aplicó durante unos días un pico y placa de 24 horas para la temporada alta; fue una medida temporal, no la regla.</p>
<h2>Taxis y multa</h2>
<p>Los taxis tienen su propia rotación, de 6:00 a. m. a 6:00 a. m. del día siguiente, que esta herramienta no calcula. La sanción para particulares y motos es la infracción C.14 con inmovilización: ver ${h.a('multa-pico-y-placa', 'multa por pico y placa')} y ${h.a('pico-y-placa-motos', 'pico y placa para motos')}.</p>
`,
  related: ['pico-y-placa-motos', 'pico-y-placa', 'multa-pico-y-placa', 'calendario-pico-y-placa'],
  sources: ['ctg_rotacion_2026', 'ctg_horario', 'ley_769_2002'],
});

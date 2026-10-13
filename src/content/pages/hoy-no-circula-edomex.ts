import { definePage } from '../../lib/page-types';
import { MX, P, horas24, digits, digitosColor, listOf } from '../../lib/kit';

const H = horas24(MX.hnc.horas);
const CT = P.mx.contingencia;

export default definePage({
  id: 'hoy-no-circula-edomex',
  group: 'hnc',
  kind: 'guide',
  order: 60,
  slug: 'hoy-no-circula-edomex',
  nav: 'Hoy No Circula Edomex',
  card: 'Qué está confirmado en los textos oficiales para el Estado de México y qué no pudimos leer.',
  title: 'Hoy No Circula Edomex 2026: municipios, hologramas y contingencia',
  description: `Hoy No Circula en el Edomex 2026: mismo calendario por engomado de ${H}, ${CT.municipiosEdomex} municipios en contingencia y hologramas mexiquenses reconocidos en la CDMX.`,
  h1: 'Hoy No Circula en el Estado de México',
  intro: 'Lo que dicen los textos oficiales de la Ciudad de México sobre el Edomex, y lo que no pudimos verificar.',
  resume: `El Hoy No Circula funciona en la Ciudad de México y en los municipios conurbados del Estado de México con el mismo calendario por engomado, de ${H}: lunes ${digits(digitosColor('amarillo'))}, martes ${digits(digitosColor('rosa'))}, miércoles ${digits(digitosColor('rojo'))}, jueves ${digits(digitosColor('verde'))} y viernes ${digits(digitosColor('azul'))}, con la misma regla de sábados por holograma. En contingencia ambiental, el programa de 2019 cubre las 16 alcaldías y ${CT.municipiosEdomex} municipios mexiquenses, de Acolman a Zumpango, y las restricciones de la Fase I y la Fase II se aplican igual a ambos lados del límite. La Ciudad de México reconoce los hologramas E, 00, 0, 1 y 2 expedidos en el Estado de México, así que un auto mexiquense verificado circula en la capital con su propio holograma. Lo que no podemos darte es la lista oficial de municipios del programa ordinario ni la multa mexiquense: los sitios del gobierno del Estado de México no respondieron a nuestras consultas del 13 de octubre de 2026, y no publicamos una lista que no hayamos leído.`,
  mini: 'hncHoy',
  faqs: [
    { q: '¿En qué municipios del Edomex aplica el Hoy No Circula?', a: 'En los municipios conurbados de la Zona Metropolitana del Valle de México. La prensa habla de 18 municipios, otras notas de más; no pudimos leer el texto oficial de la Gaceta del Gobierno porque los sitios mexiquenses no respondieron. Para la contingencia ambiental sí hay lista oficial: el programa de 2019 cubre 59 municipios del Estado de México.' },
    { q: '¿Mi holograma del Estado de México vale en la CDMX?', a: 'Sí. El programa de verificación del segundo semestre de 2026 dice que la Ciudad de México reconoce los hologramas E, 00, 0, 1 y 2 expedidos por los estados de la Comisión Ambiental de la Megalópolis, entre ellos el Estado de México. Con holograma 0 mexiquense circulas diario en la capital, igual que un auto capitalino.' },
    { q: '¿Puedo verificar mi auto del Estado de México en la CDMX?', a: 'No. La verificación voluntaria en la Ciudad de México está abierta a vehículos de otros estados, de placas federales y extranjeras, pero el programa de 2026 excluye expresamente a los matriculados en el Estado de México. Un auto mexiquense verifica en los verificentros del Estado de México según su propio calendario.' },
    { q: '¿Un auto del Edomex puede pedir el Pase Turístico?', a: 'No. El Pase Turístico no se genera para vehículos con placas de la Ciudad de México, el Estado de México, Hidalgo, Morelos, Puebla, Querétaro ni Tlaxcala. Está pensado para autos de estados más lejanos o del extranjero que vienen pocos días. Un auto mexiquense circula en la capital con su holograma.' },
  ],
  body: (h) => `
<h2>Un programa metropolitano con dos gobiernos</h2>
<p>El Hoy No Circula nació en 1989 para la Ciudad de México y se extendió a la zona conurbada porque el aire no se detiene en el límite estatal. Hoy, la Ciudad de México publica su programa en la Gaceta Oficial y el Estado de México el suyo en la Gaceta del Gobierno, y ambos se coordinan en la Comisión Ambiental de la Megalópolis. Para quien maneja de Ecatepec a Polanco o de Naucalpan a Coyoacán, el resultado práctico es una sola regla de días y sábados.</p>
<p>La herramienta aplica el calendario del decreto de la Ciudad de México y el apartado 14 del programa de verificación de 2026. Ese calendario es el que repiten todas las fuentes, oficiales y de prensa, para el Estado de México: el lunes el amarillo, el martes el rosa, el miércoles el rojo, el jueves el verde y el viernes el azul.</p>
<h2>Lo que sí está en un texto oficial</h2>
${h.table(['Punto', 'Qué dice', 'Fuente'], [['Contingencia ambiental', `Cubre las 16 alcaldías y ${CT.municipiosEdomex} municipios del Estado de México`, 'Programa de Contingencias de 2019, apartado IV'], ['Hologramas mexiquenses', 'La CDMX reconoce E, 00, 0, 1 y 2', 'Programa de verificación 2026, apartado 14.3'], ['Verificación voluntaria en la CDMX', 'No disponible para autos del Estado de México', 'Programa de verificación 2026, apartado 11.1'], ['Pase Turístico', 'No disponible para placas del Estado de México', 'Programa de verificación 2026, apartado 19.1.7']], 'Textos oficiales de la Ciudad de México leídos el 12 y 13 de octubre de 2026.')}
<p>La lista de los ${CT.municipiosEdomex} municipios de la contingencia incluye, entre otros, Ecatepec de Morelos, Naucalpan de Juárez, Nezahualcóyotl, Tlalnepantla de Baz, Chimalhuacán, Atizapán de Zaragoza, Cuautitlán Izcalli, Huixquilucan, Texcoco, Tecámac, Chalco, Ixtapaluca, La Paz, Valle de Chalco Solidaridad y Zumpango. Cuando la CAMe activa una fase, esas restricciones valen también allí, aunque el municipio no forme parte del programa ordinario.</p>
<h2>Lo que no pudimos leer, y por qué no lo publicamos</h2>
<p>El 13 de octubre de 2026 los sitios sma.edomex.gob.mx, legislacion.edomex.gob.mx y edomex.gob.mx no respondieron a nuestras consultas, ni directamente ni a través de otros servicios. Sin el texto de la Gaceta del Gobierno no podemos confirmar tres cosas: la lista exacta de municipios donde se aplica el programa ordinario, la fecha de cualquier ampliación reciente y el monto de la multa mexiquense. Las notas de prensa no coinciden entre sí: unas hablan de 18 municipios, otras de quince o dieciséis, otras de cincuenta. En lugar de elegir una cifra, preferimos decirlo.</p>
<p>Si vives en un municipio mexiquense y no sabes si el programa aplica en tus calles, la Secretaría del Medio Ambiente del Estado de México y tu ayuntamiento son las fuentes. Si circulas por la Ciudad de México, la regla de la herramienta es la que vale.</p>
<h2>Verificación en el Estado de México</h2>
<p>El Estado de México verifica dos veces al año por engomado, con su propio programa semestral. No reproducimos su calendario porque no pudimos leer el texto oficial; el calendario de la Ciudad de México, que sí leímos, está en ${h.a('verificacion-vehicular', 'verificación vehicular')}. Lo que sí sabemos es que el holograma que obtengas en un verificentro mexiquense vale en la capital.</p>
<h2>Si tu auto es mexiquense y entras a la capital</h2>
<p>Usa la herramienta como cualquier conductor capitalino: elige tu terminación y el holograma que te dieron. Un 0 o 00 mexiquense circula diario fuera de contingencia; un 1 o 2 descansa su día y sus sábados. La multa por circular en tu día dentro de la Ciudad de México es la del Reglamento de Tránsito capitalino, sin importar dónde está matriculado el auto: ver ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}. Para la contingencia, ${h.a('contingencia-ambiental', 'contingencia ambiental hoy')}.</p>
`,
  related: ['hoy-no-circula', 'contingencia-ambiental', 'verificacion-vehicular', 'pase-turistico', 'multa-hoy-no-circula'],
  sources: ['pcaa_2019', 'verif_2s2026', 'hnc_decreto', 'came_prensa'],
});

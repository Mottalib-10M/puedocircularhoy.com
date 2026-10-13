import { definePage } from '../../lib/page-types';
import { MX, P, listOf, fechaDia, num } from '../../lib/kit';

const C = P.mx.contingencia;
const ej = C.ejemplo;
const h0 = Number(MX.hnc.horas[0].slice(0, 2));

export default definePage({
  id: 'contingencia-ambiental',
  group: 'verif',
  kind: 'guide',
  order: 20,
  slug: 'contingencia-ambiental',
  nav: 'Contingencia ambiental hoy',
  card: 'Umbrales de las fases, horario de los boletines de la CAMe y dónde ver la activación del día.',
  title: 'Contingencia ambiental hoy 2026: fases, umbrales y avisos',
  description: `Contingencia ambiental 2026 en el Valle de México: Fase I con más de ${C.fase1.ozono_puntos} puntos y Fase II con más de ${C.fase2.ozono_puntos}, boletines de la CAMe y qué hacer con tu auto.`,
  h1: 'Contingencia ambiental: cómo saber si hay hoy',
  intro: 'Nadie puede anunciarla con días de anticipación: se decide con las mediciones del aire y se aplica al día siguiente.',
  resume: `La contingencia ambiental atmosférica la activa la Comisión Ambiental de la Megalópolis cuando el índice de calidad del aire supera un umbral: la Fase I con más de ${C.fase1.ozono_puntos} puntos de ozono, es decir más de ${C.fase1.ozono_ppb} partes por billón en promedio de una hora, o más de ${C.fase1.pm10_puntos} puntos de partículas; la Fase II con más de ${C.fase2.ozono_puntos} puntos. La CAMe publica boletines a las ${listOf(C.boletines)}, y la restricción adicional a la circulación empieza a las ${h0}:00 del día siguiente a la activación y dura hasta el día en que se levanta. Esta página no puede decirte si hoy hay contingencia, porque eso solo lo sabe la CAMe: te dice dónde mirarlo y qué cambia para tu auto. El último ejemplo real lo ilustra: el ${fechaDia(ej.fecha, true)} el boletín de las 15:00 activó la Fase I por ozono, con ${ej.ppb} partes por billón en la estación ${ej.estacion}, y la restricción se aplicó el domingo siguiente.`,
  mini: 'contingencia',
  faqs: [
    { q: '¿Dónde veo si hoy hay contingencia ambiental?', a: 'En los comunicados de la Comisión Ambiental de la Megalópolis, en gob.mx/comisionambiental, y en el sitio y la aplicación de calidad del aire de la Ciudad de México, aire.cdmx.gob.mx y Aire CDMX. El programa de 2019 también da el teléfono IMECATEL. Las notas de prensa repiten el comunicado, pero llegan después y a veces con errores.' },
    { q: '¿A qué hora se anuncia la contingencia ambiental?', a: `Los boletines de la CAMe salen a las ${listOf(C.boletines)}. Una fase se declara dentro de la hora siguiente al registro que supera el umbral; si el registro de partículas ocurre de noche, a más tardar a las 10:00. El aviso de fase preventiva por ozono sale entre las 14:00 y las 15:00. La restricción a la circulación empieza a las ${h0}:00 del día siguiente.` },
    { q: '¿Qué diferencia hay entre Fase I y Fase II para mi auto?', a: 'Para los autos particulares, ninguna: el programa de 2019 aplica en las dos fases las mismas restricciones a los hologramas 2, 1, 0 y 00. La Fase II añade otras medidas, entre ellas la restricción de la mitad de las motocicletas por terminación de placa, y medidas para la industria, los comercios y los vehículos oficiales.' },
    { q: '¿La contingencia aplica en todo el Estado de México?', a: `No en todo: el programa de 2019 cubre las 16 alcaldías de la Ciudad de México y ${C.municipiosEdomex} municipios del Estado de México de la zona metropolitana. Si la contingencia es regional, por partículas en una sola de las cinco zonas de medición, el programa exime al parque vehicular de la restricción adicional al Hoy No Circula.` },
  ],
  body: (h) => `
<h2>Los umbrales de cada fase</h2>
${h.table(['Fase', 'Ozono (promedio de 1 h)', 'PM10 (promedio móvil de 24 h)', 'PM2.5 (promedio móvil de 24 h)'], [['Preventiva', `pronóstico de más de ${C.preventiva_puntos} puntos`, `más de ${C.preventiva_particulas} puntos`, `más de ${C.preventiva_particulas} puntos`], ['Fase I', `más de ${C.fase1.ozono_puntos} puntos (${C.fase1.ozono_ppb} ppb)`, `más de ${C.fase1.pm10_puntos} puntos (${C.fase1.pm10_ugm3} µg/m³)`, `más de ${C.fase1.pm25_puntos} puntos (${num(C.fase1.pm25_ugm3, 'mx', 1)} µg/m³)`], ['Fase II', `más de ${C.fase2.ozono_puntos} puntos (${C.fase2.ozono_ppb} ppb)`, `más de ${C.fase2.pm10_puntos} puntos (${C.fase2.pm10_ugm3} µg/m³)`, `más de ${C.fase2.pm25_puntos} puntos (${num(C.fase2.pm25_ugm3, 'mx', 1)} µg/m³)`]], 'Programa para Prevenir y Responder a Contingencias Ambientales Atmosféricas, Gaceta Oficial del 28 de mayo de 2019, Tablas 1 y 2.')}
<p>El índice que se usa es el de la norma ambiental de la Ciudad de México de 2017, sin las actualizaciones de 2021, según la propia página de contingencias de la SEDEMA. La fase se levanta cuando el índice vuelve a ${C.fase1.ozono_puntos} puntos o menos y el pronóstico meteorológico del día siguiente es favorable. Existe además una contingencia combinada, cuando el ozono y las partículas superan a la vez umbrales cercanos, que aplica las medidas de las dos Fase I.</p>
<h2>Por qué nadie puede predecirla</h2>
<p>El ozono se forma con el sol a partir de las emisiones de los autos y de la industria, y su concentración depende del viento y de la inversión térmica de cada día. La temporada de ozono, de febrero a junio, concentra la mayoría de las activaciones, pero hay contingencias fuera de ella, como la de septiembre de 2026. La CAMe decide con las mediciones de la red de monitoreo y con el pronóstico del día siguiente. Un sitio que anuncia «contingencia mañana» antes del boletín está adivinando.</p>
<h2>Cómo usar la herramienta en un día de contingencia</h2>
<p>En la consulta del ${h.a('hoy-no-circula', 'Hoy No Circula hoy')}, marca la fase activa. Para el holograma 1, el comunicado dice si descansan las terminaciones pares o las nones; para los hologramas 0 y 00 en fin de semana, qué engomado descansa. Elige lo que diga el comunicado y la herramienta aplica el resto de la regla. Si no lo eliges, responde «depende del comunicado» en lugar de inventar. El detalle de quién no circula está en ${h.a('doble-hoy-no-circula', 'Doble Hoy No Circula')}.</p>
<h2>El caso de septiembre de 2026</h2>
<p>El ${fechaDia(ej.fecha, true)}, el boletín de las 15:00 de la CAMe informó una concentración de ozono de ${ej.ppb} partes por billón en la estación ${ej.estacion} y activó la Fase I en la Zona Metropolitana del Valle de México. Al día siguiente, domingo, no circularon de 5:00 a 22:00 los hologramas 2, los holograma 1 de terminación non y los hologramas 0 y 00 de engomado ${ej.color}, además de los autos sin holograma, de demostración, con permiso o pase turístico. Las motos quedaron exentas, como en toda Fase I. La contingencia se levantó ese mismo día. Lo usamos como prueba del motor: si la herramienta no reproduce ese caso, no se publica.</p>
<h2>Lo que no cambia en contingencia</h2>
<p>Los eléctricos, los híbridos con holograma exento, los vehículos con matrícula ecológica, los de emergencia, el transporte escolar y de personal, los de personas con discapacidad y el transporte público de pasajeros verificado quedan exentos. Los taxis circulan con un horario limitado. Ver ${h.a('exentos-hoy-no-circula', 'exentos del Hoy No Circula')}.</p>
`,
  related: ['doble-hoy-no-circula', 'hoy-no-circula', 'hoy-no-circula-manana', 'exentos-hoy-no-circula', 'hoy-no-circula-edomex'],
  sources: ['pcaa_2019', 'aire_contingencias', 'came_prensa', 'came_2026_09_12'],
});

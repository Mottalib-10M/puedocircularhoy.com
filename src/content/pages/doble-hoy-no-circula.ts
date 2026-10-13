import { definePage } from '../../lib/page-types';
import { MX, P, horas24, digits, digitosColor, fechaDia, listOf } from '../../lib/kit';

const H = horas24(MX.hnc.horas);
const C = P.mx.contingencia;
const orden = ['amarillo', 'rosa', 'rojo', 'verde', 'azul'] as const;

export default definePage({
  id: 'doble-hoy-no-circula',
  group: 'verif',
  kind: 'guide',
  order: 30,
  slug: 'doble-hoy-no-circula',
  nav: 'Doble Hoy No Circula',
  card: 'Quién no circula en contingencia: holograma 2, la mitad del 1 y el engomado del día para 0 y 00.',
  title: 'Doble Hoy No Circula 2026: quién no circula en contingencia',
  description: `Doble Hoy No Circula 2026: no circulan los hologramas 2, la mitad de los 1 y los 0 y 00 del engomado del día, de ${H}. Revisa tu placa en Fase I o II.`,
  h1: 'Doble Hoy No Circula: quién se queda en casa',
  intro: 'La regla de la contingencia, holograma por holograma, entre semana y en fin de semana.',
  resume: `Cuando la CAMe activa una contingencia ambiental, al Hoy No Circula ordinario se suma una restricción adicional, de ${H}, que la gente llama Doble Hoy No Circula. Según la Tabla 3 del programa de 2019, no circulan todos los vehículos con holograma 2; los holograma 1 de terminación par o non, alternando con base en la última activación; y los hologramas 0 y 00 cuya terminación tiene restricción ese día en el Hoy No Circula ordinario. En sábado o domingo, para los 0 y 00 la CAMe elige el engomado empezando por el amarillo y siguiendo el orden ${listOf([...orden])}. Los autos de otros estados sin holograma 00, 0 o exento, y los que tienen Pase Turístico, se tratan como holograma 2. Los taxis solo pueden circular de 5:00 a ${C.taxis_hasta}. En Fase II, además, la mitad de las motos deja de circular por terminación. Los eléctricos, los híbridos exentos y los vehículos de emergencia siguen circulando.`,
  mini: 'contingencia',
  faqs: [
    { q: '¿Qué hologramas no circulan en Doble Hoy No Circula?', a: 'Ningún holograma 2; la mitad de los holograma 1, la terminación par o la non según el comunicado; y los hologramas 0 y 00 de la terminación que descansa ese día en el Hoy No Circula, o del engomado que elija la CAMe en fin de semana. Solo los exentos, eléctricos e híbridos con holograma exento, circulan sin restricción.' },
    { q: '¿Cómo se decide si descansan los pares o los nones del holograma 1?', a: 'El programa de 2019 dice que se alternan con base en la última activación: si en la contingencia anterior descansaron los pares, en la siguiente descansan los nones. El comunicado de la CAMe lo dice expresamente. En la contingencia del 13 de septiembre de 2026 descansaron las terminaciones nones.' },
    { q: '¿El holograma 0 circula el sábado de contingencia?', a: 'Depende de su engomado. En sábado o domingo de contingencia, la CAMe elige un engomado para los hologramas 0 y 00, empezando por el amarillo y siguiendo el orden rosa, rojo, verde y azul en cada activación de fin de semana. Si tu engomado es el elegido, no circulas; si no, sí.' },
    { q: '¿Las motos tienen Doble Hoy No Circula?', a: 'Solo en Fase II. El programa de 2019 restringe en esa fase al 50 por ciento de las motocicletas según su terminación, par o non, de 5:00 a 22:00, y prohíbe circular a las motos sin placa. Las motos eléctricas quedan exentas. En Fase I las motos circulan, como confirmó la CAMe en septiembre de 2026.' },
  ],
  body: (h) => `
<h2>La regla, holograma por holograma</h2>
${h.table(['Holograma', 'Entre semana con contingencia', 'Fin de semana con contingencia'], [['Exento, eléctrico, híbrido exento', 'Circula', 'Circula'], ['00 y 0', 'No circula si es el día de su engomado', 'No circula si la CAMe elige su engomado'], ['1', 'No circula su día ni, además, la paridad que diga el comunicado', 'No circula la paridad que diga el comunicado (y sus sábados ordinarios)'], ['2', 'No circula', 'No circula'], ['Foráneo sin holograma reconocido, Pase Turístico', 'No circula', 'No circula'], ['Motos', 'Fase I circulan; Fase II la mitad', 'Fase I circulan; Fase II la mitad']], `Programa de Contingencias de 2019, Tabla 3, de ${H}.`)}
<p>La palabra «doble» viene de que, entre semana, un holograma 1 puede perder dos razones para circular: su día de engomado, que ya tenía, y la paridad que restringe la contingencia. Un holograma 1 con placa terminada en 3, un miércoles de contingencia con nones restringidos, no circula por las dos causas a la vez; el jueves siguiente, si la contingencia sigue, vuelve a quedarse en casa por la paridad.</p>
<h2>El engomado de los hologramas 0 y 00</h2>
<p>Entre semana es fácil: el 0 o 00 descansa el día que le toca a su terminación en el Hoy No Circula ordinario. El lunes, el amarillo (${digits(digitosColor('amarillo'))}); el martes, el rosa (${digits(digitosColor('rosa'))}); el miércoles, el rojo (${digits(digitosColor('rojo'))}); el jueves, el verde (${digits(digitosColor('verde'))}); el viernes, el azul (${digits(digitosColor('azul'))}). En fin de semana no hay día de engomado, así que el programa fija un turno rotativo: la primera activación en sábado o domingo afecta al amarillo, la siguiente al rosa, y así hasta el azul, para volver a empezar. El ${fechaDia(C.ejemplo.aplica, true)} le tocó al ${C.ejemplo.color}.</p>
<h2>Los que circulan</h2>
<p>El programa de 2019 exenta a los vehículos eléctricos e híbridos, a los que tienen matrícula ecológica u holograma exento, a los de emergencia y servicios de salud, al transporte escolar y de personal, a los funerarios, a los de personas con discapacidad, al transporte público de pasajeros verificado, a los del Programa Paisano, a los de alimentos refrigerados y a las revolvedoras de concreto. El transporte de carga tiene su propia franja de restricción por la mañana.</p>
<h2>Si te paran durante la contingencia</h2>
<p>La sanción es la del Hoy No Circula ordinario, de 20 a 30 UMA según el Reglamento de Tránsito; el decreto de 2014 prevé además que un auto retenido durante una contingencia permanezca en el depósito hasta que la contingencia termine. Ver ${h.a('multa-hoy-no-circula', 'multa por Hoy No Circula')}. Para saber si hay contingencia y a qué hora se anuncia, ${h.a('contingencia-ambiental', 'contingencia ambiental hoy')}.</p>
`,
  related: ['contingencia-ambiental', 'hoy-no-circula', 'holograma-1', 'holograma-0', 'multa-hoy-no-circula'],
  sources: ['pcaa_2019', 'came_2026_09_12', 'hnc_decreto', 'aire_contingencias'],
});

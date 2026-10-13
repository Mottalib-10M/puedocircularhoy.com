import { definePage } from '../../lib/page-types';
import { MX, digitosColor, digits, horas24, verifMesesTxt, listOf, diaHnc } from '../../lib/kit';
import type { Color } from '../../lib/engine/mx';

const H = horas24(MX.hnc.horas);
const COL: Color[] = ['amarillo', 'rosa', 'rojo', 'verde', 'azul'];

export default definePage({
  id: 'engomado-colores',
  group: 'hnc',
  kind: 'pillar',
  order: 35,
  slug: 'engomado-colores',
  nav: 'Colores de engomado',
  card: 'Qué color de engomado te toca según tu placa, tu día sin circular y tus meses de verificación.',
  title: 'Engomado por placa 2026: color, día y verificación',
  description: `Engomado 2026 según la terminación de la placa: amarillo ${digits(digitosColor('amarillo'))}, rosa ${digits(digitosColor('rosa'))}, rojo ${digits(digitosColor('rojo'))}, verde ${digits(digitosColor('verde'))} y azul ${digits(digitosColor('azul'))}, con su día sin circular y su verificación.`,
  h1: 'Colores de engomado: qué color es mi placa',
  intro: 'El color del engomado sale del último número de la placa y decide dos calendarios: el del Hoy No Circula y el de la verificación.',
  resume: `En la Ciudad de México y su zona conurbada el engomado es la calcomanía de color que lleva el auto según el último número de su placa, y ese color decide dos fechas: el día entre semana en que no circula con holograma 1 o 2, de ${H}, y los dos meses de cada semestre en que debe verificar. Las terminaciones ${digits(digitosColor('amarillo'))} son amarillo, ${digits(digitosColor('rosa'))} rosa, ${digits(digitosColor('rojo'))} rojo, ${digits(digitosColor('verde'))} verde y ${digits(digitosColor('azul'))} azul; las placas formadas solo por letras se tratan como azul. Si la calcomanía de tu parabrisas no coincide con el número, manda el número: el programa de verificación de 2026 aplica el Hoy No Circula conforme al último dígito numérico de la matrícula. La herramienta de arriba muestra tu color y tus días al elegir la terminación.`,
  tool: 'hnc',
  toolProps: { digit: 3, holo: '1' },
  faqs: [
    { q: '¿Qué engomado tiene una placa terminada en 0?', a: `Azul, igual que la terminada en 9. Con holograma 1 o 2 no circula los viernes, de ${H}, y verifica en ${listOf(verifMesesTxt('azul', 2))} en el segundo semestre. Para los sábados del holograma 1, el 0 cuenta como terminación par: descansa el segundo y el cuarto sábado del mes.` },
    { q: '¿Qué hago si perdí la calcomanía del engomado?', a: 'El color depende del número de la placa, no de la calcomanía, así que tu día de Hoy No Circula y tu periodo de verificación no cambian. La reposición de la calcomanía es un trámite de control vehicular de la entidad que expidió la placa. Mientras tanto, la terminación de la placa basta para saber qué día descansas.' },
    { q: '¿El engomado cambia si me cambio de placas?', a: 'Sí, si el último número de la placa nueva es distinto: el engomado sigue al número. Al cambiar de placas cambian también el día sin circular y los meses de verificación. Si tu holograma sigue vigente, la verificación siguiente se hace en el bimestre del color nuevo.' },
  ],
  body: (h) => `
<h2>Los cinco colores</h2>
${h.table(['Engomado', 'Terminación', 'No circula (hologramas 1 y 2)', '2.º semestre de 2026', '1.er semestre de 2026'], COL.map((c) => [c[0].toUpperCase() + c.slice(1), digits(digitosColor(c)), diaHnc(digitosColor(c)[0]), listOf(verifMesesTxt(c, 2)), listOf(verifMesesTxt(c, 1))]), 'Decreto del Programa Hoy No Circula (2014) y programas de verificación de 2026.')}
<p>El orden de la verificación sigue la semana: el amarillo, que descansa el lunes, verifica primero; el azul, que descansa el viernes, último. Por eso cada mes coinciden dos colores en los verificentros, uno que empieza y otro que termina.</p>
<p>Cada día tiene su página con lo propio de su color: ${COL.map((c, i) => h.a(['hoy-no-circula-lunes', 'hoy-no-circula-martes', 'hoy-no-circula-miercoles', 'hoy-no-circula-jueves', 'hoy-no-circula-viernes'][i], c)).join(', ')}. El calendario completo de verificación está en ${h.a('verificacion-vehicular', 'verificación vehicular')}.</p>
`,
  related: ['verificacion-vehicular', 'hoy-no-circula-lunes', 'hoy-no-circula-viernes', 'calendario-hoy-no-circula'],
  sources: ['hnc_decreto', 'verif_2s2026', 'verif_1s2026'],
});

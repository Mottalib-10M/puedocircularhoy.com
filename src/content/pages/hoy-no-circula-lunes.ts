import { definePage } from '../../lib/page-types';
import { MX, digitosColor, digits, horas24, verifMesesTxt, listOf } from '../../lib/kit';

const D = digitosColor('amarillo');
const H = horas24(MX.hnc.horas);
const V2 = verifMesesTxt('amarillo', 2);
const V1 = verifMesesTxt('amarillo', 1);

export default definePage({
  id: 'hoy-no-circula-lunes',
  group: 'hnc',
  kind: 'pillar',
  order: 40,
  slug: 'hoy-no-circula-lunes',
  nav: 'Lunes: engomado amarillo',
  card: `Terminación ${digits(D)}: el lunes, los lunes festivos y la verificación de ${listOf(V1)}.`,
  title: `Hoy No Circula lunes 2026: engomado amarillo, placas ${digits(D)}`,
  description: `Hoy No Circula los lunes 2026: no circula el engomado amarillo, terminación ${digits(D)}, con holograma 1 o 2, de ${H}. Revisa tu placa y los lunes festivos.`,
  h1: 'Hoy No Circula los lunes: engomado amarillo',
  intro: `Si tu placa termina en ${digits(D)}, la semana empieza sin auto.`,
  resume: `Los lunes no circulan en la Ciudad de México y su zona conurbada los autos de engomado amarillo, es decir con placa terminada en ${digits(D)}, cuando tienen holograma 1 o 2, de ${H}. Con holograma 0 o 00 circulan, salvo que la CAMe active una contingencia ambiental, en cuyo caso el engomado amarillo es el primero que deja de circular entre los hologramas 0 y 00 cada lunes de contingencia. Los lunes que la ley declara de descanso obligatorio no suspenden el programa por sí solos: el decreto de 2014 solo lo suspende si la autoridad ambiental publica un aviso, así que un lunes festivo sin aviso es un lunes normal de Hoy No Circula. El engomado amarillo es también el primero del calendario de verificación: verifica en ${listOf(V1)} y otra vez en ${listOf(V2)}. La herramienta de arriba ya tiene puesta la terminación 5; cámbiala por la tuya.`,
  tool: 'hnc',
  toolProps: { digit: 5, holo: '1' },
  faqs: [
    { q: '¿Qué autos no circulan el lunes en la CDMX?', a: `Los de engomado amarillo, con placa terminada en ${digits(D)}, si tienen holograma 1 o 2, de ${H}. También los autos de otros estados con esa terminación que no traen un holograma reconocido. Los hologramas 0, 00 y exento, las motos y los autos con Pase Turístico circulan, salvo contingencia ambiental.` },
    { q: '¿El Hoy No Circula aplica en un lunes de puente?', a: 'Sí, salvo que la Secretaría del Medio Ambiente publique un aviso que lo suspenda. El decreto de 2014 prevé esos avisos para festivos, días inhábiles y periodos vacacionales cuando la calidad del aire no pone en riesgo a la población, pero sin aviso el programa sigue. Revisa la Gaceta Oficial o aire.cdmx.gob.mx el domingo.' },
    { q: '¿Cuándo verifica el engomado amarillo?', a: `En el primer bimestre de cada semestre: ${listOf(V1)} en el primero, ${listOf(V2)} en el segundo, según los programas de verificación de 2026. Es el primer color del calendario, así que también es el primero en caer en multa si se deja pasar: el plazo del segundo semestre de 2026 terminó con agosto.` },
  ],
  body: (h) => `
<h2>Lo propio del lunes</h2>
<p>El lunes concentra dos trampas. La primera es el fin de semana largo: muchos lunes son días de descanso obligatorio, y es común suponer que ese día no hay programa. La regla del decreto es la contraria: el Hoy No Circula sigue salvo aviso de suspensión publicado. La segunda es la contingencia que se activa el domingo por la tarde: el boletín de las 15:00 o de las 20:00 puede dejar sin circular al día siguiente a los hologramas 0 y 00 de engomado amarillo, que normalmente circulan diario.</p>
${h.table(['Holograma', 'Lunes sin contingencia', 'Lunes con contingencia'], [['00 y 0', 'Circula', 'No circula si termina en ' + digits(D)], ['1', `No circula si termina en ${digits(D)}`, 'También la mitad de las terminaciones, según el comunicado'], ['2', `No circula si termina en ${digits(D)}`, 'No circula ninguna terminación'], ['Exento', 'Circula', 'Circula']], 'Programa Hoy No Circula (2014) y Programa de Contingencias (2019), Tabla 3.')}
<h2>El amarillo y la verificación</h2>
<p>Al ser el primer color del calendario, el amarillo verifica en el arranque de cada semestre. Si no verificaste en ${listOf(V2)} de 2026, tu auto pasa a tratarse como holograma 2 hasta que verifique, con la multa por verificación extemporánea: lo explica ${h.a('multa-verificacion-extemporanea', 'multa por verificar tarde')}.</p>
<p>Los demás días de la semana tienen su página: ${h.a('hoy-no-circula-martes', 'martes')}, ${h.a('hoy-no-circula-miercoles', 'miércoles')}, ${h.a('hoy-no-circula-jueves', 'jueves')} y ${h.a('hoy-no-circula-viernes', 'viernes')}.</p>
`,
  related: ['hoy-no-circula-martes', 'hoy-no-circula-viernes', 'hoy-no-circula', 'contingencia-ambiental', 'verificacion-vehicular'],
  sources: ['hnc_decreto', 'verif_2s2026', 'verif_1s2026', 'pcaa_2019'],
});

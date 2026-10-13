import { definePage } from '../../lib/page-types';
import { P, mxn, costoVerifPesos } from '../../lib/kit';

const HO = P.mx.hologramas;

export default definePage({
  id: 'que-holograma-me-toca',
  group: 'verif',
  kind: 'guide',
  order: 50,
  slug: 'que-holograma-me-toca',
  nav: 'Qué holograma me toca',
  card: `Año del modelo y combustible: 00, 0 (desde ${HO['0'].modeloDesde}), 1 (${HO['1'].modeloDesde} a ${HO['1'].modeloHasta}), 2 o exento.`,
  title: 'Holograma por año del modelo 2026: qué holograma me toca',
  description: `Qué holograma te toca en 2026: 0 desde el modelo ${HO['0'].modeloDesde}, 1 de ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta}, 2 para ${HO['2'].modeloHasta} y anteriores, exento para eléctricos e híbridos. Simula tu auto aquí.`,
  h1: '¿Qué holograma le toca a mi auto?',
  intro: 'El año del modelo fija el holograma máximo; la prueba del verificentro decide si lo obtienes.',
  resume: `En la Ciudad de México el holograma depende del año del modelo, del combustible y de la prueba de emisiones del verificentro, según el apartado 8 del programa de verificación del segundo semestre de 2026. Un auto de gasolina modelo ${HO['0'].modeloDesde} o posterior que aprueba la prueba recibe el holograma 0, que vale ${HO['0'].vigenciaMeses} meses y no tiene Hoy No Circula; el 00 se reserva a los modelos de la lista de la SEDEMA con emisiones homologadas bajas y dura hasta ${HO['00'].vigenciaAnios} años. Los modelos de ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta} dentro de los límites reciben el 1, y los de ${HO['2'].modeloHasta} y anteriores el 2. Los diésel se clasifican por opacidad, con el 0 desde el modelo ${HO['0'].dieselDesde}. Los eléctricos y los híbridos HEV, PHEV o REEV reciben el holograma exento; los híbridos suaves se verifican como gasolina. La verificación cuesta ${mxn(costoVerifPesos(), 0)} con IVA en 2026, cualquiera que sea el resultado.`,
  mini: 'holograma',
  faqs: [
    { q: '¿Mi auto 2005 puede tener holograma 0?', a: `No. El programa de verificación de 2026 da el holograma 0 a los autos de gasolina modelo ${HO['0'].modeloDesde} y posteriores que aprueban la prueba. Un modelo 2005, aunque esté en perfecto estado, puede obtener como máximo el holograma 1 si cumple los límites de su tabla. El año del modelo es el de la tarjeta de circulación, no el de la compra.` },
    { q: '¿Por qué mi auto nuevo salió con holograma 0 y no 00?', a: 'El 00 no es automático para los autos nuevos: solo lo obtienen los modelos que figuran en la lista de la SEDEMA por su homologación de emisiones, como Tier 3 Bin 160 o Euro 6, y el número de veces que pueden recibirlo depende de esa homologación. Un auto nuevo fuera de la lista recibe el 0 si aprueba la prueba.' },
    { q: '¿Qué pasa si mi auto reprueba la verificación?', a: 'Recibes una constancia de rechazo y puedes volver a intentar después de reparar el problema; el segundo, cuarto y siguientes intentos en el mismo verificentro no se cobran. Mientras tanto, si el periodo de tu engomado termina, el auto queda sin holograma vigente y se trata como holograma 2 en el Hoy No Circula.' },
    { q: '¿Los híbridos tienen holograma exento?', a: `Los híbridos HEV, PHEV y REEV, con motor de gasolina y eléctrico, sí: el holograma exento les vale ${HO.exento.hibridoAnios} años en la Ciudad de México, con una renovación. Los híbridos suaves, llamados MHEV, no entran en esa categoría: se verifican como autos de gasolina y pueden obtener el 0 o el 00.` },
  ],
  body: (h) => `
<h2>La tabla de 2026</h2>
${h.table(['Holograma', 'Autos de gasolina', 'Vigencia', 'Hoy No Circula'], [['Exento', 'Eléctricos, celda de combustible, híbridos HEV, PHEV y REEV', `permanente o ${HO.exento.hibridoAnios} años`, 'No aplica'], ['00', 'Modelos de la lista SEDEMA por homologación', `hasta ${HO['00'].vigenciaAnios} años`, 'No aplica'], ['0', `Modelo ${HO['0'].modeloDesde} y posteriores que aprueban la prueba`, `${HO['0'].vigenciaMeses} meses`, 'No aplica'], ['1', `Modelos ${HO['1'].modeloDesde} a ${HO['1'].modeloHasta} dentro de los límites`, '6 meses', 'Un día y dos sábados al mes'], ['2', `Modelos ${HO['2'].modeloHasta} y anteriores dentro de los límites`, '6 meses', 'Un día y todos los sábados']], 'Programa de verificación del 2.º semestre de 2026, apartados 4 y 8. Fuera de contingencia ambiental.')}
<h2>Lo que mide el verificentro</h2>
<p>Para los autos de gasolina recientes, la prueba principal es la de diagnóstico a bordo: el verificentro conecta un equipo al puerto del auto y lee los sistemas de control de emisiones. Si hay fallas registradas, el auto no aprueba aunque no eche humo. Para algunos modelos de ${HO['0'].modeloDesde} a ${HO['0'].estandarAHasta} se mide además la emisión de gases. Los autos más antiguos se prueban con gases en el escape y se clasifican según las tablas de límites. Los diésel se miden por opacidad del humo.</p>
<p>Por eso dos autos del mismo año pueden salir con hologramas distintos: uno bien mantenido aprueba y otro con una falla en el sensor de oxígeno o en el convertidor catalítico no. Antes de verificar, conviene revisar que no haya una luz de falla encendida en el tablero.</p>
<h2>Lo que gana cada salto</h2>
<p>Pasar del 2 al 1 recupera dos sábados al mes. Pasar del 1 al 0 recupera todos los días: el auto deja de tener Hoy No Circula fuera de contingencia. Pero el salto depende del año del modelo, que no se puede cambiar: un auto de ${HO['1'].modeloHasta} no obtiene el 0 por mucho mantenimiento que reciba. Lo que sí se puede evitar es caer al 2 o quedar sin holograma por un rechazo.</p>
<h2>Diésel, gas y otros casos</h2>
<p>Los vehículos diésel modelo ${HO['0'].dieselDesde} o posterior con opacidad dentro del límite obtienen el 0; los demás, el 1 o el 2 según su medición. Los autos de gas o de gasolina con gas se clasifican con sus propias reglas. Los autos antiguos con matrícula de auto antiguo o clásico expedida por la Ciudad de México están exentos del Hoy No Circula, pero no de las contingencias: ver ${h.a('exentos-hoy-no-circula', 'exentos del Hoy No Circula')}.</p>
<p>Cada holograma tiene su página: ${h.a('holograma-00', 'holograma 00')}, ${h.a('holograma-0', 'holograma 0')}, ${h.a('holograma-1', 'holograma 1')} y ${h.a('holograma-2', 'holograma 2')}. Para tu periodo de verificación, ${h.a('verificacion-vehicular', 'verificación vehicular')}.</p>
`,
  related: ['verificacion-vehicular', 'holograma-0', 'holograma-1', 'exentos-hoy-no-circula', 'holograma-00'],
  sources: ['verif_2s2026', 'verif_1s2026', 'hnc_decreto'],
});

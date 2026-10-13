import { definePage } from '../../lib/page-types';
import { P, cop, num, ciudad, horario } from '../../lib/kit';

const S = (P as unknown as { co: { solidario: { dia: number; mes: number; semestre: number; factorFuera: number; factorAntes: number } } }).co.solidario;
const B = ciudad('bogota');

export default definePage({
  id: 'pico-y-placa-solidario',
  group: 'pyp-reglas',
  kind: 'guide',
  order: 50,
  slug: 'pico-y-placa-solidario',
  nav: 'Pico y Placa Solidario',
  card: 'Valores base 2026 en Bogotá, factor por matrícula y cómo se tramita el permiso.',
  title: 'Pico y Placa Solidario 2026: valor por día, mes y semestre',
  description: `Pico y Placa Solidario 2026 en Bogotá: valor base de ${cop(S.dia)} por día, ${cop(S.mes)} por mes y ${cop(S.semestre)} por seis meses, más factores. Simula tu permiso.`,
  h1: 'Pico y Placa Solidario en Bogotá',
  intro: 'Pagar para circular en tu día de restricción: cuánto cuesta en 2026 y qué lo encarece.',
  resume: `El Pico y Placa Solidario es el permiso que vende la Alcaldía de Bogotá para circular sin la restricción de pico y placa durante un día, un mes o seis meses. Con la Resolución 120963 de 2026 de la Secretaría Distrital de Movilidad, los valores base, actualizados con el IPC, son ${cop(S.dia)} por un día, ${cop(S.mes)} por un mes y ${cop(S.semestre)} por seis meses. Ese valor base no es el precio final: se multiplica por factores que dependen del avalúo, el modelo, el combustible y el municipio de matrícula del vehículo. El factor de los carros matriculados fuera de Bogotá subió en 2026 de ${num(S.factorAntes, 'co', 1)} a ${num(S.factorFuera, 'co', 1)}, de modo que un carro de Chía o de Soacha paga la mitad más sobre la base. El trámite se hace solo en movilidadbogota.gov.co y se paga por PSE; no lo venden gestores ni terceros. Con el permiso vigente, el carro circula de ${horario(B.carro.horas)} todos los días hábiles.`,
  mini: 'solidario',
  faqs: [
    { q: '¿Cuánto cuesta el Pico y Placa Solidario por un día en 2026?', a: `El valor base de un día es de ${cop(S.dia)} según la Resolución 120963 de 2026. El precio que paga cada vehículo resulta de aplicar a esa base los factores de la Secretaría de Movilidad, que suben con el avalúo y bajan con combustibles menos contaminantes; un carro matriculado fuera de Bogotá paga además un factor de ${num(S.factorFuera, 'co', 1)}.` },
    { q: '¿Dónde se compra el Pico y Placa Solidario?', a: 'Únicamente en la página de la Secretaría Distrital de Movilidad, movilidadbogota.gov.co, con pago por PSE. La Alcaldía insiste en que no hay intermediarios autorizados: un permiso comprado a un tercero puede no estar registrado y el agente impondría la multa igual. Al terminar el trámite el permiso queda asociado a la placa.' },
    { q: '¿Me conviene más el permiso de un mes o el de seis meses?', a: `Con los valores base de 2026, seis meses cuestan ${cop(S.semestre)}, unas ${num(Math.round(S.semestre / S.mes), 'co')} veces el permiso mensual de ${cop(S.mes)}: si vas a necesitar el carro todo el semestre, el de seis meses equivale a un mes gratis. Si solo te toca pico y placa unos días al mes y puedes organizarte, los permisos diarios salen más baratos.` },
    { q: '¿El Pico y Placa Solidario sirve para el pico y placa regional?', a: 'La Alcaldía presenta el Solidario como excepción al pico y placa de vehículos particulares dentro de la ciudad, de lunes a viernes. El pico y placa regional de los lunes festivos es otra medida, con sus propias franjas por placa par e impar en los corredores de entrada; antes de contar con el permiso para ese día, confirma con la Secretaría de Movilidad.' },
  ],
  body: (h) => `
<h2>Qué compras exactamente</h2>
<p>El permiso libera a una placa concreta de la restricción de pico y placa de particulares en Bogotá durante el periodo pagado. No te exime de otras normas: el pico y placa ambiental, los cierres por eventos o las restricciones de carga siguen valiendo. Tampoco se transfiere: si vendes el carro, el permiso se queda con la placa.</p>
<p>Bogotá lo llama «solidario» porque el dinero se destina a financiar la movilidad de la ciudad. Es la contrapartida de una regla que restringe cada placa aproximadamente la mitad de los días hábiles: quien no puede prescindir del carro paga por el espacio que ocupa.</p>
<h2>Los valores de 2026</h2>
${h.table(['Permiso', 'Valor base 2026'], [['Un día', cop(S.dia)], ['Un mes', cop(S.mes)], ['Seis meses', cop(S.semestre)]], 'Resolución 120963 de 2026, Secretaría Distrital de Movilidad. El precio final multiplica esta base por los factores del vehículo.', ['l', 'r'])}
<p>La resolución actualizó la base con el IPC y endureció el factor de los vehículos matriculados fuera de la ciudad, que pasó de ${num(S.factorAntes, 'co', 1)} a ${num(S.factorFuera, 'co', 1)}. La medida apunta a los miles de carros de la Sabana que entran cada día a Bogotá con matrícula de otros municipios, donde los impuestos son más bajos.</p>
<h2>Los factores que no podemos calcular por ti</h2>
<p>El simulador de esta página aplica solo el factor de matrícula, porque es el único que la Alcaldía publica con una cifra clara para 2026. Los factores por avalúo, modelo y tipo de combustible los calcula la plataforma de la Secretaría al ingresar la placa, con los datos del RUNT. Por eso el valor del simulador es una base de comparación, no el precio que vas a pagar.</p>
<h2>Alternativas al pago</h2>
<p>La Alcaldía reconoce otras dos excepciones gratuitas: los carros eléctricos e híbridos de fábrica, inscritos ante la Secretaría de Movilidad, y los vehículos que circulan con tres ocupantes o más, registrados previamente como vehículo compartido. Ver ${h.a('pico-y-placa-electricos-hibridos', 'eléctricos e híbridos')}. Para saber cuántos días te toca de verdad y comparar con el costo del permiso, el ${h.a('calendario-pico-y-placa', 'calendario del pico y placa')} cuenta tus días del mes.</p>
<h2>En Cali existe algo parecido</h2>
<p>Cali tiene una tasa por congestión, creada por el Acuerdo Distrital 0563 de 2023, que cumple una función parecida: quien la paga queda en la lista de vehículos exceptuados del decreto del semestre. Su valor lo fija la Secretaría de Movilidad de Cali. Para el resto de reglas de Bogotá, ver ${h.a('pico-y-placa-bogota', 'pico y placa en Bogotá')}.</p>
`,
  related: ['pico-y-placa-bogota', 'pico-y-placa-electricos-hibridos', 'calendario-pico-y-placa', 'pico-y-placa-regional-bogota', 'multa-pico-y-placa'],
  sources: ['bog_solidario_2026', 'movilidad_bogota', 'bog_excepciones', 'cali_borrador_2s2026'],
});

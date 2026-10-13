/** Exemptions du Hoy No Circula selon le type de véhicule (programme 2S2026, §14.1 ; PCAA 2019, XII). */
import type { MiniSpec } from '../mini-types';
export default function (): MiniSpec {
  const T = [
    ['Eléctrico o de celda de combustible', 'Exento', 'Exento', 'si'],
    ['Híbrido HEV, PHEV o REEV con holograma exento', 'Exento', 'Exento', 'si'],
    ['Híbrido suave (MHEV)', 'Según su holograma (0, 00, 1 o 2)', 'Según su holograma', 'warn'],
    ['Motocicleta', 'Exenta', 'Fase I exenta; Fase II la mitad', 'warn'],
    ['Auto antiguo con matrícula de la CDMX', 'Exento', 'Como holograma 2', 'warn'],
    ['Con placa o permiso para persona con discapacidad', 'Exento', 'Exento', 'si'],
  ] as const;
  return {
    tz: 'America/Mexico_City', title: '¿Mi vehículo está exento del Hoy No Circula?', cta: 'Consultar mi placa', ctaHref: '/es/hoy-no-circula/',
    inputs: [{ id: 't', label: 'Tipo de vehículo', def: 1, options: T.map((x, i) => ({ value: String(i), label: x[0] })) }],
    run: (v) => { const x = T[v.t] ?? T[0]; return { head: [x[0], x[1]], tone: x[3], rows: [['Hoy No Circula', x[1]], ['Contingencia ambiental', x[2]]] }; },
  };
}

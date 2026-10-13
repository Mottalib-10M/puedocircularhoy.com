/** Pays et rubriques du site. Chaque page nomme son groupe ; menus, pied de page et fil d'Ariane les lisent. */
export type Country = 'mx' | 'co';
export type Group = 'hnc' | 'verif' | 'pyp-ciudad' | 'pyp-reglas';
export interface GroupInfo { id: Group; country: Country; label: string; short: string }
export const GROUPS: GroupInfo[] = [
  { id: 'hnc', country: 'mx', label: 'Hoy No Circula (CDMX y Edomex)', short: 'Hoy No Circula' },
  { id: 'verif', country: 'mx', label: 'Verificación y contingencias', short: 'Verificación' },
  { id: 'pyp-ciudad', country: 'co', label: 'Pico y placa por ciudad', short: 'Pico y placa' },
  { id: 'pyp-reglas', country: 'co', label: 'Pico y placa: reglas y multas', short: 'Reglas Colombia' },
];
export const groupInfo = (id: Group): GroupInfo => GROUPS.find((g) => g.id === id)!;
/** Variante de langue et fuseau de chaque pays (formats, dates, <html lang>). */
export const COUNTRY = {
  mx: { name: 'México', tag: 'es-MX', og: 'es_MX', tz: 'America/Mexico_City', currency: 'MXN' },
  co: { name: 'Colombia', tag: 'es-CO', og: 'es_CO', tz: 'America/Bogota', currency: 'COP' },
} as const;

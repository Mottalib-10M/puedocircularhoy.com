/** Électriques et hybrides : exemption nationale (Ley 1964 de 2019) ou locale selon la ville. */
import type { MiniSpec } from '../mini-types';
export default function (): MiniSpec {
  const ciudades = [
    { n: 'Bogotá', h: 'exento tras inscribirlo en la Secretaría de Movilidad' },
    { n: 'Medellín y Valle de Aburrá', h: 'exento automático si el RUNT dice híbrido eléctrico' },
    { n: 'Cali', h: 'exento si el combustible del RUNT es Gasolina/Eléctrico o Diésel/Eléctrico' },
    { n: 'Pereira', h: 'exento según la licencia de tránsito' },
    { n: 'Otra ciudad', h: 'depende del decreto local' },
  ];
  return {
    tz: 'America/Bogota', title: '¿Mi carro eléctrico o híbrido tiene pico y placa?', cta: 'Consulta tu ciudad', ctaHref: '/es/pico-y-placa/',
    inputs: [{ id: 't', label: 'Tipo de carro', def: 1, options: [{ value: '0', label: 'Eléctrico' }, { value: '1', label: 'Híbrido' }, { value: '2', label: 'Gasolina o diésel' }] }, { id: 'c', label: 'Ciudad', def: 0, options: ciudades.map((c, i) => ({ value: String(i), label: c.n })) }],
    run: (v) => {
      const c = ciudades[v.c] ?? ciudades[0];
      if (v.t === 0) return { head: ['Carro eléctrico', 'Exento'], tone: 'si', rows: [['Fundamento', 'Ley 1964 de 2019, artículo 6'], ['Excepción', 'medidas por seguridad']] };
      if (v.t === 2) return { head: ['Gasolina o diésel', 'Tiene pico y placa'], tone: 'no', rows: [['Salvo', 'una excepción local (Solidario en Bogotá, tasa en Cali)']] };
      return { head: [`Híbrido en ${c.n}`, v.c === 4 ? 'Depende' : 'Exento con condiciones'], tone: v.c === 4 ? 'warn' : 'si', rows: [['Regla', c.h]] };
    },
  };
}

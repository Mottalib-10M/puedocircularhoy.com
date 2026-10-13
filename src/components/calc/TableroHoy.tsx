/** Tableau du jour : quelles terminaisons ne circulent pas aujourd'hui et demain, à Mexico et dans chaque ville. */
import { useEffect, useState } from 'react';
import { mxDia, type MxParams } from '../../lib/engine/mx';
import { coDia, type Ciudad } from '../../lib/engine/co';
import { addDays, todayIn } from '../../lib/engine/dates';
import { digits, fechaDia } from '../../lib/fmt';

declare const __BUILD_DAY__: string;
interface Props { p: MxParams; ciudades: Ciudad[]; festivos: string[]; links: Record<string, string> }
const D = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function mxTxt(p: MxParams, f: string) {
  const no = D.filter((d) => mxDia(p, f, d, '1').circula === false);
  const no2 = D.filter((d) => mxDia(p, f, d, '2').circula === false);
  if (!no2.length) return 'Sin Hoy No Circula';
  if (no.length === no2.length) return `Terminación ${digits(no)} (hologramas 1 y 2)`;
  return `Holograma 2: todas · holograma 1: ${no.length ? digits(no) : 'circula'}`;
}
function coTxt(c: Ciudad, f: string, festivos: string[]) {
  const r = coDia(c, f, 0, 'carro', festivos); const r1 = coDia(c, f, 1, 'carro', festivos);
  const x = r.estado === 'sin-datos' ? r : r1;
  if (x.estado === 'festivo') return 'Festivo: sin pico y placa';
  if (x.estado === 'fin-de-semana' || x.estado === 'sin-medida') return 'Sin pico y placa';
  if (x.estado === 'sin-datos') return 'Rotación no publicada';
  return `Placas ${digits(x.restringidos)}`;
}
export default function TableroHoy({ p, ciudades, festivos, links }: Props) {
  const [hoy, setHoy] = useState(__BUILD_DAY__);
  useEffect(() => { setHoy(todayIn('America/Bogota')); }, []);
  const m = addDays(hoy, 1);
  const rows = [{ k: 'cdmx', n: 'Ciudad de México y Edomex', a: mxTxt(p, hoy), b: mxTxt(p, m) }, ...ciudades.map((c) => ({ k: c.slug, n: c.nombre, a: coTxt(c, hoy, festivos), b: coTxt(c, m, festivos) }))];
  return (
    <div data-chrome className="not-prose overflow-x-auto">
      <table className="journal w-full text-sm">
        <caption className="mb-2 text-left text-sm text-navy-600">Restricción de autos particulares, calculada para hoy {fechaDia(hoy)} y mañana con las reglas vigentes (sin contingencias).</caption>
        <thead><tr><th scope="col" className="px-3 py-2 text-left">Ciudad</th><th scope="col" className="px-3 py-2 text-left">Hoy no circulan</th><th scope="col" className="px-3 py-2 text-left">Mañana no circulan</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.k}><th scope="row" className="border-b border-navy-100 px-3 py-2 text-left font-semibold">{links[r.k] ? <a className="text-accent-700 underline" href={links[r.k]}>{r.n}</a> : r.n}</th><td className="border-b border-navy-100 px-3 py-2">{r.a}</td><td className="border-b border-navy-100 px-3 py-2">{r.b}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

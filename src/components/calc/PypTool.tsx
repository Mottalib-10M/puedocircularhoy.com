/**
 * Pico y placa : ville, chiffre de la plaque, voiture ou moto → aujourd'hui, demain, prochain jour restreint.
 * Premier rendu : __BUILD_DAY__ (RECETTE §17.5) ; après montage, le jour courant à Bogotá et les paramètres du lien.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { LockedField, Rows, Verdict, digitOptions, type Tone } from './parts';
import { coDia, coProximo, type Ciudad, type ResultadoDia, type Vehiculo } from '../../lib/engine/co';
import { addDays, todayIn } from '../../lib/engine/dates';
import { fechaDia, digits, fecha as fmtFecha } from '../../lib/fmt';
import { readParams, str, num, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { ciudades: Ciudad[]; festivos: string[]; city?: string; lockCity?: boolean; vehiculo?: Vehiculo; methodHref: string; calHref?: string; idPrefix?: string; manana?: boolean }

const horasTxt = (h: Array<[string, string]>) => h.map(([a, b]) => `${hh(a)} a ${hh(b)}`).join(' y ');
function hh(t: string) { const [H, M] = t.split(':').map(Number); const ap = H < 12 ? 'a. m.' : H === 12 ? 'm.' : 'p. m.'; const h12 = H % 12 === 0 ? 12 : H % 12; return `${h12}:${String(M).padStart(2, '0')} ${ap}`; }

export function estadoTxt(r: ResultadoDia): [string, Tone] {
  switch (r.estado) {
    case 'restringido': return ['Tiene pico y placa', 'no'];
    case 'libre': return ['Puede circular', 'si'];
    case 'festivo': return ['Festivo: sin pico y placa', 'si'];
    case 'fin-de-semana': return ['Sin pico y placa', 'si'];
    case 'sin-medida': return ['Sin pico y placa', 'si'];
    default: return ['Rotación no publicada', 'na'];
  }
}

export default function PypTool({ ciudades, festivos, city = 'bogota', lockCity = false, vehiculo: v0 = 'carro', methodHref, calHref, idPrefix = 'pyp', manana = false }: Props) {
  const [slug, setSlug] = useState(city);
  const [digit, setDigit] = useState(4);
  const [veh, setVeh] = useState<Vehiculo>(v0);
  const [hoy0, setHoy] = useState(__BUILD_DAY__);
  const hoy = manana ? addDays(hoy0, 1) : hoy0;
  useEffect(() => {
    const u = readParams(window.location.search);
    if (!lockCity) setSlug(str(u, 'ciudad', city));
    setDigit(num(u, 'placa', 4));
    setVeh(str(u, 'vehiculo', v0) === 'moto' ? 'moto' : 'carro');
    setHoy(todayIn('America/Bogota'));
  }, []);
  const c = ciudades.find((x) => x.slug === slug) ?? ciudades[0];
  const vehic: Vehiculo = veh === 'moto' && c.motos ? 'moto' : 'carro';
  useEffect(() => { updateURL({ ciudad: lockCity ? undefined : slug, placa: digit, vehiculo: vehic === 'moto' ? 'moto' : undefined }); }, [slug, digit, vehic]);
  const r = useMemo(() => {
    const d0 = coDia(c, hoy, digit, vehic, festivos);
    const d1 = coDia(c, addDays(hoy, 1), digit, vehic, festivos);
    const next = coProximo(c, addDays(hoy, 1), digit, vehic, festivos);
    return { d0, d1, next };
  }, [c, hoy, digit, vehic, festivos]);
  const [v, tone] = estadoTxt(r.d0);
  const regla = vehic === 'moto' ? c.motos : c.carro;
  const rows: Array<[string, string]> = [
    [`${manana ? 'Pasado mañana' : 'Mañana'}, ${fechaDia(addDays(hoy, 1))}`, estadoTxt(r.d1)[0]],
    ['Próximo día con pico y placa', r.next ? fechaDia(r.next.fecha) : 'sin fecha publicada'],
  ];
  if (r.d0.restringidos.length) rows.push([`Placas restringidas ${manana ? 'mañana' : 'hoy'} en ${c.nombre}`, digits(r.d0.restringidos)]);
  if (regla && regla.esquema !== 'ninguno') rows.push(['Horario', horasTxt(regla.horas)]);
  const sub = r.d0.estado === 'restringido' ? `${manana ? 'Mañana' : 'Hoy'} ${fechaDia(hoy)}, de ${horasTxt(r.d0.horas)}.` : r.d0.estado === 'sin-datos' ? `La alcaldía no ha publicado la rotación para el ${fmtFecha(hoy)}: consulta el decreto nuevo.` : `${manana ? 'Mañana' : 'Hoy'} ${fechaDia(hoy)} en ${c.nombre}.`;
  const opts = ciudades.map((x) => ({ value: x.slug, label: x.nombre }));
  const digLabel = vehic === 'moto' && c.motos?.digito === 'primero' ? 'Primer número de la placa' : 'Último número de la placa';
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <form className="grid content-start grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {lockCity ? <LockedField label="Ciudad" value={c.nombre} help={c.depto} /> : <SelectField id={`${idPrefix}-ciudad`} label="Ciudad" value={slug} onChange={setSlug} options={opts} />}
        <SelectField id={`${idPrefix}-placa`} label={digLabel} value={String(digit)} onChange={(x) => setDigit(Number(x))} options={digitOptions(vehic === 'moto' && c.motos?.digito === 'primero' ? 'Empieza en' : 'Termina en')} />
        {c.motos ? <Toggle id={`${idPrefix}-veh`} label="Vehículo" value={vehic} onChange={(x) => setVeh(x as Vehiculo)} options={[{ value: 'carro', label: 'Carro' }, { value: 'moto', label: 'Moto' }]} /> : <LockedField label="Vehículo" value="Carro particular" help={c.motosNota} />}
      </form>
      <Verdict label={`${manana ? 'Mañana' : 'Hoy'} en ${c.nombre}, placa ${vehic === 'moto' ? 'de moto ' : ''}${digit}`} value={v} tone={tone} sub={sub} methodHref={methodHref} note={`${c.decreto}. Datos comprobados hasta el ${fmtFecha(c.vigencia.hasta)}.`}>
        <Rows rows={rows} />
        {c.nota && <p className="mt-2 text-sm text-navy-800">{c.nota}</p>}
        {calHref && <p className="mt-2 text-sm"><a className="font-medium text-accent-700 underline" href={calHref}>Ver el calendario del mes</a></p>}
      </Verdict>
    </div>
  );
}

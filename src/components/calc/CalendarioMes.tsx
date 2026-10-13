/**
 * Calendrier du mois : chaque jour marqué « no circula » ou « circula » pour une plaque, au Mexique
 * (holograma) ou dans une ville colombienne. Premier rendu : mois de __BUILD_DAY__ ; après montage, mois courant.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { LockedField, digitOptions } from './parts';
import { mxDia, type Holo, type MxParams } from '../../lib/engine/mx';
import { coDia, type Ciudad, type Vehiculo } from '../../lib/engine/co';
import { iso, monthDays, parts, todayIn, weekday } from '../../lib/engine/dates';
import { mes } from '../../lib/fmt';
import { HOLOS } from './HncTool';
import { readParams, str, num, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { modo: 'mx' | 'co'; p?: MxParams; ciudades?: Ciudad[]; festivos?: string[]; city?: string; lockCity?: boolean; holo?: Holo; methodHref: string; idPrefix?: string }
type Cell = { f: string; tipo: 'no' | 'si' | 'na' | 'warn'; nota: string };

export default function CalendarioMes({ modo, p, ciudades = [], festivos = [], city = 'bogota', lockCity = false, holo: h0 = '1', methodHref, idPrefix = 'cal' }: Props) {
  const [digit, setDigit] = useState(modo === 'mx' ? 5 : 4);
  const [holo, setHolo] = useState<Holo>(h0);
  const [slug, setSlug] = useState(city);
  const [veh, setVeh] = useState<Vehiculo>('carro');
  const [ym, setYm] = useState(__BUILD_DAY__.slice(0, 7));
  const [base, setBase] = useState(__BUILD_DAY__.slice(0, 7));
  useEffect(() => {
    const u = readParams(window.location.search);
    setDigit(num(u, 'placa', modo === 'mx' ? 5 : 4));
    if (!lockCity && modo === 'co') setSlug(str(u, 'ciudad', city));
    const t = todayIn(modo === 'mx' ? 'America/Mexico_City' : 'America/Bogota').slice(0, 7); setYm(t); setBase(t);
  }, []);
  useEffect(() => { updateURL({ placa: digit, holo: modo === 'mx' ? holo : undefined, ciudad: modo === 'co' && !lockCity ? slug : undefined }); }, [digit, holo, slug]);
  const c = ciudades.find((x) => x.slug === slug) ?? ciudades[0];
  const vehic: Vehiculo = veh === 'moto' && c?.motos ? 'moto' : 'carro';
  const [y, m] = ym.split('-').map(Number);
  // Mois proposés : du mois de départ aux 5 suivants, et pour la Colombie dans la période vérifiée.
  const months = useMemo(() => {
    const out: string[] = []; let [yy, mm] = base.split('-').map(Number);
    for (let i = 0; i < 6; i++) { out.push(`${yy}-${String(mm).padStart(2, '0')}`); mm++; if (mm > 12) { mm = 1; yy++; } }
    return modo === 'co' && c ? out.filter((x) => `${x}-01` <= c.vigencia.hasta) : out;
  }, [base, modo, c]);
  const cells: Cell[] = useMemo(() => monthDays(y, m).map((f) => {
    if (modo === 'mx' && p) {
      const r = mxDia(p, f, digit, holo);
      return { f, tipo: r.circula === true ? 'si' : r.circula === false ? 'no' : 'warn', nota: r.circula === false ? 'No circula' : r.circula === true ? 'Circula' : 'Desde 11:00' };
    }
    const r = coDia(c, f, digit, vehic, festivos);
    const tipo = r.estado === 'restringido' ? 'no' : r.estado === 'sin-datos' ? 'na' : 'si';
    const nota = r.estado === 'restringido' ? 'Pico y placa' : r.estado === 'festivo' ? 'Festivo' : r.estado === 'sin-datos' ? 'Sin datos' : 'Libre';
    return { f, tipo, nota };
  }), [y, m, digit, holo, slug, vehic, modo]);
  const nNo = cells.filter((x) => x.tipo === 'no').length;
  const lead = (weekday(iso(y, m, 1)) + 6) % 7; // lunes primero
  const CL: Record<Cell['tipo'], string> = { no: 'bg-red-50 border-red-700 text-red-800', si: 'bg-white border-navy-200 text-navy-700', na: 'bg-navy-50 border-navy-300 text-navy-600', warn: 'bg-amber-50 border-amber-700 text-amber-900' };
  return (
    <div data-chrome className="not-prose grid gap-5 rounded-xl border border-navy-200 bg-white p-4 sm:p-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
      <form className="grid grid-cols-1 content-start gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-1" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-mes`} label="Mes" value={ym} onChange={setYm} options={(months.includes(ym) ? months : [ym, ...months]).map((x) => ({ value: x, label: `${mes(Number(x.slice(5)))} de ${x.slice(0, 4)}` }))} />
        <SelectField id={`${idPrefix}-placa`} label={vehic === 'moto' && c?.motos?.digito === 'primero' ? 'Primer número de la placa' : 'Último número de la placa'} value={String(digit)} onChange={(x) => setDigit(Number(x))} options={digitOptions(vehic === 'moto' && c?.motos?.digito === 'primero' ? 'Empieza en' : 'Termina en')} />
        {modo === 'mx' && <SelectField id={`${idPrefix}-holo`} label="Holograma" value={holo} onChange={(x) => setHolo(x as Holo)} options={HOLOS} />}
        {modo === 'co' && (lockCity ? <LockedField label="Ciudad" value={c.nombre} /> : <SelectField id={`${idPrefix}-ciudad`} label="Ciudad" value={slug} onChange={setSlug} options={ciudades.map((x) => ({ value: x.slug, label: x.nombre }))} />)}
        {modo === 'co' && c?.motos && <Toggle id={`${idPrefix}-veh`} label="Vehículo" value={vehic} onChange={(x) => setVeh(x as Vehiculo)} options={[{ value: 'carro', label: 'Carro' }, { value: 'moto', label: 'Moto' }]} />}
      </form>
      <div>
        <div data-resultat aria-live="polite" className={`mb-3 rounded-lg border-l-4 p-3 ${nNo ? 'border-red-700 bg-red-50' : 'border-emerald-700 bg-emerald-50'}`}>
          <p className="text-sm text-navy-700">{mes(m)} de {y}{modo === 'co' && c ? ` en ${c.nombre}` : ''}, terminación {digit}</p>
          <p className={`font-serif text-2xl font-bold ${nNo ? 'text-red-800' : 'text-emerald-800'}`}>{nNo === 0 ? 'Sin restricción este mes' : `${nNo} ${nNo === 1 ? 'día' : 'días'} sin circular`}</p>
          <p className="mt-1 text-xs text-navy-700">{modo === 'mx' ? 'Sin contingencias: esas se anuncian el día anterior.' : 'Festivos, sábados y domingos incluidos según el decreto.'} <a className="underline" href={methodHref}>Cómo calculamos</a>.</p>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs" role="table" aria-label={`Calendario de ${mes(m)} de ${y}`}>
          {['lu', 'ma', 'mi', 'ju', 'vi', 'sá', 'do'].map((d) => <div key={d} role="columnheader" className="py-1 font-semibold uppercase text-navy-600">{d}</div>)}
          {Array.from({ length: lead }, (_, i) => <div key={`e${i}`} aria-hidden="true" />)}
          {cells.map((x) => <div key={x.f} role="cell" className={`min-h-[3.25rem] rounded border p-1 ${CL[x.tipo]}`}><div className="text-sm font-semibold tabular-nums">{parts(x.f)[2]}</div><div className="leading-tight">{x.nota}</div></div>)}
        </div>
      </div>
    </div>
  );
}

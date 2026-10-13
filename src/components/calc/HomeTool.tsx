/** Accueil : un sélecteur de pays, puis l'outil du pays (Hoy No Circula ou pico y placa). */
import { useEffect, useState } from 'react';
import HncTool from './HncTool';
import PypTool from './PypTool';
import type { MxParams } from '../../lib/engine/mx';
import type { Ciudad } from '../../lib/engine/co';
import { readParams, str } from '../../lib/url-state';

interface Props { p: MxParams; ciudades: Ciudad[]; festivos: string[]; methodHref: string; calMx?: string; calCo?: string; contHref?: string }
export default function HomeTool({ p, ciudades, festivos, methodHref, calMx, calCo, contHref }: Props) {
  const [pais, setPais] = useState<'mx' | 'co'>('mx');
  useEffect(() => { const u = readParams(window.location.search); if (str(u, 'pais', '') === 'co' || u.get('ciudad')) setPais('co'); }, []);
  return (
    <div>
      <div role="tablist" aria-label="País" className="mb-3 inline-grid grid-flow-col auto-cols-fr gap-1 rounded-lg border border-navy-300 bg-white p-1">
        {([['mx', 'México: CDMX y Edomex'], ['co', 'Colombia: pico y placa']] as const).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={pais === k} onClick={() => setPais(k)} className={`h-10 whitespace-nowrap rounded-md px-3 text-sm font-semibold ${pais === k ? 'bg-accent-600 text-white' : 'text-navy-700 hover:bg-navy-50'}`}>{l}</button>
        ))}
      </div>
      {pais === 'mx'
        ? <HncTool p={p} methodHref={methodHref} calHref={calMx} contHref={contHref} idPrefix="home-mx" />
        : <PypTool ciudades={ciudades} festivos={festivos} methodHref={methodHref} calHref={calCo} idPrefix="home-co" />}
    </div>
  );
}

/**
 * Mini-simulateur de page (RECETTE §9.3) : un à trois champs, le verdict ou le chiffre du sujet, deux à
 * quatre lignes, un lien vers l'outil complet. Le calcul vient des moteurs (lib/minis/<kind>.ts).
 * Premier rendu = valeurs par défaut et __BUILD_DAY__ (§17.5) ; ensuite, le jour courant du pays.
 * `data-chrome` : le texte du widget ne compte ni dans les mots ni dans la comparaison entre pages.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { getSpec } from '../../lib/mini-specs';
import { todayIn } from '../../lib/engine/dates';

declare const __BUILD_DAY__: string;
interface Props { kind: string; lang?: string; href?: string; spacing?: string; arg?: string }
const TONE: Record<string, string> = { si: 'text-emerald-800', no: 'text-red-800', na: 'text-navy-800', warn: 'text-amber-900' };

export default function MiniSim({ kind, href, arg, spacing = 'my-8' }: Props) {
  const spec = useMemo(() => getSpec(kind, 'es', arg), [kind, arg]);
  const [v, setV] = useState<Record<string, number>>(() => Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])));
  const [hoy, setHoy] = useState(__BUILD_DAY__);
  useEffect(() => { setHoy(todayIn(spec.tz ?? 'America/Mexico_City')); }, []);
  const out = useMemo(() => spec.run(v, hoy), [v, spec, hoy]);
  const set = (id: string) => (x: number) => setV((o) => ({ ...o, [id]: x }));
  return (
    <div data-chrome data-mini={kind} data-simulateur-secondaire className={`not-prose ${spacing} rounded-xl border border-accent-200 bg-white p-4 sm:p-5`}>
      <p className="text-base font-semibold text-navy-900">{spec.title}</p>
      <div className="mt-3 grid gap-5 sm:grid-cols-2">
        <form className="grid content-start gap-y-3" onSubmit={(e) => e.preventDefault()}>
          {spec.inputs.map((i) => i.options
            ? <SelectField key={i.id} id={`m-${kind}-${i.id}`} label={i.label} value={String(v[i.id])} onChange={(x) => set(i.id)(Number(x))} options={i.options} />
            : <NumberField key={i.id} id={`m-${kind}-${i.id}`} label={i.label} value={v[i.id]} onChange={set(i.id)} unit={i.unit} max={i.max} decimals={i.decimals} />)}
        </form>
        <div aria-live="polite" className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-700">{out.head[0]}</p>
          <p className={`mt-1 font-serif text-2xl font-bold ${TONE[out.tone ?? 'na']}`}>{out.head[1]}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {out.rows.map(([l, x]) => <tr key={l}><td className="py-1.5 pr-3 text-navy-700">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
          </tbody></table>
          {out.note && <p className="mt-2 text-xs text-navy-600">{out.note}</p>}
        </div>
      </div>
      {(spec.ctaHref ?? href) && spec.cta && <a href={spec.ctaHref ?? href} className="mt-4 inline-block text-sm font-medium text-accent-700 hover:underline">{spec.cta} →</a>}
    </div>
  );
}

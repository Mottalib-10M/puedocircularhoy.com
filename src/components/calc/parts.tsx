/** Pièces communes des outils : carte de verdict, lignes de détail, partage et impression, champ verrouillé. */
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function LockedField({ label, value, help, className = '' }: { label: string; value: string; help?: string; className?: string }) {
  return (
    <div className={`grid grid-rows-subgrid row-span-3 content-start gap-y-0 ${className}`}>
      <span className="mb-1 block text-sm font-medium text-navy-700">{label}</span>
      <p className="flex h-12 items-center rounded-lg border border-navy-200 bg-navy-50 px-4 font-semibold text-navy-900">{value}</p>
      <span className="mt-1 text-xs text-navy-500">{help ?? ''}</span>
    </div>
  );
}

export function Rows({ rows }: { rows: Array<[string, string]> }) {
  return (
    <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
      {rows.map(([l, x], i) => <tr key={`${l}-${i}`}><td className="py-1.5 pr-3 text-navy-700">{l}</td><td className="tabular-nums py-1.5 text-right font-medium text-navy-900">{x}</td></tr>)}
    </tbody></table>
  );
}

/** Ton du verdict : vert (circula), rouge (no circula), gris (sin datos), ambre (à vérifier : contingence). */
export type Tone = 'si' | 'no' | 'na' | 'warn';
const TONE: Record<Tone, string> = {
  si: 'border-emerald-700 bg-emerald-50',
  no: 'border-red-700 bg-red-50',
  na: 'border-navy-400 bg-navy-50',
  warn: 'border-amber-700 bg-amber-50',
};
const TONE_TXT: Record<Tone, string> = { si: 'text-emerald-800', no: 'text-red-800', na: 'text-navy-800', warn: 'text-amber-900' };

export function Verdict({ label, value, tone, sub, children, methodHref, note }: { label: string; value: string; tone: Tone; sub?: string; children?: ReactNode; methodHref: string; note: string }) {
  const [copied, setCopied] = useState(false);
  // Téléphone : tant que la carte est sous l'écran, une barre collée en bas montre le verdict (RECETTE §5, 2026-10-11).
  const card = useRef<HTMLDivElement>(null);
  const [below, setBelow] = useState(false);
  useEffect(() => {
    const el = card.current;
    if (!el || typeof IntersectionObserver === 'undefined' || document.querySelector('main [data-resultat]') !== el) return;
    const io = new IntersectionObserver(([e]) => setBelow(!e.isIntersecting && e.boundingClientRect.top > 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const copy = () => { navigator.clipboard?.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <div ref={card} aria-live="polite" data-resultat className={`rounded-xl border-l-4 p-4 sm:p-5 ${TONE[tone]}`}>
      <p className="text-sm font-medium text-navy-700">{label}</p>
      <p className={`mt-1 font-serif text-3xl font-bold sm:text-4xl ${TONE_TXT[tone]}`}>{value}</p>
      {sub && <p className="mt-1 text-sm text-navy-800">{sub}</p>}
      {children}
      <p className="mt-3 text-xs text-navy-700">{note} <a className="underline" href={methodHref}>Cómo calculamos</a>.</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <button type="button" onClick={copy} className="rounded-lg border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">{copied ? 'Enlace copiado' : 'Copiar enlace'}</button>
        <button type="button" onClick={() => window.print()} className="rounded-lg border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">Imprimir</button>
      </div>
      {below && (
        <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => card.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className={`fixed inset-x-0 bottom-0 z-40 flex items-baseline justify-between gap-3 border-t px-4 py-3 text-left shadow-lg lg:hidden ${TONE[tone]}`}>
          <span className="min-w-0 truncate text-sm font-medium text-navy-700">{label}</span>
          <span className={`shrink-0 whitespace-nowrap text-lg font-bold ${TONE_TXT[tone]}`}>{value}</span>
        </button>
      )}
    </div>
  );
}

export const digitOptions = (label = 'Termina en') => Array.from({ length: 10 }, (_, i) => ({ value: String((i + 1) % 10), label: `${label} ${(i + 1) % 10}` }));

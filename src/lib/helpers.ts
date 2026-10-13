/** Outils d'écriture (`Helpers`) passés au corps de chaque page. */
import { route, ROUTES } from '../i18n/routes';
import type { Helpers } from './page-types';
import { KIT, P } from './kit';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export const SOURCES: Record<string, { url: string; label: string }> = (P as unknown as { sources: Record<string, { url: string; label: string }> }).sources;

export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = []) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 font-semibold text-navy-900 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(String(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
export function link(id: string, text: string) {
  // Un identifiant inconnu fait échouer tests/pages.test.ts ; au build le texte reste, sans lien.
  if (!ROUTES.some((r) => r.id === id)) { if (process.env.VITEST && !process.env.ALLOW_PLANNED) throw new Error(`Lien vers une page inconnue : ${id}`); return text; }
  return `<a href="${route(id, 'es')}">${text}</a>`;
}
export const box = (title: string, html: string) => `<aside class="boxnote not-prose"><p class="boxnote-title">${title}</p><div class="text-navy-800">${html}</div></aside>`;
/** Marque remplacée par un îlot MiniSim dans le composant de page. */
export const mini = (kind: string, arg?: unknown) => `<!--mini:${kind}${arg === undefined ? '' : `|${Buffer.from(JSON.stringify(arg)).toString('base64')}`}-->`;
export function helpers(): Helpers {
  return {
    ...KIT,
    a: link,
    table,
    src: (key: string, text?: string) => { const s = SOURCES[key]; if (!s) throw new Error(`Source inconnue ${key}`); return ext(s.url, text ?? s.label); },
    ext,
    box,
    mini,
  };
}

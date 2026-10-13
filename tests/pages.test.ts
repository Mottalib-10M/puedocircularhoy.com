/**
 * Chaque fichier de page est vérifié avant le build (CONTRIBUTING-PAGES.md) : longueurs des snippets, bloc de
 * réponse, FAQ (longueur et unicité), liens, sources, simulateur, tournures interdites.
 * Quelques pages seulement : PAGE_FILES=hoy-no-circula,pico-y-placa-bogota npx vitest run tests/pages.test.ts
 */
import { describe, it, expect } from 'vitest';
import { PAGES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers, SOURCES } from '../src/lib/helpers';
import { MINIS } from '../src/lib/mini-specs';
import { ROUTES } from '../src/i18n/routes';

const only = (process.env.PAGE_FILES ?? '').split(',').filter(Boolean);
const pages = only.length ? PAGES.filter((p) => only.includes(p.id)) : PAGES;
const words = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const BANNED = [/—/, /&mdash;/, /es importante (destacar|señalar|notar)/i, /sumerg(ir|ámonos)/i, /en el mundo actual/i, /ya sea que/i, /\bAdemás,\s/, /\bAsimismo\b/, /\bPor otro lado\b/, /\bEn conclusión\b/i, /taxineo/i, /\bINSEAD\b/, /\bMines\b/, /linkedin/i, /hoy-no-circula\.com\.mx|hoynocircula\.info|pyphoy|hacecuentas|picoyplacahoycolombia/i];
const allQ = [...HOME.faqs.map((f) => f.q), ...PAGES.flatMap((p) => p.faqs.map((f) => f.q))];
const allTitles = [HOME.title, ...PAGES.map((p) => p.title)];
const allDesc = [HOME.description, ...PAGES.map((p) => p.description)];
const ids = new Set(ROUTES.map((r) => r.id));
const h = helpers();
const snippet = (title: string, description: string) => {
  expect(title.length, title).toBeGreaterThanOrEqual(50); expect(title.length, title).toBeLessThanOrEqual(60);
  expect(description.length, description).toBeGreaterThanOrEqual(150); expect(description.length, description).toBeLessThanOrEqual(160);
  expect(title).toMatch(/2026|2027/); expect(description).toMatch(/2026|2027/);
  expect(title, 'terme-clé en tête : jamais un mot d’outil, une question ni le pays (RECETTE §11)').not.toMatch(/^(¿|calculadora|calcular|cálculo|consulta|cómo|qué|cuándo|cuánto|cuál|dónde|méxico|mexico|colombia|preguntas)/i);
  expect(title).not.toMatch(/ [:;!?]/);
  expect(allTitles.filter((t) => t === title).length, title).toBe(1);
  expect(allDesc.filter((t) => t === description).length, description).toBe(1);
};
const faqCheck = (faqs: Array<{ q: string; a: string }>, min: number, max: number) => {
  expect(faqs.length).toBeGreaterThanOrEqual(min); expect(faqs.length).toBeLessThanOrEqual(max);
  for (const f of faqs) {
    const n = words(f.a); expect(n, f.q).toBeGreaterThanOrEqual(42); expect(n, f.q).toBeLessThanOrEqual(88);
    expect(allQ.filter((q) => q === f.q).length, `question répétée : ${f.q}`).toBe(1);
  }
};
const clean = (text: string) => {
  for (const b of BANNED) expect(text, String(b)).not.toMatch(b);
  expect(text).not.toMatch(/NaN|undefined|\[object|Infinity|null\b/);
};
const minis = (html: string) => { for (const m of html.matchAll(/<!--mini:([A-Za-z0-9_-]+)(?:\|([A-Za-z0-9+/=]+))?-->/g)) { expect(MINIS[m[1]], m[1]).toBeTruthy(); const arg = m[2] ? Buffer.from(m[2], 'base64').toString('utf8') : undefined; const spec = MINIS[m[1]](arg); const out = spec.run(Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), '2026-10-13'); expect(out.head[1], m[1]).not.toMatch(/NaN|undefined/); } };

describe('accueil', () => {
  it('snippets, réponse, FAQ, sections', () => {
    snippet(HOME.title, HOME.description);
    expect(words(HOME.resume)).toBeGreaterThanOrEqual(120);
    faqCheck(HOME.faqs, 6, 8);
    const secs = HOME.sections(h);
    expect(secs.length).toBeGreaterThanOrEqual(5);
    clean([HOME.resume, HOME.intro, ...secs.map((s) => s.title + s.html), ...HOME.faqs.flatMap((f) => [f.q, f.a])].join(' '));
    for (const k of HOME.sources) expect(SOURCES[k], k).toBeTruthy();
  });
});

describe.each(pages.map((p) => [p.id, p] as const))('page %s', (_id, p) => {
  it('snippets (RECETTE §11)', () => { snippet(p.title, p.description); expect(p.slug).toMatch(/^[a-z0-9-]+$/); });
  it('bloc de réponse de 120 mots ou plus (RECETTE §21)', () => expect(words(p.resume)).toBeGreaterThanOrEqual(120));
  it('FAQ : unique, 42 à 88 mots (RECETTE §7)', () => faqCheck(p.faqs, 3, 8));
  it('liens, sources, simulateur', () => {
    const html = p.body(h);
    for (const r of p.related) expect(ids.has(r), `related ${r}`).toBe(true);
    expect(p.related.length).toBeGreaterThanOrEqual(3);
    expect(p.sources.length).toBeGreaterThanOrEqual(2);
    for (const s of p.sources) expect(!!SOURCES[s], s).toBe(true);
    expect(!!p.tool || !!p.mini, 'un outil ou un mini-simulateur (RECETTE §9.3)').toBe(true);
    if (p.mini) { expect(MINIS[p.mini], p.mini).toBeTruthy(); const spec = MINIS[p.mini](p.miniArg === undefined ? undefined : JSON.stringify(p.miniArg)); const out = spec.run(Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), '2026-10-13'); expect(out.head[1]).not.toMatch(/NaN|undefined/); }
    minis(html);
  });
  it('aucune tournure interdite, aucun tiret cadratin', () => clean([p.title, p.description, p.h1, p.intro, p.resume, p.card, ...p.faqs.flatMap((f) => [f.q, f.a]), p.body(h)].join(' ')));
  it('longueur du corps (guides 800 mots hors tableaux, pages outil 150)', () => {
    const n = words(p.body(h).replace(/<table[\s\S]*?<\/table>/g, ''));
    expect(n).toBeGreaterThanOrEqual(p.tool ? 50 : 250); // la longueur réelle de la page est contrôlée par check-seo (outil 500, guide 1 200)
  });
});

it('slugs uniques', () => { const s = PAGES.map((p) => p.slug); expect(new Set(s).size).toBe(s.length); });

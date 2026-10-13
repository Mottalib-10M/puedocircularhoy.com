import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/pages';
/** Espagnol seul (Mexique et Colombie). Le préfixe /es/ vient de la trame : la racine redirige vers /es/,
 *  comme sur tout le portefeuille, et les contrôles s'y attendent. La variante (es-MX ou es-CO) se pose
 *  page par page dans <html lang>, d'après le pays de la page. */
export const LOCALES = ['es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'es';
const R = (id: string, slug: string, noindex = false): RouteDef<Locale> => ({ id, paths: { es: `/es/${slug}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { es: '/es/' } },
  R('method', 'metodologia'),
  R('about', 'sobre-nosotros'),
  R('widget', 'widget', true),
  R('contact', 'contacto', true),
  R('editorial', 'politica-editorial', true),
  R('privacy', 'privacidad', true),
  R('terms', 'aviso-legal', true),
  R('cookies', 'cookies', true),
];
/** Pages de contenu : /es/<slug>/ (une page = un fichier de src/content/pages/). */
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map((p) => R(p.id, p.slug)), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, altPaths } = makeRouter(LOCALES, ROUTES);

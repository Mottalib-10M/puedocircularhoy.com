import { route, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import { GROUPS } from '../lib/topics';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: '¿Puedo circular hoy?', method: 'Cómo calculamos', about: 'Sobre nosotros', widget: 'Insertar la herramienta', contact: 'Contacto', editorial: 'Política editorial', privacy: 'Privacidad', terms: 'Aviso legal', cookies: 'Cookies' };
export const label = (id: string, _lang?: Locale) => CORE[id] ?? pageById(id)?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.short, links: PAGES.filter((p) => p.group === g.id).slice(0, g.id === 'pyp-ciudad' ? 10 : 12).map((p) => link(p.id, lang)) })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.filter((g) => g.id !== 'pyp-ciudad').map((g) => ({ label: g.label, links: PAGES.filter((p) => p.group === g.id).map((p) => link(p.id, lang)) })).filter((c) => c.links.length),
  { label: 'El sitio', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Toutes les villes dans le pied de page : chaque page de ville à un clic de partout (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => PAGES.filter((p) => p.group === 'pyp-ciudad').map((p) => link(p.id, lang));

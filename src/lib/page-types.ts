/**
 * Une page = UN fichier `src/content/pages/<id>.ts` (CONTRIBUTING-PAGES.md). Routes, menus, pied de page,
 * sitemap, schémas et liens internes lisent ces fichiers seuls.
 */
import type { Group } from './topics';
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }

/** Outils d'écriture passés au corps de chaque page : liens, tableaux, sources officielles, données. */
export interface Helpers extends Kit {
  /** Lien interne par identifiant de page ; un identifiant inconnu fait échouer le test des pages. */
  a: (id: string, text: string) => string;
  /** Tableau de style journal ; les nombres sont mis en forme, les chaînes insérées telles quelles (HTML). */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Lien vers une source officielle de params-2026.json (clé). */
  src: (key: string, text?: string) => string;
  ext: (url: string, text: string) => string;
  /** Encadré de presse (filet à gauche). */
  box: (title: string, html: string) => string;
  /** Mini-simulateur dans le corps : `<!--mini:kind|arg-->`, rendu en îlot. */
  mini: (kind: string, arg?: unknown) => string;
}

/** circula : l'outil de l'accueil (Mexique ou Colombie) ; hnc : Hoy No Circula ; hnc-cal : calendrier du mois ;
 *  verif : calendrier de verificación ; pyp : pico y placa d'une ville ; pyp-cal : calendrier pico y placa. */
export type ToolKind = 'hnc' | 'hnc-cal' | 'verif' | 'pyp' | 'pyp-cal';
export interface ToolProps { city?: string; lockCity?: boolean; holo?: string; digit?: number; entidad?: 'cdmx' | 'edomex'; manana?: boolean; vehiculo?: 'carro' | 'moto' }

export interface PageDef {
  id: string;
  group: Group;
  /** pillar : page outil ; guide : une question et son mini-simulateur ; city : une ville colombienne. */
  kind: 'pillar' | 'guide' | 'city';
  order: number;
  slug: string;
  nav: string;
  card: string;
  /** 50 à 60 caractères, terme-clé en tête, année (RECETTE §11). */
  title: string;
  /** 150 à 160 caractères, année. */
  description: string;
  h1: string;
  intro: string;
  /** UN paragraphe de 120 mots ou plus : la réponse directe, chiffres compris (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  tool?: ToolKind;
  toolProps?: ToolProps;
  mini?: string;
  miniArg?: unknown;
  miniHref?: string;
  related: string[];
  /** Clés de params-2026.json > sources. */
  sources: string[];
}
export const definePage = (p: PageDef): PageDef => p;

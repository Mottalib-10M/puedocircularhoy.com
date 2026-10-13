/** Registre : chaque fichier de `src/content/pages/` est chargé ici. */
import type { PageDef } from './page-types';
import { GROUPS, groupInfo, type Country } from './topics';

const mods = import.meta.glob<{ default: PageDef }>(['../content/pages/*.ts', '!../content/pages/_*.ts'], { eager: true });
export const PAGES: PageDef[] = Object.entries(mods)
  .map(([file, m]) => {
    const g = m.default;
    const base = file.split('/').pop()!.replace(/\.ts$/, '');
    if (g.id !== base) throw new Error(`${file}: id "${g.id}" différent du nom du fichier`);
    if (!GROUPS.some((x) => x.id === g.group)) throw new Error(`${file}: groupe inconnu ${g.group}`);
    return g;
  })
  .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
export const pageCountry = (p: PageDef): Country => groupInfo(p.group).country;

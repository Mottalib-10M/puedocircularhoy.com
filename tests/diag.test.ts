import { it } from 'vitest';
import { PAGES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
import { helpers } from '../src/lib/helpers';
const w = (s: string) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
it('diag', () => {
  process.env.ALLOW_PLANNED = '1';
  const h = helpers();
  const out: string[] = [];
  const all = [{ id: 'HOME', title: HOME.title, description: HOME.description, resume: HOME.resume, faqs: HOME.faqs, body: (hh: any) => HOME.sections(hh).map((s) => s.html).join(' '), tool: 'x' } as any, ...PAGES];
  for (const p of all) {
    const b = p.body(h).replace(/<table[\s\S]*?<\/table>/g, '');
    const bad = p.faqs.map((f: any) => w(f.a)).filter((n: number) => n < 42 || n > 88);
    const flags = [p.title.length < 50 || p.title.length > 60 ? `T${p.title.length}` : '', p.description.length < 150 || p.description.length > 160 ? `D${p.description.length}` : '', w(p.resume) < 120 ? `R${w(p.resume)}` : '', w(b) < (p.tool ? 300 : 900) ? `B${w(b)}` : '', bad.length ? `F${bad.join(',')}` : ''].filter(Boolean);
    out.push(`${p.id.padEnd(36)} body=${w(b)} ${flags.join(' ')}`);
  }
  require('fs').writeFileSync('/tmp/lc-diag.txt', out.join('\n'));
});

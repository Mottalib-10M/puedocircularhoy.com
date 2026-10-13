import { it } from 'vitest';
import { PAGES } from '../src/lib/pages';
import { HOME } from '../src/content/home';
const w = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
it('f', () => { const out: string[] = []; for (const p of [{ id: 'HOME', faqs: HOME.faqs }, ...PAGES]) for (const f of p.faqs) { const n = w(f.a); if (n < 42 || n > 88) out.push(`${p.id} (${n}) ${f.q}`); } require('fs').writeFileSync('/tmp/lc-faq.txt', out.join('\n')); });

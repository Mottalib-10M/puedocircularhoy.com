import { it } from 'vitest';
import { PAGES } from '../src/lib/pages';
it('d', () => { require('fs').writeFileSync('/tmp/lc-desc.txt', PAGES.filter((p) => p.description.length < 150 || p.description.length > 160 || p.title.length > 60 || p.title.length < 50).map((p) => `${p.id} [${p.title.length}] ${p.title}\n   (${p.description.length}) ${p.description}`).join('\n')); });

/** llms.txt (RECETTE §21), produit au build depuis le registre des pages. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../lib/topics';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.es}`,
    '',
    `> Consulta si un auto circula hoy y mañana según su placa: Programa Hoy No Circula de la Ciudad de México y del Estado de México (holograma, engomado, sábados, contingencias ambientales de la CAMe), calendario de verificación vehicular del segundo semestre de 2026, y pico y placa de las ciudades de Colombia según el decreto vigente de cada alcaldía. Cada regla cita su acuerdo, gaceta o decreto con fecha. Cálculo en el navegador. Respuesta orientativa: manda la autoridad. Publicado por Radif Partners. Actualizado el ${LAST_UPDATED}.`,
    '',
    `- [Inicio: ¿puedo circular hoy?](${SITE_URL}${route('home', 'es')})`,
    ...GROUPS.flatMap((g) => { const xs = PAGES.filter((p) => p.group === g.id); return xs.length ? ['', `## ${g.label}`, ...xs.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'es')}): ${p.card}`)] : []; }),
    '',
    '## Sobre el sitio',
    `- [Cómo calculamos](${SITE_URL}${route('method', 'es')})`,
    `- [Sobre nosotros](${SITE_URL}${route('about', 'es')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

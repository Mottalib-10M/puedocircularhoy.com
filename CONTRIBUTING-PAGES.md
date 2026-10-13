# Étoffer « ¿Puedo circular hoy? »

Notice pour l'agent qui reprend le site. À lire avec `~/Documents/GitHub/RECETTE-SITE.md` (§0, §5, §6, §7, §9.3, §11, §17.4, §21, §26) et le brief `reports/BRIEF-NOUVEAUX-SITES-2026-10-12.md`.

Le site : restriction de circulation du jour selon la plaque. **Mexique** : Hoy No Circula (CDMX et zone conurbada), sábados, contingencia ambiental, verificación. **Colombie** : pico y placa par ville. **Espagnol seul** (décision de la mission), sous `/es/` ; la variante (`es-MX` ou `es-CO`) se pose page par page dans `<html lang>` selon le groupe de la page (`src/lib/topics.ts`). Éditeur : Radif Partners. Aucun lien vers un autre site du portefeuille ni vers les concurrents.

## Où sont les choses

| Quoi | Fichier |
|---|---|
| Règles du Mexique (HNC, verificación, UMA, contingence, hologrammes, Pase Turístico) | `src/data/params-2026.json > mx` |
| Festivos, amende C.14, UVB, Solidario, regional | `src/data/params-2026.json > co` |
| Villes colombiennes (une entrée par ville) | `src/data/co-ciudades-2026.json` |
| Sources (clé → URL + libellé) | `src/data/params-2026.json > sources` |
| Moteurs (fonctions pures) | `src/lib/engine/mx.ts`, `co.ts`, `dates.ts` |
| Outils (îlots React) | `src/components/calc/` : `HncTool`, `PypTool`, `CalendarioMes`, `VerifTool`, `HomeTool`, `TableroHoy` |
| Mini-simulateurs | `src/lib/minis/<kind>.ts` (chargés seuls) |
| Une page | `src/content/pages/<id>.ts` (`definePage`) |
| Accueil | `src/content/home.ts` + `src/components/HomePage.astro` |
| Faits vérifiés lus pendant la construction, avec citations | `research/faits-mx.md`, `research/faits-co.md` |

## Ajouter ou mettre à jour une ville colombienne

1. Lire le **décret** ou la page officielle de l'alcaldía (.gov.co). La presse et les sites tiers (pyphoy, hacecuentas…) ne fournissent jamais une règle.
2. Ajouter l'entrée dans `co-ciudades-2026.json` : `esquema` (`semana`, `paridad` ou `ninguno`), `periodos` avec `desde`/`hasta` (une période par rotation), `horas` (24 h), `sabado`, `sabadoCiclo` (Bucaramanga), `festivos` (false = pas de restriction les festivos), `digito` (`primero` pour les motos de Medellín, Itagüí, Pereira), `motos` (règle ou `null`) et `motosNota`, `vigencia` (horizon des données vérifiées : au-delà, l'outil répond « Rotación no publicada »), `decreto`, `fuente` (clé de `sources`), `nota` facultative.
3. Ajouter un test dans `tests/engine.test.ts` avec deux jours tirés du texte officiel.
4. Écrire la page `src/content/pages/pico-y-placa-<slug>.ts` (modèle : `pico-y-placa-medellin.ts`, structure seulement) avec `tool: 'pyp', toolProps: { city, lockCity: true }`.
5. **Changement de rotation** (Medellín et Cali en janvier, Bucaramanga chaque trimestre, Cartagena par périodes) : ajouter une période, prolonger `vigencia`, mettre `retrieved_at` à jour, relancer les tests.

## La règle des chiffres

Aucun horaire, chiffre de plaque, montant ou date de règle n'est tapé dans une page : il se lit dans le kit (`src/lib/kit.ts`, aussi passé au corps sous `h.`). Dans une chaîne entre apostrophes, `${…}` n'est pas interprété : utiliser des accents graves (le test le détecte). Une contingencia ambiental ne se prédit jamais : l'outil la traite comme un scénario choisi d'après le comunicado de la CAMe.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/latam-circulacion
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build                     # inclut typo-nbsp et check-snippets
npx vitest run
python3 scripts/check-seo.py . ; python3 scripts/check-trame.py . ; python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py . ; python3 scripts/check-regles.py . ; python3 scripts/check-portefeuille.py .
python3 scripts/check-liens.py dist ; python3 scripts/check-cookies.py . ; node scripts/check-legal.mjs .
node scripts/check-premier-ecran.mjs . ; node scripts/check-url-propre.mjs . ; node scripts/check-contraste.mjs dist
node scripts/check-nombres.mjs dist ; node scripts/check-saisie.mjs dist --max=60 ; node scripts/typo-nbsp.mjs dist --check
node scripts/check-sources.mjs . ; node scripts/check-layout.mjs dist     # long
```

Limites connues : `check-hreflang` et `check-anglais` sont sans objet (site en espagnol seul, sans version anglaise par décision de la mission ; `check-anglais` échouerait par construction). `check-saisie` lit 0 calculateur parce que les outils n'ont que des listes déroulantes, pas de champ numérique libre. `check-sources` voit barranquilla.gov.co et cartagena.gov.co en 403 et quelques sites injoignables depuis ce poste : relire à la main.

Après une modification de `public/favicon.svg` : `node scripts/gen-icons.mjs`. Image OG : `node scripts/generate-og-images.mjs` puis **relancer** `node scripts/gen-icons.mjs` (le premier réécrit les icônes avec un carré générique). Port local : 4442. Arrêter un serveur par son port (`lsof -ti tcp:4442 | xargs kill`).

## Ce qu'on ne fait pas

Pas de dépôt GitHub, pas de push, pas de DNS. Ne pas toucher à `_trame` ni à la RECETTE.

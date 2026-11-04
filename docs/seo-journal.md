# Journal SEO — webalp.ch

Ce fichier garde les chiffres de référence, les jalons datés et les résultats.
Règle : on ne conclut jamais sans 4 semaines de recul, et on écarte les anomalies (voir 31 octobre 2026).

---

## 1. Architecture du projet (lue le 2 novembre 2026)

1. **Next.js 14.2.15, App Router** (`app/`), React 18, Tailwind, framer-motion. Déployé sur **Netlify** (`netlify.toml`, plugin `@netlify/plugin-nextjs`). Il traîne aussi un `vercel.json`, qui ne sert pas.
2. **Rendu** : toutes les pages sont **pré-rendues en statique au build** (accueil, `/portfolio`, `/blog`, les 32 articles en SSG). Le HTML brut contient donc le texte.
3. **Composants presque tous côté client** (`'use client'`, 22 composants) : les animations framer-motion partent de `opacity: 0`, et les compteurs démarrent à `0` dans le HTML serveur.
4. **Textes** : `lib/translations.ts`, via `contexts/LanguageContext.tsx` (FR par défaut, EN en option côté client, une seule URL, pas de hreflang réel).
5. **Metadata** : définies dans `app/layout.tsx` (title par défaut, modèle `%s | WebAlp`, **canonical global `https://webalp.ch`** hérité par toutes les pages qui ne le redéfinissent pas). Chaque page redéfinit `metadata` ou non.
6. **JSON-LD** : `LocalBusiness` + `WebSite` (avec `SearchAction`) dans le layout ; `FAQPage` sur l'accueil ; `Blog` et `Article` sur le blog.
7. **Blog** : contenu en dur dans `lib/blog-posts.ts` (32 articles, dates, auteur, blocs), pages `app/blog/[slug]`. Compteur de vues `app/api/views/[slug]`.
8. **Sitemap / robots** : `app/sitemap.ts` (accueil, blog, articles ; `lastmod` = date de l'article), `app/robots.ts` (bloque `/netlify-forms/` et `/api/`).
9. **Formulaires** : contact (`components/Contact.tsx`, formulaire `contactv2`) et brief (`components/BriefForm.tsx`, formulaire `brief-v1`) postent vers `/netlify-forms.html` (Netlify Forms), puis redirigent vers `/merci`. Il existe aussi une route `/api/contact` (Resend si `RESEND_API_KEY`, sinon Netlify).
10. **Suivi** : 2 balises Google Ads (`AW-11013404464`, `AW-18292642678`), GA4 `G-F9FYQ9VRMH`, Ahrefs Analytics, toutes chargées sans bannière de consentement. Redirections : seulement `www → sans www` (Netlify).

---

## 2. Chiffres de référence (fournis le 2 novembre 2026, Search Console)

> ⚠️ **Le pic du 31 octobre 2026 (58 des 63 clics du mois) est exclu.** Niveau réel : **≈ 5 à 20 clics par mois**.

| Indicateur | Référence |
|---|---|
| Clics / mois (niveau réel, hors 31.10) | 5 à 20 |
| Impressions / mois | 3 700 à 4 900 (depuis avril 2026) |
| Position moyenne (28 j) | 12,8 |
| Part des impressions sur l'accueil | 4 157 / ~4 400 |
| Blog | 175 impressions, position 24 |
| GA4 | 40 à 100 visiteurs / mois (suivi probablement incomplet) |
| Demandes de devis venant de Google (KPI n°1) | **inconnu : aucune conversion n'est mesurée** (voir 3.5) |

Requêtes suivies (position 30 j) : agence web valais 9,8 · création de site internet valais 9,2 · agence création site web valais 7,2 · gestion site web valais 10,0 · agence site web valais 7,8 · site web valais 10,8 · création site internet valais 8,9 · agence web sion 4,2 · site vitrine valais 9,3 · maintenance site internet valais 9,9.

---

## 3. Étape 0 — contrôles de base (2 novembre 2026)

Méthode : `npm run build` puis `next start` en local, HTML récupéré sans JavaScript (`curl`), analysé page par page. Le site de production n'est pas joignable depuis l'environnement de travail (réseau bloqué). Le code analysé est celui de la branche, identique à la production pour les pages publiques.

### 3.1 HTML brut

| Page | Title | Canonical | Robots | Mots | H1 | JSON-LD |
|---|---|---|---|---|---|---|
| `/` | WebAlp — Agence Web Suisse \| Sites qui convertissent | webalp.ch | index | 1 907 | « Votre prochain client vous cherche. » | LocalBusiness, WebSite, FAQPage |
| `/portfolio` | Portfolio — Nos réalisations \| WebAlp | **webalp.ch (accueil)** 🔴 | index | 390 | **aucun H1** 🔴 | LocalBusiness, WebSite |
| `/blog` | Blog — Conseils web & SEO pour PME suisses \| WebAlp **\| WebAlp** | /blog | index | 1 790 | « Conseils pour dominer le web. » | + Blog |
| `/blog/choisir-agence-web-suisse-questions` | Choisir agence web Suisse **2025** — 7 questions — WebAlp **\| WebAlp** | ok | index | 646 | ok | + Article (auteur = Organization) |
| `/blog/prix-site-web-professionnel-suisse-2025` | Prix site web professionnel Suisse **2025** — WebAlp Sion **\| WebAlp** | ok | index | 860 | « … en 2025 » | + Article |
| `/mentions-legales` | Mentions légales \| WebAlp **\| WebAlp** | ok | noindex | 176 | ok | — |
| `/brief`, `/merci` | — | webalp.ch | noindex | — | ok | — |
| `/netlify-forms` | titre par défaut | webalp.ch | **index** 🟡 | — | — | — |
| `/contact`, `/impressum`, `/search?q=` | 404 — Page introuvable · WebAlp \| WebAlp | — | noindex | — | — | — |

Contenu trouvé dans le HTML serveur de l'accueil :
- **Compteurs à zéro** : « 0 + Projets livrés · 0 % Trafic moyen gagné · 0 /mois Projets max · 0 /100 Score performance ».
- **Fausse urgence périmée** : « 2 places disponibles · juillet 2026 » (3 fois).
- **Prix incohérents** : meta « À partir de CHF 890 », page « dès CHF 690 ».
- **Promesses de délai incohérentes** : « devis sous 2h » (3 fois) et « réponse sous 24h » (2 fois).
- **Cartes de tarifs en double** dans le HTML (« Starter » apparaît 5 fois).
- **Affirmations à vérifier** : « +280 % demandes de devis », « 98/100 garantie », « Satisfaction garantie », « Chaque client recommande WebAlp » (un seul témoignage).

### 3.2 Performance (Lighthouse 12.6, mobile, labo, serveur local)

| Page | Perf. | SEO | Access. | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| `/` | **51** 🔴 | 100 | 92 | **4,5 s** | **2 550 ms** | 0,02 |
| article « choisir une agence » | 93 | 100 | 96 | 2,6 s | 190 ms | 0,02 |
| `/portfolio` | 90 | 100 | 96 | 3,4 s | 140 ms | 0,02 |

Causes principales sur l'accueil :
- LCP = le H1, **4 s de « render delay »** : le hero démarre à `opacity: 0` + `blur` (framer-motion) et le `Loader` couvre l'écran 1,1 s.
- 3,4 s de JavaScript sur un seul bloc (animations, curseur personnalisé, barre de progression).
- Une feuille Google Fonts (Space Grotesk 800) chargée en plus de `next/font`.

Ce sont des mesures de labo, pas des données terrain. **À compléter** par PageSpeed Insights (CrUX) sur la vraie URL. Le site affiche « Performance 98/100 garantie » alors que l'accueil fait 51 en labo mobile.

### 3.3 404 et redirections

- Crawl interne : **38 URL, toutes en 200, aucun lien interne cassé**.
- 404 connues avec visites GA : `/contact`, `/impressum`. `/search?q=` (cible du `SearchAction`) → 404.
- Redirections existantes : uniquement `www.webalp.ch/* → webalp.ch/*` (301).

### 3.4 Pages indexables

- **Indexables et dans le sitemap (34)** : `/`, `/blog`, 32 articles.
- **`/portfolio`** : indexable mais canonical vers l'accueil, et absente du sitemap → ignorée par Google en pratique.
- `/netlify-forms` : `index, follow` (bloquée par robots.txt, mais à passer en `noindex`).
- Sitemap : `lastmod` de l'accueil et du blog = date du build ; articles de **2023-03-15 à 2025-06-10**, alors que `foundingDate` = 2025 et que l'historique git du site commence le **29 juin 2026**.

### 3.5 Suivi et conversions

- **Aucune conversion Google Ads ne remonte** : les deux événements de conversion ont un label factice `REMPLACE_PAR_TON_LABEL` (`app/merci/page.tsx`, `components/BriefForm.tsx`).
- **GA4** : aucun événement personnalisé (formulaire, clic téléphone, WhatsApp, e-mail, « Demander un devis »).
- **Aucune bannière de consentement** (GA4, Google Ads, Ahrefs chargés d'office) : point nLPD à traiter, et cause possible du faible volume GA4.
- **Faux compteur de vues** : `app/api/views/[slug]` démarre chaque article à un nombre inventé (40 + valeur dérivée du slug) et le garde en mémoire du serveur.

### 3.6 Autres constats

- `app/api/contact/route.ts` insère le nom et le message du visiteur dans le HTML de l'e-mail sans échappement (risque d'injection dans la boîte de réception). À corriger.
- Le témoignage unique (Drone Valais Production) et le portfolio sont peut-être des projets internes : à clarifier (règle de vérité).

---

## 4. Étape 1 et 2 — corrections faites le 3 novembre 2026 (branche, pas encore en ligne)

Réponses de Bastien (2 nov.) : projets = vrais clients · chiffres de résultats = à retirer · délai = réponse sous 24h · prix confirmés (690 / 1'490 / 1'990 / 49 par mois) · contact = contact@webalp.ch · pas d'infos supplémentaires sur l'équipe · dates des articles inconnues · suivi : pas prioritaire.

### Titles et metas, avant / après

| Page | Avant | Après |
|---|---|---|
| Accueil (title) | WebAlp — Agence Web Suisse \| Sites qui convertissent | **Agence web Sion, Valais · Création de site internet \| WebAlp** |
| Accueil (meta) | … pour startups et PME suisses. À partir de CHF 890. | Agence web à Sion (Valais) : création de sites internet, e-commerce et applications web pour PME. Dès CHF 690, devis gratuit sous 24h. |
| `/portfolio` | Portfolio — Nos réalisations \| WebAlp (canonical → accueil, pas de H1) | → 301 vers **`/realisations`** : « Réalisations : sites et applications web en Valais \| WebAlp », canonical propre, H1 |
| `/blog` | Blog — Conseils web & SEO pour PME suisses \| WebAlp \| WebAlp | Blog : conseils web et SEO pour les PME du Valais \| WebAlp |
| Articles | « … 2025 — WebAlp Sion \| WebAlp » | sans « 2025 », sans doublon : ex. « Prix site web professionnel Suisse \| WebAlp » |
| Mentions, confidentialité, 404, brief, merci | « … \| WebAlp \| WebAlp » ou title de l'accueil | title propre à chaque page |

Variantes proposées pour l'accueil (la n°1 est en place) :
1. Title « Agence web Sion, Valais · Création de site internet | WebAlp » · meta ci-dessus.
2. Title « Agence web en Valais · Création de sites internet à Sion | WebAlp » · meta « Création de sites internet à Sion et en Valais pour les PME : sites vitrines dès CHF 690, e-commerce, applications web. Réponse sous 24h. »
3. Title « Création de site internet en Valais · Agence web à Sion | WebAlp » · meta « WebAlp crée des sites rapides et bien référencés pour les entreprises du Valais. Vitrine dès CHF 690, boutique et application dès CHF 1'990. »

### Corrections
- Canonical global supprimée du layout : chaque page a sa propre canonical.
- Accueil : sous-titre visible « Agence web à Sion, en Valais · Création de sites internet pour PME ».
- Compteurs retirés (section Stats supprimée), plus de « 0 » dans le HTML.
- Chiffres de résultats retirés : +280 %, 45+, 340 %, 98/100, CHF 4K MRR, 1 sur 2 (remplacés par ce qui a été livré).
- Fausse urgence retirée (« 2 places en juillet », « 3 projets/mois »).
- Délai unique : **réponse et devis sous 24h** partout.
- Prix cohérents : meta, page, JSON-LD (`priceRange` CHF 690 – 1'990, `hasOfferCatalog`).
- « Chaque client recommande WebAlp », « Satisfaction garantie », « Ça ne nous est jamais arrivé », « clients à Genève, Berne, Zurich » : retirés ou reformulés.
- JSON-LD : `SearchAction` retiré, `sameAs` (Instagram, LinkedIn), horaires, `hasOfferCatalog`, `Service`, `FAQPage` et `BreadcrumbList` sur les nouvelles pages, `CreativeWork` sur les réalisations.
- Redirections 301 : `/portfolio` → `/realisations`, `/impressum` → `/mentions-legales`. `/contact` existe maintenant.
- Sitemap : toutes les pages indexables, `lastmod` réel pour les pages, aucun `lastmod` inventé pour les articles.
- Blog : fausses dates retirées (affichage, JSON-LD, sitemap), faux compteurs de vues et de « j'aime » supprimés (API `/api/views` supprimée), « 2025 » retiré des titres, bloc « service lié » sous chaque article.
- `/netlify-forms` en `noindex`. Images manquantes créées : `og-image.png`, `favicon.ico`, `apple-touch-icon.png`.
- `/api/contact` : échappement du contenu dans l'e-mail.
- Performance : hero affiché immédiatement, écran de chargement supprimé, logo en texte (plus de police externe), filtres de flou animés retirés.

### Nouvelles pages
`/creation-site-vitrine-valais` · `/creation-site-ecommerce-valais` · `/application-web-sur-mesure-valais` · `/maintenance-site-internet-valais` · `/refonte-site-internet-valais` · `/tarifs` · `/contact` · `/realisations` · `/realisations/<projet>` (6). Menu avec sous-menu Services, pied de page relié aux pages, fil d'Ariane.

### Mesures après corrections (labo, Lighthouse mobile, serveur local)

| Page | Perf. avant | Perf. après | LCP | TBT |
|---|---|---|---|---|
| `/` | 51 | **88–91** | 4,5 s → 3,3 s | 2 550 ms → 60–140 ms |
| `/creation-site-vitrine-valais` | — | 92 | 3,0 s | 190 ms |

---

### Changements du 4 novembre 2026 (demandes de Bastien)
- Hero : panneau de droite (« Réponse sous 24h », Sion, 24h, CHF 690, téléphone) et mini-infos mobiles retirés.
- Processus : plus de « maquettes Figma », uniquement les étapes réellement faites.
- Projets : plus aucun « résultat » affiché (MRR, E-com live, accès 100 %, réservations 24/7…), remplacé par le type de projet.
- Avis : présentés comme avis Google, les 4 avis sont maintenant tous dans le HTML (avant : un seul à la fois dans un carrousel).
- FAQ : toutes les réponses sont dans le HTML (avant : seulement la question ouverte), nouvelle question sur l'IA.
- Nouvelle section « Oui, on utilise l'IA » sur l'accueil, et bloc IA sur `/tarifs`.
- Bandeau défilant sous le hero (services, technologies, Sion, 24h, dès CHF 690).
- Animations d'apparition au scroll lisibles sans JavaScript (le texte reste dans le HTML et visible si le JS ne tourne pas).
- Style : traits verts et étiquettes en majuscules espacées retirés, émojis retirés, bulle WhatsApp automatique retirée, composant de faux logos clients supprimé.

## 5. Jalons (changements mis en ligne)

Format : `AAAA-MM-JJ · type · ce qui a changé · pages touchées`

À reporter **le jour de la mise en ligne** (date à remplacer) :

```
AAAA-MM-JJ · SEO · title + meta accueil ciblés « agence web Sion, Valais », canonical par page · /
AAAA-MM-JJ · technique · redirections 301 /portfolio → /realisations et /impressum → /mentions-legales, sitemap complet · site
AAAA-MM-JJ · contenu · 5 pages de services + /tarifs + /contact + /realisations (6 projets) · nouvelles pages
AAAA-MM-JJ · contenu · retrait des chiffres non vérifiés, fausse urgence, faux compteurs, délai 24h partout · / , blog
AAAA-MM-JJ · technique · performance accueil (hero immédiat, sans loader ni flous) · /
AAAA-MM-JJ · SEO · blog : titles sans 2025 ni doublon, fausses dates retirées, lien service sous chaque article · /blog/*
AAAA-MM-JJ · contenu · section IA, avis Google, FAQ et avis lisibles par Google, hero simplifié · /
```

---

## 6. Résultats mensuels

| Mois | Devis via recherche | Clics hors marque | Pos. « agence web valais » | Pos. « agence web sion » | Notes |
|---|---|---|---|---|---|
| Référence oct. 2026 (hors 31.10) | inconnu | ≈ 5–20 | 9,8 | 4,2 | conversions non mesurées |

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

## 4. Jalons (changements mis en ligne)

Format : `AAAA-MM-JJ · type · ce qui a changé · pages touchées`

| Date | Type | Changement | Pages |
|---|---|---|---|
| — | — | Aucun changement en ligne pour l'instant | — |

---

## 5. Résultats mensuels

| Mois | Devis via recherche | Clics hors marque | Pos. « agence web valais » | Pos. « agence web sion » | Notes |
|---|---|---|---|---|---|
| Référence oct. 2026 (hors 31.10) | inconnu | ≈ 5–20 | 9,8 | 4,2 | conversions non mesurées |

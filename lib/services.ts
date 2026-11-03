// Pages de services. Une page = une intention de recherche (voir docs/seo-carte-mots-cles.md).
// Les prix « dès » sont ceux de la page Tarifs. Aucun chiffre de résultat : seulement ce qui est livré.

export type Faq = { q: string; a: string }

export type Service = {
  slug: string
  name: string
  short: string
  priceFrom: string
  priceLabel: string
  monthly?: boolean
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  forWho: string[]
  included: string[]
  process: { title: string; text: string }[]
  delay: string
  priceNote: string
  projects: string[]
  faq: Faq[]
  related: string[]
  articles: string[]
}

export const SERVICES: Service[] = [
  {
    slug: 'creation-site-vitrine-valais',
    name: 'Création de site vitrine',
    short: 'Le site qui présente votre entreprise et vous amène des demandes.',
    priceFrom: '690',
    priceLabel: 'dès CHF 690',
    metaTitle: 'Création de site vitrine en Valais, dès CHF 690',
    metaDescription:
      'Création de site vitrine pour PME en Valais : design sur mesure, mobile, SEO technique et formulaire de contact. Agence web à Sion, dès CHF 690, devis sous 24h.',
    h1: 'Création de site vitrine en Valais',
    intro:
      'Un site vitrine présente votre entreprise, vos services et vos réalisations, et donne envie de vous contacter. On le conçoit sur mesure, à Sion, pour les PME, artisans, commerces et indépendants du Valais : rapide sur mobile, bien construit pour Google et pensé pour que vos visiteurs vous appellent ou vous écrivent.',
    forWho: [
      'Les entreprises qui n\'ont pas encore de site, ou seulement une page Facebook ou Instagram.',
      'Les PME dont le site actuel est daté, lent ou difficile à lire sur téléphone.',
      'Les artisans, commerces et indépendants qui veulent être trouvés quand on cherche leur métier dans leur région.',
    ],
    included: [
      'Design sur mesure, adapté à votre image (pas un thème acheté)',
      'Version mobile soignée, pensée d\'abord pour le téléphone',
      'SEO technique : balises, structure, vitesse, données structurées, plan du site',
      'Formulaire de contact, bouton d\'appel et lien WhatsApp',
      'Google Analytics et Google Search Console configurés',
      'Nom de domaine et adresse e-mail professionnelle',
      'Mise en ligne et hébergement chez WebAlp',
      'Révisions incluses jusqu\'à validation',
    ],
    process: [
      { title: 'Premier échange', text: 'Un appel ou un message pour comprendre votre activité, vos clients et ce que le site doit vous apporter. Vous recevez un devis clair sous 24h.' },
      { title: 'Maquettes', text: 'On vous présente le design des pages principales. Vous commentez, on ajuste avant d\'écrire la moindre ligne de code.' },
      { title: 'Développement', text: 'On construit le site, on intègre vos textes et vos photos, et on le teste sur téléphone, tablette et ordinateur.' },
      { title: 'Mise en ligne', text: 'Le site est publié, relié à Google Search Console et à vos statistiques. On vous explique comment tout fonctionne.' },
    ],
    delay: 'Environ deux semaines pour un site vitrine, une fois vos contenus (textes, logo, photos) réunis.',
    priceNote:
      'La formule Starter (dès CHF 690) couvre un site vitrine soigné pour démarrer. La formule Croissance (dès CHF 1\'490) ajoute plus de pages, un blog, Google Business optimisé et une stratégie de contenu. Le prix exact dépend du nombre de pages et des fonctions : il est fixé dans le devis.',
    projects: ['dronevalais', 'monhygiene'],
    faq: [
      { q: 'Combien coûte un site vitrine en Valais ?', a: 'Chez WebAlp, un site vitrine démarre à CHF 690 (formule Starter). Avec plus de pages, un blog et un travail sur le contenu, la formule Croissance démarre à CHF 1\'490. Vous recevez un devis précis et gratuit sous 24h.' },
      { q: 'Combien de temps faut-il pour créer mon site ?', a: 'Environ deux semaines pour un site vitrine, à partir du moment où on a vos textes, votre logo et vos photos. Si vous n\'avez pas encore de textes, on peut vous aider à les rédiger.' },
      { q: 'Est-ce que je pourrai modifier mon site moi-même ?', a: 'Oui si vous le souhaitez : on peut construire le site sur Webflow ou WordPress pour que vous changiez textes et images vous-même. En Next.js, les modifications passent par nous, par exemple avec un forfait de maintenance.' },
      { q: 'Le référencement Google est-il inclus ?', a: 'Le SEO technique est inclus dans chaque site : structure des pages, balises, vitesse, version mobile, données structurées et plan du site. Le site est aussi relié à Google Search Console dès la mise en ligne.' },
      { q: 'Vous travaillez uniquement à Sion ?', a: 'On est basés à Sion et on travaille surtout en Valais, mais tout peut se faire en ligne. On accompagne aussi des entreprises ailleurs en Suisse romande.' },
    ],
    related: ['refonte-site-internet-valais', 'maintenance-site-internet-valais', 'creation-site-ecommerce-valais'],
    articles: ['pourquoi-site-web-ne-genere-pas-clients', 'prix-site-web-professionnel-suisse-2025', 'seo-local-suisse-guide-pme'],
  },
  {
    slug: 'creation-site-ecommerce-valais',
    name: 'Création de site e-commerce',
    short: 'Une boutique en ligne qui vend, avec paiement sécurisé.',
    priceFrom: '1990',
    priceLabel: 'dès CHF 1\'990',
    metaTitle: 'Création de site e-commerce en Valais · Shopify, WooCommerce',
    metaDescription:
      'Création de boutique en ligne en Valais : Shopify, WooCommerce ou sur mesure, paiement sécurisé et TWINT, catalogue, livraison. Agence web à Sion, dès CHF 1\'990.',
    h1: 'Création de site e-commerce en Valais',
    intro:
      'Une boutique en ligne doit être simple à utiliser pour vos clients et simple à gérer pour vous. On crée des sites e-commerce sur Shopify, WooCommerce ou sur mesure selon votre catalogue, votre budget et la façon dont vous voulez travailler, avec un parcours d\'achat clair sur mobile et des paiements sécurisés.',
    forWho: [
      'Les commerces du Valais qui veulent vendre aussi en ligne, ou proposer le retrait en magasin.',
      'Les marques et créateurs qui lancent leur première boutique.',
      'Les boutiques existantes qui veulent une plateforme plus rapide ou plus facile à gérer.',
    ],
    included: [
      'Choix de la bonne plateforme : Shopify, WooCommerce ou développement sur mesure',
      'Design de la boutique à l\'image de votre marque',
      'Catalogue produits, variantes (tailles, couleurs), stocks',
      'Paiements sécurisés : carte, TWINT et autres moyens selon la plateforme',
      'Livraison, retrait en magasin et frais de port',
      'E-mails de confirmation de commande',
      'SEO technique des pages produits et catégories',
      'Formation pour gérer vos produits et vos commandes',
    ],
    process: [
      { title: 'Cadrage', text: 'On fait le point sur vos produits, vos volumes, vos moyens de paiement et de livraison, puis on vous recommande la plateforme adaptée. Devis sous 24h.' },
      { title: 'Design', text: 'Maquettes de l\'accueil, des catégories, des fiches produits et du panier, validées avec vous.' },
      { title: 'Mise en place', text: 'Configuration de la boutique, import du catalogue, paiements, livraison, e-mails, puis tests de commande de bout en bout.' },
      { title: 'Lancement', text: 'Mise en ligne, connexion à Google Search Console et aux statistiques, et prise en main avec vous.' },
    ],
    delay: 'Le délai dépend surtout de la taille du catalogue et des fonctions demandées. Il est fixé dans le devis.',
    priceNote:
      'Une boutique en ligne démarre à CHF 1\'990 (formule Sur mesure). Le prix dépend du nombre de produits à intégrer, de la plateforme et des fonctions (réservation, abonnements, multilingue). Les abonnements de la plateforme (par exemple Shopify) et les frais de paiement sont à votre charge.',
    projects: ['vestedwear'],
    faq: [
      { q: 'Shopify, WooCommerce ou sur mesure : que choisir ?', a: 'Shopify convient très bien pour démarrer vite et vendre sans se soucier de la technique. WooCommerce est intéressant si vous avez déjà un site WordPress ou beaucoup de contenu. Le sur mesure se justifie pour des besoins particuliers. On vous conseille selon votre cas lors du premier échange.' },
      { q: 'Combien coûte une boutique en ligne ?', a: 'Chez WebAlp, une boutique en ligne démarre à CHF 1\'990. Le prix exact dépend du catalogue et des fonctions. Il faut aussi compter l\'abonnement de la plateforme et les frais de transaction.' },
      { q: 'Peut-on payer avec TWINT ?', a: 'Oui, TWINT peut être proposé sur la plupart des boutiques suisses, en plus des cartes de crédit. La solution exacte dépend de la plateforme choisie.' },
      { q: 'Je pourrai gérer mes produits seul ?', a: 'Oui. Ajouter un produit, changer un prix, suivre une commande : tout se fait depuis l\'interface de la boutique, et on vous forme à la mise en ligne.' },
    ],
    related: ['application-web-sur-mesure-valais', 'creation-site-vitrine-valais', 'maintenance-site-internet-valais'],
    articles: ['ecommerce-suisse-woocommerce-shopify-sur-mesure', 'site-ecommerce-suisse-qui-vend', 'prix-site-web-professionnel-suisse-2025'],
  },
  {
    slug: 'application-web-sur-mesure-valais',
    name: 'Application web sur mesure',
    short: 'Réservation, portail client, intranet, extranet ou SaaS.',
    priceFrom: '1990',
    priceLabel: 'dès CHF 1\'990',
    metaTitle: 'Application web sur mesure en Valais : intranet, réservation',
    metaDescription:
      'Développement d\'applications web sur mesure à Sion : réservation en ligne, portail client, intranet, extranet, CMS, espace membres, SaaS. Agence web en Valais, dès CHF 1\'990.',
    h1: 'Application web sur mesure : réservation, intranet, extranet',
    intro:
      'Quand un outil standard ne suffit plus, on développe l\'application qui colle à votre façon de travailler : réservation en ligne, portail ou espace client, intranet pour votre équipe, extranet pour vos partenaires, back-office sur mesure (CMS) ou produit SaaS complet. Le code vous appartient et l\'application est pensée pour évoluer avec votre entreprise.',
    forWho: [
      'Les entreprises qui gèrent encore leurs réservations, devis ou clients à la main (Excel, e-mails, téléphone).',
      'Les équipes qui ont besoin d\'un intranet ou d\'un extranet simple et sécurisé.',
      'Les porteurs de projet qui veulent lancer une application ou un SaaS.',
    ],
    included: [
      'Analyse de votre fonctionnement et des écrans nécessaires',
      'Design de l\'interface (UX/UI) pensé pour vos utilisateurs',
      'Développement front-end et back-end',
      'Comptes utilisateurs, rôles et accès sécurisés',
      'Paiements en ligne et abonnements si nécessaire (par exemple Stripe)',
      'Tableau de bord d\'administration',
      'E-mails automatiques',
      'Tests, mise en ligne et hébergement',
    ],
    process: [
      { title: 'Atelier de cadrage', text: 'On liste ensemble les utilisateurs, les écrans et les règles métier. Vous recevez un devis clair sous 24h après l\'échange.' },
      { title: 'Prototype', text: 'Maquettes des écrans clés pour valider le parcours avant de développer.' },
      { title: 'Développement par étapes', text: 'On livre l\'application en plusieurs versions testables, pour que vous voyiez avancer le projet.' },
      { title: 'Mise en production', text: 'Déploiement, reprise des données si nécessaire, prise en main par vos équipes et suivi.' },
    ],
    delay: 'Le délai dépend du périmètre : il est défini dans le devis, avec des étapes de livraison intermédiaires.',
    priceNote:
      'Les applications web démarrent à CHF 1\'990. Le prix dépend du nombre d\'écrans, des rôles utilisateurs, des intégrations (paiement, agenda, outils existants) et du volume de données. Chaque projet est chiffré sur devis.',
    projects: ['monhygiene', 'goldenbulls', 'yourbizflow'],
    faq: [
      { q: 'Quelle différence entre intranet et extranet ?', a: 'Un intranet est réservé à vos équipes (documents, procédures, outils internes). Un extranet s\'ouvre à des personnes extérieures autorisées, par exemple vos clients ou partenaires, avec un accès personnel.' },
      { q: 'Pourquoi une application sur mesure plutôt qu\'un logiciel existant ?', a: 'Un logiciel existant est souvent le bon choix pour démarrer. Le sur mesure devient intéressant quand vous payez plusieurs abonnements qui ne communiquent pas, quand vos règles métier sont particulières, ou quand l\'outil fait partie de votre offre.' },
      { q: 'À qui appartient le code ?', a: 'À vous. Le code est livré et documenté, et l\'application peut être reprise ou faire évoluer par la suite.' },
      { q: 'Combien coûte une application web ?', a: 'Chez WebAlp, une application web démarre à CHF 1\'990. Un outil de réservation simple et une plateforme SaaS avec abonnements n\'ont pas le même prix : on chiffre chaque projet sur devis après un échange.' },
    ],
    related: ['creation-site-ecommerce-valais', 'creation-site-vitrine-valais', 'maintenance-site-internet-valais'],
    articles: ['application-web-sur-mesure-vs-saas', 'nextjs-agences-web-suisses', 'wordpress-vs-nextjs-pme-suisse'],
  },
  {
    slug: 'maintenance-site-internet-valais',
    name: 'Maintenance et gestion de site web',
    short: 'On s\'occupe de vos mises à jour, sauvegardes et de la sécurité.',
    priceFrom: '49',
    priceLabel: 'dès CHF 49/mois',
    monthly: true,
    metaTitle: 'Gestion et maintenance de site web en Valais',
    metaDescription:
      'Gestion et maintenance de site web en Valais : mises à jour de contenu, sauvegardes quotidiennes, sécurité et suivi. Forfait mensuel dès CHF 49, agence web à Sion.',
    h1: 'Maintenance et gestion de site internet en Valais',
    intro:
      'Un site doit vivre : nouveaux tarifs, menus, événements, photos, actualités. Avec la maintenance WebAlp, vous nous envoyez vos changements et on s\'en occupe, pendant qu\'on veille en continu sur la sécurité, les sauvegardes et le bon fonctionnement de votre site. Idéal pour les restaurants, commerces, agences et acteurs de l\'événementiel.',
    forWho: [
      'Les entreprises qui n\'ont ni le temps ni l\'envie de mettre leur site à jour elles-mêmes.',
      'Les restaurants, commerces et organisateurs dont les contenus changent souvent.',
      'Les propriétaires de sites (WordPress, Webflow ou sur mesure) qui veulent dormir tranquilles côté sécurité.',
    ],
    included: [
      'Jusqu\'à 2 modifications de contenu par mois (formule de base)',
      'Délai d\'exécution de 48 à 72h',
      'Sauvegardes quotidiennes',
      'Surveillance et sécurité en continu',
      'Mises à jour techniques',
      'Support par e-mail',
      'Rapport mensuel',
    ],
    process: [
      { title: 'Point de départ', text: 'On fait le tour de votre site (technologie, hébergement, accès) et on vous propose le forfait adapté. Réponse sous 24h.' },
      { title: 'Mise en place', text: 'Sauvegardes, surveillance et accès sont configurés. Si votre site n\'a pas été fait par nous, on vérifie d\'abord son état.' },
      { title: 'Au quotidien', text: 'Vous envoyez vos demandes par e-mail. On les réalise dans les délais du forfait.' },
      { title: 'Chaque mois', text: 'Vous recevez un rapport sur ce qui a été fait et l\'état du site.' },
    ],
    delay: 'Les demandes de modification sont traitées en 48 à 72h dans la formule de base.',
    priceNote:
      'La gestion et maintenance démarre à CHF 49 par mois. Le forfait dépend du nombre de modifications mensuelles et de la technologie du site. Un site que nous n\'avons pas réalisé peut demander une vérification préalable.',
    projects: [],
    faq: [
      { q: 'Combien coûte la maintenance d\'un site internet ?', a: 'Chez WebAlp, la gestion et maintenance démarre à CHF 49 par mois, avec jusqu\'à 2 modifications de contenu par mois, sauvegardes quotidiennes, sécurité et rapport mensuel.' },
      { q: 'Vous maintenez aussi des sites que vous n\'avez pas créés ?', a: 'Oui, après une vérification de l\'état du site (technologie, hébergement, mises à jour en retard). On vous dit franchement s\'il vaut mieux le maintenir ou le refaire.' },
      { q: 'Que se passe-t-il si j\'ai besoin de plus de modifications ?', a: 'On adapte le forfait, ou on chiffre les demandes ponctuelles à part. Vous savez toujours à l\'avance ce que vous payez.' },
      { q: 'Mon site WordPress est lent ou piraté, vous pouvez aider ?', a: 'Oui. On commence par un diagnostic, puis on corrige (mises à jour, nettoyage, optimisation) ou on vous propose une refonte si c\'est plus raisonnable.' },
    ],
    related: ['refonte-site-internet-valais', 'creation-site-vitrine-valais', 'application-web-sur-mesure-valais'],
    articles: ['wordpress-lent-comment-reparer', 'hebergement-web-suisse-2025', 'core-web-vitals-guide-pme'],
  },
  {
    slug: 'refonte-site-internet-valais',
    name: 'Refonte de site internet',
    short: 'Votre site actuel est lent, daté ou ne rapporte rien ? On le refait.',
    priceFrom: '690',
    priceLabel: 'dès CHF 690',
    metaTitle: 'Refonte de site internet en Valais (WordPress, Wix)',
    metaDescription:
      'Refonte de site web en Valais : site WordPress lent, Wix ou Squarespace limité, design daté. Nouveau site rapide et bien référencé, sans perdre votre SEO. Agence web à Sion.',
    h1: 'Refonte de site internet en Valais',
    intro:
      'Un site lent, difficile à lire sur téléphone, bloqué par les limites de Wix ou Squarespace, ou un WordPress chargé de plugins : la refonte remet votre site au niveau. On repart de vos objectifs, on garde ce qui fonctionne (contenus, référencement, adresses des pages) et on reconstruit un site rapide, clair et facile à faire évoluer.',
    forWho: [
      'Les sites WordPress lents ou fragiles, avec beaucoup de plugins.',
      'Les sites Wix, Squarespace ou Jimdo qui ne suffisent plus (design, vitesse, référencement).',
      'Les sites qui ont des visites mais presque pas de demandes de contact.',
    ],
    included: [
      'Audit du site actuel : vitesse, mobile, contenus, référencement',
      'Nouvelle structure des pages et nouveaux textes si besoin',
      'Design sur mesure',
      'Reprise des contenus utiles',
      'Redirections 301 de toutes les anciennes adresses, pour garder votre référencement',
      'SEO technique et vitesse de chargement',
      'Mise en ligne sans coupure',
    ],
    process: [
      { title: 'Audit', text: 'On analyse votre site actuel et ce qu\'il rapporte (visites, positions Google, demandes) avant de proposer quoi que ce soit. Devis sous 24h.' },
      { title: 'Nouvelle structure', text: 'On décide quelles pages garder, fusionner ou créer, et on prépare la correspondance entre anciennes et nouvelles adresses.' },
      { title: 'Design et développement', text: 'Maquettes, validation, puis construction du nouveau site en parallèle de l\'ancien, qui reste en ligne.' },
      { title: 'Bascule', text: 'Mise en ligne avec les redirections, puis vérification dans Google Search Console les semaines suivantes.' },
    ],
    delay: 'Pour un site vitrine, comptez environ deux à trois semaines. Le délai exact est fixé dans le devis.',
    priceNote:
      'Une refonte de site vitrine démarre au même prix qu\'un nouveau site : dès CHF 690 (Starter) ou CHF 1\'490 (Croissance). La refonte d\'une boutique ou d\'une application démarre à CHF 1\'990. L\'audit initial fait partie du devis.',
    projects: ['dronevalais'],
    faq: [
      { q: 'Vais-je perdre mon référencement Google ?', a: 'Pas si la refonte est bien faite. On garde les contenus qui fonctionnent et on redirige chaque ancienne adresse vers la nouvelle page correspondante (redirections 301), puis on suit l\'indexation dans Google Search Console.' },
      { q: 'Faut-il refaire ou seulement réparer mon site ?', a: 'Ça dépend de son état. Parfois, des corrections ciblées suffisent (vitesse, textes, bouton de contact). On vous le dit franchement après l\'audit.' },
      { q: 'Je suis sur Wix ou Squarespace, c\'est possible ?', a: 'Oui. On reprend vos contenus et on reconstruit le site sur une base plus rapide et plus souple, avec les redirections nécessaires.' },
      { q: 'Mon site reste-t-il en ligne pendant la refonte ?', a: 'Oui. Le nouveau site est construit à part et remplace l\'ancien seulement une fois validé.' },
    ],
    related: ['creation-site-vitrine-valais', 'maintenance-site-internet-valais', 'creation-site-ecommerce-valais'],
    articles: ['signes-refonte-site-wordpress', 'refonte-site-web-erreurs-eviter', 'pourquoi-wix-squarespace-insuffisant'],
  },
]

export const getService = (slug: string) => SERVICES.find(s => s.slug === slug)

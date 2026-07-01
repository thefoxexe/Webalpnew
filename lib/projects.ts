export type Project = {
  index: string
  slug: string
  url: string
  name: string
  type: string
  year: string
  sector: string
  enjeu: string
  description: string
  deliverables: string[]
  result: string
  resultLabel: string
  bg: string
  dark: boolean
  note?: string
}

export const PROJECTS: Project[] = [
  {
    index: '01',
    slug: 'dronevalais',
    url: 'https://dronevalais-production.ch',
    name: 'Drone Valais Production',
    type: 'Site vitrine + CMS sur mesure',
    year: '2025',
    sector: 'Vidéaste · Drone',
    enjeu: "Un vidéaste professionnel en Valais avait besoin d'un site à la hauteur de son talent — et d'un back-office propriétaire pour gérer devis et factures sans jongler entre Excel et e-mails.",
    description: 'Site vitrine haut de gamme pensé pour convertir les demandes de tournage drone et corporate. CMS entièrement sur mesure : gestion des devis, facturation, suivi client — tout centralisé dans une interface propriétaire.',
    deliverables: ['Site vitrine 5 pages premium', 'CMS sur mesure (devis + factures)', 'Gestion client intégrée', 'Galerie vidéo haute performance', 'SEO local ciblé Valais'],
    result: '+280%',
    resultLabel: 'demandes de devis',
    bg: '#0A0A0A',
    dark: true,
  },
  {
    index: '02',
    slug: 'goldenbulls',
    url: 'https://goldenbulls.ch',
    name: 'Golden Bulls',
    type: 'Web app + Espace membres sécurisé',
    year: '2024',
    sector: 'Investissement · Cryptomonnaie',
    enjeu: "Un groupe d'investissement crypto d'élite devait à la fois afficher une présence forte et réserver son contenu aux seuls membres vérifiés — aucun outil standard ne couvrait les deux.",
    description: 'Plateforme complète : site vitrine impactant et système de vérification de membership avec accès conditionnel. Seuls les membres accrédités franchissent la porte. Dashboard privé, outils de traction inclus.',
    deliverables: ["Site vitrine haut de gamme", "Système d'authentification membres", "Vérification d'accès conditionnelle", 'Dashboard membres exclusif', 'Outils de traction & conversion'],
    result: '100%',
    resultLabel: 'accès sécurisé & contrôlé',
    bg: '#0C0C0C',
    dark: true,
  },
  {
    index: '03',
    slug: 'monhygiene',
    url: 'https://monhygiene.ch',
    name: 'MonHygiène',
    type: 'Site + Réservation en ligne',
    year: '2025',
    sector: 'Hygiène · Services à domicile',
    enjeu: "Une entreprise de nettoyage voulait recevoir des réservations 24h/24 et garder la maîtrise complète de son planning — sans commission, sans outil tiers payant.",
    description: 'Site professionnel optimisé conversion avec module de réservation en ligne. Gestion des créneaux, des clients, des récurrences et du suivi des interventions — 100% propriétaire.',
    deliverables: ['Site vitrine optimisé conversion', 'Module de réservation en ligne', 'Gestion planning & clients', 'Gestion des récurrences', 'SEO local Valais ciblé'],
    result: '24/7',
    resultLabel: 'réservations actives',
    bg: '#0F0F0F',
    dark: true,
  },
  {
    index: '04',
    slug: 'vestedwear',
    url: 'https://vestedwear.com',
    name: 'Vestedwear',
    type: 'Boutique Shopify · E-commerce',
    year: '2025',
    sector: 'Mode · Streetwear',
    enjeu: "Une marque de mode avait besoin d'une boutique en ligne complète et performante — de zéro à une expérience d'achat fluide, avec un design à l'image de la marque et un tunnel de conversion optimisé.",
    description: "Mise en place intégrale de la boutique Shopify : configuration technique, thème personnalisé, catalogue produits structuré, paiements sécurisés et optimisation UX pour maximiser le taux de conversion.",
    deliverables: ['Configuration Shopify complète', 'Thème sur mesure & design marque', 'Catalogue produits + variantes', 'Paiements & checkout optimisé', 'Expérience mobile-first'],
    result: 'E-com live',
    resultLabel: 'boutique opérationnelle',
    bg: '#0A0A0A',
    dark: true,
  },
  {
    index: '05',
    slug: 'yourbizflow',
    url: 'https://yourbizflow.com',
    name: 'YourBizFlow',
    type: 'SaaS application complète',
    year: '2025',
    sector: 'B2B SaaS · Automatisation',
    enjeu: "Transformer une vision SaaS B2B en produit réel, monétisable et scalable — design, développement, paiements et back-office, livré de A à Z. Aujourd'hui, YourBizFlow génère plus de CHF 4'000 de MRR.",
    description: "Projet SaaS complet from scratch : design de la marque, architecture et développement de l'application, gestion des abonnements, plans payants Stripe, dashboard client et admin.",
    deliverables: ['Design & branding complet', 'Application web (front + back)', "Plans d'abonnement + Stripe", 'Dashboard client & admin', 'Gestion des versions payantes'],
    result: 'CHF 4K+',
    resultLabel: 'MRR mensuel',
    bg: '#0F0F0F',
    dark: true,
  },
  {
    index: '06',
    slug: 'neonbetx',
    url: 'https://neonbetx.com',
    name: 'NeonBetX',
    type: 'Casino crypto · Web3 · Blockchain',
    year: '2025',
    sector: 'Gaming · Crypto · Web3',
    enjeu: "Construire une plateforme de casino crypto sécurisée, avec une architecture on-chain déployée sur plusieurs blockchains — gestion des fonds, base de données décentralisée et sécurisation des transactions. Les jeux de casino sont opérés par un partenaire agréé.",
    description: "Architecture blockchain multi-chain (ETH, BNB, Polygon…), base de données on-chain, système de sécurisation des fonds et des portefeuilles. Design et développement complet de la plateforme frontend & backend. L'offre de jeux est fournie et gérée par un opérateur de casino partenaire indépendant.",
    deliverables: ['Architecture blockchain multi-chain', 'Base de données on-chain', 'Sécurisation des fonds & wallets', 'Plateforme frontend + backend', 'Intégration API jeux (opérateur partenaire)'],
    result: 'Multi-chain',
    resultLabel: 'infrastructure Web3',
    bg: '#060A12',
    dark: true,
    note: "Les jeux de casino disponibles sur cette plateforme sont mis en place et opérés par un partenaire agréé indépendant. WebAlp est responsable de l'infrastructure technique, du design et de la sécurisation des fonds uniquement.",
  },
]

export const HOME_PROJECTS = PROJECTS.slice(0, 5)

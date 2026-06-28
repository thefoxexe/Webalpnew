export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'cta'; title: string; body: string; label: string; href: string }
  | { type: 'highlight'; text: string }
  | { type: 'quote'; text: string; author?: string }

export type BlogPost = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  excerpt: string
  category: string
  readTime: number
  date: string
  author: string
  featured: boolean
  tags: string[]
  blocks: Block[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'pourquoi-site-web-ne-genere-pas-clients',
    title: 'Pourquoi votre site web ne génère aucun client en 2025',
    metaTitle: 'Pourquoi votre site web ne génère aucun client — WebAlp',
    metaDescription: 'Votre site existe, mais il ne rapporte rien ? Découvrez les 4 vraies raisons et comment transformer votre site en machine à générer des clients pour votre PME suisse.',
    excerpt: 'Votre site existe depuis des années, mais il ne vous a jamais apporté un seul client. Vous n\'êtes pas seul. 73 % des PME suisses vivent la même situation. Voici pourquoi — et surtout comment y remédier.',
    category: 'Stratégie web',
    readTime: 5,
    date: '2025-06-10',
    author: 'Bastien & Noé — WebAlp',
    featured: true,
    tags: ['site web', 'conversion', 'PME suisse', 'SEO'],
    blocks: [
      { type: 'p', text: 'Vous avez un site web. Peut-être même qu\'il est beau. Et pourtant, votre téléphone ne sonne pas pour des demandes venues d\'internet. Vos contacts entrent par le bouche-à-oreille, les salons professionnels, les relations personnelles — mais jamais par votre site.' },
      { type: 'p', text: 'Ce n\'est pas un hasard. Et ce n\'est pas une fatalité. Voici les 4 raisons réelles pour lesquelles votre site web ne génère aucun client — et ce que vous pouvez faire dès aujourd\'hui.' },
      { type: 'h2', text: '1. Vous n\'existez pas sur Google' },
      { type: 'p', text: '80 % des décisions d\'achat commencent par une recherche en ligne. Si votre site n\'apparaît pas sur la première page Google quand vos clients potentiels cherchent vos services, vous êtes invisible. Simple comme ça.' },
      { type: 'p', text: 'Le problème ? La plupart des sites web sont construits pour avoir l\'air bien — pas pour être trouvés. Pas de recherche de mots-clés, pas de structure SEO technique, pas de contenu optimisé. Résultat : vous êtes en page 4, et personne ne va en page 4.' },
      { type: 'highlight', text: 'Chaque mois que votre concurrent reste en page 1 et pas vous, c\'est des clients qui auraient pu être les vôtres.' },
      { type: 'h2', text: '2. Votre site est trop lent' },
      { type: 'p', text: 'Google l\'a officiellement confirmé : la vitesse est un critère de classement. Mais avant même Google, c\'est vos visiteurs qui abandonnent. 53 % des utilisateurs mobile quittent un site qui prend plus de 3 secondes à charger.' },
      { type: 'p', text: 'La plupart des sites WordPress avec des plugins mal configurés, des images non compressées et un hébergement bas de gamme sont systématiquement dans le rouge. Score Lighthouse sous 50/100 ? Votre site perd des clients chaque jour.' },
      { type: 'h2', text: '3. Le message n\'est pas clair' },
      { type: 'p', text: 'Un visiteur arrive sur votre site. Il a 3 secondes pour comprendre ce que vous faites, pour qui, et pourquoi il devrait vous choisir plutôt qu\'un concurrent. Si votre homepage commence par "Bienvenue sur notre site" ou votre logo et votre adresse, vous avez déjà perdu.' },
      { type: 'p', text: 'Un bon site répond immédiatement à la question que se pose le visiteur : "Qu\'est-ce que je gagne à travailler avec vous ?" Pas "Qui êtes-vous ?" — cette question vient après. La valeur d\'abord.' },
      { type: 'h2', text: '4. Il n\'y a pas d\'appel à l\'action efficace' },
      { type: 'p', text: 'Même avec un bon message, si votre visiteur ne sait pas quoi faire ensuite, il part. Un bouton "Contactez-nous" noyé en bas de page, un formulaire à 12 champs, un numéro de téléphone introuvable — autant de frictions qui font fuir.' },
      { type: 'p', text: 'La règle d\'or : chaque page de votre site doit avoir un objectif clair et un seul appel à l\'action principal. Le reste est distraction.' },
      { type: 'cta', title: 'Votre site a ces problèmes ?', body: 'On fait un audit gratuit de votre site en 24h — vitesse, SEO, message, conversion. Sans engagement.', label: 'Obtenir mon audit gratuit', href: 'https://webalp.ch/#contact' },
      { type: 'h2', text: 'La bonne nouvelle : tout ça se règle' },
      { type: 'p', text: 'Ces 4 problèmes sont techniques et stratégiques — ils ont des solutions concrètes. Un site refait avec une vraie stratégie SEO, des performances optimisées, un message clair et des CTAs bien placés peut transformer complètement votre acquisition client.' },
      { type: 'p', text: 'On a fait ça pour Drone Valais Production : +280% de demandes de devis en 4 mois. Pour Golden Bulls : un trafic qualifié multiplié par 3. Pour MonHygiène : 100% des réservations passent désormais par le site, 24h/24.' },
      { type: 'quote', text: 'Un site web qui ne rapporte rien n\'est pas un actif. C\'est une dépense. La différence entre les deux, c\'est la stratégie.', author: 'Bastien, co-fondateur WebAlp' },
      { type: 'h2', text: 'Ce qu\'un site efficace doit accomplir' },
      { type: 'ul', items: ['Apparaître sur Google pour les mots-clés de vos clients', 'Charger en moins de 2 secondes sur mobile', 'Communiquer votre valeur en 3 secondes', 'Guider le visiteur vers une seule action : vous contacter', 'Mesurer chaque interaction pour améliorer en continu'] },
      { type: 'p', text: 'Si votre site actuel ne coche pas ces cases, il est temps de changer d\'approche. Non pas pour avoir un beau site — mais pour en avoir un qui travaille pour vous 24h/24.' },
      { type: 'cta', title: 'Prêt à avoir un site qui génère des clients ?', body: 'On livre en 14 jours. Dès CHF 690. Résultats mesurables.', label: 'Démarrer un projet', href: 'https://webalp.ch/#contact' },
    ],
  },
  {
    slug: 'seo-local-suisse-guide-pme',
    title: 'SEO local en Suisse : le guide complet pour les PME valaisannes et romandes',
    metaTitle: 'SEO local Suisse 2025 : guide complet pour PME — WebAlp',
    metaDescription: 'Comment être en page 1 Google pour vos services locaux en Suisse romande ? Guide SEO local complet : Google Business, mots-clés locaux, avis, technique. Par WebAlp, agence web à Sion.',
    excerpt: 'Être visible sur Google quand vos clients locaux vous cherchent — c\'est le nerf de la guerre pour toute PME suisse. Voici comment dominer le SEO local dans votre région, étape par étape.',
    category: 'SEO',
    readTime: 8,
    date: '2025-05-22',
    author: 'Bastien & Noé — WebAlp',
    featured: true,
    tags: ['SEO local', 'Google', 'Suisse romande', 'Valais', 'PME'],
    blocks: [
      { type: 'p', text: 'Quand quelqu\'un à Sion, Sierre, Martigny ou Lausanne tape "plombier Sion" ou "coiffeur Martigny" sur Google, qui apparaît en premier ? Probablement pas vous. Mais ça pourrait changer.' },
      { type: 'p', text: 'Le SEO local est la discipline qui consiste à optimiser votre présence en ligne pour apparaître dans les résultats de recherche géographiquement ciblés. C\'est la version numérique du bouche-à-oreille — mais à l\'échelle de tout Google.' },
      { type: 'h2', text: 'Qu\'est-ce que le SEO local et pourquoi c\'est crucial pour les PME suisses' },
      { type: 'p', text: 'Contrairement au SEO national (compétition contre toute la Suisse ou l\'Europe), le SEO local cible les recherches avec intention géographique. "Avocat Lausanne", "nettoyage Valais", "développeur web Sion" — ces requêtes ont une intention d\'achat très forte et une concurrence souvent bien plus faible.' },
      { type: 'p', text: 'Pour une PME suisse avec une clientèle locale, c\'est l\'opportunité de rivaliser avec de grandes entreprises sur leur propre terrain — à condition de faire les choses dans les règles.' },
      { type: 'highlight', text: 'Les 3 premiers résultats Google captent 75 % des clics. Si vous n\'êtes pas là, vous n\'existez pas pour ces clients.' },
      { type: 'h2', text: 'Étape 1 : Google Business Profile — votre point de départ obligatoire' },
      { type: 'p', text: 'Google Business Profile (anciennement Google My Business) est la fiche qui apparaît dans le panneau de droite et dans les résultats Google Maps. C\'est souvent le premier contact entre vous et un client potentiel local.' },
      { type: 'ul', items: ['Réclamez et vérifiez votre fiche Google Business', 'Remplissez TOUT : horaires, photos, services, description', 'Ajoutez des photos de qualité (extérieur, intérieur, équipe, produits)', 'Choisissez les bonnes catégories (primaire et secondaires)', 'Répondez à TOUS les avis — positifs ET négatifs'] },
      { type: 'p', text: 'Une fiche Google Business bien optimisée peut seule vous faire apparaître dans le "pack local" (les 3 résultats avec carte) pour vos mots-clés cibles. C\'est gratuit. C\'est puissant. Et 70 % des PME suisses ne le font pas correctement.' },
      { type: 'h2', text: 'Étape 2 : Les mots-clés locaux qui convertissent' },
      { type: 'p', text: 'La recherche de mots-clés locaux est différente de la recherche classique. Vos futurs clients tapent des combinaisons de [service] + [ville/canton] ou des recherches de proximité type "près de moi".' },
      { type: 'ol', items: ['Listez vos services principaux (ex: nettoyage, coiffeur, avocat)', 'Combinez avec vos zones géographiques (Sion, Valais, Suisse romande)', 'Identifiez les variantes : "prix", "devis", "pas cher", "professionnel"', 'Ciblez les longues traînes : "nettoyage appartement Sion pas cher"'] },
      { type: 'p', text: 'Outils gratuits pour cette recherche : Google Keyword Planner, Google Search Console, et simplement taper votre service dans Google et observer les suggestions automatiques.' },
      { type: 'cta', title: 'Vous voulez savoir sur quels mots-clés vous devriez être visible ?', body: 'On fait un audit SEO local gratuit pour votre entreprise — positionnement actuel, opportunités, concurrents.', label: 'Demander mon audit SEO', href: 'https://webalp.ch/#contact' },
      { type: 'h2', text: 'Étape 3 : L\'importance des avis Google' },
      { type: 'p', text: 'Les avis Google sont un signal de confiance majeur pour Google ET pour vos clients. Une fiche avec 50 avis à 4,7 étoiles bat presque toujours une fiche avec 3 avis à 5 étoiles.' },
      { type: 'p', text: 'Comment obtenir plus d\'avis sans enfreindre les règles Google ? Simplement, après chaque prestation réussie, envoyez un SMS ou email avec un lien direct vers votre formulaire d\'avis. La clé : la facilité. Plus c\'est simple pour le client, plus il laissera un avis.' },
      { type: 'h2', text: 'Étape 4 : La technique SEO derrière — ce que votre site doit avoir' },
      { type: 'p', text: 'Un site web optimisé pour le SEO local doit avoir des bases techniques solides. Ce ne sont pas des options — c\'est le minimum.' },
      { type: 'ul', items: ['Balise title avec ville : "Nettoyage professionnel à Sion — MonHygiène"', 'Balise meta description avec appel à l\'action local', 'Balise H1 claire avec le service et la zone', 'Contenu de page mentionnant la ville/région naturellement', 'Schema markup LocalBusiness avec adresse, horaires, téléphone', 'Liens internes cohérents', 'Vitesse de chargement < 2,5s (Core Web Vitals)', 'Site 100% mobile-first'] },
      { type: 'h2', text: 'Étape 5 : Citations et cohérence NAP' },
      { type: 'p', text: 'NAP = Name, Address, Phone. Votre nom d\'entreprise, adresse et numéro de téléphone doivent être IDENTIQUES partout sur internet : votre site, Google Business, Facebook, local.ch, search.ch, directories professionnelles.' },
      { type: 'p', text: 'La moindre incohérence (abréviation différente, numéro avec ou sans espace) affaiblit votre autorité locale aux yeux de Google.' },
      { type: 'h2', text: 'Combien de temps avant de voir des résultats ?' },
      { type: 'p', text: 'Le SEO local, c\'est du moyen terme. Avec une stratégie bien exécutée, vous pouvez voir des améliorations de positionnement en 2 à 3 mois. Une domination sur vos mots-clés cibles locaux se construit sur 6 à 12 mois.' },
      { type: 'p', text: 'La bonne nouvelle : une fois que vous êtes en position, vous restez. Le SEO local est un investissement, pas une dépense récurrente sans fin — contrairement à Google Ads.' },
      { type: 'quote', text: 'Le meilleur moment pour démarrer le SEO local, c\'était il y a 2 ans. Le deuxième meilleur moment, c\'est aujourd\'hui.', author: 'Noé, co-fondateur WebAlp' },
      { type: 'cta', title: 'Prêt à dominer Google dans votre région ?', body: 'On s\'occupe de tout : audit, stratégie mots-clés, optimisation technique, Google Business. Plans dès CHF 290/mois.', label: 'Voir nos offres SEO', href: 'https://webalp.ch/#tarifs' },
    ],
  },
  {
    slug: 'prix-site-web-professionnel-suisse-2025',
    title: 'Combien coûte vraiment un site web professionnel en Suisse en 2025',
    metaTitle: 'Prix site web professionnel Suisse 2025 — WebAlp Sion',
    metaDescription: 'Template gratuit, WordPress, Webflow ou sur mesure ? Découvrez les vrais prix d\'un site web en Suisse en 2025, ce qui justifie les écarts, et ce que vous devriez réellement payer.',
    excerpt: 'De CHF 0 (template) à CHF 50\'000 (grande agence), les fourchettes de prix pour un site web en Suisse sont larges. Voici ce qui se cache vraiment derrière ces chiffres — et ce que vous devriez payer selon votre situation.',
    category: 'Budget & tarifs',
    readTime: 6,
    date: '2025-04-15',
    author: 'Bastien & Noé — WebAlp',
    featured: false,
    tags: ['prix site web', 'budget', 'Suisse', 'agence web', 'coût'],
    blocks: [
      { type: 'p', text: 'La question revient dans chaque conversation commerciale : "C\'est combien pour un site web ?" La réponse honnête : entre CHF 0 et CHF 50\'000 selon ce que vous voulez et qui vous le fait. Voici comment vous y retrouver.' },
      { type: 'h2', text: 'Les 4 grandes catégories de sites web' },
      { type: 'h3', text: '1. Les templates et DIY (CHF 0 – 500)' },
      { type: 'p', text: 'Wix, Squarespace, WordPress avec thème gratuit. Vous faites tout vous-même, vous payez seulement l\'hébergement et le domaine. Résultat : un site générique, difficile à personnaliser, avec des performances SEO limitées et l\'image d\'une entreprise "pas sérieuse".' },
      { type: 'p', text: 'Pour qui : les personnes qui testent une idée, les associations, ou ceux qui ont vraiment zéro budget.' },
      { type: 'h3', text: '2. Les agences low-cost et freelances débutants (CHF 500 – 1\'500)' },
      { type: 'p', text: 'Des thèmes WordPress personnalisés, souvent achetés sur ThemeForest et modifiés rapidement. Le rendu peut être correct visuellement, mais le code est lourd, les performances sont médiocres, le SEO est inexistant et la maintenance devient vite un cauchemar.' },
      { type: 'p', text: 'Pour qui : les projets sans ambition de croissance en ligne.' },
      { type: 'h3', text: '3. Les agences qualifiées et freelances expérimentés (CHF 1\'500 – 8\'000)' },
      { type: 'p', text: 'C\'est notre zone. Des sites conçus stratégiquement, avec une vraie réflexion UX, un SEO technique solide, des performances élevées et un design sur mesure. Le code est propre, le site est rapide, et il est pensé pour convertir.' },
      { type: 'p', text: 'Chez WebAlp, nos projets démarrent à CHF 690 pour un site vitrine 5 pages — parce qu\'on est deux, sans bureau fixe, et qu\'on répercute ces économies sur votre devis.' },
      { type: 'h3', text: '4. Les grandes agences et agences digitales (CHF 8\'000 – 50\'000+)' },
      { type: 'p', text: 'Des équipes de 10+ personnes, des processus structurés, une direction artistique senior à CHF 350/h. Pertinent pour les grandes entreprises avec des besoins complexes. Surdimensionné pour 95 % des PME suisses.' },
      { type: 'cta', title: 'Vous ne savez pas quel budget prévoir ?', body: 'On vous fait un devis gratuit en 24h. Adapté à votre situation réelle — pas un package standard.', label: 'Obtenir un devis gratuit', href: 'https://webalp.ch/#contact' },
      { type: 'h2', text: 'Ce qui fait vraiment varier le prix' },
      { type: 'ul', items: ['Nombre de pages (5 pages vs 50 pages)', 'Fonctionnalités (formulaire simple vs réservation vs e-commerce)', 'Complexité du design (template adapté vs création de zéro)', 'Intégrations (CRM, paiement, newsletter, etc.)', 'Rédaction de contenu incluse ou non', 'SEO inclus ou en option', 'Niveau de performance attendu'] },
      { type: 'h2', text: 'Pourquoi le moins cher est souvent le plus cher' },
      { type: 'p', text: 'Un site à CHF 500 qui ne génère aucun client coûte infiniment plus cher qu\'un site à CHF 1\'500 qui vous rapporte 5 nouveaux clients par mois. L\'erreur classique : regarder le coût d\'acquisition du site sans regarder le ROI potentiel.' },
      { type: 'highlight', text: 'Un seul client obtenu via votre site peut rentabiliser l\'investissement. La question n\'est pas "Combien ça coûte ?" mais "Combien ça rapporte ?"' },
      { type: 'h2', text: 'Ce que vous devriez réellement payer selon votre cas' },
      { type: 'ul', items: ['Artisan / indépendant / petite boutique → CHF 690 – 1\'200', 'PME avec ambition SEO et acquisition client → CHF 1\'200 – 2\'500', 'E-commerce avec catalogue produits → CHF 2\'500 – 6\'000', 'Application web ou SaaS → CHF 5\'000 – 20\'000+'] },
      { type: 'p', text: 'Ces fourchettes correspondent à un travail de qualité, avec stratégie SEO incluse, design sur mesure, et performances optimisées. Si on vous propose moins pour les mêmes promesses, posez des questions.' },
      { type: 'cta', title: 'Vous connaissez maintenant votre budget ?', body: 'Dès CHF 690, on vous livre un site professionnel en 14 jours. Voyez nos plans et choisissez celui qui correspond à votre projet.', label: 'Voir les tarifs WebAlp', href: 'https://webalp.ch/#tarifs' },
    ],
  },
  {
    slug: '5-erreurs-fatales-site-web-pme',
    title: '5 erreurs qui font fuir vos visiteurs (et vous coûtent des clients chaque jour)',
    metaTitle: '5 erreurs fatales sur votre site web PME — WebAlp',
    metaDescription: 'Site trop lent, message flou, pas de CTA, aucune preuve sociale... Ces 5 erreurs font fuir vos visiteurs et vous coûtent des clients chaque jour. Vérifiez votre site maintenant.',
    excerpt: 'Vous avez du trafic, mais peu de conversions ? Ou pas de trafic du tout ? Ces 5 erreurs que commettent 9 PME suisses sur 10 expliquent pourquoi votre site ne génère pas de clients — et comment les corriger rapidement.',
    category: 'UX & Conversion',
    readTime: 5,
    date: '2025-03-08',
    author: 'Bastien & Noé — WebAlp',
    featured: false,
    tags: ['UX', 'conversion', 'erreurs', 'site web', 'optimisation'],
    blocks: [
      { type: 'p', text: 'On a audité des dizaines de sites de PME suisses. La même liste d\'erreurs revient, systématiquement, chez 9 entreprises sur 10. Ces erreurs ne coûtent pas visiblement — elles coûtent silencieusement, chaque jour, chaque semaine, pendant des années.' },
      { type: 'h2', text: 'Erreur 1 : Un site qui rame' },
      { type: 'p', text: 'La vitesse n\'est pas un luxe, c\'est un prérequis. 53 % des visiteurs mobiles abandonnent un site qui charge en plus de 3 secondes. Et Google pénalise directement les sites lents dans ses classements.' },
      { type: 'p', text: 'Les coupables habituels : images non compressées (la cause n°1), hébergement partagé bas de gamme, thèmes WordPress chargés de plugins inutiles, pas de mise en cache.' },
      { type: 'p', text: 'Test rapide : allez sur PageSpeed Insights (gratuit, de Google) et testez votre site. En dessous de 70/100 en mobile ? Vous avez un problème urgent.' },
      { type: 'highlight', text: 'Chaque seconde de temps de chargement en plus = 7 % de conversions en moins. Ce n\'est pas de la théorie, c\'est une donnée Google.' },
      { type: 'h2', text: 'Erreur 2 : Aucun message clair sur votre valeur' },
      { type: 'p', text: 'Votre visiteur arrive sur votre site avec une question simple : "Est-ce que cette entreprise peut résoudre mon problème ?" Il a 3 secondes pour trouver une réponse avant de cliquer sur "retour".' },
      { type: 'p', text: 'Les sites qui échouent commencent par : "Bienvenue sur notre site", leur logo géant, ou une photo générique d\'une poignée de mains. Les sites qui convertissent commencent par : "[Problème client] → [Solution] → [Résultat attendu]".' },
      { type: 'ul', items: ['❌ "Entreprise de nettoyage en Valais depuis 1999"', '✅ "Votre appartement impeccable en 3h. Réservez en ligne maintenant."'] },
      { type: 'h2', text: 'Erreur 3 : Pas optimisé mobile' },
      { type: 'p', text: 'En Suisse, plus de 60 % des recherches locales se font sur smartphone. Si votre site est "responsive" mais que le texte est trop petit, les boutons trop proches, le menu incompréhensible — vous perdez plus de la moitié de vos visiteurs potentiels.' },
      { type: 'p', text: 'Mobile-first ne veut pas dire "ça s\'affiche sur mobile". Ça veut dire : conçu pour mobile, naturel sur mobile, rapide sur mobile. La version desktop est la version secondaire.' },
      { type: 'h2', text: 'Erreur 4 : Trop d\'éléments qui distraient' },
      { type: 'p', text: 'Slider animé, vidéo en autoplay, pop-ups qui s\'enchaînent, couleurs criantes, texte partout — chaque élément supplémentaire dilue l\'attention de votre visiteur. Résultat : il ne fait rien.' },
      { type: 'p', text: 'La règle des meilleures landing pages : une page = un objectif = un appel à l\'action principal. Tout le reste est là pour soutenir cet objectif, pas pour briller.' },
      { type: 'cta', title: 'Votre site souffre de ces erreurs ?', body: 'On fait un audit gratuit et complet : vitesse, message, mobile, conversion, SEO. Rapport détaillé en 24h.', label: 'Demander mon audit gratuit', href: 'https://webalp.ch/#contact' },
      { type: 'h2', text: 'Erreur 5 : Aucune preuve sociale' },
      { type: 'p', text: 'Les humains font confiance aux humains. Avant de vous contacter, votre visiteur veut savoir : "Est-ce que d\'autres personnes ont fait confiance à cette entreprise et en sont contentes ?"' },
      { type: 'p', text: 'Témoignages clients, études de cas, avis Google intégrés, logos de clients, chiffres de résultats — toutes ces preuves sociales augmentent la confiance et donc le taux de conversion. Sans elles, vous demandez à vos visiteurs de prendre un risque.' },
      { type: 'ul', items: ['Ajoutez 3 à 5 témoignages clients avec nom, entreprise, photo si possible', 'Affichez vos résultats chiffrés (+X% de clients, Y projets livrés)', 'Intégrez vos avis Google directement sur le site', 'Montrez des logos de clients connus ou reconnaissables'] },
      { type: 'h2', text: 'Comment corriger ces erreurs rapidement' },
      { type: 'p', text: 'Certaines de ces erreurs se règlent en quelques heures (comprimer les images, ajouter un CTA clair). D\'autres nécessitent une refonte partielle ou totale (message, structure, performance).' },
      { type: 'p', text: 'L\'étape 1 : savoir exactement où en est votre site. Un audit complet vous donne une liste précise des priorités — sans passer des heures à tâtonner.' },
      { type: 'quote', text: 'Les meilleures décisions viennent de données, pas d\'impressions. Sachez d\'abord où vous en êtes.', author: 'Bastien, WebAlp' },
      { type: 'cta', title: 'Prêt à corriger ces erreurs une bonne fois pour toutes ?', body: 'Refonte complète ou corrections ciblées. On s\'adapte à votre situation. Devis gratuit, livraison en 14 jours.', label: 'Démarrer maintenant', href: 'https://webalp.ch/#contact' },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map(p => p.slug)
}

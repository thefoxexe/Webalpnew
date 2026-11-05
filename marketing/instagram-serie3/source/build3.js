// WebAlp — série 3 : 10 carousels 4:5 (1080x1350), DA éditoriale propre.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const W = 1080, H = 1350;
const ROOT = __dirname;
const FONTS = fs.readFileSync(path.join(ROOT, 'fonts.css'), 'utf8');
const WORK = '/home/user/Webalpnew/public/work';
const LOGOS = [...fs.readFileSync('/home/user/Webalpnew/lib/ai-logos.ts', 'utf8').matchAll(/name: "([^"]+)", path: "([^"]+)"/g)].map(m => ({ name: m[1], path: m[2] }));

const CSS = `${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{height:${H}px;overflow:hidden;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.s{position:absolute;top:0;width:${W}px;height:${H}px;padding:92px 96px 84px;display:flex;flex-direction:column;overflow:hidden;background:var(--bg);color:var(--fg)}
.ink{--bg:#0A0A0A;--fg:#F5F4F0;--mut:rgba(245,244,240,.6);--faint:rgba(245,244,240,.32);--line:rgba(245,244,240,.14);--card:#141414;--acc:#B3FF47}
.cream{--bg:#F5F4F0;--fg:#0A0A0A;--mut:rgba(10,10,10,.6);--faint:rgba(10,10,10,.32);--line:rgba(10,10,10,.12);--card:#FFFFFF;--acc:#0A0A0A}
.white{--bg:#FFFFFF;--fg:#0A0A0A;--mut:rgba(10,10,10,.6);--faint:rgba(10,10,10,.32);--line:rgba(10,10,10,.1);--card:#F5F4F0;--acc:#0A0A0A}
.lime{--bg:#B3FF47;--fg:#0A0A0A;--mut:rgba(10,10,10,.68);--faint:rgba(10,10,10,.4);--line:rgba(10,10,10,.18);--card:#0A0A0A;--acc:#0A0A0A}
.top{display:flex;justify-content:space-between;align-items:center;height:48px}
.wm{font-family:'Space Grotesk';font-weight:700;font-size:40px;letter-spacing:-.05em}
.wm b{font-weight:700;color:#B3FF47}.cream .wm b,.white .wm b,.lime .wm b{color:inherit}
.cnt{font-size:24px;font-weight:500;color:var(--faint);font-variant-numeric:tabular-nums}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:30px 0}
.bot{display:flex;justify-content:space-between;align-items:center;height:72px}
.url{font-size:24px;font-weight:500;color:var(--mut)}
.go{width:72px;height:72px;border-radius:50%;border:2px solid var(--line);display:grid;place-items:center;color:var(--fg)}
.lab{font-size:28px;font-weight:500;color:var(--mut);margin-bottom:36px}
.d{font-family:'Space Grotesk';font-weight:700;letter-spacing:-.045em;line-height:.95}
.h1{font-size:118px}.h2{font-size:92px}.h3{font-size:66px}.h4{font-size:46px;letter-spacing:-.03em;line-height:1.05}
.p{font-size:36px;line-height:1.42;color:var(--mut);letter-spacing:-.01em}
.p b{color:var(--fg);font-weight:600}
.a{color:#B3FF47}
.cream .a,.white .a{color:inherit;background:linear-gradient(transparent 62%,#B3FF47 62%,#B3FF47 94%,transparent 94%)}
.lime .a{color:inherit;text-decoration:underline;text-decoration-thickness:6px;text-underline-offset:10px}
.card{background:var(--card);border-radius:30px;border:1px solid var(--line)}
.row{display:flex;gap:22px;align-items:flex-start}
.ck{width:46px;height:46px;border-radius:50%;background:#B3FF47;color:#0A0A0A;display:grid;place-items:center;flex:none;margin-top:2px}
.no{width:46px;height:46px;border-radius:50%;border:2px solid var(--faint);color:var(--mut);display:grid;place-items:center;flex:none;margin-top:2px}
.big{font-family:'Space Grotesk';font-weight:700;letter-spacing:-.06em;line-height:.8}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 26px;border-radius:999px;border:1.5px solid var(--line);font-size:26px;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:16px;padding:28px 44px;border-radius:999px;background:#0A0A0A;color:#B3FF47;font-family:'Space Grotesk';font-weight:700;font-size:34px;letter-spacing:-.02em}
.ink .btn{background:#B3FF47;color:#0A0A0A}
.shot{border-radius:24px;overflow:hidden;border:1px solid var(--line);box-shadow:0 40px 90px -30px rgba(0,0,0,.55);background:#111}
.shot .bar{height:46px;background:#1C1C1E;display:flex;align-items:center;gap:10px;padding:0 20px}.shot .bar i{width:13px;height:13px;border-radius:50%;background:#3A3A3C}
.shot img{display:block;width:100%}
`;

const ARROW = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 5.5l6.5 6.5-6.5 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CK = `<svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const XX = `<svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
const logo = (p, s, extra = '') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="currentColor" ${extra}><path d="${p}"/></svg>`;
const img = (f) => `file://${WORK}/${f}`;
const shot = (f, style = '') => `<div class="shot" style="${style}"><div class="bar"><i></i><i></i><i></i></div><img src="${img(f)}"></div>`;

function slides(list, theme) {
  const n = list.length;
  return list.map((s, i) => {
    const th = s.theme || theme;
    const last = i === n - 1;
    return `<section class="s ${th}" style="left:${i * W}px">${s.deco || ''}
      <div class="top" style="position:relative;z-index:2"><div class="wm">Web<b>Alp</b></div><div class="cnt">${i + 1} / ${n}</div></div>
      <div class="main" style="position:relative;z-index:2">${s.html}</div>
      <div class="bot" style="position:relative;z-index:2"><div class="url">webalp.ch</div>${last ? '<div class="url">Réponse sous 24h</div>' : `<div class="go">${ARROW}</div>`}</div>
    </section>`;
  });
}
const cta = (title, sub, extra = '') => ({
  theme: 'lime', html: `
  <h2 class="d h2">${title}</h2>
  <p class="p" style="margin-top:36px">${sub}</p>
  ${extra}
  <div style="margin-top:64px"><span class="btn">webalp.ch ${ARROW}</span></div>`,
});
const list = (items, gap = 34, size = 38) => `<div style="display:flex;flex-direction:column;gap:${gap}px">${items.map(t => `<div class="row"><span class="ck">${CK}</span><div style="font-size:${size}px;font-weight:500;line-height:1.3;letter-spacing:-.01em">${t}</div></div>`).join('')}</div>`;
const numSlide = (num, title, text, extraHtml = '') => ({
  html: `<div class="big" style="font-size:240px;color:var(--faint)">${num}</div>
  <h2 class="d h3" style="margin-top:40px">${title}</h2>
  <p class="p" style="margin-top:28px">${text}</p>${extraHtml}`,
});

const C = [];

// 1 — L'IA, honnêtement
C.push({
  slug: '11-on-utilise-l-ia', theme: 'ink', slides: [
    {
      deco: `<div style="position:absolute;inset:0;color:#fff;opacity:.06">${LOGOS.map((l, i) => `<div style="position:absolute;left:${[66, 82, 54, 74, 88, 60, 80][i]}%;top:${[12, 26, 34, 52, 66, 76, 86][i]}%;transform:rotate(${[-8, 6, -4, 10, -6, 4, -10][i]}deg)">${logo(l.path, [130, 80, 70, 110, 76, 96, 64][i])}</div>`).join('')}</div>`,
      html: `<p class="lab">Transparence</p><h1 class="d h1">Oui, on utilise l’IA pour créer vos sites.</h1>
      <p class="p" style="margin-top:44px;max-width:760px">Et c’est une <b>bonne nouvelle</b> pour vous. On vous explique.</p>`,
    },
    { html: `<p class="lab">Ce que fait l’IA</p><h2 class="d h2" style="margin-bottom:60px">Le travail <span class="a">répétitif.</span></h2>
      ${list(['Écrire et tester du code plus vite', 'Préparer des premières versions de textes', 'Traduire en allemand et en anglais', 'Automatiser les vérifications'])}` },
    { html: `<p class="lab">Ce qu’elle ne fait pas</p><h2 class="d h2" style="margin-bottom:60px">Tout ce qui <span class="a">compte vraiment.</span></h2>
      <div style="display:flex;flex-direction:column;gap:34px">${['Comprendre votre métier et vos clients', 'Choisir le bon message', 'Juger ce qui inspire confiance', 'Assumer le résultat'].map(t => `<div class="row"><span class="no">${XX}</span><div style="font-size:38px;font-weight:500;line-height:1.3">${t}</div></div>`).join('')}</div>` },
    { html: `<p class="lab">Concrètement</p><h2 class="d h3" style="margin-bottom:48px">L’IA propose. <span class="a">On décide.</span></h2>
      <div class="card" style="padding:40px;font-family:'JetBrains Mono';font-size:27px;line-height:1.75">
        <div style="color:var(--fg)"><span class="a">›</span> Page d’accueil pour un menuisier</div>
        <div style="color:var(--fg)"><span class="a">›</span> à Savièse, ton chaleureux.</div>
        <div style="color:var(--faint);margin-top:22px">IA · structure proposée</div>
        <div style="color:var(--faint)">IA · premiers textes</div>
        <div style="color:var(--faint)">IA · code généré</div>
        <div style="height:1px;background:var(--line);margin:24px 0"></div>
        <div class="a">✓ textes réécrits avec le vrai métier</div>
        <div class="a">✓ vraies photos du client</div>
        <div class="a">✓ testé, relu, mis en ligne</div>
      </div>` },
    { html: `<p class="lab">Ce que vous y gagnez</p>
      <div style="display:flex;flex-direction:column;gap:30px">
        ${['Des prix plus bas.', 'Des délais plus courts.', 'Deux humains qui répondent sous 24h.'].map((t, i) => `<div class="d h2" style="${i === 2 ? 'color:#B3FF47' : ''}">${t}</div>`).join('')}
      </div>` },
    { html: `<p class="lab">Nos outils au quotidien</p><h2 class="d h3" style="margin-bottom:64px">Les meilleurs outils, <span class="a">entre de bonnes mains.</span></h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">${LOGOS.map(l => `<div class="card" style="padding:28px 30px;display:flex;align-items:center;gap:22px;color:var(--fg)">${logo(l.path, 40)}<span style="font-size:30px;font-weight:600">${l.name}</span></div>`).join('')}</div>` },
    cta('Un site pensé par des humains, construit plus vite.', 'Site vitrine dès <b>CHF 690</b>. Devis gratuit sous 24h, à Sion.'),
  ],
});

// 2 — Anatomie d'une page d'accueil
const zone = (k, hl, inner, h) => `<div style="position:relative;height:${h}px;margin:0 0 12px;border-radius:16px;padding:18px 20px;${hl === k ? 'outline:5px solid #B3FF47;outline-offset:4px;background:#fff' : hl === 0 ? 'background:#fff' : 'background:#fff;opacity:.28'}">${inner}${hl === 0 || hl === k ? `<span style="position:absolute;right:-26px;top:-22px;width:56px;height:56px;border-radius:50%;background:#0A0A0A;color:#B3FF47;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:28px">${k}</span>` : ''}</div>`;
const mock = (hl) => `<div style="width:470px;border-radius:52px;background:#0A0A0A;padding:22px 20px 26px;box-shadow:0 40px 90px -30px rgba(0,0,0,.45)">
  <div style="height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 10px 14px;color:#fff"><b style="font-family:'Space Grotesk';font-size:22px">Menuiserie Exemple</b><span style="font-size:22px">☰</span></div>
  <div style="background:#ECEBE6;border-radius:30px;padding:18px">
  ${zone(1, hl, `<div style="font-family:'Space Grotesk';font-weight:700;font-size:34px;line-height:1;letter-spacing:-.03em;color:#0A0A0A">Menuiserie sur mesure à Sion</div><div style="font-size:16px;color:#666;margin-top:10px">Cuisines, dressings, escaliers.</div>`, 150)}
  ${zone(2, hl, `<div style="background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:16px;text-align:center;font-weight:700;font-size:20px">Demander un devis →</div>`, 92)}
  ${zone(3, hl, `<div style="display:flex;gap:8px">${['#C9B79C', '#9FB0B8', '#B39A7C'].map(c => `<i style="flex:1;height:70px;border-radius:10px;background:${c}"></i>`).join('')}</div><div style="font-size:16px;color:#333;margin-top:12px;font-weight:600"><span style="color:#FBBC04">★★★★★</span> Avis Google</div>`, 140)}
  ${zone(4, hl, ['Cuisines sur mesure', 'Dressings', 'Escaliers'].map(t => `<div style="display:flex;justify-content:space-between;font-size:18px;color:#222;padding:6px 0;border-bottom:1px solid #eee"><span>${t}</span><span style="color:#888">dès …</span></div>`).join(''), 140)}
  ${zone(5, hl, `<div style="display:flex;gap:8px">${['Appeler', 'WhatsApp', 'Formulaire'].map(t => `<span style="flex:1;text-align:center;border:2px solid #0A0A0A;border-radius:999px;padding:12px 0;font-weight:700;font-size:16px;color:#0A0A0A">${t}</span>`).join('')}</div>`, 86)}
  </div></div>`;
const anat = (k, title, text) => ({ html: `<div style="display:grid;grid-template-columns:1fr 470px;gap:50px;align-items:center">
  <div><div class="big" style="font-size:150px;color:var(--faint)">0${k}</div><h2 class="d h4" style="margin-top:26px;font-size:54px">${title}</h2><p class="p" style="margin-top:22px;font-size:31px">${text}</p></div>
  ${mock(k)}</div>` });
C.push({
  slug: '12-anatomie-page-accueil', theme: 'cream', slides: [
    { html: `<div style="display:grid;grid-template-columns:1fr 470px;gap:50px;align-items:center">
      <div><p class="lab">Exemple annoté</p><h1 class="d" style="font-size:80px">L’anatomie d’une page d’accueil <span class="a">qui vend.</span></h1><p class="p" style="margin-top:30px;font-size:32px">5 zones. Si une manque, vous perdez des demandes.</p></div>
      ${mock(0)}</div>` },
    anat(1, 'Un titre qui dit quoi, et où.', 'Pas « Bienvenue ». Votre métier et votre région, compris en 3 secondes.'),
    anat(2, 'Un bouton visible tout de suite.', 'Sans avoir à faire défiler. Un seul, avec une action claire.'),
    anat(3, 'Des preuves.', 'Vos vraies réalisations et vos avis Google. C’est ce qui rassure avant d’appeler.'),
    anat(4, 'Vos services, en clair.', 'Ce que vous faites, avec un prix « dès » si possible. Moins d’hésitation.'),
    anat(5, 'Le contact en un geste.', 'Téléphone, WhatsApp, formulaire court. Le visiteur choisit.'),
    cta('Votre page d’accueil a les 5 ?', 'Envoyez-nous le lien de votre site : <b>on vous fait un retour gratuit</b>, sans engagement.'),
  ],
});

// 3 — Google Business Profile
const gcard = `<div style="background:#fff;border-radius:28px;box-shadow:0 30px 80px -30px rgba(0,0,0,.25);overflow:hidden;color:#202124;border:1px solid #e6e6e6">
  <div style="height:170px;background:linear-gradient(135deg,#C9B79C,#8E7B63)"></div>
  <div style="padding:30px 34px"><div style="font-size:38px;font-weight:600">Votre entreprise</div>
  <div style="font-size:24px;color:#70757A;margin-top:8px">4,9 <span style="color:#FBBC04">★★★★★</span> · Menuisier · Sion</div>
  <div style="font-size:24px;color:#188038;margin-top:8px">Ouvert · Ferme à 18:00</div>
  <div style="display:flex;gap:12px;margin-top:22px">${['Site Web', 'Itinéraire', 'Appeler'].map((t, i) => `<span style="border:2px solid #DADCE0;border-radius:999px;padding:12px 24px;font-size:22px;font-weight:600;color:#1A73E8;${i === 0 ? 'background:#E8F0FE;border-color:#E8F0FE' : ''}">${t}</span>`).join('')}</div></div></div>`;
C.push({
  slug: '13-fiche-google-6-reglages', theme: 'white', slides: [
    { html: `<p class="lab">SEO local</p><h1 class="d" style="font-size:88px">Votre fiche Google compte <span class="a">autant que votre site.</span></h1>
      <p class="p" style="margin-top:36px">6 réglages à faire cette semaine. Ça prend 10 minutes.</p>
      <div style="margin-top:48px;max-width:640px">${gcard}</div>` },
    numSlide('01', 'La bonne catégorie.', '« Menuisier », « Coiffeur », « Fiduciaire »… pas « Entreprise ». C’est elle qui vous fait apparaître sur les bonnes recherches.'),
    numSlide('02', 'Des horaires à jour.', 'Jours fériés compris. Un client qui trouve porte close ne revient pas.'),
    numSlide('03', 'Le lien vers la bonne page.', 'Vers votre site, idéalement la page du service concerné. Pas vers Facebook.'),
    numSlide('04', 'De vraies photos.', 'Vous, votre équipe, vos réalisations, vos locaux. Pas de banque d’images.'),
    numSlide('05', 'Un avis à chaque client content.', 'Envoyez le lien d’avis le jour de la livraison, avec un message simple :', `<div class="card" style="padding:30px 34px;margin-top:30px;font-size:28px;line-height:1.45">« Merci pour votre confiance ! Si vous êtes content, un avis Google nous aiderait beaucoup : [lien]. »</div>`),
    numSlide('06', 'Répondre à chaque avis.', 'En deux phrases, avec le prénom du client. Ça montre qu’il y a quelqu’un derrière.'),
    cta('On peut s’en occuper pour vous.', 'L’optimisation de la fiche Google est incluse dans la formule <b>Croissance</b>, dès CHF 1’490.'),
  ],
});

// 4 — Avant d'appeler une agence
C.push({
  slug: '14-avant-d-appeler-une-agence', theme: 'ink', slides: [
    { html: `<p class="lab">Checklist</p><h1 class="d h1">Avant d’appeler une agence web, <span class="a">préparez ces 5 choses.</span></h1>
      <p class="p" style="margin-top:40px">Vous gagnerez du temps. Et votre devis sera plus juste.</p>` },
    numSlide('01', 'Votre objectif.', 'Plus d’appels ? Des réservations ? Des ventes en ligne ? Un seul objectif principal, c’est déjà beaucoup.'),
    numSlide('02', '2 ou 3 sites que vous aimez.', 'Et surtout pourquoi : les couleurs, la simplicité, la façon de présenter les services.'),
    numSlide('03', 'Vos contenus.', 'Logo, photos, textes. Si vous n’avez rien, ce n’est pas grave : dites-le, on vous aide.'),
    numSlide('04', 'Une fourchette de budget.', 'Même approximative. Elle permet de vous proposer la bonne solution, pas la plus chère.'),
    numSlide('05', 'Votre date idéale.', 'Un lancement de saison, une ouverture, un salon ? On s’organise en fonction.'),
    { html: `<p class="lab">En résumé</p><h2 class="d h3" style="margin-bottom:56px">Votre fiche de préparation</h2>
      ${list(['Objectif principal', '2 ou 3 sites de référence', 'Logo, photos, textes (ou pas)', 'Fourchette de budget', 'Date idéale de mise en ligne'], 30, 36)}
      <p class="p" style="margin-top:50px;font-size:30px">Enregistrez ce post pour le retrouver.</p>` },
    cta('Rien de prêt ? Appelez quand même.', 'On vous pose les bonnes questions lors du premier échange. <b>Devis gratuit sous 24h.</b>'),
  ],
});

// 5 — Vitrine, boutique ou application ?
const choice = (q, name, price, desc) => ({ html: `<p class="lab">Vous vous reconnaissez ?</p>
  <h2 class="d h3">${q}</h2>
  <div class="card" style="padding:44px;margin-top:56px">
    <p style="font-size:26px;color:var(--mut)">Il vous faut</p>
    <div class="d h2" style="margin-top:12px">${name}</div>
    <p class="p" style="margin-top:20px;font-size:31px">${desc}</p>
    <span class="pill" style="margin-top:30px;background:#B3FF47;border-color:#B3FF47;color:#0A0A0A;font-weight:700">${price}</span>
  </div>` });
C.push({
  slug: '15-vitrine-boutique-ou-application', theme: 'cream', slides: [
    { html: `<p class="lab">Guide rapide</p><h1 class="d h1">Site vitrine, boutique ou application ?</h1>
      <p class="p" style="margin-top:40px">4 questions pour savoir ce qu’il vous faut <b>vraiment.</b></p>` },
    choice('Vous voulez surtout être trouvé et contacté ?', 'Un site vitrine.', 'dès CHF 690', 'Vos services, vos réalisations, vos avis et un bouton de contact visible partout.'),
    choice('Vous vendez des produits ?', 'Une boutique en ligne.', 'dès CHF 1’990', 'Catalogue, panier, paiement par carte ou TWINT, livraison ou retrait en magasin.'),
    choice('Vos clients prennent rendez-vous ?', 'Un site avec réservation.', 'dès CHF 1’990', 'Vos créneaux en ligne, 24h/24. Fini les allers-retours au téléphone.'),
    choice('Vous gérez des clients, des devis, des accès ?', 'Une application web.', 'sur devis', 'Espace client, intranet, outil de gestion sur mesure. Le code vous appartient.'),
    { html: `<p class="lab">Récapitulatif</p>
      <div style="display:flex;flex-direction:column;gap:16px">${[['Être trouvé', 'Site vitrine', 'dès CHF 690'], ['Vendre', 'Boutique en ligne', 'dès CHF 1’990'], ['Réserver', 'Site + réservation', 'dès CHF 1’990'], ['Gérer', 'Application web', 'sur devis']].map(([a, b, c]) => `<div class="card" style="padding:30px 36px;display:grid;grid-template-columns:220px 1fr auto;align-items:center;gap:20px"><span style="font-size:28px;color:var(--mut)">${a}</span><span class="d" style="font-size:40px;letter-spacing:-.03em">${b}</span><span style="font-size:26px;font-weight:600">${c}</span></div>`).join('')}</div>` },
    cta('Pas sûr de votre choix ?', 'Décrivez-nous votre activité en quelques lignes. <b>On vous oriente gratuitement.</b>'),
  ],
});

// 6 — Ce qui est inclus
const inc = (a, b) => ({ html: `<p class="lab">Inclus</p><div style="display:flex;flex-direction:column;gap:20px">
  ${[a, b].map(([t, d]) => `<div class="card" style="padding:46px"><div class="row"><span class="ck">${CK}</span><div><div class="d h4">${t}</div><p class="p" style="margin-top:14px;font-size:30px">${d}</p></div></div></div>`).join('')}</div>` });
C.push({
  slug: '16-ce-qui-est-inclus', theme: 'ink', slides: [
    { html: `<p class="lab">Pas de mauvaise surprise</p><h1 class="d h1">Ce qui est inclus dans votre site.</h1><p class="p" style="margin-top:40px">Sans frais cachés. <b>Le prix annoncé est le prix payé.</b></p>` },
    inc(['Design sur mesure', 'Pensé pour votre image. Pas un thème acheté et retouché.'], ['Version mobile soignée', 'Conçue d’abord pour le téléphone, là où vos clients vous cherchent.']),
    inc(['SEO technique', 'Structure, vitesse, balises, plan du site : construit pour Google dès le départ.'], ['Google Search Console', 'Votre site est déclaré à Google dès la mise en ligne.']),
    inc(['Nom de domaine', 'votre-entreprise.ch, à votre nom.'], ['E-mail professionnel', 'contact@votre-entreprise.ch au lieu d’une adresse gratuite.']),
    inc(['Hébergement', 'Chez WebAlp, inclus dans les formules.'], ['Mise en ligne', 'On s’occupe de tout, vous n’avez rien de technique à faire.']),
    inc(['Contact en un geste', 'Formulaire, bouton d’appel et WhatsApp.'], ['Statistiques', 'Google Analytics configuré pour voir d’où viennent vos visiteurs.']),
    inc(['Révisions incluses', 'On ajuste jusqu’à ce que vous soyez fier de montrer votre site.'], ['Des humains joignables', 'Deux interlocuteurs, réponse sous 24h.']),
    cta('Tout ça, dès CHF 690.', 'Formule Starter, site vitrine sur mesure. <b>Devis gratuit sous 24h.</b>'),
  ],
});

// 7 & 8 — Études de cas réelles
const P = {};
for (const m of fs.readFileSync('/home/user/Webalpnew/lib/projects.ts', 'utf8').matchAll(/slug: '([^']+)',[\s\S]*?name: '([^']+)',\s*type: '([^']+)',\s*year: '(\d+)',\s*sector: '([^']+)',\s*enjeu: (["'])([\s\S]*?)\6,\s*description: (["'])([\s\S]*?)\8,\s*deliverables: \[([^\]]*)\]/g)) {
  P[m[1]] = { name: m[2], type: m[3], year: m[4], sector: m[5], enjeu: m[7].replace(/\\'/g, '’').replace(/'/g, '’'), desc: m[9].replace(/\\'/g, '’').replace(/'/g, '’'), deliv: [...m[10].matchAll(/["']([^"']+)["']/g)].map(x => x[1].replace(/'/g, '’')) };
}
const caseStudy = (slug, key, theme, ctaTitle, ctaSub) => {
  const p = P[key];
  return {
    slug, theme, slides: [
      { html: `<p class="lab">Réalisation · ${p.sector}</p><h1 class="d" style="font-size:108px">${p.name}</h1><p class="p" style="margin-top:20px">${p.type}</p>
        <div style="margin-top:56px">${shot(`${key}.png`)}</div>` },
      { html: `<p class="lab">Le contexte</p><h2 class="d h3" style="line-height:1.08;letter-spacing:-.035em">${p.enjeu}</h2>` },
      { html: `<p class="lab">Ce qu’on a construit</p><p class="p" style="font-size:38px;color:var(--fg);margin-bottom:50px">${p.desc}</p>` },
      { html: `<p class="lab">Livré</p><h2 class="d h3" style="margin-bottom:56px">Dans le projet</h2>${list(p.deliv, 30, 36)}` },
      { html: `<p class="lab">Le résultat en ligne</p>${shot(`${key}feat.png`)}<p class="p" style="margin-top:44px;font-size:30px">${p.name} · projet réalisé par WebAlp</p>` },
      cta(ctaTitle, ctaSub),
    ],
  };
};
C.push(caseStudy('17-realisation-monhygiene', 'monhygiene', 'ink', 'Vous aussi, recevez des réservations en ligne.', 'Site avec réservation <b>dès CHF 1’990</b>. Devis gratuit sous 24h.'));
C.push(caseStudy('18-realisation-drone-valais', 'dronevalais', 'cream', 'Un site à la hauteur de votre travail.', 'Site vitrine sur mesure <b>dès CHF 690</b>, outils de gestion sur devis.'));

// 9 — Idées reçues
const myth = (q, a) => ({ html: `<p class="lab">Idée reçue</p><h2 class="d h2" style="color:var(--faint)">« ${q} »</h2>
  <div style="height:2px;background:var(--line);margin:56px 0"></div><p class="lab" style="margin-bottom:20px">En réalité</p><p class="d h4" style="font-size:52px">${a}</p>` });
C.push({
  slug: '19-5-idees-recues', theme: 'white', slides: [
    { html: `<p class="lab">Vrai ou faux</p><h1 class="d h1">5 idées reçues qui <span class="a">coûtent des clients.</span></h1>` },
    myth('Un site, c’est trop cher.', 'Un site vitrine soigné démarre à CHF 690. Le vrai coût, ce sont les clients qui ne vous trouvent pas.'),
    myth('Ma page Facebook suffit.', 'Elle ne remplace pas un site quand on cherche votre métier sur Google. Et elle ne vous appartient pas.'),
    myth('Je n’ai pas le temps.', 'Un premier échange suffit pour démarrer. Ensuite, on s’occupe du reste.'),
    myth('Une fois en ligne, c’est fini.', 'Un site vit : tarifs, photos, actualités. La maintenance démarre à CHF 49 par mois.'),
    myth('L’IA peut le faire toute seule.', 'Elle écrit vite. Mais elle ne connaît ni votre métier, ni vos clients. Nous, si.'),
    cta('Une autre idée reçue ?', 'Écrivez-la en commentaire, <b>on vous répond.</b>'),
  ],
});

// 10 — Le test des 60 secondes
const qs = ['On comprend ce que vous faites en 5 secondes ?', 'Il s’affiche vite sur téléphone ?', 'On peut vous appeler en un geste ?', 'Vos prix, ou une fourchette, sont visibles ?', 'On voit des réalisations ou des avis ?', 'Il apparaît quand on cherche votre métier et votre ville ?'];
const qSlide = (a, b, start) => ({ html: `<p class="lab">Questions ${start} et ${start + 1}</p><div style="display:flex;flex-direction:column;gap:24px">
  ${[a, b].map((q, i) => `<div class="card" style="padding:44px"><div class="big" style="font-size:72px;color:var(--faint)">0${start + i}</div><p class="d h4" style="margin-top:20px">${q}</p>
    <div style="display:flex;gap:14px;margin-top:30px"><span class="pill">Oui</span><span class="pill">Non</span></div></div>`).join('')}</div>` });
C.push({
  slug: '20-test-60-secondes', theme: 'cream', slides: [
    { html: `<p class="lab">Auto-diagnostic</p><h1 class="d h1">Votre site passe-t-il le <span class="a">test des 60 secondes ?</span></h1><p class="p" style="margin-top:40px">6 questions. Répondez honnêtement par oui ou par non.</p>` },
    qSlide(qs[0], qs[1], 1), qSlide(qs[2], qs[3], 3), qSlide(qs[4], qs[5], 5),
    { html: `<p class="lab">Votre score</p><div style="display:flex;flex-direction:column;gap:18px">
      ${[['6 oui', 'Bravo, votre site travaille pour vous.'], ['4 ou 5 oui', 'Quelques réglages et il rapportera plus.'], ['3 oui ou moins', 'Il est temps d’en parler.']].map(([a, b], i) => `<div class="card" style="padding:40px 44px;${i === 2 ? 'background:#0A0A0A;color:#F5F4F0;border-color:#0A0A0A' : ''}"><div class="d" style="font-size:64px;letter-spacing:-.04em">${a}</div><p style="font-size:32px;margin-top:12px;opacity:.75">${b}</p></div>`).join('')}</div>` },
    cta('Dites-nous votre score en commentaire.', 'Ou envoyez-nous le lien de votre site : <b>on vous fait un retour gratuit.</b>'),
  ],
});

(async () => {
  const sel = process.argv[2];
  const browser = await chromium.launch();
  for (const c of C) {
    if (sel && !c.slug.startsWith(sel)) continue;
    const ss = slides(c.slides, c.theme);
    const body = ss.join('').replace(/>([^<]+)</g, (m, t) => '>' + t.replace(/ ([?:!»;])/g, '&nbsp;$1').replace(/« /g, '«&nbsp;').replace(/CHF /g, 'CHF&nbsp;').replace(/ (\d+) /g, ' $1&nbsp;') + '<');
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body style="width:${W * ss.length}px">${body}</body></html>`;
    const hp = path.join(ROOT, 'serie3', 'html', c.slug + '.html');
    fs.mkdirSync(path.dirname(hp), { recursive: true }); fs.writeFileSync(hp, html);
    const page = await browser.newPage({ viewport: { width: W * ss.length, height: H } });
    await page.goto('file://' + hp, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(300);
    const out = path.join(ROOT, 'serie3', 'out', c.slug); fs.mkdirSync(out, { recursive: true });
    for (let i = 0; i < ss.length; i++) await page.screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, '0')}.png`), clip: { x: i * W, y: 0, width: W, height: H } });
    await page.close(); console.log('ok', c.slug, ss.length);
  }
  await browser.close();
})();

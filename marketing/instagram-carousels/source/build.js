// WebAlp — Instagram carousels 4:5 (1080x1350). Panorama render → slices.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const W = 1080, H = 1350;
const ROOT = __dirname;
const FONTS = fs.readFileSync(path.join(ROOT, 'fonts.css'), 'utf8').replace(/url\(fonts\//g, `url(file://${ROOT}/fonts/`);

// ─── Icons ───
const ck = (s = 28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const xx = (s = 28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
const arrow = (s = 28) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M4 12h15M13 5.5l6.5 6.5-6.5 6.5" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const star = (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" fill="currentColor"/></svg>`;
const stars = (n = 5, s = 26) => `<span class="stars">${star(s).repeat(n)}</span>`;

// ─── Base CSS ───
const CSS = `
${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
:root{--lime:#B3FF47;--ink:#0A0A0A;--paper:#F5F4F0;--red:#FF5A3C}
body{height:${H}px;position:relative;overflow:hidden;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:var(--bg);color:var(--fg)}
body.dark,.s.dark{--bg:#0A0A0A;--fg:#F5F4F0;--mut:rgba(245,244,240,.58);--faint:rgba(245,244,240,.32);--line:rgba(245,244,240,.13);--card:#141414;--card2:#1B1B1B}
body.cream,.s.cream{--bg:#F5F4F0;--fg:#0A0A0A;--mut:rgba(10,10,10,.6);--faint:rgba(10,10,10,.34);--line:rgba(10,10,10,.13);--card:#FFFFFF;--card2:#ECEBE6}
.s.lime{--bg:#B3FF47;--fg:#0A0A0A;--mut:rgba(10,10,10,.66);--faint:rgba(10,10,10,.4);--line:rgba(10,10,10,.18);--card:#0A0A0A}
.s{position:absolute;top:0;width:${W}px;height:${H}px;padding:80px 88px 76px;display:flex;flex-direction:column;background:var(--bg);color:var(--fg)}
.s.clear{background:transparent}
.s:not(.clear){overflow:hidden}
.s.dark .prog span.on{background:var(--lime)}
.s.dark .swipe b{background:var(--lime);color:var(--ink)}
.s.dark .k::before{background:var(--lime)}
.s.dark .logo .a{color:var(--lime)}
.s.lime .btn{background:var(--ink);color:var(--lime)}
.deco{position:absolute;z-index:3;pointer-events:none}
.s>*{position:relative;z-index:4}
.s>.deco,.s>.glow{position:absolute}
.s>.glow{z-index:1}
.s>.deco{z-index:2}
.fill{flex:1;display:flex;flex-direction:column;justify-content:center}
.grain{position:absolute;inset:0;z-index:50;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")}

.top{display:flex;justify-content:space-between;align-items:center;height:44px}
.logo{font-family:'Space Grotesk';font-weight:700;font-size:38px;letter-spacing:-.05em;display:flex;align-items:baseline}
.logo .a{color:var(--lime)}
.cream .logo .a,.lime .logo .a{color:var(--fg)}
.logo i{display:inline-block;width:10px;height:10px;background:var(--lime);margin-left:4px}
.lime .logo i{background:var(--ink)}
.tag{font-family:'JetBrains Mono';font-size:17px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--faint)}
.main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 0}
.bot{display:flex;justify-content:space-between;align-items:center;height:64px}
.prog{display:flex;gap:8px;align-items:center}
.prog span{width:22px;height:6px;border-radius:3px;background:var(--line)}
.prog span.on{width:58px;background:var(--lime)}
.cream .prog span.on{background:var(--ink)}
.lime .prog span.on{background:var(--ink)}
.swipe{display:flex;align-items:center;gap:18px;font-family:'JetBrains Mono';font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.swipe b{width:64px;height:64px;border-radius:50%;background:var(--lime);color:var(--ink);display:grid;place-items:center}
.cream .swipe b{background:var(--ink);color:var(--lime)}
.url{font-family:'Space Grotesk';font-weight:700;font-size:28px;letter-spacing:-.02em}

.k{font-family:'JetBrains Mono';font-size:19px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:18px;margin-bottom:40px}
.k::before{content:'';width:44px;height:3px;background:var(--lime)}
.cream .k::before,.lime .k::before{background:var(--ink)}
.d{font-family:'Space Grotesk';font-weight:700;letter-spacing:-.05em;line-height:.94}
.h0{font-size:132px}.h1{font-size:112px}.h2{font-size:94px}.h3{font-size:72px}.h4{font-size:50px;letter-spacing:-.035em;line-height:1.02}
.it{font-family:'Instrument Serif';font-style:italic;font-weight:400;letter-spacing:-.02em;font-size:1.1em;line-height:.8}
.lm{color:var(--lime)}
.mu{color:var(--mut)} .fa{color:var(--faint)}
.lead{font-size:34px;line-height:1.36;color:var(--mut);max-width:840px;letter-spacing:-.01em}
.lead b{color:var(--fg);font-weight:600}
.mk{background:linear-gradient(transparent 58%,var(--lime) 58%,var(--lime) 92%,transparent 92%);padding:0 .06em}
.mono{font-family:'JetBrains Mono'}
.card{background:var(--card);border:1px solid var(--line);border-radius:28px}
.pill{display:inline-flex;align-items:center;gap:12px;padding:14px 24px;border-radius:999px;border:1.5px solid var(--line);font-size:24px;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:18px;padding:30px 44px;border-radius:999px;background:var(--ink);color:var(--paper);font-family:'Space Grotesk';font-weight:700;font-size:34px;letter-spacing:-.02em}
.dark .btn{background:var(--lime);color:var(--ink)}
.stars{display:inline-flex;gap:3px;color:#F5B400}
.num{font-family:'JetBrains Mono';font-weight:700;font-size:22px;letter-spacing:.1em;padding:10px 18px;border-radius:999px;background:var(--lime);color:var(--ink);display:inline-block}
.cream .num{background:var(--ink);color:var(--lime)}
.glow{position:absolute;border-radius:50%;filter:blur(90px);background:var(--lime);opacity:.16;z-index:1}
.row{display:flex;gap:20px;align-items:center}
.ok{color:var(--ink);background:var(--lime);width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none}
.ko{color:var(--red);border:2px solid currentColor;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;flex:none}
`;

const slide = (i, n, tag, body, { theme = '', last = false, extra = '' } = {}) => `
<section class="s ${theme}" style="left:${i * W}px">
  ${extra}
  <div class="top"><div class="logo">Web<span class="a">Alp</span><i></i></div><div class="tag">${tag} · ${String(i + 1).padStart(2, '0')}/${String(n).padStart(2, '0')}</div></div>
  <div class="main">${body}</div>
  <div class="bot">
    <div class="prog">${Array.from({ length: n }, (_, k) => `<span class="${k === i ? 'on' : ''}"></span>`).join('')}</div>
    ${last ? `<div class="url">webalp.ch</div>` : `<div class="swipe">Glisse<b>${arrow(28)}</b></div>`}
  </div>
</section>`;

// ════════════════════════════════════════════════════════════════
// 01 — POURQUOI UN SITE WEB
// ════════════════════════════════════════════════════════════════
function c1() {
  const T = 'Pourquoi un site';
  const n = 7;
  const s = [];
  s.push(slide(0, n, T, `
    <div class="k">PME · Artisans · Indépendants</div>
    <h1 class="d h0">Ton prochain client te cherche <span class="it lm">là, maintenant.</span></h1>
    <div style="margin-top:64px;display:flex;align-items:center;gap:22px;background:#fff;color:#0A0A0A;border-radius:999px;padding:30px 40px;box-shadow:0 30px 80px rgba(179,255,71,.18);max-width:820px">
      <svg width="34" height="34" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#0A0A0A" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#0A0A0A" stroke-width="2.4" stroke-linecap="round"/></svg>
      <span style="font-size:36px;font-weight:500;letter-spacing:-.01em">électricien sion</span><span style="width:3px;height:40px;background:#0A0A0A;margin-left:-14px"></span>
      <span style="margin-left:auto;font-family:'JetBrains Mono';font-size:18px;color:#888;letter-spacing:.08em">ENTRÉE ↵</span>
    </div>
    <p class="lead" style="margin-top:48px">Et s'il ne te trouve pas, <b>il appelle quelqu'un d'autre.</b></p>
  `, { theme: 'dark', extra: `<div class="glow" style="width:700px;height:700px;right:-300px;bottom:-200px"></div>` }));

  const res = (name, url, rating, count, extra = '') => `
    <div style="padding:30px 36px;border-bottom:1px solid #EAEAEA">
      <div style="display:flex;align-items:center;gap:14px;font-size:20px;color:#4D5156"><span style="width:34px;height:34px;border-radius:50%;background:#EEF0F3;display:grid;place-items:center;font-weight:700;font-size:16px;color:#5F6368">${name[0]}</span>${url}</div>
      <div style="font-size:32px;color:#1A0DAB;margin-top:10px;font-weight:500;letter-spacing:-.01em">${name}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:10px;font-size:21px;color:#70757A">${rating} ${stars(5, 20)} (${count} avis) ${extra}</div>
    </div>`;
  s.push(slide(1, n, T, `
    <h2 class="d h2">Sur Google, pas de site = <span class="it lm">pas d'existence.</span></h2>
    <div style="margin-top:60px;background:#fff;border-radius:28px;overflow:hidden;color:#202124;box-shadow:0 40px 100px rgba(0,0,0,.5);transform:rotate(-1.2deg)">
      <div style="padding:22px 36px;background:#F8F9FA;border-bottom:1px solid #EAEAEA;display:flex;align-items:center;gap:16px;font-size:22px;color:#5F6368"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg>électricien sion</div>
      ${res('Électricité Martin & Fils', 'martin-elec.ch', '4,9', 87)}
      ${res('Alpes Élec Services', 'alpes-elec.ch', '4,7', 52)}
      <div style="margin:26px 36px 30px;border:3px dashed #B3FF47;background:rgba(179,255,71,.12);border-radius:18px;padding:26px 30px;display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-size:30px;font-weight:700;letter-spacing:-.02em">Ton entreprise ?</div><div style="font-size:21px;color:#70757A;margin-top:6px">Aucun site trouvé</div></div>
        <div style="font-family:'JetBrains Mono';font-size:18px;letter-spacing:.1em;background:#0A0A0A;color:#B3FF47;padding:12px 18px;border-radius:999px">INTROUVABLE</div>
      </div>
    </div>
  `, { theme: 'dark' }));

  const notif = (time, title, body, rot, op = 1) => `
    <div style="display:flex;gap:22px;align-items:flex-start;background:rgba(245,244,240,.07);border:1px solid rgba(245,244,240,.12);backdrop-filter:blur(10px);border-radius:30px;padding:26px 30px;transform:rotate(${rot}deg);opacity:${op}">
      <div style="width:64px;height:64px;border-radius:16px;background:#B3FF47;color:#0A0A0A;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:30px;flex:none;letter-spacing:-.05em">W</div>
      <div style="flex:1"><div style="display:flex;justify-content:space-between;font-size:21px;color:rgba(245,244,240,.5)"><span style="font-weight:600;letter-spacing:.02em">TON SITE</span><span>${time}</span></div>
      <div style="font-size:28px;font-weight:600;margin-top:6px;letter-spacing:-.01em">${title}</div><div style="font-size:24px;color:rgba(245,244,240,.6);margin-top:4px">${body}</div></div>
    </div>`;
  s.push(slide(2, n, T, `
    <h2 class="d h2">Ton site bosse <span class="it lm">pendant que tu dors.</span></h2>
    <div style="margin-top:56px;display:flex;flex-direction:column;gap:18px">
      ${notif('06:12', 'Nouvelle demande de devis', 'Rénovation salle de bain — Martigny', -1)}
      ${notif('12:47', 'Formulaire de contact', '« Vous êtes dispo début mars ? »', .6)}
      ${notif('22:31', 'Nouvelle réservation', 'Samedi · 14h00 · 2 personnes', -.4)}
      ${notif('Dim. 09:05', 'Demande de rappel', 'Via le bouton « Être rappelé »', .8, .55)}
    </div>
    <p class="lead" style="margin-top:44px">Pas de pause. Pas de vacances. <b>Ouvert 24h/24, 7j/7.</b></p>
  `, { theme: 'dark', extra: `<div class="glow" style="width:600px;height:600px;left:-260px;top:300px;opacity:.1"></div>` }));

  const tick = (t, d) => `<div class="row" style="align-items:flex-start;gap:22px"><span class="ok">${ck(24)}</span><div><div style="font-size:31px;font-weight:600;letter-spacing:-.015em">${t}</div><div style="font-size:23px;color:var(--mut);margin-top:4px">${d}</div></div></div>`;
  s.push(slide(3, n, T, `
    <h2 class="d h2">Il rassure ton client <span class="it lm">avant</span> le premier appel.</h2>
    <div style="margin-top:64px;display:grid;grid-template-columns:420px 1fr;gap:56px;align-items:center">
      <div style="background:#F5F4F0;border-radius:26px;overflow:hidden;color:#0A0A0A;box-shadow:0 40px 90px rgba(0,0,0,.5);transform:rotate(-2deg)">
        <div style="display:flex;gap:8px;padding:16px 20px;background:#E6E5E0"><i style="width:13px;height:13px;border-radius:50%;background:#FF5F57"></i><i style="width:13px;height:13px;border-radius:50%;background:#FEBC2E"></i><i style="width:13px;height:13px;border-radius:50%;background:#28C840"></i></div>
        <div style="padding:30px 28px">
          <div style="font-family:'Space Grotesk';font-weight:700;font-size:38px;letter-spacing:-.04em;line-height:.95">Ton métier,<br>fait proprement.</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:16px;font-size:17px;font-weight:600">${stars(5, 18)} 4,9 · 38 avis</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:20px"><i style="height:78px;border-radius:10px;background:linear-gradient(135deg,#C9C6BC,#8E8A7E)"></i><i style="height:78px;border-radius:10px;background:linear-gradient(135deg,#9FB6C3,#4F6B7A)"></i><i style="height:78px;border-radius:10px;background:linear-gradient(135deg,#D8C4A8,#9A7E5C)"></i></div>
          <div style="margin-top:20px;background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:16px;text-align:center;font-weight:700;font-size:19px">Demander un devis →</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:34px">
        ${tick('Tes réalisations', 'Photos, avant/après, projets')}
        ${tick('Tes avis clients', 'La preuve que tu fais du bon taf')}
        ${tick('Ta façon de bosser', 'Prix, délais, zone desservie')}
        ${tick('Ton contact en 1 clic', 'Appel, WhatsApp, formulaire')}
      </div>
    </div>
  `, { theme: 'dark' }));

  const rowc = (label, a, b) => `<div style="display:grid;grid-template-columns:1fr 150px 150px;align-items:center;padding:26px 0;border-bottom:1px solid var(--line)"><div style="font-size:30px;font-weight:500;letter-spacing:-.01em">${label}</div><div style="display:grid;place-items:center">${a}</div><div style="display:grid;place-items:center">${b}</div></div>`;
  const Y = `<span class="ok">${ck(24)}</span>`, N = `<span class="ko">${xx(20)}</span>`, M = `<span style="font-family:'JetBrains Mono';font-size:28px;color:var(--faint)">~</span>`;
  s.push(slide(4, n, T, `
    <h2 class="d h3">Instagram, c'est top.<br>Mais ce n'est <span class="it lm">pas chez toi.</span></h2>
    <div style="margin-top:56px">
      <div style="display:grid;grid-template-columns:1fr 150px 150px;padding-bottom:18px;border-bottom:1px solid var(--line)"><span></span><span class="tag" style="text-align:center;color:var(--mut)">Réseaux</span><span class="tag" style="text-align:center;color:var(--lime)">Ton site</span></div>
      ${rowc('Visible quand on te cherche sur Google', N, Y)}
      ${rowc('Ça t\'appartient à 100 %', N, Y)}
      ${rowc('Pas d\'algorithme qui décide qui te voit', N, Y)}
      ${rowc('Tes infos claires, au même endroit', M, Y)}
      ${rowc('Reçoit des demandes de devis', M, Y)}
    </div>
    <p class="lead" style="margin-top:44px">Les réseaux attirent l'attention. <b>Le site transforme en clients.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(5, n, T, `
    <h2 class="d h2">Le calcul est <span class="it lm">vite fait.</span></h2>
    <div style="margin-top:64px;display:flex;flex-direction:column;gap:18px">
      <div class="card" style="padding:40px 44px;display:flex;justify-content:space-between;align-items:center"><div><div class="tag" style="color:var(--mut)">Un site pro</div><div class="d" style="font-size:78px;margin-top:14px">dès CHF 690</div></div><div class="mono" style="font-size:22px;color:var(--faint);text-align:right">une fois<br>hébergement inclus</div></div>
      <div style="display:grid;place-items:center;height:70px;color:var(--lime)"><svg width="44" height="60" viewBox="0 0 24 32"><path d="M12 2v26M4 20l8 8 8-8" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="background:var(--lime);color:var(--ink);border-radius:28px;padding:44px">
        <div class="tag" style="color:rgba(10,10,10,.6)">Le résultat</div>
        <div class="d" style="font-size:72px;margin-top:16px">1 seul nouveau client</div>
        <div style="font-size:30px;margin-top:14px;font-weight:500">… et ton site est souvent déjà rentabilisé.</div>
      </div>
    </div>
    <p class="lead" style="margin-top:44px">Un site n'est pas une dépense. <b>C'est ton meilleur commercial.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(6, n, T, `
    <div class="k">Ton tour</div>
    <h2 class="d h0">Prêt à être <span class="it">trouvé&nbsp;?</span></h2>
    <div style="margin-top:56px;display:flex;flex-wrap:wrap;gap:14px">
      ${['Devis gratuit', 'Réponse sous 24h', 'Livré en 14 jours', 'Dès CHF 690'].map(t => `<span class="pill" style="border-color:rgba(10,10,10,.25)">${ck(22)} ${t}</span>`).join('')}
    </div>
    <div style="margin-top:72px;background:var(--ink);color:var(--paper);border-radius:32px;padding:44px 48px">
      <div style="font-size:24px;color:rgba(245,244,240,.55)" class="mono">💬 COMMENTE</div>
      <div class="d" style="font-size:96px;color:var(--lime);margin-top:12px">« SITE »</div>
      <div style="font-size:30px;margin-top:16px;line-height:1.35">et on t'envoie <b>un audit gratuit</b> de ta présence en ligne.</div>
    </div>
  `, { theme: 'lime', last: true }));
  return { slug: '01-pourquoi-un-site-web', theme: 'dark', n, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 02 — 5 ERREURS QUI FONT FUIR TES VISITEURS
// ════════════════════════════════════════════════════════════════
function c2() {
  const T = '5 erreurs';
  const n = 7;
  const s = [];
  const head = (no, title) => `<div class="row" style="gap:18px;margin-bottom:34px"><span class="num">ERREUR ${no}</span><span class="tag">/ 05</span></div><h2 class="d h2">${title}</h2>`;
  const fix = (t) => `<div style="padding-top:34px"><div style="display:flex;gap:20px;align-items:center;background:var(--ink);color:var(--paper);border-radius:24px;padding:28px 34px"><span class="ok">${ck(24)}</span><div style="font-size:27px;line-height:1.3"><span class="mono" style="color:var(--lime);font-size:20px;letter-spacing:.12em">LA SOLUTION&nbsp;&nbsp;</span>${t}</div></div></div>`;

  s.push(slide(0, n, T, `
    <div class="k">Check-up de ton site</div>
    <h1 class="d" style="font-size:116px;max-width:760px">Erreurs qui font <span class="it">fuir</span> tes visiteurs.</h1>
    <p class="lead" style="margin-top:44px;max-width:520px">On les retrouve sur <b>9 sites sur 10</b> qu'on analyse. Combien sur le tien&nbsp;?</p>
  `, { theme: 'cream', extra: `<div class="deco d" style="right:-170px;top:250px;font-size:1150px;line-height:.8;letter-spacing:-.08em;color:#B3FF47">5</div>` }));

  s.push(slide(1, n, T, `
    ${head('01', 'Ton site <span class="it">rame.</span>')}
    <div class="fill"><div style="display:flex;align-items:flex-end;gap:30px">
      <div class="d" style="font-size:380px;line-height:.78;letter-spacing:-.07em">3<span style="font-size:.5em">s</span></div>
      <div style="padding-bottom:16px;font-size:30px;line-height:1.3;max-width:420px">C'est le temps avant que <b>la majorité des visiteurs mobiles</b> abandonnent.</div>
    </div>
    <div style="margin-top:56px">
      <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono';font-size:19px;color:var(--mut);letter-spacing:.08em;margin-bottom:14px"><span>CHARGEMENT…</span><span>4,8 s</span></div>
      <div style="height:22px;border-radius:11px;background:var(--card2);overflow:hidden;position:relative"><i style="position:absolute;inset:0 62% 0 0;background:var(--red);border-radius:11px"></i><i style="position:absolute;left:38%;top:-6px;bottom:-6px;width:3px;background:var(--ink)"></i></div>
      <div style="margin-top:12px;font-family:'JetBrains Mono';font-size:18px;color:var(--red);letter-spacing:.08em">↑ ICI, TON VISITEUR EST DÉJÀ CHEZ TON CONCURRENT</div>
    </div></div>
    ${fix('Images compressées, code léger, hébergement rapide.')}
  `, { theme: 'cream' }));

  s.push(slide(2, n, T, `
    ${head('02', 'On ne comprend pas <span class="it">ce que tu fais.</span>')}
    <div class="fill" style="display:flex;flex-direction:column;gap:20px">
      <div class="card" style="padding:36px 40px;position:relative">
        <div class="row" style="gap:14px;color:var(--red);font-family:'JetBrains Mono';font-size:19px;letter-spacing:.1em"><span class="ko" style="width:36px;height:36px">${xx(16)}</span>CE QU'ON VOIT PARTOUT</div>
        <div class="d" style="font-size:56px;margin-top:20px;color:var(--faint);text-decoration:line-through;text-decoration-thickness:4px;text-decoration-color:var(--red)">Bienvenue sur notre site internet.</div>
      </div>
      <div style="padding:36px 40px;border-radius:28px;background:var(--ink);color:var(--paper)">
        <div class="row" style="gap:14px;color:var(--lime);font-family:'JetBrains Mono';font-size:19px;letter-spacing:.1em"><span class="ok" style="width:36px;height:36px">${ck(18)}</span>CE QUI DONNE ENVIE</div>
        <div class="d" style="font-size:56px;margin-top:20px">Ton appart' impeccable en 3h. <span class="lm">Réserve en ligne.</span></div>
      </div>
    </div>
    ${fix('Problème → solution → action. Lisible en 3 secondes.')}
  `, { theme: 'cream' }));

  const phone = (inner, label, good) => `
    <div style="text-align:center">
      <div style="width:310px;height:580px;border-radius:52px;background:#0A0A0A;padding:14px;box-shadow:0 30px 70px rgba(0,0,0,.18);${good ? '' : 'transform:rotate(-3deg)'}">
        <div style="width:100%;height:100%;border-radius:40px;background:#fff;overflow:hidden;position:relative;color:#0A0A0A">
          <div style="position:absolute;top:12px;left:50%;transform:translateX(-50%);width:96px;height:28px;border-radius:14px;background:#0A0A0A;z-index:2"></div>${inner}</div>
      </div>
      <div style="margin-top:26px;display:inline-flex;align-items:center;gap:12px;font-family:'JetBrains Mono';font-size:19px;letter-spacing:.1em;${good ? '' : 'color:var(--red)'}">${good ? `<span class="ok" style="width:34px;height:34px">${ck(16)}</span>` : `<span class="ko" style="width:34px;height:34px">${xx(14)}</span>`}${label}</div>
    </div>`;
  const tiny = Array.from({ length: 16 }, (_, k) => `<i style="display:block;height:5px;margin:7px 0;background:#D5D5D5;width:${60 + (k * 37) % 40}%"></i>`).join('');
  const bad = `<div style="padding:54px 14px 0;font-size:9px"><div style="display:flex;gap:6px;font-size:8px;color:#888">${'Accueil · Services · Équipe · Historique · Galerie · Actus · Contact'}</div><div style="font-size:15px;font-weight:700;margin:12px 0 6px;font-family:serif">Bienvenue chez nous depuis 1987</div>${tiny}<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-top:10px"><i style="height:44px;background:#ddd"></i><i style="height:44px;background:#ccc"></i><i style="height:44px;background:#ddd"></i></div>${tiny}</div>`;
  const good = `<div style="padding:64px 24px 0;text-align:left"><div style="font-family:'Space Grotesk';font-weight:700;font-size:40px;letter-spacing:-.05em;line-height:.95">Ta toiture refaite en 5 jours.</div><div style="font-size:16px;color:#666;margin-top:14px;line-height:1.4">Devis gratuit sous 24h dans tout le Valais.</div><div style="margin-top:22px;background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:18px;text-align:center;font-weight:700;font-size:18px">📞 Appeler maintenant</div><div style="margin-top:12px;border:2px solid #0A0A0A;border-radius:999px;padding:16px;text-align:center;font-weight:700;font-size:17px">Demander un devis</div><div style="height:170px;margin-top:22px;border-radius:18px;background:linear-gradient(135deg,#9FB6C3,#4F6B7A)"></div></div>`;
  s.push(slide(3, n, T, `
    ${head('03', 'Illisible <span class="it">sur mobile.</span>')}
    <div class="fill" style="flex-direction:row;justify-content:center;gap:60px;align-items:center">
      ${phone(bad, 'ZOOM OBLIGATOIRE', false)}
      ${phone(good, 'MOBILE-FIRST', true)}
    </div>
    ${fix('Penser d\'abord au téléphone : là où cherchent tes clients.')}
  `, { theme: 'cream' }));

  const chaos = [['En savoir plus', 30, 40, -6, '#E8E8E8'], ['Newsletter !', 290, 20, 5, '#FFD6CC'], ['Découvrir', 520, 70, -3, '#E0E7FF'], ['Nos actus', 80, 150, 4, '#FFF2B3'], ['Galerie', 330, 140, -5, '#E8E8E8'], ['Suivez-nous', 530, 190, 3, '#D8F5E3'], ['Cliquez ici', 160, 250, -2, '#FFD6CC']]
    .map(([t, x, y, r, c]) => `<span style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${r}deg);background:${c};color:#555;padding:14px 24px;border-radius:12px;font-size:22px;font-weight:600;white-space:nowrap">${t}</span>`).join('');
  s.push(slide(4, n, T, `
    ${head('04', 'Aucun bouton <span class="it">clair.</span>')}
    <div class="fill" style="gap:20px">
      <div class="card" style="height:340px;position:relative;overflow:hidden"><div style="position:absolute;inset:30px 40px">${chaos}</div><span class="tag" style="position:absolute;right:28px;bottom:22px;color:var(--red)">7 boutons · 0 clic</span></div>
      <div style="height:250px;border-radius:28px;background:var(--ink);display:grid;place-items:center;position:relative"><span style="background:var(--lime);color:var(--ink);padding:30px 52px;border-radius:999px;font-family:'Space Grotesk';font-weight:700;font-size:38px;letter-spacing:-.02em;display:inline-flex;gap:18px;align-items:center">Demander un devis ${arrow(34)}</span><span class="tag" style="position:absolute;right:28px;bottom:22px;color:rgba(245,244,240,.5)">1 bouton · des demandes</span></div>
    </div>
    ${fix('1 page = 1 objectif = 1 bouton bien visible.')}
  `, { theme: 'cream' }));

  const proof = (big, small, bg = 'var(--card)', fg = 'var(--fg)') => `<div class="card" style="padding:34px;background:${bg};color:${fg}"><div class="d" style="font-size:72px">${big}</div><div style="font-size:23px;margin-top:10px;opacity:.65">${small}</div></div>`;
  s.push(slide(5, n, T, `
    ${head('05', 'Zéro preuve que <span class="it">tu assures.</span>')}
    <p class="lead" style="margin-top:34px;font-size:31px">Avant d'appeler, on veut savoir si d'autres t'ont fait confiance. Sans preuve, <b>c'est un pari.</b></p>
    <div class="fill"><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
      <div class="card" style="grid-column:1/3;padding:34px 38px;display:flex;gap:26px;align-items:center"><div style="width:76px;height:76px;border-radius:50%;background:var(--card2);flex:none;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:30px">?</div><div><div>${stars(5, 26)}</div><div style="font-size:30px;margin-top:8px;font-family:'Instrument Serif';font-style:italic">« L'avis de ton client satisfait, ici. »</div></div></div>
      ${proof('4,9 ★', 'Ta note Google, bien visible')}
      ${proof('120+', 'Tes chantiers, clients, projets…', 'var(--lime)', 'var(--ink)')}
    </div></div>
    ${fix('Montre tes avis, tes réalisations, tes chiffres.')}
  `, { theme: 'cream' }));

  const box = (t) => `<div class="row" style="gap:22px;padding:22px 0;border-bottom:1px solid rgba(245,244,240,.12)"><span style="width:44px;height:44px;border-radius:10px;border:2.5px solid rgba(245,244,240,.4);flex:none"></span><span style="font-size:32px;font-weight:500;letter-spacing:-.01em">${t}</span></div>`;
  s.push(slide(6, n, T, `
    <h2 class="d h2">Alors, ton site en coche <span class="it lm">combien ?</span></h2>
    <div style="margin-top:44px">
      ${box('Il met plus de 3 secondes à charger')}
      ${box('On ne comprend pas ce que tu fais')}
      ${box('Il est pénible sur téléphone')}
      ${box('Pas de bouton d\'action clair')}
      ${box('Aucun avis, aucune réalisation')}
    </div>
    <div style="margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="border:1.5px solid rgba(245,244,240,.15);border-radius:26px;padding:30px"><div class="mono" style="font-size:18px;letter-spacing:.12em;color:rgba(245,244,240,.5)">💬 EN COMMENTAIRE</div><div style="font-size:30px;margin-top:10px;font-weight:600">Ton score : 0, 1, 2… 5&nbsp;?</div></div>
      <div style="background:var(--lime);color:var(--ink);border-radius:26px;padding:30px"><div class="mono" style="font-size:18px;letter-spacing:.12em;opacity:.6">✉️ EN DM</div><div style="font-size:30px;margin-top:10px;font-weight:600">Ton lien → audit gratuit</div></div>
    </div>
  `, { theme: 'dark', last: true }));
  return { slug: '02-5-erreurs-qui-font-fuir', theme: 'cream', n, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 03 — POURQUOI WEBALP
// ════════════════════════════════════════════════════════════════
function c3() {
  const T = 'Pourquoi nous';
  const n = 7;
  const s = [];
  const head = (no, title) => `<div class="row" style="gap:18px;margin-bottom:34px"><span class="num">${no}</span><span class="tag">Raison ${no} / 05</span></div><h2 class="d h1">${title}</h2>`;

  s.push(slide(0, n, T, `
    <div class="k">Sion · Valais · Suisse</div>
    <h1 class="d" style="font-size:124px">On ne fait pas des sites <span class="it" style="color:var(--mut)">jolis.</span></h1>
    <h1 class="d" style="font-size:124px;margin-top:22px">On fait des sites qui <span class="lm">ramènent des clients.</span></h1>
    <p class="lead" style="margin-top:56px">5 raisons pour lesquelles les PME nous confient leur site. <b>Zéro blabla.</b></p>
  `, { theme: 'dark', extra: `<div class="glow" style="width:600px;height:600px;right:-100px;bottom:-100px;opacity:.12"></div>` }));

  const days = Array.from({ length: 14 }, (_, k) => {
    const d = k + 1;
    const last = d === 14;
    const fill = last ? '' : `<i style="position:absolute;left:0;right:0;bottom:0;height:${Math.round((d / 13) * 100)}%;background:rgba(179,255,71,${.08 + d * .02})"></i>`;
    return `<div style="position:relative;overflow:hidden;height:150px;border-radius:20px;${last ? 'background:var(--lime);color:var(--ink);' : 'border:1px solid var(--line);'}padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between">${fill}<span class="mono" style="position:relative;font-size:20px;font-weight:700">${String(d).padStart(2, '0')}</span>${last ? '<span style="position:relative;font-weight:700;font-size:21px;line-height:1.05">En ligne 🚀</span>' : ''}</div>`;
  }).join('');
  s.push(slide(1, n, T, `
    ${head('01', 'Livré en <span class="it lm">14 jours.</span>')}
    <div style="margin-top:60px;display:grid;grid-template-columns:repeat(7,1fr);gap:12px">${days}</div>
    <p class="lead" style="margin-top:56px">Pas 3 mois. Pas « on verra ». <b>Une date annoncée, une date tenue.</b></p>
  `, { theme: 'dark' }));

  const line = (a, b, bold) => `<div style="display:flex;justify-content:space-between;padding:13px 0;font-size:23px;${bold ? 'font-weight:700' : ''}"><span>${a}</span><span>${b}</span></div>`;
  s.push(slide(2, n, T, `
    ${head('02', 'Le prix annoncé est <span class="it lm">le prix payé.</span>')}
    <div style="margin-top:56px;display:flex;justify-content:center">
      <div style="width:640px;background:#F5F4F0;color:#0A0A0A;padding:44px 48px 36px;transform:rotate(2deg);box-shadow:0 40px 100px rgba(0,0,0,.6);font-family:'JetBrains Mono';position:relative;-webkit-mask:radial-gradient(circle 12px at 50% 100%,transparent 98%,#000) 0 0/32px 100% repeat-x">
        <div style="text-align:center;font-family:'Space Grotesk';font-weight:700;font-size:38px;letter-spacing:-.04em">WebAlp<span style="display:inline-block;width:8px;height:8px;background:#B3FF47;margin-left:3px"></span></div>
        <div style="text-align:center;font-size:17px;opacity:.5;margin:6px 0 22px;letter-spacing:.1em">DEVIS · SITE VITRINE</div>
        <div style="border-top:2px dashed #0A0A0A33;padding-top:8px">
          ${line('Design sur mesure', '✓')}${line('Mobile-first', '✓')}${line('SEO technique', '✓')}${line('Domaine & e-mail pro', '✓')}${line('Hébergement', 'inclus')}
          <div style="display:flex;justify-content:space-between;padding:13px 0;font-size:23px;background:#B3FF47;margin:6px -14px;padding:13px 14px;font-weight:700"><span>Frais cachés</span><span>CHF 0.00</span></div>
        </div>
        <div style="border-top:2px dashed #0A0A0A33;margin-top:12px;padding-top:18px;padding-bottom:20px;display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:22px;font-weight:700">TOTAL</span><span style="font-family:'Space Grotesk';font-weight:700;font-size:56px;letter-spacing:-.04em">dès CHF 690</span></div>
      </div>
    </div>
  `, { theme: 'dark' }));

  const R = 190, C = 2 * Math.PI * R;
  s.push(slide(3, n, T, `
    ${head('03', 'Rapide. <span class="it lm">Vraiment rapide.</span>')}
    <div style="margin-top:56px;display:flex;align-items:center;gap:64px">
      <div style="position:relative;width:440px;height:440px;flex:none">
        <svg width="440" height="440" viewBox="0 0 440 440" style="transform:rotate(-90deg)"><circle cx="220" cy="220" r="${R}" stroke="rgba(245,244,240,.1)" stroke-width="30" fill="none"/><circle cx="220" cy="220" r="${R}" stroke="#B3FF47" stroke-width="30" fill="none" stroke-linecap="round" stroke-dasharray="${C * .98} ${C}"/></svg>
        <div style="position:absolute;inset:0;display:grid;place-items:center;text-align:center"><div><div class="d" style="font-size:190px;color:var(--lime);letter-spacing:-.07em">98</div><div class="mono" style="font-size:20px;color:var(--mut);letter-spacing:.14em;margin-top:6px">/ 100 PERFORMANCE</div></div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:30px">
        ${[['Plus de visiteurs', 'qui restent'], ['Mieux classé', 'sur Google'], ['Fluide', 'sur mobile']].map(([a, b]) => `<div><div class="d" style="font-size:44px;letter-spacing:-.04em">${a}</div><div style="font-size:26px;color:var(--mut)">${b}</div></div>`).join('')}
      </div>
    </div>
    <p class="lead" style="margin-top:56px">Code moderne, pas de thème surchargé. <b>Le score visé sur chaque projet.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(4, n, T, `
    ${head('04', 'Des humains. <span class="it lm">Ici, en Valais.</span>')}
    <div style="margin-top:50px;position:relative;height:360px">
      <svg width="904" height="360" viewBox="0 0 904 360" style="position:absolute;inset:0">
        <path d="M0 300 L90 210 L150 250 L250 110 L320 190 L380 150 L470 40 L560 170 L620 130 L700 220 L780 160 L904 260 L904 360 L0 360Z" fill="rgba(245,244,240,.05)"/>
        <path d="M0 300 L90 210 L150 250 L250 110 L320 190 L380 150 L470 40 L560 170 L620 130 L700 220 L780 160 L904 260" stroke="rgba(245,244,240,.4)" stroke-width="3" fill="none" stroke-linejoin="round"/>
        <path d="M430 75 L470 40 L505 85 L485 78 L470 92 L452 76Z" fill="rgba(245,244,240,.5)"/>
        <line x1="0" y1="330" x2="904" y2="330" stroke="rgba(245,244,240,.1)" stroke-dasharray="4 10"/>
      </svg>
      <div style="position:absolute;left:300px;top:150px;display:flex;flex-direction:column;align-items:center">
        <div style="background:var(--lime);color:var(--ink);padding:12px 22px;border-radius:999px;font-weight:700;font-size:24px;white-space:nowrap">📍 Sion</div>
        <div style="width:3px;height:70px;background:var(--lime)"></div><div style="width:16px;height:16px;border-radius:50%;background:var(--lime);box-shadow:0 0 0 10px rgba(179,255,71,.2)"></div>
      </div>
    </div>
    <div style="margin-top:40px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="card" style="padding:32px"><div class="d" style="font-size:44px;letter-spacing:-.04em">Bastien & Noé</div><div style="font-size:24px;color:var(--mut);margin-top:8px">Tu parles direct aux fondateurs.</div></div>
      <div class="card" style="padding:32px"><div class="d" style="font-size:44px;letter-spacing:-.04em">&lt; 24h</div><div style="font-size:24px;color:var(--mut);margin-top:8px">Pour te répondre. Promis.</div></div>
    </div>
  `, { theme: 'dark' }));

  const slot = (st) => st ? `<div style="height:300px;border-radius:28px;background:var(--lime);color:var(--ink);padding:30px;display:flex;flex-direction:column;justify-content:space-between"><span class="mono" style="font-size:20px;font-weight:700;letter-spacing:.1em">PROJET 03</span><div><div class="d" style="font-size:44px;letter-spacing:-.04em">Pour toi ?</div><div style="font-size:21px;margin-top:6px;opacity:.7">Place disponible</div></div></div>`
    : `<div style="height:300px;border-radius:28px;border:1px solid var(--line);background:repeating-linear-gradient(-45deg,transparent 0 16px,rgba(245,244,240,.04) 16px 32px);padding:30px;display:flex;flex-direction:column;justify-content:space-between"><span class="mono" style="font-size:20px;font-weight:700;letter-spacing:.1em;color:var(--mut)">PROJET 0${st === 0 ? 1 : 2}</span><div class="d" style="font-size:44px;letter-spacing:-.04em;color:var(--faint)">Réservé</div></div>`;
  s.push(slide(5, n, T, `
    ${head('05', '3 projets par mois. <span class="it lm">Maximum.</span>')}
    <div style="margin-top:60px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">${slot(0)}${slot(null)}${slot(1)}</div>
    <p class="lead" style="margin-top:56px">Parce qu'on préfère <b>bien faire que beaucoup faire.</b> Ton projet n'est jamais noyé dans la masse.</p>
  `, { theme: 'dark' }));

  s.push(slide(6, n, T, `
    <div class="k">Prochaine étape</div>
    <h2 class="d h0">On parle de <span class="it">ton projet&nbsp;?</span></h2>
    <p class="lead" style="margin-top:40px;color:rgba(10,10,10,.7)">Raconte-nous ton activité. On te répond avec <b>une idée claire et un prix fixe.</b></p>
    <div style="margin-top:60px;display:flex;flex-direction:column;gap:14px">
      ${['Devis gratuit et sans engagement', 'Réponse sous 24h', 'Dès CHF 690 · livré en 14 jours'].map(t => `<div class="row" style="gap:18px;font-size:30px;font-weight:600"><span style="width:44px;height:44px;border-radius:50%;background:var(--ink);color:var(--lime);display:grid;place-items:center">${ck(22)}</span>${t}</div>`).join('')}
    </div>
    <div style="margin-top:64px;display:flex;gap:16px;align-items:center"><span class="btn">Écris-nous en DM ${arrow(32)}</span><span class="mono" style="font-size:22px;letter-spacing:.08em;opacity:.6">ou webalp.ch</span></div>
  `, { theme: 'lime', last: true }));
  return { slug: '03-pourquoi-webalp', theme: 'dark', n, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 04 — 14 JOURS (panorama timeline)
// ════════════════════════════════════════════════════════════════
function c4() {
  const T = '14 jours';
  const n = 7;
  const s = [];
  const LINE_Y = 1128;
  s.push(slide(0, n, T, `
    <div class="k">Notre méthode</div>
    <h1 class="d h1" style="max-width:820px">De ton idée à ton site en ligne.</h1>
    <div style="margin-top:20px;display:flex;align-items:flex-end;gap:24px">
      <div class="d" style="font-size:460px;line-height:.76;letter-spacing:-.08em;color:var(--lime)">14</div>
      <div class="it" style="font-size:120px;padding-bottom:20px">jours.</div>
    </div>
  `, { theme: 'dark', extra: `<div class="glow" style="width:700px;height:700px;left:200px;bottom:-300px;opacity:.12"></div>` }));

  const steps = [
    ['Jour 1', 'On fait connaissance.', 'Un appel pour comprendre ton activité, tes clients et ce que tu veux obtenir.', '20 min de ton temps', 'On écoute (vraiment)'],
    ['Jour 2–3', 'Brief & prix fixe.', 'Structure du site, contenus, fonctionnalités. Tu reçois un devis clair, sans surprise.', 'Tu valides', 'On planifie tout'],
    ['Jour 4–9', 'Design & code.', 'Maquette 100 % sur mesure, puis développement : mobile, rapide, optimisé Google.', 'Rien (ou presque)', 'On construit'],
    ['Jour 10–12', 'Tes retours.', 'Tu testes ton futur site, tu commentes. On ajuste jusqu\'à ce que tu l\'adores.', 'Tu testes', 'On peaufine'],
    ['Jour 13–14', 'En ligne. 🚀', 'Mise en ligne, Google Search Console, statistiques. Ton site commence à travailler.', 'Tu partages le lien', 'On lance'],
  ];
  steps.forEach(([day, title, desc, you, us], k) => {
    const i = k + 1;
    s.push(slide(i, n, T, `
      <div style="margin-top:40px" class="row"><span class="num">ÉTAPE ${String(i).padStart(2, '0')}</span></div>
      <div class="d" style="font-size:150px;letter-spacing:-.06em;margin-top:34px;color:${i === 5 ? 'var(--lime)' : 'var(--fg)'}">${day}</div>
      <h2 class="d h3" style="margin-top:22px">${title}</h2>
      <p class="lead" style="margin-top:26px;font-size:32px">${desc}</p>
      <div style="flex:1"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:96px">
        <div class="card" style="padding:26px 30px"><div class="mono" style="font-size:17px;letter-spacing:.14em;color:var(--mut)">TOI</div><div style="font-size:28px;font-weight:600;margin-top:8px">${you}</div></div>
        <div style="padding:26px 30px;border-radius:28px;background:${i === 5 ? 'var(--lime)' : 'var(--card2)'};color:${i === 5 ? 'var(--ink)' : 'var(--fg)'}"><div class="mono" style="font-size:17px;letter-spacing:.14em;opacity:.6">NOUS</div><div style="font-size:28px;font-weight:600;margin-top:8px">${us}</div></div>
      </div>
    `, { theme: 'clear dark', extra: `<div class="deco d" style="right:70px;top:655px;font-size:360px;letter-spacing:-.08em;line-height:.8;color:transparent;-webkit-text-stroke:3px rgba(179,255,71,.28)">0${i}</div>` }));
  });

  s.push(slide(6, n, T, `
    <div class="k">Et toi ?</div>
    <h2 class="d h1">On commence lundi&nbsp;? Ton site est en ligne <span class="it">dans 2 semaines.</span></h2>
    <div style="margin-top:56px;display:flex;flex-wrap:wrap;gap:14px">${['Devis gratuit', 'Prix fixe', 'Dès CHF 690', 'Réponse sous 24h'].map(t => `<span class="pill" style="border-color:rgba(10,10,10,.25)">${ck(22)} ${t}</span>`).join('')}</div>
    <div style="margin-top:64px;display:flex;gap:16px;align-items:center"><span class="btn">Réserve ta place ${arrow(32)}</span></div>
    <div class="mono" style="margin-top:26px;font-size:21px;letter-spacing:.08em;opacity:.65">DM « 14 » ou webalp.ch · 3 projets max / mois</div>
  `, { theme: 'lime', last: true }));

  // Panorama timeline across slides 1..5, ending into the lime slide
  const x0 = W * 0.62, x1 = W * 6 + 10;
  const nodes = [1, 2, 3, 4, 5].map(i => {
    const cx = i * W + 88 + 22;
    const done = i === 5;
    return `<div class="deco" style="left:${cx - 22}px;top:${LINE_Y - 22}px;width:44px;height:44px;border-radius:50%;background:${done ? '#B3FF47' : '#0A0A0A'};border:4px solid #B3FF47;box-shadow:0 0 0 12px rgba(179,255,71,.12);z-index:6"></div>
            <div class="deco mono" style="left:${cx + 44}px;top:${LINE_Y + 18}px;font-size:19px;letter-spacing:.14em;color:rgba(245,244,240,.5);z-index:6">${['J1', 'J3', 'J9', 'J12', 'J14'][i - 1]}</div>`;
  }).join('');
  const ticks = Array.from({ length: 70 }, (_, k) => {
    const x = x0 + 60 + k * ((x1 - x0 - 60) / 70);
    return `<i class="deco" style="left:${x}px;top:${LINE_Y + 34}px;width:2px;height:${k % 5 === 0 ? 18 : 9}px;background:rgba(245,244,240,.18)"></i>`;
  }).join('');
  const deco = `
    <div class="deco" style="left:${x0}px;top:${LINE_Y - 2}px;width:${x1 - x0}px;height:4px;background:linear-gradient(90deg,rgba(179,255,71,0),#B3FF47 8%,#B3FF47);z-index:5"></div>
    ${ticks}${nodes}`;
  return { slug: '04-ton-site-en-14-jours', theme: 'dark', n, slides: s, deco };
}

// ════════════════════════════════════════════════════════════════
// 05 — COMBIEN COÛTE UN SITE (panorama price scale)
// ════════════════════════════════════════════════════════════════
function c5() {
  const T = 'Prix d\'un site';
  const n = 7;
  const s = [];
  const SCALE_Y = 300;
  s.push(slide(0, n, T, `
    <div style="height:150px"></div>
    <div class="k">Transparence totale</div>
    <h1 class="d" style="font-size:120px">Combien coûte <span class="it">vraiment</span> un site web en Suisse&nbsp;?</h1>
    <p class="lead" style="margin-top:44px">Entre <b>CHF 0</b> et <b>CHF 50'000.</b> Oui, vraiment. On t'explique où va ton argent.</p>
  `, { theme: 'cream' }));

  const opt = (i, no, name, price, desc, pros, cons, verdict, hl = false, ps = 112) => slide(i, n, T, `
    <div style="height:230px"></div>
    <div class="row" style="gap:18px"><span class="num">OPTION ${no}</span><span class="tag">${name}</span></div>
    <div class="d" style="font-size:${ps}px;letter-spacing:-.055em;margin-top:30px;white-space:nowrap">${price}</div>
    <p class="lead" style="margin-top:22px;font-size:31px">${desc}</p>
    <div style="margin-top:44px;display:flex;flex-direction:column;gap:22px">
      ${pros.map(t => `<div class="row" style="gap:18px;font-size:31px;font-weight:500"><span class="ok" style="width:44px;height:44px">${ck(20)}</span>${t}</div>`).join('')}
      ${cons.map(t => `<div class="row" style="gap:18px;font-size:31px;font-weight:500;color:var(--mut)"><span class="ko" style="width:44px;height:44px">${xx(16)}</span>${t}</div>`).join('')}
    </div>
    <div style="margin-top:auto;padding:30px 34px;border-radius:26px;background:${hl ? 'var(--lime)' : 'var(--ink)'};color:${hl ? 'var(--ink)' : 'var(--paper)'};display:flex;gap:18px;align-items:center">
      <span class="mono" style="font-size:19px;letter-spacing:.12em;${hl ? '' : 'color:var(--lime)'}">VERDICT</span><span style="font-size:29px;font-weight:600;letter-spacing:-.01em">${verdict}</span>
    </div>
  `, { theme: 'cream clear' });

  s.push(opt(1, '01', 'Le fait-maison', 'CHF 0–500', 'Wix, Squarespace, thème gratuit. Tu fais tout toi-même.', ['Pas cher au départ'], ['Des heures de ton temps', 'Look générique', 'SEO très limité'], 'Parfait pour tester une idée.'));
  s.push(opt(2, '02', 'Le low-cost', 'CHF 500–1\'500', 'Thème acheté en ligne, retouché vite fait.', ['Correct visuellement'], ['Code lourd, site lent', 'SEO inexistant', 'Maintenance = cauchemar'], 'Joli… jusqu\'au premier bug.'));
  s.push(opt(3, '03', 'L\'agence qualifiée', 'CHF 1\'500–8\'000', 'Stratégie, design sur mesure, code propre et rapide.', ['Pensé pour convertir', 'Rapide & bien référencé', 'Évolutif'], [], 'Le bon choix pour une PME.', true));
  s.push(opt(4, '04', 'La grande agence', 'CHF 8\'000–50\'000+', 'Équipes de 10+ personnes, direction artistique à CHF 350/h.', ['Process très structuré'], ['Délais de plusieurs mois', 'Surdimensionné pour 95 % des PME'], 'Pour les gros comptes.', false, 92));

  const plan = (name, price, sub, hl) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:30px 34px;border-radius:26px;${hl ? 'background:var(--lime);color:var(--ink)' : 'border:1px solid rgba(245,244,240,.14)'}">
      <div><div style="font-size:30px;font-weight:700;letter-spacing:-.02em">${name}${hl ? ' <span class="mono" style="font-size:16px;letter-spacing:.1em;background:var(--ink);color:var(--lime);padding:6px 12px;border-radius:999px;margin-left:10px;vertical-align:middle">LE + DEMANDÉ</span>' : ''}</div><div style="font-size:22px;opacity:.6;margin-top:4px">${sub}</div></div>
      <div style="text-align:right"><div class="mono" style="font-size:16px;opacity:.55;letter-spacing:.1em">DÈS</div><div class="d" style="font-size:52px;letter-spacing:-.04em">${price}</div></div></div>`;
  s.push(slide(5, n, T, `
    <div class="k">Et chez nous ?</div>
    <h2 class="d h3">Qualité agence. <span class="it lm">Prix serrés.</span></h2>
    <div style="margin-top:44px;display:flex;flex-direction:column;gap:12px">
      ${plan('Starter', 'CHF 690', 'Site vitrine sur mesure', false)}
      ${plan('Croissance', 'CHF 1\'490', 'Plus de pages, blog, Google Business', true)}
      ${plan('Sur mesure', 'CHF 1\'990', 'Réservation, e-shop, appli web', false)}
      ${plan('Maintenance', 'CHF 49/mois', 'On s\'occupe de tes mises à jour', false)}
    </div>
    <p class="lead" style="margin-top:34px;font-size:27px">Comment ? On est deux, sans bureau de luxe : <b>les économies sont pour toi.</b> <span style="opacity:.7">Tarifs indicatifs, sur devis.</span></p>
  `, { theme: 'dark' }));

  s.push(slide(6, n, T, `
    <div class="k">À retenir</div>
    <h2 class="d h1">Le moins cher est souvent <span class="it">le plus cher.</span></h2>
    <p class="lead" style="margin-top:40px;color:rgba(10,10,10,.72)">Un site qui ne rapporte rien coûte toujours trop. <b>Un site qui t'amène des clients se rembourse tout seul.</b></p>
    <div style="margin-top:60px;background:var(--ink);color:var(--paper);border-radius:32px;padding:40px 44px;display:flex;justify-content:space-between;align-items:center">
      <div><div class="mono" style="font-size:19px;letter-spacing:.12em;color:rgba(245,244,240,.5)">TON DEVIS EN 24H</div><div class="d" style="font-size:54px;margin-top:10px;letter-spacing:-.04em">Gratuit. Sans engagement.</div></div>
      <span style="width:84px;height:84px;border-radius:50%;background:var(--lime);color:var(--ink);display:grid;place-items:center;flex:none">${arrow(38)}</span>
    </div>
    <div class="mono" style="margin-top:24px;font-size:21px;letter-spacing:.08em;opacity:.65">💾 ENREGISTRE CE POST · DM « PRIX »</div>
  `, { theme: 'lime', last: true }));

  // Panorama price scale: one segment per option slide (1..4), continuous across swipes.
  const segs = [[0, 500, '#D9D7CF'], [500, 1500, '#BDBAB0'], [1500, 8000, '#B3FF47'], [8000, '50\'000+', '#0A0A0A']];
  const fmt = (v) => typeof v === 'string' ? v : v.toLocaleString('en-US').replace(/,/g, '\'');
  const deco = `<div class="deco" style="left:${W * 0.55}px;top:${SCALE_Y - 2}px;width:${W * 0.45}px;height:4px;background:linear-gradient(90deg,rgba(10,10,10,0),#D9D7CF);z-index:5"></div>` + segs.map(([a, b, c], k) => {
    const i = k + 1, L = i * W;
    return `<i class="deco" style="left:${L}px;top:${SCALE_Y - 9}px;width:${W}px;height:18px;background:${c};z-index:5"></i>
      <i class="deco" style="left:${L - 1}px;top:${SCALE_Y - 34}px;width:3px;height:68px;background:#0A0A0A;z-index:6"></i>
      <div class="deco mono" style="left:${L + 88}px;top:${SCALE_Y - 70}px;font-size:19px;font-weight:700;letter-spacing:.06em;color:#0A0A0A;z-index:6">CHF ${fmt(a)}</div>
      <div class="deco mono" style="left:${L + W - 88}px;top:${SCALE_Y - 70}px;font-size:19px;font-weight:700;letter-spacing:.06em;color:#0A0A0A;z-index:6;transform:translateX(-100%)">CHF ${fmt(b)}</div>
      <div class="deco" style="left:${L + W / 2 - 22}px;top:${SCALE_Y - 22}px;width:44px;height:44px;border-radius:50%;background:#F5F4F0;border:6px solid #0A0A0A;z-index:7"></div>
      <div class="deco mono" style="left:${L + W / 2}px;top:${SCALE_Y + 36}px;transform:translateX(-50%);font-size:17px;letter-spacing:.14em;color:rgba(10,10,10,.5);z-index:6;white-space:nowrap">TU ES ICI</div>`;
  }).join('') + `<div class="deco mono" style="left:${W - 88}px;top:${SCALE_Y - 70}px;transform:translateX(-100%);font-size:19px;letter-spacing:.12em;color:rgba(10,10,10,.45);z-index:6;white-space:nowrap">GLISSE →</div>`;
  return { slug: '05-combien-coute-un-site', theme: 'cream', n, slides: s, deco };
}

// ─── Render ───
(async () => {
  const carousels = [c1(), c2(), c3(), c4(), c5()];
  const only = process.argv[2];
  const browser = await chromium.launch();
  for (const c of carousels) {
    if (only && !c.slug.startsWith(only)) continue;
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
      <body class="${c.theme}" style="width:${W * c.n}px">${c.slides.join('')}${c.deco}<div class="grain"></div></body></html>`;
    const hp = path.join(ROOT, 'html', `${c.slug}.html`);
    fs.mkdirSync(path.dirname(hp), { recursive: true });
    fs.writeFileSync(hp, html);
    const page = await browser.newPage({ viewport: { width: W * c.n, height: H } });
    await page.goto('file://' + hp);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const outDir = path.join(ROOT, 'out', c.slug);
    fs.mkdirSync(outDir, { recursive: true });
    for (let i = 0; i < c.n; i++) {
      await page.screenshot({ path: path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`), clip: { x: i * W, y: 0, width: W, height: H } });
    }
    // contact sheet preview
    await page.setViewportSize({ width: W * c.n, height: H });
    await page.screenshot({ path: path.join(ROOT, 'out', `${c.slug}-apercu.jpg`), type: 'jpeg', quality: 80, fullPage: false, scale: 'css' });
    await page.close();
    console.log('ok', c.slug);
  }
  await browser.close();
})();

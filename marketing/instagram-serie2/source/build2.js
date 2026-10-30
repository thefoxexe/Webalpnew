// WebAlp — série 2 : carousels par secteur (4:5, 1080x1350)
const path = require('path');
const { W, slide, ck, xx, arrow, stars, render } = require('./common.js');

const N = 7;
const ok = (s = 22, sz = 44) => `<span class="ok" style="width:${sz}px;height:${sz}px">${ck(s)}</span>`;
const ko = (s = 18, sz = 44) => `<span class="ko" style="width:${sz}px;height:${sz}px">${xx(s)}</span>`;
const chk = (t, d) => `<div class="row" style="align-items:flex-start;gap:22px">${ok()}<div><div style="font-size:37px;font-weight:600;letter-spacing:-.02em">${t}</div>${d ? `<div style="font-size:26px;color:var(--mut);margin-top:4px">${d}</div>` : ''}</div></div>`;
const phoneShell = (inner, { w = 380, h = 760, rot = 0, shadow = 'rgba(0,0,0,.35)' } = {}) => `
  <div style="width:${w}px;height:${h}px;border-radius:60px;background:#0A0A0A;padding:14px;box-shadow:0 40px 90px ${shadow};transform:rotate(${rot}deg);flex:none;border:1px solid rgba(255,255,255,.08)">
    <div style="width:100%;height:100%;border-radius:47px;background:#fff;overflow:hidden;position:relative;color:#0A0A0A">
      <div style="position:absolute;top:13px;left:50%;transform:translateX(-50%);width:110px;height:32px;border-radius:16px;background:#0A0A0A;z-index:5"></div>${inner}
    </div></div>`;
const cta = (i, T, title, sub, keyword, chips) => slide(i, N, T, `
    <div class="k">Ton tour</div>
    <h2 class="d h1">${title}</h2>
    <p class="lead" style="margin-top:34px;color:rgba(10,10,10,.72)">${sub}</p>
    <div style="margin-top:44px;display:flex;flex-wrap:wrap;gap:12px">${chips.map(t => `<span class="pill" style="border-color:rgba(10,10,10,.25)">${ck(22)} ${t}</span>`).join('')}</div>
    <div style="margin-top:56px;background:var(--ink);color:var(--paper);border-radius:32px;padding:40px 48px;display:flex;justify-content:space-between;align-items:center">
      <div><div class="mono" style="font-size:20px;letter-spacing:.12em;color:rgba(245,244,240,.55)">💬 COMMENTE</div><div class="d" style="font-size:88px;color:var(--lime);margin-top:10px">« ${keyword} »</div><div style="font-size:26px;margin-top:10px;color:rgba(245,244,240,.75)">et on t'envoie des idées pour ton site.</div></div>
    </div>
  `, { theme: 'lime', last: true });

// ════════════════════════════════════════════════════════════════
// 06 — RESTAURANTS
// ════════════════════════════════════════════════════════════════
function c6() {
  const T = 'Restaurants';
  const s = [];
  s.push(slide(0, N, T, `
    <div class="k">Restaurants · Cafés · Bars</div>
    <h1 class="d h0">Ta cuisine est top. <span class="it">Ta salle est vide.</span></h1>
    <p class="lead" style="margin-top:44px">Le problème n'est pas dans l'assiette. <b>C'est qu'on ne te trouve pas.</b></p>
    <div style="margin-top:60px;display:flex;gap:16px">
      ${['T1', 'T2', 'T3', 'T4', 'T5'].map((t, k) => `<div style="flex:1;height:150px;border-radius:24px;${k === 1 ? 'background:var(--ink);color:var(--lime)' : 'border:2px dashed rgba(10,10,10,.22)'};display:flex;flex-direction:column;justify-content:space-between;padding:18px 20px"><span class="mono" style="font-size:20px;font-weight:700">${t}</span><span style="font-size:19px;font-weight:600;${k === 1 ? '' : 'color:rgba(10,10,10,.4)'}">${k === 1 ? 'Réservée' : 'Libre'}</span></div>`).join('')}
    </div>
    <div class="mono" style="margin-top:16px;font-size:18px;letter-spacing:.1em;color:var(--mut)">VENDREDI · 19:30</div>
  `, { theme: 'cream' }));

  const pin = (x, y, label, on) => `<div style="position:absolute;left:${x}px;top:${y}px;display:flex;flex-direction:column;align-items:center"><div style="background:${on ? '#0A0A0A' : '#EA4335'};color:${on ? '#B3FF47' : '#fff'};padding:8px 14px;border-radius:999px;font-size:17px;font-weight:700;white-space:nowrap">${label}</div><div style="width:2px;height:16px;background:${on ? '#0A0A0A' : '#EA4335'}"></div></div>`;
  const listing = (name, meta, btns, faded) => `<div style="padding:22px 28px;border-top:1px solid #EAEAEA;${faded ? 'opacity:.4' : ''}"><div style="font-size:27px;font-weight:600">${name}</div><div style="font-size:19px;color:#70757A;margin-top:4px">${meta}</div><div style="display:flex;gap:8px;margin-top:12px">${btns.map(b => `<span style="border:1.5px solid #DADCE0;border-radius:999px;padding:7px 16px;font-size:17px;color:#1A73E8;font-weight:600">${b}</span>`).join('')}</div></div>`;
  s.push(slide(1, N, T, `
    <h2 class="d h2">« restaurant sion » : <span class="it">le 1er réflexe.</span></h2>
    <div class="fill"><div style="background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.14);color:#202124">
      <div style="height:250px;position:relative;background:#E8EEE6;background-image:linear-gradient(90deg,rgba(255,255,255,.7) 2px,transparent 2px),linear-gradient(rgba(255,255,255,.7) 2px,transparent 2px);background-size:60px 60px">
        <div style="position:absolute;left:-40px;top:110px;width:1100px;height:26px;background:#FFE9A8;transform:rotate(-8deg)"></div>
        <div style="position:absolute;left:520px;top:-20px;width:30px;height:320px;background:#B9D4F1;transform:rotate(18deg)"></div>
        ${pin(120, 60, '★ 4,7 La Pinte', false)}${pin(560, 120, '★ 4,6 Chez Mario', false)}${pin(330, 150, 'Ton resto ?', true)}
      </div>
      ${listing('La Pinte du Vieux-Bourg', 'Suisse · ★ 4,7 (212) · Ouvert', ['Site web', 'Réserver', 'Menu'])}
      ${listing('Chez Mario', 'Italien · ★ 4,6 (158) · Ouvert', ['Site web', 'Itinéraire'])}
      ${listing('Ton restaurant', 'Pas de site · pas de menu · pas de réservation', ['Itinéraire'], true)}
    </div></div>
    <p class="lead" style="font-size:30px">Ceux avec un bouton <b>« Réserver »</b> prennent les tables.</p>
  `, { theme: 'cream' }));

  const pdf = `<div style="padding:60px 16px 0;filter:blur(.6px)"><div style="font-family:serif;font-size:13px;text-align:center;font-weight:700">CARTE DES METS</div>${Array.from({ length: 22 }, (_, k) => `<div style="display:flex;justify-content:space-between;font-size:7px;margin:5px 0;font-family:serif;color:#333"><span>${['Entrée du jour', 'Salade valaisanne', 'Assiette valaisanne', 'Rösti maison', 'Fondue moitié-moitié', 'Raclette AOP', 'Tarte aux abricots'][k % 7]} ...........</span><span>${18 + k}.-</span></div>`).join('')}</div><div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.75);color:#fff;font-size:14px;padding:8px 14px;border-radius:999px;white-space:nowrap">menu_2024_v3_FINAL.pdf</div>`;
  const dish = (n, d, p) => `<div style="display:flex;justify-content:space-between;align-items:flex-start;padding:14px 0;border-bottom:1px solid #eee"><div><div style="font-size:19px;font-weight:700">${n}</div><div style="font-size:14px;color:#888;margin-top:2px">${d}</div></div><div style="font-size:18px;font-weight:700">${p}</div></div>`;
  const menu = `<div style="padding:62px 22px 0"><div style="font-family:'Space Grotesk';font-weight:700;font-size:30px;letter-spacing:-.04em">La carte</div><div style="display:flex;gap:6px;margin:12px 0 6px">${['Plats', 'Fromages', 'Desserts', 'Vins'].map((t, k) => `<span style="font-size:13px;font-weight:700;padding:7px 12px;border-radius:999px;${k ? 'background:#F1F1F1' : 'background:#0A0A0A;color:#B3FF47'}">${t}</span>`).join('')}</div>${dish('Raclette AOP', 'Pommes de terre, cornichons', '9.-/portion')}${dish('Fondue moitié-moitié', 'Gruyère & vacherin', '28.-')}${dish('Rösti maison', 'Œuf, lard, fromage', '24.-')}${dish('Assiette valaisanne', 'Viande séchée, lard, seigle', '26.-')}<div style="margin-top:16px;background:#0A0A0A;color:#B3FF47;text-align:center;border-radius:999px;padding:16px;font-weight:700;font-size:17px">Réserver une table →</div></div>`;
  s.push(slide(2, N, T, `
    <h2 class="d h2">Ton menu en PDF ? <span class="it">Personne ne zoome.</span></h2>
    <div class="fill" style="flex-direction:row;justify-content:center;gap:46px;align-items:center">
      <div style="text-align:center">${phoneShell(pdf, { w: 330, h: 660, rot: -3, shadow: 'rgba(0,0,0,.18)' })}<div class="row" style="justify-content:center;gap:10px;margin-top:22px;color:var(--red)" >${ko(14, 34)}<span class="mono" style="font-size:18px;letter-spacing:.1em">PDF ILLISIBLE</span></div></div>
      <div style="text-align:center">${phoneShell(menu, { w: 330, h: 660, shadow: 'rgba(0,0,0,.18)' })}<div class="row" style="justify-content:center;gap:10px;margin-top:22px">${ok(16, 34)}<span class="mono" style="font-size:18px;letter-spacing:.1em">MENU MOBILE</span></div></div>
    </div>
  `, { theme: 'cream' }));

  const slot = (t, st) => `<div style="padding:22px 0;border-radius:18px;text-align:center;font-size:26px;font-weight:600;${st === 'sel' ? 'background:var(--lime);color:var(--ink)' : st === 'off' ? 'background:rgba(245,244,240,.04);color:rgba(245,244,240,.25);text-decoration:line-through' : 'border:1.5px solid rgba(245,244,240,.18)'}">${t}</div>`;
  s.push(slide(3, N, T, `
    <h2 class="d h2">Réservation en ligne : <span class="it lm">tables pleines, téléphone calme.</span></h2>
    <div class="fill"><div class="card" style="padding:40px;background:#141414">
      <div style="display:flex;justify-content:space-between;align-items:center"><div class="d" style="font-size:40px;letter-spacing:-.03em">Réserver une table</div><span class="mono" style="font-size:18px;color:var(--mut);letter-spacing:.1em">4 PERS.</span></div>
      <div style="display:flex;gap:10px;margin-top:28px">${['Jeu 14', 'Ven 15', 'Sam 16', 'Dim 17'].map((d, k) => `<span style="flex:1;text-align:center;padding:16px 0;border-radius:16px;font-size:23px;font-weight:600;${k === 1 ? 'background:var(--paper);color:var(--ink)' : 'border:1.5px solid rgba(245,244,240,.18)'}">${d}</span>`).join('')}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:22px">${slot('18:30', 'off')}${slot('19:00', 'off')}${slot('19:30', 'sel')}${slot('20:00')}${slot('20:30')}${slot('21:00', 'off')}${slot('21:15')}${slot('21:30')}</div>
      <div style="margin-top:28px;background:var(--lime);color:var(--ink);border-radius:999px;padding:24px;text-align:center;font-weight:700;font-size:28px">Confirmer · Ven 15 à 19:30</div>
    </div></div>
    <p class="lead" style="font-size:30px">Les réservations tombent <b>même pendant le coup de feu.</b></p>
  `, { theme: 'dark' }));

  const lang = (code, txt, on) => `<div style="padding:30px 34px;border-radius:26px;${on ? 'background:var(--lime);color:var(--ink)' : 'border:1px solid rgba(245,244,240,.14)'};display:flex;gap:26px;align-items:center"><span class="mono" style="font-size:24px;font-weight:700;width:56px">${code}</span><span class="d" style="font-size:40px;letter-spacing:-.03em">${txt}</span></div>`;
  s.push(slide(4, N, T, `
    <h2 class="d h2">Les touristes cherchent <span class="it lm">dans leur langue.</span></h2>
    <div class="fill" style="gap:14px">
      ${lang('FR', 'Réserver une table', true)}${lang('DE', 'Tisch reservieren')}${lang('EN', 'Book a table')}
    </div>
    <p class="lead" style="font-size:30px">Saison d'hiver, saison d'été : en Valais, <b>un site en FR/DE/EN remplit plus de tables.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(5, N, T, `
    <div class="k">La checklist resto</div>
    <h2 class="d h2">Ce que ton site <span class="it">doit</span> avoir.</h2>
    <div class="fill" style="gap:38px">
      ${chk('Le bouton « Réserver » partout', 'En haut, en bas, impossible de le rater')}
      ${chk('Un menu lisible sur téléphone', 'Pas un PDF, et facile à mettre à jour')}
      ${chk('Horaires + plan + parking', 'Les 3 questions qu\'on te pose au téléphone')}
      ${chk('De vraies photos de tes plats', 'Ça donne faim, donc ça fait réserver')}
      ${chk('Tes avis Google intégrés', 'La preuve que c\'est bon')}
    </div>
  `, { theme: 'cream' }));

  s.push(cta(6, T, 'Ton resto mérite <span class="it">d\'être plein.</span>', 'Site vitrine avec menu et réservation, <b>pensé pour les restaurants valaisans.</b>', 'RESTO', ['Menu mobile', 'Réservation en ligne', 'FR / DE / EN', 'Livré en 14 jours']));
  return { slug: '06-restaurants', theme: 'cream', n: N, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 07 — ARTISANS & BTP
// ════════════════════════════════════════════════════════════════
function c7() {
  const T = 'Artisans';
  const s = [];
  const trades = ['Menuisier', 'Électricien', 'Peintre', 'Paysagiste', 'Plâtrier', 'Couvreur', 'Carreleur', 'Sanitaire', 'Maçon', 'Ébéniste', 'Chauffagiste', 'Charpentier'];
  s.push(slide(0, N, T, `
    <div class="k">Artisans · Construction · Rénovation</div>
    <h1 class="d h0">Tu bosses bien. <span class="it lm">Mais qui le sait ?</span></h1>
    <div style="margin-top:56px;display:flex;flex-wrap:wrap;gap:12px">${trades.map((t, k) => `<span class="pill" style="${k === 3 ? 'background:var(--lime);color:var(--ink);border-color:var(--lime)' : ''}font-size:25px">${t}</span>`).join('')}</div>
    <p class="lead" style="margin-top:50px">Le meilleur artisan de la vallée <b>n'est pas toujours le plus appelé.</b></p>
  `, { theme: 'dark', extra: `<div class="glow" style="width:600px;height:600px;right:-150px;bottom:-150px;opacity:.12"></div>` }));

  const node = (t, sub, st = '') => `<div style="padding:26px 30px;border-radius:24px;${st === 'g' ? 'background:var(--lime);color:var(--ink)' : st === 'r' ? 'border:2px solid var(--red);color:var(--fg)' : 'background:#161616;border:1px solid rgba(245,244,240,.12)'}"><div style="font-size:29px;font-weight:700;letter-spacing:-.015em">${t}</div><div style="font-size:21px;opacity:.65;margin-top:4px">${sub}</div></div>`;
  const down = `<div style="display:grid;place-items:center;height:56px;color:var(--lime)"><svg width="28" height="46" viewBox="0 0 24 40"><path d="M12 2v34M4 28l8 8 8-8" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
  s.push(slide(1, N, T, `
    <h2 class="d h2">Même recommandé, <span class="it lm">on te Google.</span></h2>
    <div class="fill">
      ${node('« Appelle Dupont, il est top. »', 'Ton client te recommande à son voisin')}
      ${down}
      ${node('Le voisin tape « Dupont menuiserie »', 'Avant d\'appeler, il vérifie')}
      ${down}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${node('Site pro + photos', '→ il appelle', 'g')}${node('Rien, ou une page vide', '→ il doute', 'r')}</div>
    </div>
  `, { theme: 'dark' }));

  s.push(slide(2, N, T, `
    <h2 class="d h2">Tes chantiers sont <span class="it lm">ton meilleur argument.</span></h2>
    <div class="fill"><div style="position:relative;height:620px;border-radius:30px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.5)">
      <div style="position:absolute;inset:0;background:linear-gradient(160deg,#6E6A62,#3F3B35)"><div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 120px,rgba(0,0,0,.18) 120px 124px),repeating-linear-gradient(0deg,transparent 0 60px,rgba(0,0,0,.12) 60px 63px)"></div></div>
      <div style="position:absolute;inset:0;clip-path:inset(0 0 0 52%);background:linear-gradient(160deg,#E9DCC6,#B98F5E)"><div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 150px,rgba(120,80,40,.18) 150px 153px)"></div><div style="position:absolute;right:60px;top:120px;width:220px;height:300px;border-radius:12px;background:linear-gradient(180deg,#CFE3EE,#8FB3C6);box-shadow:inset 0 0 0 10px #F4ECE0"></div></div>
      <div style="position:absolute;left:52%;top:0;bottom:0;width:6px;background:#fff;transform:translateX(-3px)"></div>
      <div style="position:absolute;left:52%;top:50%;transform:translate(-50%,-50%);width:84px;height:84px;border-radius:50%;background:#fff;color:#0A0A0A;display:grid;place-items:center;font-size:30px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.3)">⟷</div>
      <span class="mono" style="position:absolute;left:28px;top:26px;background:rgba(0,0,0,.6);color:#fff;padding:10px 18px;border-radius:999px;font-size:19px;letter-spacing:.12em">AVANT</span>
      <span class="mono" style="position:absolute;right:28px;top:26px;background:#B3FF47;color:#0A0A0A;padding:10px 18px;border-radius:999px;font-size:19px;letter-spacing:.12em;font-weight:700">APRÈS</span>
    </div></div>
    <p class="lead" style="font-size:30px">Un avant/après vaut mille mots. <b>Et il se partage tout seul.</b></p>
  `, { theme: 'dark' }));

  const field = (l, v, sp = '') => `<div style="${sp}"><div class="mono" style="font-size:16px;letter-spacing:.12em;color:#888">${l}</div><div style="margin-top:8px;padding:18px 20px;border-radius:14px;background:#F3F3F1;font-size:23px;font-weight:600;color:#0A0A0A">${v}</div></div>`;
  s.push(slide(3, N, T, `
    <h2 class="d h2">Un formulaire de devis <span class="it lm">qui trie pour toi.</span></h2>
    <div class="fill"><div style="background:#fff;border-radius:30px;padding:40px;display:grid;grid-template-columns:1fr 1fr;gap:20px;box-shadow:0 40px 90px rgba(0,0,0,.5)">
      ${field('TYPE DE TRAVAUX', 'Rénovation salle de bain', 'grid-column:1/3')}
      ${field('SURFACE', '8 m²')}${field('COMMUNE', 'Savièse')}
      ${field('DÉLAI', 'Avant l\'été')}${field('BUDGET', 'CHF 15–20k')}
      <div style="grid-column:1/3"><div class="mono" style="font-size:16px;letter-spacing:.12em;color:#888">PHOTOS</div><div style="display:flex;gap:10px;margin-top:8px">${['#B8B2A6', '#8E9AA3', '#A69683'].map(c => `<i style="width:110px;height:84px;border-radius:12px;background:${c}"></i>`).join('')}<i style="width:110px;height:84px;border-radius:12px;border:2px dashed #ccc;display:grid;place-items:center;color:#aaa;font-style:normal;font-size:34px">+</i></div></div>
      <div style="grid-column:1/3;background:#0A0A0A;color:#B3FF47;text-align:center;border-radius:999px;padding:22px;font-weight:700;font-size:25px">Envoyer ma demande →</div>
    </div></div>
    <p class="lead" style="font-size:30px">Tu rappelles <b>avec toutes les infos.</b> Fini les devis à l'aveugle.</p>
  `, { theme: 'dark' }));

  const communes = ['Sion', 'Sierre', 'Martigny', 'Monthey', 'Conthey', 'Savièse', 'Nendaz', 'Crans-Montana', 'Fully', 'Saxon', 'Vétroz', 'Ayent', 'Grimisuat', 'Chamoson', 'Riddes', 'Leytron'];
  s.push(slide(4, N, T, `
    <h2 class="d h2">Trouvé dans <span class="it lm">chaque commune</span> où tu bosses.</h2>
    <div class="fill"><div style="display:flex;flex-wrap:wrap;gap:12px">${communes.map((c, k) => `<span style="padding:16px 26px;border-radius:999px;font-size:27px;font-weight:600;${[0, 4, 5, 9].includes(k) ? 'background:var(--lime);color:var(--ink)' : 'border:1.5px solid rgba(245,244,240,.16)'}">📍 ${c}</span>`).join('')}</div>
    <div style="margin-top:44px;background:#fff;color:#202124;border-radius:24px;padding:26px 32px;display:flex;gap:18px;align-items:center"><svg width="28" height="28" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span style="font-size:30px">menuisier <b>savièse</b></span><span style="margin-left:auto;font-family:'JetBrains Mono';font-size:18px;color:#1E8E3E;font-weight:700">TA PAGE SAVIÈSE ✓</span></div></div>
    <p class="lead" style="font-size:30px">Une page par zone d'intervention = <b>le SEO local qui ramène des chantiers.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(5, N, T, `
    <div class="k">La checklist artisan</div>
    <h2 class="d h2">Le site qui fait <span class="it lm">sonner ton téléphone.</span></h2>
    <div class="fill" style="gap:38px">
      ${chk('Tes réalisations avant / après', 'Classées par type de travaux')}
      ${chk('Un formulaire de devis précis', 'Surface, commune, délai, photos')}
      ${chk('Tes zones d\'intervention', 'Une page par région clé')}
      ${chk('Tes avis Google et tes labels', 'Maîtrise fédérale, certifications…')}
      ${chk('Ton numéro cliquable partout', 'Un tap = un appel')}
    </div>
  `, { theme: 'dark' }));

  s.push(cta(6, T, 'Montre enfin <span class="it">ce que tu sais faire.</span>', 'On transforme tes photos de chantiers en <b>machine à demandes de devis.</b>', 'CHANTIER', ['Galerie avant/après', 'Formulaire de devis', 'SEO local', 'Dès CHF 690']));
  return { slug: '07-artisans', theme: 'dark', n: N, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 08 — BEAUTÉ & BIEN-ÊTRE
// ════════════════════════════════════════════════════════════════
function c8() {
  const T = 'Beauté & bien-être';
  const s = [];
  s.push(slide(0, N, T, `
    <div class="k">Coiffure · Esthétique · Massage · Ongles</div>
    <h1 class="d h0">Tu réponds au téléphone <span class="it">les ciseaux à la main&nbsp;?</span></h1>
    <div style="margin-top:56px;display:inline-flex;align-items:center;gap:22px;background:var(--ink);color:var(--paper);border-radius:999px;padding:22px 34px 22px 22px;align-self:flex-start">
      <span style="width:76px;height:76px;border-radius:50%;background:#34C759;display:grid;place-items:center;font-size:36px">📞</span>
      <div><div style="font-size:28px;font-weight:600">Appel entrant…</div><div class="mono" style="font-size:18px;color:rgba(245,244,240,.55);letter-spacing:.08em">PENDANT UNE COULEUR</div></div>
    </div>
  `, { theme: 'cream' }));

  const miss = (t, h) => `<div style="display:flex;justify-content:space-between;padding:22px 26px;border-bottom:1px solid #eee"><div class="row" style="gap:16px"><span style="width:44px;height:44px;border-radius:50%;background:#F2F2F2;display:grid;place-items:center;color:#FF3B30;font-size:22px">↙</span><div><div style="font-size:24px;font-weight:600;color:#FF3B30">${t}</div><div style="font-size:17px;color:#999">Appel manqué</div></div></div><span style="font-size:19px;color:#999">${h}</span></div>`;
  s.push(slide(1, N, T, `
    <h2 class="d h2">Chaque appel manqué, <span class="it">c'est une cliente ailleurs.</span></h2>
    <div class="fill" style="align-items:center"><div style="width:720px;background:#fff;border-radius:30px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.12)">
      <div style="padding:24px 26px;display:flex;justify-content:space-between;align-items:center;background:#FAFAFA"><span style="font-size:28px;font-weight:700">Récents</span><span style="background:#FF3B30;color:#fff;border-radius:999px;padding:6px 16px;font-weight:700;font-size:20px">7</span></div>
      ${miss('079 •• •• 12', '09:14')}${miss('078 •• •• 87', '10:02')}${miss('Inconnu', '11:47')}${miss('076 •• •• 33', '14:20')}${miss('079 •• •• 05', '16:58')}
    </div></div>
    <p class="lead" style="font-size:30px">Elle ne rappelle pas. <b>Elle réserve chez celle qui a un bouton « Réserver ».</b></p>
  `, { theme: 'cream' }));

  const cell = (t, st) => st ? `<div style="border-radius:12px;padding:12px 12px;font-size:18px;font-weight:600;line-height:1.2;${st === 'n' ? 'background:var(--lime);color:var(--ink)' : 'background:#1F1F1F;color:rgba(245,244,240,.8)'}">${t}</div>` : `<div style="border-radius:12px;border:1px dashed rgba(245,244,240,.12)"></div>`;
  const days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN'];
  const grid = [
    ['Coupe + brushing', 'Couleur', '', 'Coupe homme', 'Balayage'],
    ['', 'Soin visage', 'Manucure', 'Coupe + brushing', ''],
    ['Coupe homme', '', 'Couleur', '', 'Mariage – essai'],
    ['Balayage', 'Coupe enfant', '', 'Massage 60′', 'Coupe + brushing'],
  ];
  s.push(slide(2, N, T, `
    <h2 class="d h2">Elles réservent seules. <span class="it lm">Même à 23h.</span></h2>
    <div class="fill"><div class="card" style="padding:30px;background:#121212">
      <div style="display:grid;grid-template-columns:70px repeat(5,1fr);gap:8px">
        <span></span>${days.map(d => `<span class="mono" style="font-size:16px;letter-spacing:.12em;color:var(--mut);text-align:center;padding-bottom:6px">${d}</span>`).join('')}
        ${grid.map((r, ri) => `<span class="mono" style="font-size:16px;color:var(--faint);padding-top:10px">${['09h', '11h', '14h', '16h'][ri]}</span>${r.map((t, ci) => cell(t, t ? (ri === 2 && ci === 4 ? 'n' : 'b') : '')).join('')}`).join('')}
      </div>
    </div>
    <div style="margin-top:22px;display:flex;gap:18px;align-items:center;background:rgba(179,255,71,.1);border:1px solid rgba(179,255,71,.35);border-radius:22px;padding:22px 26px"><span class="ok">${ck(22)}</span><div style="font-size:25px"><b>Nouvelle réservation</b> · Ven 14h · Mariage – essai <span class="mono" style="color:var(--mut);font-size:18px">· réservé à 23:14</span></div></div></div>
    <p class="lead" style="font-size:30px">Ton agenda se remplit <b>pendant que tu travailles</b> (et que tu dors).</p>
  `, { theme: 'dark' }));

  s.push(slide(3, N, T, `
    <h2 class="d h2">Moins de lapins, <span class="it">grâce aux rappels auto.</span></h2>
    <div class="fill" style="align-items:center">
      <div style="width:760px;display:flex;flex-direction:column;gap:16px">
        <div style="align-self:flex-start;max-width:600px;background:#E9E9EB;color:#0A0A0A;border-radius:30px 30px 30px 8px;padding:26px 30px;font-size:27px;line-height:1.35">Bonjour Léa 👋 Petit rappel : ton RDV <b>demain à 14h00</b> (couleur + brushing). À demain !</div>
        <div style="align-self:flex-start;display:flex;gap:12px"><span style="background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:16px 28px;font-weight:700;font-size:23px">✓ Je confirme</span><span style="border:2px solid #0A0A0A;border-radius:999px;padding:16px 28px;font-weight:700;font-size:23px">Déplacer</span></div>
        <div style="align-self:flex-end;max-width:420px;background:#0A84FF;color:#fff;border-radius:30px 30px 8px 30px;padding:24px 30px;font-size:27px">Confirmé, merci ! 🙏</div>
      </div>
    </div>
    <p class="lead" style="font-size:30px">Rappel automatique la veille, <b>sans que tu lèves le petit doigt.</b></p>
  `, { theme: 'cream' }));

  const price = (n, p) => `<div style="display:flex;align-items:baseline;gap:14px;padding:20px 0;border-bottom:1px solid var(--line)"><span style="font-size:30px;font-weight:600">${n}</span><span style="flex:1;border-bottom:2px dotted var(--line);transform:translateY(-8px)"></span><span class="d" style="font-size:34px;letter-spacing:-.03em">${p}</span></div>`;
  s.push(slide(4, N, T, `
    <h2 class="d h2">Des tarifs clairs = <span class="it">moins d'hésitation.</span></h2>
    <div class="fill"><div class="card" style="padding:36px 44px">
      <div class="mono" style="font-size:18px;letter-spacing:.14em;color:var(--mut);margin-bottom:6px">EXEMPLE DE CARTE</div>
      ${price('Coupe & brushing', 'dès 65.-')}${price('Couleur', 'dès 85.-')}${price('Balayage', 'dès 140.-')}${price('Soin visage', '90.-')}${price('Massage 60 min', '110.-')}
      <div style="margin-top:26px;background:var(--ink);color:var(--lime);border-radius:999px;padding:22px;text-align:center;font-weight:700;font-size:26px">Choisir ce soin et réserver →</div>
    </div></div>
  `, { theme: 'cream' }));

  const step = (n, t, d, on) => `<div style="display:flex;gap:24px;align-items:center;padding:24px 28px;border-radius:24px;${on ? 'background:var(--lime);color:var(--ink)' : 'border:1px solid rgba(245,244,240,.14)'}"><span class="mono" style="font-size:22px;font-weight:700;width:44px">${n}</span><div><div style="font-size:30px;font-weight:700;letter-spacing:-.015em">${t}</div><div style="font-size:21px;opacity:.65">${d}</div></div></div>`;
  s.push(slide(5, N, T, `
    <h2 class="d h2">Ton Insta inspire. <span class="it lm">Ton site encaisse.</span></h2>
    <div class="fill" style="gap:12px">
      ${step('01', 'Elle voit ton reel', 'Avant/après d\'un balayage 😍')}
      ${step('02', 'Elle clique sur le lien en bio', 'Pas sur un Linktree perdu')}
      ${step('03', 'Elle choisit soin + créneau', 'En 30 secondes, depuis son téléphone')}
      ${step('04', 'RDV confirmé', 'Rappel automatique la veille', true)}
    </div>
  `, { theme: 'dark' }));

  s.push(cta(6, T, 'Ton agenda plein, <span class="it">sans décrocher.</span>', 'Site + réservation en ligne + rappels, <b>pour les salons et instituts.</b>', 'RDV', ['Réservation 24h/24', 'Rappels auto', 'Tarifs clairs', 'Dès CHF 1\'990']));
  return { slug: '08-beaute-bien-etre', theme: 'cream', n: N, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 09 — CHALETS, HÔTELS, LOCATIONS
// ════════════════════════════════════════════════════════════════
function c9() {
  const T = 'Chalets & hôtels';
  const s = [];
  s.push(slide(0, N, T, `
    <div class="k">Chalets · Hôtels · Locations de vacances</div>
    <h1 class="d h0">Sur 7 nuits réservées, <span class="it lm">tu en offres une.</span></h1>
    <div style="margin-top:56px;display:grid;grid-template-columns:repeat(7,1fr);gap:10px">${Array.from({ length: 7 }, (_, k) => `<div style="height:170px;border-radius:22px;${k === 6 ? 'background:repeating-linear-gradient(-45deg,rgba(255,90,60,.25) 0 12px,transparent 12px 24px);border:2px solid var(--red)' : 'background:#171717;border:1px solid rgba(245,244,240,.12)'};display:flex;flex-direction:column;justify-content:space-between;padding:16px"><span class="mono" style="font-size:18px;color:var(--mut)">N${k + 1}</span><span style="font-size:30px">${k === 6 ? '🎁' : '🌙'}</span></div>`).join('')}</div>
    <p class="lead" style="margin-top:44px">Avec ~15 % de commission sur les plateformes, <b>la 7e nuit part en frais.</b></p>
  `, { theme: 'dark' }));

  const line = (a, b, st = '') => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:22px 0;border-bottom:1px solid rgba(245,244,240,.1);${st}"><span style="font-size:30px">${a}</span><span class="d" style="font-size:44px;letter-spacing:-.03em">${b}</span></div>`;
  s.push(slide(1, N, T, `
    <h2 class="d h2">Faisons <span class="it lm">le calcul.</span></h2>
    <div class="fill"><div class="card" style="padding:40px 46px;background:#131313">
      <div class="mono" style="font-size:18px;letter-spacing:.14em;color:var(--mut)">EXEMPLE · SÉJOUR D'UNE SEMAINE</div>
      ${line('7 nuits × CHF 220', 'CHF 1\'540')}
      ${line('Commission plateforme ~15 %', '− CHF 231', 'color:var(--red)')}
      <div style="margin-top:30px;background:var(--lime);color:var(--ink);border-radius:24px;padding:30px 34px;display:flex;justify-content:space-between;align-items:center"><span style="font-size:30px;font-weight:700">En réservation directe</span><span class="d" style="font-size:56px;letter-spacing:-.04em">+ CHF 231</span></div>
    </div>
    <p class="lead" style="margin-top:36px;font-size:30px">Sur 20 séjours par an : <b>plus de CHF 4'600</b> qui restent chez toi.</p></div>
  `, { theme: 'dark' }));

  const inp = (l, v) => `<div style="flex:1;padding:20px 22px;border-radius:16px;border:1.5px solid #E2E2E2"><div class="mono" style="font-size:15px;letter-spacing:.12em;color:#888">${l}</div><div style="font-size:24px;font-weight:700;margin-top:6px">${v}</div></div>`;
  s.push(slide(2, N, T, `
    <h2 class="d h2">Ton propre moteur <span class="it lm">de réservation.</span></h2>
    <div class="fill"><div style="background:#fff;color:#0A0A0A;border-radius:30px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.5)">
      <div style="height:280px;background:linear-gradient(180deg,#9CC4E4 0%,#DCEAF4 55%,#F7F7F7 56%);position:relative">
        <svg viewBox="0 0 904 280" width="100%" height="280" preserveAspectRatio="none" style="position:absolute;inset:0"><path d="M0 200 L140 90 L240 160 L380 40 L500 150 L620 70 L760 170 L904 110 L904 280 L0 280Z" fill="#E9EEF2"/><path d="M380 40 L420 75 L400 72 L380 90 L360 72 L345 72Z" fill="#fff"/><path d="M0 230 L904 210 L904 280 L0 280Z" fill="#F7F7F7"/></svg>
        <div style="position:absolute;left:50%;bottom:30px;transform:translateX(-50%);width:200px;height:120px"><div style="position:absolute;bottom:0;left:20px;right:20px;height:76px;background:#7A4E2D;border-radius:4px"></div><div style="position:absolute;bottom:70px;left:0;right:0;height:0;border-left:100px solid transparent;border-right:100px solid transparent;border-bottom:56px solid #4A2F1B"></div><div style="position:absolute;bottom:18px;left:76px;width:46px;height:34px;background:#FFD27A;border-radius:3px"></div></div>
        <span style="position:absolute;left:28px;top:24px;background:rgba(255,255,255,.9);border-radius:999px;padding:10px 18px;font-weight:700;font-size:20px">Chalet Les Mélèzes · Nendaz</span>
      </div>
      <div style="padding:30px">
        <div style="display:flex;gap:12px">${inp('ARRIVÉE', 'Sam 20 déc.')}${inp('DÉPART', 'Sam 27 déc.')}${inp('VOYAGEURS', '6')}</div>
        <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:20px;color:#888">7 nuits · tout compris</div><div style="font-family:'Space Grotesk';font-weight:700;font-size:44px;letter-spacing:-.04em">CHF 1'540</div></div><span style="background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:22px 36px;font-weight:700;font-size:24px">Réserver en direct →</span></div>
        <div style="margin-top:14px;font-size:18px;color:#1E8E3E;font-weight:600">✓ Meilleur prix garanti en direct · Paiement sécurisé</div>
      </div>
    </div></div>
  `, { theme: 'dark' }));

  const flow = (n, t, d, on) => `<div style="flex:1;padding:30px;border-radius:26px;${on ? 'background:var(--lime);color:var(--ink)' : 'border:1px solid rgba(245,244,240,.14)'}"><div class="mono" style="font-size:18px;letter-spacing:.12em;opacity:.6">${n}</div><div class="d" style="font-size:38px;letter-spacing:-.03em;margin-top:14px">${t}</div><div style="font-size:22px;margin-top:10px;opacity:.7;line-height:1.35">${d}</div></div>`;
  s.push(slide(3, N, T, `
    <h2 class="d h2">Les plateformes pour être découvert. <span class="it lm">Ton site pour fidéliser.</span></h2>
    <div class="fill" style="gap:14px">
      <div style="display:flex;gap:14px">${flow('1ER SÉJOUR', 'Via plateforme', 'Ils te découvrent. Tu paies la commission.')}${flow('SUR PLACE', 'Carte + QR code', '« Revenez en direct : −10 % sur notre site »')}</div>
      <div>${flow('2E SÉJOUR ET SUIVANTS', 'En direct, sur ton site', '0 commission. Et tu as enfin leur e-mail pour les inviter la saison suivante.', true)}</div>
    </div>
  `, { theme: 'dark' }));

  const flag = (c, l, sub, on) => `<div style="padding:30px;border-radius:26px;${on ? 'background:var(--lime);color:var(--ink)' : 'background:#151515;border:1px solid rgba(245,244,240,.12)'}"><div class="d" style="font-size:64px;letter-spacing:-.04em">${c}</div><div style="font-size:26px;font-weight:600;margin-top:10px">${l}</div><div style="font-size:20px;opacity:.6;margin-top:4px">${sub}</div></div>`;
  s.push(slide(4, N, T, `
    <h2 class="d h2">Tes hôtes parlent <span class="it lm">4 langues.</span> Ton site aussi&nbsp;?</h2>
    <div class="fill"><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${flag('FR', 'Français', 'Romands & Français', true)}${flag('DE', 'Deutsch', 'Zurich, Berne, Allemagne')}${flag('EN', 'English', 'UK, Benelux, USA')}${flag('IT', 'Italiano', 'Tessin & Italie')}</div></div>
    <p class="lead" style="font-size:30px">Un visiteur qui lit dans sa langue <b>réserve en confiance.</b></p>
  `, { theme: 'dark' }));

  s.push(slide(5, N, T, `
    <div class="k">La checklist hébergement</div>
    <h2 class="d h2">Ce qui fait <span class="it lm">réserver en direct.</span></h2>
    <div class="fill" style="gap:38px">
      ${chk('Calendrier de disponibilités à jour', 'Synchronisé avec tes plateformes')}
      ${chk('Paiement en ligne sécurisé', 'Carte, TWINT, acompte')}
      ${chk('Photos plein écran, été comme hiver', 'Le chalet, la vue, les pistes')}
      ${chk('Avantage « réservation directe »', 'Prix, late check-out, bouteille offerte…')}
      ${chk('Site multilingue', 'FR · DE · EN (et plus)')}
    </div>
  `, { theme: 'dark' }));

  s.push(cta(6, T, 'Garde tes commissions <span class="it">pour toi.</span>', 'Site de réservation directe pour <b>chalets, hôtels et appartements de vacances.</b>', 'CHALET', ['Réservation directe', 'Multilingue', 'Paiement en ligne', 'Dès CHF 1\'990']));
  return { slug: '09-chalets-hotels', theme: 'dark', n: N, slides: s, deco: '' };
}

// ════════════════════════════════════════════════════════════════
// 10 — COMMERCES & BOUTIQUES
// ════════════════════════════════════════════════════════════════
function c10() {
  const T = 'Commerces';
  const s = [];
  s.push(slide(0, N, T, `
    <div class="k">Boutiques · Épiceries fines · Caves · Fleuristes</div>
    <h1 class="d h0">Ta boutique ferme à 18h30. <span class="it">Ton site, jamais.</span></h1>
    <div style="margin-top:56px;display:flex;gap:16px">
      <div style="flex:1;border-radius:26px;background:var(--ink);color:var(--paper);padding:30px"><div class="mono" style="font-size:18px;letter-spacing:.12em;color:rgba(245,244,240,.5)">BOUTIQUE</div><div class="d" style="font-size:52px;margin-top:12px;letter-spacing:-.04em">9h – 18h30</div><div style="margin-top:12px;display:inline-block;background:var(--red);color:#fff;border-radius:999px;padding:8px 16px;font-weight:700;font-size:19px">FERMÉ</div></div>
      <div style="flex:1;border-radius:26px;background:var(--lime);color:var(--ink);padding:30px"><div class="mono" style="font-size:18px;letter-spacing:.12em;opacity:.6">TON SITE</div><div class="d" style="font-size:52px;margin-top:12px;letter-spacing:-.04em">24h / 24</div><div style="margin-top:12px;display:inline-block;background:var(--ink);color:var(--lime);border-radius:999px;padding:8px 16px;font-weight:700;font-size:19px">OUVERT</div></div>
    </div>
  `, { theme: 'cream' }));

  s.push(slide(1, N, T, `
    <h2 class="d h2">Avant de passer la porte, <span class="it">ils regardent en ligne.</span></h2>
    <div class="fill"><div style="background:#fff;border-radius:28px;box-shadow:0 30px 80px rgba(0,0,0,.12);overflow:hidden;color:#202124">
      <div style="padding:22px 30px;border-bottom:1px solid #eee;display:flex;gap:14px;align-items:center;font-size:24px;color:#5F6368"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg>fromagerie sion <b style="color:#202124">ouvert samedi</b></div>
      ${['« Vous avez de la tomme de Bagnes ? »', '« Vous êtes ouverts samedi ? »', '« On peut commander un plateau raclette ? »', '« Vous faites des bons cadeaux ? »'].map((q, k) => `<div style="padding:24px 30px;border-bottom:1px solid #f0f0f0;display:flex;justify-content:space-between;align-items:center"><span style="font-size:27px;font-family:'Instrument Serif';font-style:italic">${q}</span><span class="mono" style="font-size:17px;color:${k % 2 ? '#1E8E3E' : '#1A73E8'};font-weight:700">${['STOCK', 'HORAIRES', 'COMMANDE', 'CADEAU'][k]}</span></div>`).join('')}
    </div></div>
    <p class="lead" style="font-size:30px">Si ton site répond, <b>ils viennent.</b> Sinon, ils vont là où ils ont la réponse.</p>
  `, { theme: 'cream' }));

  const prod = (n, p, badge, c) => `<div style="background:#fff;border-radius:22px;overflow:hidden;color:#0A0A0A"><div style="height:180px;background:${c};position:relative">${badge ? `<span style="position:absolute;left:12px;top:12px;background:${badge[1]};color:${badge[2]};border-radius:999px;padding:6px 12px;font-size:15px;font-weight:700">${badge[0]}</span>` : ''}</div><div style="padding:16px 18px"><div style="font-size:21px;font-weight:700">${n}</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px"><span style="font-family:'Space Grotesk';font-weight:700;font-size:26px">${p}</span><span style="width:40px;height:40px;border-radius:50%;background:#0A0A0A;color:#B3FF47;display:grid;place-items:center;font-size:24px;font-weight:700">+</span></div></div></div>`;
  s.push(slide(2, N, T, `
    <h2 class="d h2">Ton stock, <span class="it lm">en vitrine 24h/24.</span></h2>
    <div class="fill"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
      ${prod('Plateau raclette', '34.-', ['Best-seller', '#B3FF47', '#0A0A0A'], 'linear-gradient(135deg,#F3D58A,#D9A441)')}
      ${prod('Petite Arvine 75cl', '29.-', ['Plus que 2', '#FF5A3C', '#fff'], 'linear-gradient(135deg,#E9E2B8,#BFAF6A)')}
      ${prod('Viande séchée 200g', '24.-', null, 'linear-gradient(135deg,#B5574B,#6E2A22)')}
      ${prod('Panier découverte', '79.-', ['Nouveau', '#0A0A0A', '#B3FF47'], 'linear-gradient(135deg,#C9B38E,#8B6B43)')}
      ${prod('Tomme de Bagnes', '18.-', null, 'linear-gradient(135deg,#F4E6C4,#D8BE83)')}
      ${prod('Abricotine 50cl', '42.-', null, 'linear-gradient(135deg,#F7B267,#E07A2E)')}
    </div></div>
  `, { theme: 'dark' }));

  s.push(slide(3, N, T, `
    <h2 class="d h2">Commande le soir. <span class="it lm">Retrait le matin.</span></h2>
    <div class="fill"><div style="background:#fff;color:#0A0A0A;border-radius:30px;padding:36px 40px;box-shadow:0 40px 90px rgba(0,0,0,.5)">
      <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-family:'Space Grotesk';font-weight:700;font-size:36px;letter-spacing:-.03em">Ton panier</span><span class="mono" style="font-size:17px;color:#888;letter-spacing:.1em">3 ARTICLES</span></div>
      ${[['Plateau raclette (4 pers.)', '34.-'], ['Petite Arvine 75cl', '29.-'], ['Tomme de Bagnes', '18.-']].map(([a, b]) => `<div style="display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid #eee;font-size:23px"><span>${a}</span><b>${b}</b></div>`).join('')}
      <div style="margin-top:20px;display:flex;gap:10px">${['Retrait en boutique', 'Livraison'].map((t, k) => `<span style="flex:1;text-align:center;padding:18px;border-radius:16px;font-weight:700;font-size:20px;${k ? 'border:1.5px solid #ddd;color:#888' : 'background:#0A0A0A;color:#B3FF47'}">${t}</span>`).join('')}</div>
      <div style="margin-top:12px;padding:18px 20px;border-radius:16px;background:#F3F3F1;font-size:21px">📍 Samedi · <b>créneau 9h – 10h</b></div>
      <div style="margin-top:18px;display:flex;gap:10px;align-items:center"><span style="font-size:19px;color:#888">Payer avec</span>${['TWINT', 'Visa', 'Mastercard'].map(t => `<span style="border:1.5px solid #ddd;border-radius:10px;padding:8px 14px;font-weight:800;font-size:17px">${t}</span>`).join('')}<span style="margin-left:auto;font-family:'Space Grotesk';font-weight:700;font-size:38px">81.-</span></div>
    </div></div>
  `, { theme: 'dark' }));

  s.push(slide(4, N, T, `
    <h2 class="d h2">Décembre, ton meilleur mois. <span class="it">Les bons cadeaux aussi.</span></h2>
    <div class="fill" style="align-items:center"><div style="width:760px;height:430px;border-radius:32px;background:var(--ink);color:var(--paper);padding:44px;position:relative;overflow:hidden;transform:rotate(-3deg);box-shadow:0 40px 90px rgba(0,0,0,.25)">
      <div style="position:absolute;right:-80px;top:-80px;width:340px;height:340px;border-radius:50%;background:var(--lime);opacity:.9"></div>
      <div class="mono" style="font-size:20px;letter-spacing:.16em;color:rgba(245,244,240,.55);position:relative">BON CADEAU</div>
      <div class="d" style="font-size:150px;letter-spacing:-.06em;margin-top:30px;position:relative">CHF 50</div>
      <div style="position:absolute;left:44px;bottom:40px;font-size:24px;color:rgba(245,244,240,.7)">Valable 2 ans · en boutique et en ligne</div>
      <div class="mono" style="position:absolute;right:44px;bottom:40px;font-size:19px;letter-spacing:.1em;color:var(--lime)">N° 0042-WA</div>
    </div></div>
    <p class="lead" style="font-size:30px">Acheté en 1 minute, envoyé par e-mail. <b>Le cadeau de dernière minute parfait.</b></p>
  `, { theme: 'cream' }));

  s.push(slide(5, N, T, `
    <div class="k">La checklist commerce</div>
    <h2 class="d h2">Ta boutique, <span class="it">aussi en ligne.</span></h2>
    <div class="fill" style="gap:38px">
      ${chk('Horaires et plan toujours à jour', 'Jours fériés compris')}
      ${chk('Tes produits phares en ligne', 'Avec le stock réel')}
      ${chk('Click & collect ou livraison', 'Tu choisis ce que tu proposes')}
      ${chk('Paiement TWINT et carte', 'Simple, comme les clients suisses aiment')}
      ${chk('Bons cadeaux en ligne', 'Ventes même quand tu es fermé')}
    </div>
  `, { theme: 'cream' }));

  s.push(cta(6, T, 'Vends aussi <span class="it">quand tu dors.</span>', 'Boutique en ligne simple, TWINT, click & collect : <b>pensé pour les commerces locaux.</b>', 'BOUTIQUE', ['E-shop', 'Click & collect', 'TWINT', 'Bons cadeaux']));
  return { slug: '10-commerces-boutiques', theme: 'cream', n: N, slides: s, deco: '' };
}

render([c6(), c7(), c8(), c9(), c10()], path.join(__dirname, 'serie2'), process.argv[2]);

// WebAlp — 5 Reels 9:16 (1080x1920, 30 fps). GSAP timeline seeked frame by frame → ffmpeg.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const { CSS, ck, xx, arrow, stars } = require('./common.js');

const RW = 1080, RH = 1920, FPS = 30;
const ROOT = __dirname;
const GSAP = fs.readFileSync(path.join(ROOT, 'reels/node_modules/gsap/dist/gsap.min.js'), 'utf8');
const TEXTP = fs.readFileSync(path.join(ROOT, 'reels/node_modules/gsap/dist/TextPlugin.min.js'), 'utf8');

const words = (str, cls = '') => str.split(' ').map(w => `<span class="w"><span class="${cls}">${w}</span></span>`).join(' ');

const RCSS = `
body{width:${RW}px;height:${RH}px;overflow:hidden;background:#0A0A0A;color:#F5F4F0}
#stage{position:absolute;inset:0;overflow:hidden}
.sc{position:absolute;inset:0;visibility:hidden;display:flex;flex-direction:column;justify-content:center;padding:280px 90px 420px}
.w{display:inline-block;overflow:hidden;vertical-align:top;padding:0 .02em .1em;margin-bottom:-.1em}
.w>span{display:inline-block}
.big{font-size:168px}.mid{font-size:124px}
.blob{position:absolute;border-radius:50%;filter:blur(120px);background:#B3FF47;opacity:.16}
#wipe{position:absolute;inset:0;background:#B3FF47;transform:scaleY(0);transform-origin:bottom;z-index:40}
.tap{position:absolute;width:120px;height:120px;border-radius:50%;border:6px solid #B3FF47;transform:translate(-50%,-50%) scale(0);opacity:0;z-index:30}
.chip{display:inline-flex;align-items:center;gap:12px;padding:16px 26px;border-radius:999px;border:1.5px solid rgba(245,244,240,.2);font-size:28px;font-weight:600}
.notif{display:flex;gap:22px;align-items:center;background:rgba(245,244,240,.08);border:1px solid rgba(245,244,240,.14);border-radius:32px;padding:26px 30px}
.notif .ic{width:72px;height:72px;border-radius:18px;background:#B3FF47;color:#0A0A0A;display:grid;place-items:center;font-family:'Space Grotesk';font-weight:700;font-size:34px;flex:none}
.notif .t1{font-size:22px;color:rgba(245,244,240,.5);display:flex;justify-content:space-between;width:100%}
.notif .t2{font-size:31px;font-weight:600;margin-top:4px}
.endlogo{font-family:'Space Grotesk';font-weight:700;font-size:120px;letter-spacing:-.05em;display:flex;align-items:baseline}
.endlogo i{display:inline-block;width:26px;height:26px;background:#B3FF47;margin-left:8px}
.ctabox{background:#B3FF47;color:#0A0A0A;border-radius:36px;padding:40px 46px}
.ctabox .d{font-size:100px;letter-spacing:-.05em}
.phone{width:560px;height:1120px;border-radius:84px;background:#0A0A0A;padding:18px;border:2px solid rgba(255,255,255,.12);box-shadow:0 60px 140px rgba(0,0,0,.6);position:relative}
.phone>.scr{width:100%;height:100%;border-radius:68px;background:#fff;overflow:hidden;position:relative;color:#0A0A0A}
.phone>.scr::before{content:'';position:absolute;top:18px;left:50%;transform:translateX(-50%);width:150px;height:42px;border-radius:21px;background:#0A0A0A;z-index:9}
`;

const endCard = (id, line1, line2, keyword, chips) => `
<div class="sc" id="${id}" style="justify-content:center">
  <div class="endlogo">Web<span class="lm">Alp</span><i></i></div>
  <div class="mono e1" style="font-size:24px;letter-spacing:.16em;color:rgba(245,244,240,.5);margin-top:14px">CRÉATION DE SITES WEB · SION, VALAIS</div>
  <div class="d e2" style="font-size:96px;margin-top:70px">${line1}<br><span class="it lm">${line2}</span></div>
  <div class="e3" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:44px">${chips.map(c => `<span class="chip">${ck(22)} ${c}</span>`).join('')}</div>
  <div class="ctabox e4" style="margin-top:56px"><div class="mono" style="font-size:22px;letter-spacing:.14em;opacity:.6">💬 COMMENTE</div><div class="d" style="margin-top:10px">« ${keyword} »</div><div style="font-size:28px;margin-top:8px;font-weight:500">ou écris-nous sur webalp.ch</div></div>
</div>`;
const endJS = (id, t) => `
  show('#${id}', ${t});
  tl.from('#${id} .endlogo', {y:60, opacity:0, duration:.6, ease:'power4.out'}, ${t});
  tl.from('#${id} .e1', {opacity:0, duration:.4}, ${t + .2});
  tl.from('#${id} .e2', {y:80, opacity:0, duration:.7, ease:'power4.out'}, ${t + .3});
  tl.from('#${id} .chip', {scale:.6, opacity:0, duration:.4, stagger:.08, ease:'back.out(2)'}, ${t + .6});
  tl.from('#${id} .e4', {y:120, opacity:0, duration:.7, ease:'power4.out'}, ${t + .9});
  tl.to('#${id} .e4', {scale:1.04, duration:.35, yoyo:true, repeat:3, ease:'sine.inOut'}, ${t + 1.8});
`;
const phone = (inner, id = '') => `<div class="phone" ${id ? `id="${id}"` : ''}><div class="scr">${inner}</div></div>`;
const gsearch = (id) => `<div style="display:flex;align-items:center;gap:22px;background:#fff;color:#0A0A0A;border-radius:999px;padding:34px 44px;box-shadow:0 30px 90px rgba(179,255,71,.2)"><svg width="40" height="40" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#0A0A0A" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#0A0A0A" stroke-width="2.4" stroke-linecap="round"/></svg><span id="${id}" style="font-size:44px;font-weight:500"></span><span class="caret" style="width:4px;height:50px;background:#0A0A0A"></span></div>`;

// ═══════════════════════════ R1 RESTAURANT ═══════════════════════════
function r1() {
  const dish = (n, d, p) => `<div class="dish" style="display:flex;justify-content:space-between;padding:20px 0;border-bottom:1px solid #eee"><div><div style="font-size:28px;font-weight:700">${n}</div><div style="font-size:20px;color:#888;margin-top:2px">${d}</div></div><div style="font-size:26px;font-weight:700">${p}</div></div>`;
  const site = `<div style="padding:90px 34px 0"><div style="font-family:'Space Grotesk';font-weight:700;font-size:54px;letter-spacing:-.04em;line-height:.95">La Pinte<br>du Bourg</div><div style="display:flex;align-items:center;gap:8px;margin-top:14px;font-size:22px;font-weight:600">${stars(5, 22)} 4,8 · Sion</div>
    <div style="display:flex;gap:8px;margin:24px 0 8px">${['Plats', 'Fromages', 'Vins'].map((t, k) => `<span style="font-size:20px;font-weight:700;padding:10px 18px;border-radius:999px;${k ? 'background:#F1F1F1' : 'background:#0A0A0A;color:#B3FF47'}">${t}</span>`).join('')}</div>
    ${dish('Rösti maison', 'Œuf, lard, fromage', '24.-')}${dish('Fondue moitié-moitié', 'Gruyère & vacherin', '28.-')}${dish('Raclette AOP', 'À volonté', '39.-')}${dish('Tarte aux abricots', 'Du Valais', '9.-')}
    <div id="r1btn" style="margin-top:28px;background:#0A0A0A;color:#B3FF47;text-align:center;border-radius:999px;padding:28px;font-weight:700;font-size:28px">Réserver une table →</div></div>`;
  const res = (n, m, faded) => `<div class="res" style="padding:30px 36px;border-top:1px solid #EAEAEA;${faded ? 'background:#FFF4F2' : ''}"><div style="font-size:36px;font-weight:600;color:${faded ? '#999' : '#1A0DAB'}">${n}</div><div style="font-size:24px;color:#70757A;margin-top:6px">${m}</div></div>`;
  const notif = (t, a, b) => `<div class="notif"><div class="ic">W</div><div style="flex:1"><div class="t1"><span>TON SITE</span><span>${t}</span></div><div class="t2">${a}</div><div style="font-size:24px;color:rgba(245,244,240,.6)">${b}</div></div></div>`;
  const html = `
  <div class="sc" id="a"><div class="k">POV</div><h1 class="d big">${words('Tu fais le meilleur')} ${words('rösti de Sion.', 'it lm')}</h1></div>
  <div class="sc" id="b"><h2 class="d mid" style="margin-bottom:80px">${words('Mais sur Google…')}</h2>${gsearch('q1')}</div>
  <div class="sc" id="c"><div id="serp" style="background:#fff;color:#202124;border-radius:34px;overflow:hidden">
      <div style="padding:26px 36px;background:#F8F9FA;font-size:28px;color:#5F6368">🔍 restaurant sion</div>
      ${res('Chez Mario', '★ 4,6 · Italien · Réserver')}${res('Le Carnotset', '★ 4,7 · Suisse · Menu · Réserver')}${res('Ton restaurant', 'Aucun site · aucun menu')}
    </div>
    <div id="introuv" style="margin-top:44px;align-self:flex-start;background:#FF5A3C;color:#fff;border-radius:999px;padding:20px 36px;font-family:'JetBrains Mono';font-weight:700;font-size:30px;letter-spacing:.1em">✕ INTROUVABLE</div>
  </div>
  <div class="sc" id="d" style="align-items:center;padding-top:200px;padding-bottom:300px"><div class="mono" style="font-size:28px;letter-spacing:.16em;color:#B3FF47;margin-bottom:30px">AVEC UN VRAI SITE ↓</div>${phone(site, 'ph1')}<div class="tap" id="tap1" style="left:540px;top:1365px"></div></div>
  <div class="sc" id="e"><h2 class="d mid" style="margin-bottom:60px">${words('Vendredi soir…')}</h2><div id="nots" style="display:flex;flex-direction:column;gap:18px">
      ${notif('18:02', 'Nouvelle réservation', '4 pers. · Ven 19:30')}${notif('18:15', 'Nouvelle réservation', '2 pers. · Ven 20:00')}${notif('18:31', 'Nouvelle réservation', '6 pers. · Ven 20:30')}${notif('18:47', 'Nouvelle réservation', '3 pers. · Ven 21:00')}</div>
    <div id="complet" style="position:absolute;left:50%;top:1240px;transform:translateX(-50%) rotate(-8deg);border:10px solid #B3FF47;color:#B3FF47;border-radius:24px;padding:20px 50px;font-family:'Space Grotesk';font-weight:700;font-size:130px;letter-spacing:-.04em;background:rgba(10,10,10,.85)">COMPLET</div>
  </div>
  ${endCard('z', 'Ton resto,', 'plein.', 'RESTO', ['Menu mobile', 'Réservation en ligne', 'FR/DE/EN', 'Dès CHF 690'])}`;
  const js = `
  show('#a',0); words('#a',.15); tl.from('#a .k',{opacity:0,duration:.3},0);
  hide('#a',2.3);
  show('#b',2.35); words('#b',2.4); tl.from('#b > div',{y:60,opacity:0,duration:.5,ease:'power3.out'},2.7);
  tl.to('#q1',{text:'restaurant sion',duration:1.1,ease:'none'},3.0);
  tl.to('.caret',{opacity:0,duration:.01,repeat:9,yoyo:true,repeatDelay:.2},2.7);
  hide('#b',4.6);
  show('#c',4.65); tl.from('#serp',{y:200,opacity:0,duration:.6,ease:'power4.out'},4.65);
  tl.from('#serp .res',{x:-60,opacity:0,stagger:.15,duration:.4},4.9);
  tl.to('#serp .res:last-child',{x:-14,duration:.06,repeat:7,yoyo:true},5.7);
  tl.from('#introuv',{scale:2.2,opacity:0,duration:.35,ease:'back.out(2)'},5.9);
  wipe(7.0);
  hide('#c',7.3); show('#d',7.3);
  tl.from('#ph1',{y:900,rotate:6,duration:.8,ease:'power4.out'},7.35);
  tl.from('#ph1 .dish',{x:80,opacity:0,stagger:.12,duration:.4},8.0);
  tl.to('#r1btn',{scale:1.06,duration:.3,yoyo:true,repeat:3,ease:'sine.inOut'},8.9);
  tl.to('#tap1',{scale:1.6,opacity:1,duration:.01},10.1); tl.to('#tap1',{scale:3,opacity:0,duration:.5},10.11);
  tl.to('#r1btn',{scale:.94,duration:.08,yoyo:true,repeat:1},10.1);
  hide('#d',10.7);
  show('#e',10.75); words('#e',10.8);
  tl.from('#nots .notif',{y:-80,opacity:0,stagger:.35,duration:.4,ease:'back.out(1.6)'},11.1);
  tl.from('#complet',{scale:3,opacity:0,duration:.35,ease:'back.out(1.8)'},12.8);
  tl.to('#stage',{x:12,duration:.05,yoyo:true,repeat:5},13.1);
  hide('#e',14.3);
  ${endJS('z', 14.35)}
  `;
  return { tag: 'RESTAURANTS', slug: 'reel-01-restaurant', dur: 18.5, html, js, cover: 1.6 };
}

// ═══════════════════════════ R2 ARTISAN ═══════════════════════════
function r2() {
  const field = (l, v, id) => `<div class="fld"><div class="mono" style="font-size:20px;letter-spacing:.12em;color:#888">${l}</div><div style="margin-top:8px;padding:22px 24px;border-radius:16px;background:#F3F3F1;font-size:30px;font-weight:600;min-height:80px"><span id="${id}"></span></div></div>`;
  const html = `
  <div class="sc" id="a" style="align-items:flex-start">
    <div id="cnt" class="d" style="font-size:620px;line-height:.8;letter-spacing:-.08em;color:#B3FF47">3</div>
    <h2 class="d" style="font-size:84px;margin-top:40px">${words('secondes. C\'est le temps qu\'un client te donne.')}</h2>
  </div>
  <div class="sc" id="b">
    <div class="mono" style="font-size:26px;letter-spacing:.16em;color:rgba(245,244,240,.5);margin-bottom:26px">TON SITE ACTUEL</div>
    <div id="old" style="background:#fff;color:#333;border-radius:20px;overflow:hidden;font-family:Georgia,serif">
      <div style="background:#2B4C7E;color:#fff;padding:20px 26px;font-size:30px">Dupont Menuiserie Sàrl — Bienvenue !!</div>
      <div style="padding:40px;height:520px;display:grid;place-items:center;background:repeating-linear-gradient(45deg,#f2f2f2 0 20px,#e9e9e9 20px 40px)"><div style="text-align:center"><div id="spin" style="width:110px;height:110px;border-radius:50%;border:12px solid #ddd;border-top-color:#2B4C7E;margin:0 auto"></div><div style="margin-top:26px;font-size:30px;color:#777">Chargement…</div></div></div>
    </div>
    <div style="margin-top:36px;height:24px;border-radius:12px;background:rgba(245,244,240,.1);overflow:hidden"><div id="bar" style="height:100%;width:0%;background:#FF5A3C"></div></div>
    <div id="gone" class="d" style="font-size:96px;margin-top:60px;color:#FF5A3C">Il est parti. 👋</div>
  </div>
  <div class="sc" id="c">
    <h2 class="d mid" style="margin-bottom:56px">${words('Montre ton travail.', 'it lm')}</h2>
    <div id="ba" style="position:relative;height:900px;border-radius:40px;overflow:hidden">
      <div style="position:absolute;inset:0;background:linear-gradient(160deg,#6E6A62,#3F3B35)"><div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 140px,rgba(0,0,0,.2) 140px 145px),repeating-linear-gradient(0deg,transparent 0 70px,rgba(0,0,0,.14) 70px 74px)"></div></div>
      <div id="after" style="position:absolute;inset:0;clip-path:inset(0 0 0 100%);background:linear-gradient(160deg,#EADDC7,#B98F5E)"><div style="position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 170px,rgba(120,80,40,.18) 170px 174px)"></div><div style="position:absolute;right:90px;top:170px;width:300px;height:420px;border-radius:14px;background:linear-gradient(180deg,#CFE3EE,#8FB3C6);box-shadow:inset 0 0 0 14px #F4ECE0"></div></div>
      <div id="handle" style="position:absolute;left:100%;top:0;bottom:0;width:8px;background:#fff;transform:translateX(-4px)"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:110px;height:110px;border-radius:50%;background:#fff;color:#0A0A0A;display:grid;place-items:center;font-size:40px;font-weight:700">⟷</div></div>
      <span class="mono" style="position:absolute;left:30px;top:30px;background:rgba(0,0,0,.6);color:#fff;padding:12px 22px;border-radius:999px;font-size:24px;letter-spacing:.12em">AVANT</span>
      <span class="mono" id="aplab" style="position:absolute;right:30px;top:30px;background:#B3FF47;color:#0A0A0A;padding:12px 22px;border-radius:999px;font-size:24px;letter-spacing:.12em;font-weight:700">APRÈS</span>
    </div>
  </div>
  <div class="sc" id="d">
    <h2 class="d mid" style="margin-bottom:50px">${words('Et reçois des devis')} ${words('complets.', 'it lm')}</h2>
    <div id="form" style="background:#fff;color:#0A0A0A;border-radius:36px;padding:44px;display:flex;flex-direction:column;gap:22px">
      ${field('TYPE DE TRAVAUX', '', 'f1')}${field('COMMUNE', '', 'f2')}${field('DÉLAI', '', 'f3')}
      <div id="send" style="background:#0A0A0A;color:#B3FF47;text-align:center;border-radius:999px;padding:28px;font-weight:700;font-size:32px">Envoyer ma demande →</div>
    </div>
    <div id="recv" class="notif" style="margin-top:30px"><div class="ic">✓</div><div style="flex:1"><div class="t1"><span>TON SITE</span><span>maintenant</span></div><div class="t2">Demande de devis reçue</div></div></div>
  </div>
  ${endCard('z', 'Ton savoir-faire,', 'enfin visible.', 'CHANTIER', ['Avant / après', 'Formulaire de devis', 'SEO local', 'Dès CHF 690'])}`;
  const js = `
  show('#a',0); tl.from('#cnt',{scale:.4,opacity:0,duration:.4,ease:'back.out(2)'},0); words('#a',.3);
  tl.set('#cnt',{text:'2'},.9); tl.from('#cnt',{scale:1.3,duration:.25,immediateRender:false},.9);
  tl.set('#cnt',{text:'1'},1.6); tl.from('#cnt',{scale:1.3,duration:.25,immediateRender:false},1.6);
  hide('#a',2.5);
  show('#b',2.55); tl.from('#old',{y:120,opacity:0,duration:.5,ease:'power3.out'},2.55);
  tl.to('#spin',{rotate:1440,duration:3,ease:'none'},2.6);
  tl.to('#bar',{width:'34%',duration:2.2,ease:'power1.out'},2.7);
  tl.from('#gone',{x:-200,opacity:0,duration:.4,ease:'power4.out'},4.4);
  wipe(5.2);
  hide('#b',5.5); show('#c',5.5); words('#c',5.55);
  tl.from('#ba',{y:200,opacity:0,duration:.6,ease:'power4.out'},5.6);
  tl.to('#after',{clipPath:'inset(0 0 0 0%)',duration:1.8,ease:'power2.inOut'},6.4);
  tl.to('#handle',{left:'0%',duration:1.8,ease:'power2.inOut'},6.4);
  tl.to('#handle',{left:'48%',duration:.7,ease:'power2.out'},8.3); tl.to('#after',{clipPath:'inset(0 0 0 48%)',duration:.7,ease:'power2.out'},8.3);
  hide('#c',9.4);
  show('#d',9.45); words('#d',9.5); tl.from('#form',{y:150,opacity:0,duration:.5,ease:'power3.out'},9.6);
  tl.to('#f1',{text:'Rénovation salle de bain',duration:.8,ease:'none'},10.0);
  tl.to('#f2',{text:'Savièse',duration:.4,ease:'none'},10.9);
  tl.to('#f3',{text:'Avant l\\'été',duration:.4,ease:'none'},11.4);
  tl.to('#send',{scale:.94,duration:.08,yoyo:true,repeat:1},12.0);
  tl.from('#recv',{y:-60,opacity:0,duration:.4,ease:'back.out(1.6)'},12.2);
  hide('#d',13.4);
  ${endJS('z', 13.45)}
  `;
  return { tag: 'ARTISANS', slug: 'reel-02-artisans', dur: 17.6, html, js, cover: 1.3 };
}

// ═══════════════════════════ R3 BEAUTÉ ═══════════════════════════
function r3() {
  const cells = ['Coupe + brushing', 'Couleur', 'Balayage', 'Soin visage', 'Coupe homme', 'Manucure', 'Massage 60′', 'Coupe enfant', 'Brushing', 'Mariage – essai', 'Couleur', 'Coupe + brushing'];
  const html = `
  <div class="sc" id="a" style="align-items:center;text-align:center">
    <div id="call" style="width:220px;height:220px;border-radius:50%;background:#34C759;display:grid;place-items:center;font-size:110px;box-shadow:0 0 0 30px rgba(52,199,89,.15),0 0 0 60px rgba(52,199,89,.07)">📞</div>
    <h1 class="d mid" style="margin-top:90px">${words('Ton téléphone sonne…')}</h1>
    <div class="it lm" id="a2" style="font-size:100px;margin-top:20px">t'es en pleine couleur.</div>
  </div>
  <div class="sc" id="b">
    <div style="background:#fff;color:#0A0A0A;border-radius:40px;overflow:hidden">
      <div style="padding:34px 40px;display:flex;justify-content:space-between;align-items:center;background:#FAFAFA"><span style="font-size:44px;font-weight:700">Récents</span><span id="badge" style="background:#FF3B30;color:#fff;border-radius:999px;padding:8px 26px;font-weight:800;font-size:40px">0</span></div>
      ${['079 •• •• 12', '078 •• •• 87', 'Inconnu', '076 •• •• 33', '079 •• •• 05', '078 •• •• 41', '077 •• •• 90'].map((n, k) => `<div class="mc" style="display:flex;justify-content:space-between;padding:26px 40px;border-top:1px solid #eee"><span style="font-size:34px;font-weight:600;color:#FF3B30">↙ ${n}</span><span style="font-size:28px;color:#999">${['09:14', '10:02', '11:47', '13:20', '14:58', '16:10', '17:35'][k]}</span></div>`).join('')}
    </div>
    <div class="d" id="b2" style="font-size:84px;margin-top:56px">7 appels manqués. <span class="it" style="color:#FF5A3C">7 clientes ailleurs ?</span></div>
  </div>
  <div class="sc" id="c">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px"><h2 class="d" style="font-size:96px">${words('Elles réservent')} ${words('seules.', 'it lm')}</h2><div id="clock" class="mono" style="font-size:44px;font-weight:700;color:#B3FF47">21:00</div></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${cells.map(c => `<div class="slot" style="height:160px;border-radius:24px;border:2px dashed rgba(245,244,240,.14);position:relative;overflow:hidden"><div class="fillc" style="position:absolute;inset:0;background:#B3FF47;color:#0A0A0A;padding:20px;font-size:27px;font-weight:700;line-height:1.15;display:flex;align-items:flex-end">${c}</div></div>`).join('')}</div>
    <div class="mono" style="font-size:26px;letter-spacing:.14em;color:rgba(245,244,240,.5);margin-top:30px">RÉSERVATIONS EN LIGNE · CE SOIR</div>
  </div>
  <div class="sc" id="d">
    <h2 class="d mid" style="margin-bottom:60px">${words('Et le rappel part')} ${words('tout seul.', 'it lm')}</h2>
    <div id="bub" style="align-self:flex-start;max-width:860px;background:#E9E9EB;color:#0A0A0A;border-radius:40px 40px 40px 10px;padding:34px 38px;font-size:36px;line-height:1.35">Bonjour Léa 👋 Rappel : ton RDV <b>demain à 14h00</b> (couleur + brushing).</div>
    <div id="btns" style="display:flex;gap:14px;margin-top:20px"><span id="conf" style="background:#B3FF47;color:#0A0A0A;border-radius:999px;padding:24px 40px;font-weight:700;font-size:32px">✓ Je confirme</span><span style="border:2px solid rgba(245,244,240,.4);border-radius:999px;padding:24px 40px;font-weight:700;font-size:32px">Déplacer</span></div>
    <div id="rep" style="align-self:flex-end;margin-top:36px;background:#0A84FF;color:#fff;border-radius:40px 40px 10px 40px;padding:30px 38px;font-size:36px">Confirmé, à demain ! 🙏</div>
  </div>
  ${endCard('z', 'Ton agenda plein,', 'sans décrocher.', 'RDV', ['Réservation 24/7', 'Rappels auto', 'Tarifs clairs', 'Paiement en ligne'])}`;
  const js = `
  show('#a',0); tl.from('#call',{scale:0,duration:.4,ease:'back.out(2)'},0);
  tl.to('#call',{rotate:14,duration:.06,yoyo:true,repeat:23,ease:'none'},.4);
  words('#a',.3); tl.from('#a2',{y:60,opacity:0,duration:.5,ease:'power3.out'},1.2);
  hide('#a',2.6);
  show('#b',2.65); tl.from('#b > div:first-child',{y:150,opacity:0,duration:.5,ease:'power3.out'},2.65);
  tl.from('#b .mc',{x:-80,opacity:0,stagger:.22,duration:.3},2.9);
  ${[1, 2, 3, 4, 5, 6, 7].map(k => `tl.set('#badge',{text:'${k}'},${(2.9 + (k - 1) * .22 + .15).toFixed(2)}); tl.from('#badge',{scale:1.5,duration:.15,immediateRender:false},${(2.9 + (k - 1) * .22 + .15).toFixed(2)});`).join('\n  ')}
  tl.from('#b2',{y:80,opacity:0,duration:.5,ease:'power4.out'},4.6);
  wipe(5.7);
  hide('#b',6.0); show('#c',6.0); words('#c',6.05);
  tl.from('#c .fillc',{yPercent:100,stagger:{each:.2,from:'random'},duration:.3,ease:'power3.out'},6.6);
  tl.to({v:0},{v:150,duration:2.6,ease:'none',onUpdate:function(){const m=Math.round(this.targets()[0].v);const h=21+Math.floor(m/60);document.getElementById('clock').textContent=String(h).padStart(2,'0')+':'+String(m%60).padStart(2,'0')}},6.6);
  hide('#c',9.8);
  show('#d',9.85); words('#d',9.9);
  tl.from('#bub',{scale:.6,opacity:0,transformOrigin:'0% 100%',duration:.4,ease:'back.out(1.6)'},10.3);
  tl.from('#btns',{y:30,opacity:0,duration:.3},10.8);
  tl.to('#conf',{scale:.92,duration:.08,yoyo:true,repeat:1},11.6);
  tl.from('#rep',{scale:.6,opacity:0,transformOrigin:'100% 100%',duration:.4,ease:'back.out(1.6)'},11.9);
  hide('#d',13.2);
  ${endJS('z', 13.25)}
  `;
  return { tag: 'BEAUTÉ', slug: 'reel-03-beaute', dur: 17.4, html, js, cover: 1.8 };
}

// ═══════════════════════════ R4 CHALETS ═══════════════════════════
function r4() {
  const html = `
  <div class="sc" id="a">
    <h1 class="d" style="font-size:120px">${words('Sur 7 nuits,')} ${words('tu en offres une.', 'it lm')}</h1>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:12px;margin-top:80px">${Array.from({ length: 7 }, (_, k) => `<div class="nt${k === 6 ? ' n7' : ''}" style="height:220px;border-radius:24px;background:#171717;border:1px solid rgba(245,244,240,.14);display:flex;flex-direction:column;justify-content:space-between;padding:16px;position:relative;overflow:hidden"><span class="mono" style="font-size:22px;color:rgba(245,244,240,.5)">N${k + 1}</span><span style="font-size:44px">🌙</span>${k === 6 ? '<div id="gift" style="position:absolute;inset:0;background:#FF5A3C;display:grid;place-items:center;font-size:70px">🎁</div>' : ''}</div>`).join('')}</div>
    <div class="mono" id="a3" style="font-size:28px;letter-spacing:.12em;color:rgba(245,244,240,.55);margin-top:40px">~15 % DE COMMISSION PLATEFORME</div>
  </div>
  <div class="sc" id="b">
    <div class="mono" style="font-size:26px;letter-spacing:.14em;color:rgba(245,244,240,.5)">1 SÉJOUR · 7 NUITS × CHF 220</div>
    <div class="d" style="font-size:190px;letter-spacing:-.06em;margin-top:20px">CHF <span id="tot">0</span></div>
    <div class="d" id="com" style="font-size:120px;letter-spacing:-.05em;color:#FF5A3C;margin-top:30px">− CHF <span id="comv">0</span></div>
    <div class="mono" style="font-size:26px;letter-spacing:.14em;color:#FF5A3C;margin-top:14px" id="com2">PARTIS EN COMMISSION</div>
  </div>
  <div class="sc" id="c">
    <div class="mono" style="font-size:30px;letter-spacing:.14em;color:rgba(245,244,240,.55)">× 20 SÉJOURS PAR AN</div>
    <div class="d lm" style="font-size:230px;letter-spacing:-.07em;margin-top:30px;line-height:.9">CHF<br><span id="year">0</span></div>
    <div class="d" style="font-size:80px;margin-top:40px">${words('qui pourraient')} ${words('rester chez toi.', 'it lm')}</div>
  </div>
  <div class="sc" id="d">
    <h2 class="d mid" style="margin-bottom:50px">${words('Ton site.')} ${words('Tes réservations.', 'it lm')}</h2>
    <div id="bk" style="background:#fff;color:#0A0A0A;border-radius:40px;overflow:hidden">
      <div style="height:420px;background:linear-gradient(180deg,#9CC4E4 0%,#DCEAF4 60%,#F7F7F7 61%);position:relative">
        <svg viewBox="0 0 900 420" width="100%" height="420" preserveAspectRatio="none" style="position:absolute;inset:0"><path d="M0 300 L150 140 L260 230 L420 60 L560 210 L700 110 L900 240 L900 420 L0 420Z" fill="#E9EEF2"/><path d="M420 60 L465 100 L440 96 L420 118 L398 96 L380 98Z" fill="#fff"/><path d="M0 340 L900 320 L900 420 L0 420Z" fill="#F7F7F7"/></svg>
        <div style="position:absolute;left:50%;bottom:50px;transform:translateX(-50%);width:280px;height:170px"><div style="position:absolute;bottom:0;left:28px;right:28px;height:104px;background:#7A4E2D;border-radius:6px"></div><div style="position:absolute;bottom:98px;left:0;right:0;border-left:140px solid transparent;border-right:140px solid transparent;border-bottom:76px solid #4A2F1B"></div><div style="position:absolute;bottom:26px;left:108px;width:64px;height:46px;background:#FFD27A;border-radius:4px"></div></div>
        <span style="position:absolute;left:30px;top:30px;background:rgba(255,255,255,.92);border-radius:999px;padding:14px 24px;font-weight:700;font-size:28px">Chalet Les Mélèzes · Nendaz</span>
      </div>
      <div style="padding:36px">
        <div style="display:flex;gap:12px">${[['ARRIVÉE', 'Sam 20 déc.'], ['DÉPART', 'Sam 27 déc.'], ['HÔTES', '6']].map(([l, v]) => `<div style="flex:1;padding:22px;border-radius:18px;border:2px solid #E2E2E2"><div class="mono" style="font-size:18px;letter-spacing:.12em;color:#888">${l}</div><div style="font-size:30px;font-weight:700;margin-top:6px">${v}</div></div>`).join('')}</div>
        <div id="bkbtn" style="margin-top:24px;background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:30px;text-align:center;font-weight:700;font-size:34px">Réserver en direct · CHF 1'540</div>
      </div>
    </div>
    <div id="zero" style="position:absolute;right:70px;top:440px;transform:rotate(10deg);background:#B3FF47;color:#0A0A0A;border-radius:50%;width:280px;height:280px;display:grid;place-items:center;text-align:center;font-family:'Space Grotesk';font-weight:700;font-size:44px;line-height:1;letter-spacing:-.03em;box-shadow:0 20px 60px rgba(0,0,0,.4)">0 %<br>commission</div>
  </div>
  ${endCard('z', 'Garde tes commissions', 'pour toi.', 'CHALET', ['Réservation directe', 'Multilingue', 'Paiement en ligne', 'Calendrier synchro'])}`;
  const counter = (sel, from, to, t, d) => `tl.to({v:${from}},{v:${to},duration:${d},ease:'power2.out',onUpdate:function(){document.querySelector('${sel}').textContent=Math.round(this.targets()[0].v).toLocaleString('en-US').replace(/,/g,"'")}},${t});`;
  const js = `
  show('#a',0); words('#a',.1);
  tl.from('#a .nt',{y:80,opacity:0,stagger:.12,duration:.35,ease:'back.out(1.6)'},.8);
  tl.from('#gift',{yPercent:100,duration:.35,ease:'power4.out'},2.0);
  tl.to('#a .n7',{x:10,duration:.05,yoyo:true,repeat:5},2.35);
  tl.from('#a3',{opacity:0,duration:.3},2.3);
  hide('#a',3.6);
  show('#b',3.65); ${counter('#tot', 0, 1540, 3.7, .9)}
  tl.from('#com',{x:-120,opacity:0,duration:.4,ease:'power4.out'},4.8); ${counter('#comv', 0, 231, 4.85, .7)}
  tl.from('#com2',{opacity:0,duration:.3},5.4);
  hide('#b',6.5);
  show('#c',6.55); tl.from('#c .mono',{opacity:0,y:20,duration:.3},6.55); ${counter('#year', 0, 4620, 6.8, 1.4)}
  words('#c',8.0);
  wipe(9.3);
  hide('#c',9.6); show('#d',9.6); words('#d',9.65);
  tl.from('#bk',{y:300,opacity:0,duration:.6,ease:'power4.out'},9.8);
  tl.to('#bkbtn',{scale:1.05,duration:.3,yoyo:true,repeat:3,ease:'sine.inOut'},10.6);
  tl.from('#zero',{scale:0,rotate:-90,duration:.5,ease:'back.out(1.8)'},11.6);
  hide('#d',13.4);
  ${endJS('z', 13.45)}
  `;
  return { tag: 'CHALETS & HÔTELS', slug: 'reel-04-chalets-hotels', dur: 17.6, html, js, cover: 2.6 };
}

// ═══════════════════════════ R5 COMMERCE ═══════════════════════════
function r5() {
  const prod = (n, p, c) => `<div class="pr" style="background:#fff;color:#0A0A0A;border-radius:28px;overflow:hidden"><div style="height:230px;background:${c}"></div><div style="padding:20px 22px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:26px;font-weight:700">${n}</div><div style="font-family:'Space Grotesk';font-weight:700;font-size:34px;margin-top:4px">${p}</div></div><span class="plus" style="width:60px;height:60px;border-radius:50%;background:#0A0A0A;color:#B3FF47;display:grid;place-items:center;font-size:36px;font-weight:700">+</span></div></div>`;
  const html = `
  <div class="sc" id="a" style="align-items:center;text-align:center">
    <div id="sign" style="width:620px;padding:50px;border-radius:30px;background:#F5F4F0;color:#0A0A0A;box-shadow:0 40px 100px rgba(0,0,0,.5);position:relative">
      <div style="position:absolute;left:50%;top:-80px;width:4px;height:80px;background:rgba(245,244,240,.4)"></div>
      <div id="open" class="d" style="font-size:150px;letter-spacing:-.05em;color:#1E8E3E">OUVERT</div>
      <div id="closed" class="d" style="font-size:150px;letter-spacing:-.05em;color:#FF3B30;position:absolute;inset:0;display:grid;place-items:center;opacity:0">FERMÉ</div>
    </div>
    <div class="mono" style="font-size:60px;font-weight:700;margin-top:70px" id="clk">18:29</div>
    <h1 class="d" style="font-size:110px;margin-top:40px">${words('Ta boutique ferme.')}</h1>
  </div>
  <div class="sc" id="b" style="align-items:center;text-align:center"><div class="d" style="font-size:200px;letter-spacing:-.06em;line-height:.9">${words('Ton site,')}<br>${words('non.', 'it lm')}</div></div>
  <div class="sc" id="c">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px"><div class="mono" style="font-size:30px;font-weight:700;color:#B3FF47">22:47 · CANAPÉ 🛋️</div><div style="position:relative;width:96px;height:96px;border-radius:50%;background:#F5F4F0;color:#0A0A0A;display:grid;place-items:center;font-size:44px">🛒<span id="cart" style="position:absolute;right:-6px;top:-6px;width:46px;height:46px;border-radius:50%;background:#B3FF47;font-family:'Space Grotesk';font-weight:700;font-size:28px;display:grid;place-items:center">0</span></div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
      ${prod('Plateau raclette', '34.-', 'linear-gradient(135deg,#F3D58A,#D9A441)')}${prod('Petite Arvine', '29.-', 'linear-gradient(135deg,#E9E2B8,#BFAF6A)')}
      ${prod('Tomme de Bagnes', '18.-', 'linear-gradient(135deg,#F4E6C4,#D8BE83)')}${prod('Abricotine', '42.-', 'linear-gradient(135deg,#F7B267,#E07A2E)')}
    </div>
  </div>
  <div class="sc" id="d">
    <div id="pay" style="background:#fff;color:#0A0A0A;border-radius:40px;padding:46px">
      <div style="font-family:'Space Grotesk';font-weight:700;font-size:50px;letter-spacing:-.03em">Paiement</div>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:30px">
        <div id="tw" style="display:flex;justify-content:space-between;align-items:center;padding:30px 32px;border-radius:22px;border:3px solid #E2E2E2"><span style="font-size:36px;font-weight:800">TWINT</span><span id="twr" style="width:44px;height:44px;border-radius:50%;border:3px solid #ccc"></span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:30px 32px;border-radius:22px;border:3px solid #E2E2E2"><span style="font-size:36px;font-weight:700">Carte</span><span style="width:44px;height:44px;border-radius:50%;border:3px solid #ccc"></span></div>
      </div>
      <div style="margin-top:22px;padding:24px 28px;border-radius:18px;background:#F3F3F1;font-size:30px">📍 Retrait en boutique · <b>samedi 9h</b></div>
      <div id="paybtn" style="margin-top:26px;background:#0A0A0A;color:#B3FF47;border-radius:999px;padding:32px;text-align:center;font-weight:700;font-size:36px">Payer 81.-</div>
    </div>
    <div id="done" style="position:absolute;inset:0;display:grid;place-items:center;background:#B3FF47;color:#0A0A0A;text-align:center;opacity:0">
      <div><div style="width:200px;height:200px;border-radius:50%;background:#0A0A0A;color:#B3FF47;display:grid;place-items:center;margin:0 auto">${ck(110)}</div>
      <div class="d" style="font-size:110px;margin-top:50px">Commande<br>reçue.</div>
      <div class="mono" style="font-size:30px;letter-spacing:.12em;margin-top:30px">N° 0427 · 81.- · 22:48</div></div>
    </div>
  </div>
  ${endCard('z', 'Vends aussi', 'quand tu dors.', 'BOUTIQUE', ['E-shop', 'Click & collect', 'TWINT', 'Bons cadeaux'])}`;
  const js = `
  show('#a',0); tl.from('#sign',{rotate:-14,y:-100,duration:.8,ease:'elastic.out(1,.5)'},0);
  tl.set('#clk',{text:'18:30'},1.0); tl.to('#open',{opacity:0,duration:.15},1.05); tl.to('#closed',{opacity:1,duration:.15},1.05);
  tl.to('#sign',{rotateY:180,duration:.01},1.0); tl.to('#sign',{rotateY:0,duration:.5,ease:'back.out(2)'},1.01);
  words('#a',1.3);
  hide('#a',2.6);
  show('#b',2.65); words('#b',2.7);
  wipe(3.9);
  hide('#b',4.2); show('#c',4.2); tl.from('#c .mono',{opacity:0,duration:.3},4.25);
  tl.from('#c .pr',{y:120,opacity:0,stagger:.12,duration:.45,ease:'back.out(1.4)'},4.3);
  ${[0, 1, 2].map((k, i) => `tl.to('#c .pr:nth-child(${[1, 2, 3][k]}) .plus',{scale:1.35,duration:.12,yoyo:true,repeat:1},${5.4 + i * .55}); tl.set('#cart',{text:'${i + 1}'},${5.5 + i * .55}); tl.from('#cart',{scale:1.8,duration:.2,immediateRender:false},${5.5 + i * .55});`).join('\n  ')}
  hide('#c',7.6);
  show('#d',7.65); tl.from('#pay',{y:250,opacity:0,duration:.5,ease:'power4.out'},7.65);
  tl.to('#tw',{borderColor:'#0A0A0A',duration:.1},8.5); tl.to('#twr',{background:'#0A0A0A',borderColor:'#0A0A0A',duration:.1},8.5);
  tl.to('#paybtn',{scale:.94,duration:.08,yoyo:true,repeat:1},9.3);
  tl.to('#done',{opacity:1,duration:.2},9.6); tl.from('#done > div',{scale:.6,duration:.5,ease:'back.out(1.8)'},9.6);
  hide('#d',11.6);
  ${endJS('z', 11.65)}
  `;
  return { tag: 'COMMERCES', slug: 'reel-05-commerces', dur: 15.8, html, js, cover: 1.5 };
}

async function renderReel(browser, r, outDir) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}${RCSS}</style>
  <script>${GSAP}</script><script>${TEXTP}</script></head>
  <body class="dark"><div id="stage">
    <div class="blob" id="bl1" style="width:900px;height:900px;left:-300px;top:-200px"></div>
    <div class="blob" id="bl2" style="width:800px;height:800px;right:-300px;bottom:100px;opacity:.1"></div>
    <div id="brand" class="mono" style="position:absolute;left:90px;top:190px;z-index:20;display:flex;align-items:center;gap:16px;font-size:24px;letter-spacing:.16em;color:rgba(245,244,240,.6)"><span style="width:14px;height:14px;background:#B3FF47"></span>WEBALP · ${r.tag}</div>
    ${r.html}
    <div id="wipe"></div>
  </div><div class="grain"></div>
  <script>
    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({paused:true});
    function show(s,t){ tl.set(s,{visibility:'visible'},t); }
    function hide(s,t){ tl.to(s,{opacity:0,y:-60,duration:.25,ease:'power2.in'},t); tl.set(s,{visibility:'hidden'},t+.26); }
    function words(s,t){ tl.from(s+' .w > span',{yPercent:115,duration:.6,ease:'power4.out',stagger:.07},t); }
    function wipe(t){ tl.set('#wipe',{transformOrigin:'50% 100%'},t); tl.to('#wipe',{scaleY:1,duration:.3,ease:'power3.in'},t); tl.set('#wipe',{transformOrigin:'50% 0%'},t+.3); tl.to('#wipe',{scaleY:0,duration:.35,ease:'power3.out'},t+.32); }
    tl.to('#bl1',{x:500,y:900,duration:${r.dur},ease:'sine.inOut'},0);
    tl.to('#bl2',{x:-400,y:-700,duration:${r.dur},ease:'sine.inOut'},0);
    ${r.js}
    tl.to('#brand',{opacity:0,duration:.2},${r.dur - 4.3});
    tl.set({}, {}, ${r.dur});
    window.tl = tl;
  </script></body></html>`;
  const hp = path.join(ROOT, 'reels-out', 'html', `${r.slug}.html`);
  fs.mkdirSync(path.dirname(hp), { recursive: true });
  fs.writeFileSync(hp, html);
  const page = await browser.newPage({ viewport: { width: RW, height: RH } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + hp);
  await page.waitForTimeout(400);
  if (errs.length) throw new Error(r.slug + ': ' + errs.join('; '));
  fs.mkdirSync(outDir, { recursive: true });
  const mp4 = path.join(outDir, `${r.slug}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', mp4]);
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  if (process.env.FRAMES) done.catch(() => {});
  const frames = Math.round(r.dur * FPS);
  const only = process.env.FRAMES ? process.env.FRAMES.split(',').map(Number) : null;
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    if (only) { if (!only.some(x => Math.abs(x - t) < 1 / (2 * FPS))) continue; }
    if (process.env.DEBUG) console.log('f', f);
    await page.evaluate(t => { window.tl.seek(t, false); }, t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (only) fs.writeFileSync(path.join(outDir, `${r.slug}-t${t.toFixed(1)}.jpg`), buf);
    else if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  if (!only) await done;
  // cover
  await page.evaluate(t => { window.tl.seek(t, false); }, r.cover);
  await page.screenshot({ path: path.join(outDir, `${r.slug}-cover.jpg`), type: 'jpeg', quality: 92 });
  await page.close();
  console.log('ok', r.slug);
}

(async () => {
  const reels = [r1(), r2(), r3(), r4(), r5()];
  const sel = process.argv[2];
  const browser = await chromium.launch();
  for (const r of reels) {
    if (sel && !r.slug.includes(sel)) continue;
    await renderReel(browser, r, path.join(ROOT, 'reels-out', process.env.FRAMES ? 'frames' : 'mp4'));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

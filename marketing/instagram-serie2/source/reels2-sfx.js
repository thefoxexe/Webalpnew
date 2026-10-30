// WebAlp — Reels v2 : style "screen recording" natif (WhatsApp, iMessage, Notes, Calculette, Google)
// + stickers texte façon Instagram. 1080x1920, 30 fps, < 10 s.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const RW = 1080, RH = 1920, FPS = 30;
const ROOT = __dirname;
const GSAP = fs.readFileSync(path.join(ROOT, 'reels/node_modules/gsap/dist/gsap.min.js'), 'utf8');
const TEXTP = fs.readFileSync(path.join(ROOT, 'reels/node_modules/gsap/dist/TextPlugin.min.js'), 'utf8');

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{width:${RW}px;height:${RH}px;overflow:hidden;font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;background:#fff;color:#000}
#stage{position:absolute;inset:0;overflow:hidden}
.scr{position:absolute;inset:0;visibility:hidden}
.sb{position:absolute;left:0;right:0;top:0;height:150px;display:flex;justify-content:space-between;align-items:center;padding:30px 80px 0 96px;font-weight:600;font-size:46px;z-index:5;letter-spacing:-.01em}
.sb .r{display:flex;gap:16px;align-items:center}
.sig{display:flex;gap:5px;align-items:flex-end;height:30px}.sig i{width:9px;border-radius:2px;background:currentColor}
.bat{width:66px;height:32px;border:3px solid currentColor;border-radius:10px;opacity:.9;position:relative;padding:3px}.bat i{display:block;height:100%;border-radius:5px;background:currentColor}
.bat::after{content:'';position:absolute;right:-9px;top:9px;width:4px;height:10px;border-radius:0 3px 3px 0;background:currentColor}
/* keyboard */
.kb{position:absolute;left:0;right:0;bottom:0;height:780px;background:#D1D4DB;padding:22px 9px 0}
.kr{display:flex;justify-content:center;gap:15px;margin-bottom:30px}
.k{height:118px;flex:0 0 81px;background:#fff;border-radius:14px;box-shadow:0 3px 0 #898A8D;display:grid;place-items:center;font-size:58px;font-weight:400;color:#000}
.k.g{background:#ABB0BA;font-size:40px}
/* stickers */
.st{position:absolute;left:0;right:0;text-align:center;z-index:20;visibility:hidden;padding:0 70px}
.st span{display:inline;background:#fff;color:#000;font-weight:700;font-size:58px;line-height:1.52;padding:6px 22px;border-radius:16px;box-decoration-break:clone;-webkit-box-decoration-break:clone;letter-spacing:-.015em}
.st.b span{background:#000;color:#fff}
.st.t span{background:none;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55),0 0 2px rgba(0,0,0,.6)}
.tap{position:absolute;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;background:rgba(120,120,120,.35);opacity:0;z-index:30}
/* whatsapp */
.wa{background:#EFE7DE}
.wa .hd{position:absolute;left:0;right:0;top:0;height:300px;background:#F6F6F6;border-bottom:1px solid #DADADA;display:flex;align-items:flex-end;padding:0 40px 30px;gap:26px;z-index:4}
.av{width:110px;height:110px;border-radius:50%;background:#C9D3DB;color:#fff;display:grid;place-items:center;font-weight:600;font-size:46px;flex:none}
.wa .body,.im .body{position:absolute;left:0;right:0;top:300px;bottom:230px;padding:40px 34px;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;overflow:hidden}
.bub{max-width:800px;padding:20px 28px 16px;border-radius:30px;font-size:46px;line-height:1.28;position:relative;box-shadow:0 1px 1px rgba(0,0,0,.12)}
.wa .in{align-self:flex-start;background:#fff;border-top-left-radius:8px}
.wa .out{align-self:flex-end;background:#D9FDD3;border-top-right-radius:8px}
.tm{font-size:28px;color:#667781;float:right;margin:22px 0 -6px 22px}
.tk{color:#53BDEB;margin-left:6px}.tk.g{color:#8696A0}
.chipd{align-self:center;background:#fff;color:#54656F;font-size:32px;font-weight:500;padding:10px 26px;border-radius:16px;box-shadow:0 1px 1px rgba(0,0,0,.1)}
.wa .ft{position:absolute;left:0;right:0;bottom:0;height:230px;background:#F6F6F6;border-top:1px solid #DADADA;display:flex;align-items:flex-start;padding:26px 36px;gap:30px;font-size:64px;color:#007AFF}
.wa .ft .inp{flex:1;height:96px;border-radius:48px;background:#fff;border:1px solid #DADADA}
.typing{display:flex;gap:12px;padding:30px 34px}.typing i{width:20px;height:20px;border-radius:50%;background:#9AA5AC}
/* imessage */
.im{background:#fff}
.im .hd{position:absolute;left:0;right:0;top:0;height:330px;background:rgba(246,246,246,.96);border-bottom:1px solid #E3E3E3;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:22px;z-index:4}
.im .in{align-self:flex-start;background:#E9E9EB;color:#000}
.im .out{align-self:flex-end;background:#0B84FE;color:#fff}
.im .bub{box-shadow:none;border-radius:44px}
.im .ft{position:absolute;left:0;right:0;bottom:0;height:230px;display:flex;align-items:flex-start;padding:26px 36px;gap:24px}
.im .ft .inp{flex:1;height:100px;border-radius:50px;border:2px solid #D6D6D6;color:#B0B0B0;font-size:42px;padding:22px 36px}
/* notes */
.nt{background:#fff}
.nt .nav{position:absolute;top:150px;left:0;right:0;height:130px;display:flex;align-items:center;padding:0 40px;color:#E0A400;font-size:50px;font-weight:500;gap:10px}
.nt .doc{position:absolute;top:300px;left:0;right:0;padding:0 60px}
.nt .dt{text-align:center;color:#8A8A8E;font-size:34px;margin-bottom:34px}
.nt h1{font-size:82px;font-weight:700;letter-spacing:-.02em;line-height:1.1}
.nt .ln{font-size:50px;line-height:1.45;margin-top:12px;min-height:72px}
.caret{display:inline-block;width:5px;height:60px;background:#E0A400;vertical-align:-10px;margin-left:2px}
/* calculator */
.calc{background:#000;color:#fff}
.calc .disp{position:absolute;right:70px;left:70px;bottom:1150px;text-align:right;font-size:230px;font-weight:300;letter-spacing:-.04em;line-height:1}
.calc .expr{position:absolute;right:76px;bottom:1365px;text-align:right;font-size:70px;color:#8E8E93;font-weight:300}
.calc .pad{position:absolute;left:70px;right:70px;bottom:70px;display:grid;grid-template-columns:repeat(4,190px);justify-content:space-between;row-gap:24px}
.cb{width:190px;height:190px;border-radius:50%;background:#333;display:grid;place-items:center;font-size:88px;font-weight:400}
.cb.l{background:#A5A5A5;color:#000;font-size:70px}.cb.o{background:#FF9F0A;font-size:100px}.cb.z{grid-column:span 2;width:440px;border-radius:95px;justify-items:start;padding-left:76px}
/* google */
.gg{background:#fff}
.gg .bar{position:absolute;top:190px;left:40px;right:40px;height:130px;border-radius:65px;box-shadow:0 2px 10px rgba(0,0,0,.18);display:flex;align-items:center;padding:0 46px;gap:28px;font-size:46px}
.gg .res{position:absolute;top:370px;left:0;right:0;padding:0 44px}
.gg .tabs{display:flex;gap:46px;font-size:38px;color:#5F6368;border-bottom:1px solid #E8E8E8;padding:0 10px 22px;margin-bottom:30px}.gg .tabs b{color:#1A73E8;font-weight:500;border-bottom:6px solid #1A73E8;padding-bottom:16px;margin-bottom:-22px}
.lc{padding:34px 0;border-bottom:1px solid #ECECEC}
.lc .n{font-size:48px;color:#1A0DAB;font-weight:500}
.lc .m{font-size:36px;color:#70757A;margin-top:8px}
.lc .s{color:#F4B400}
.lc .bt{display:flex;gap:16px;margin-top:22px}.lc .bt span{border:2px solid #DADCE0;border-radius:40px;padding:12px 30px;font-size:34px;color:#1A73E8;font-weight:500}
.lc .bt span.p{background:#C2E7FF;border-color:#C2E7FF;color:#001D35}
/* recents */
.rc{background:#fff}
.rc h1{position:absolute;top:290px;left:60px;font-size:100px;font-weight:700;letter-spacing:-.02em}
.rc .seg{position:absolute;top:175px;left:50%;transform:translateX(-50%);display:flex;background:#EEEEF0;border-radius:22px;padding:6px;font-size:38px;font-weight:500}.rc .seg span{padding:12px 50px;border-radius:18px}.rc .seg span.on{background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.12)}
.rc .list{position:absolute;top:440px;left:0;right:0;padding-left:60px}
.rr{display:flex;justify-content:space-between;align-items:center;padding:28px 60px 28px 0;border-bottom:1px solid #E5E5EA}
.rr .nm{font-size:50px;font-weight:600;color:#FF3B30}.rr .sub{font-size:36px;color:#8A8A8E;margin-top:4px}.rr .h{font-size:40px;color:#8A8A8E}
.ban{position:absolute;left:30px;right:30px;top:150px;background:rgba(245,245,245,.97);border-radius:56px;padding:34px 40px;display:flex;gap:30px;align-items:center;box-shadow:0 20px 60px rgba(0,0,0,.25);z-index:15;visibility:hidden}
.ban .ic{width:120px;height:120px;border-radius:28px;background:#1C1C1E;color:#fff;display:grid;place-items:center;font-size:60px;flex:none}
.ban .a{font-size:40px;font-weight:600;display:flex;justify-content:space-between}.ban .a small{font-weight:400;color:#8A8A8E;font-size:34px}
.ban .b{font-size:40px;line-height:1.3;margin-top:4px}
/* meme */
.mm{background:#F2EDE4;display:flex;flex-direction:column;justify-content:center;padding:0 80px;gap:40px}
.mm .q{visibility:hidden;font-size:62px;font-weight:700;line-height:1.3;letter-spacing:-.015em}
.mm .q span{background:#fff;padding:6px 22px;border-radius:16px;box-decoration-break:clone;-webkit-box-decoration-break:clone;line-height:1.55}
.mm .q.b span{background:#111;color:#fff}
`;

const statusBar = (time = '18:47', color = '#000', id = '') => `<div class="sb" style="color:${color}"><span ${id ? `id="${id}"` : ''}>${time}</span><span class="r"><span class="sig"><i style="height:10px"></i><i style="height:16px"></i><i style="height:22px"></i><i style="height:30px;opacity:.35"></i></span><span style="font-size:40px;font-weight:700">5G</span><span class="bat"><i style="width:58%"></i></span></span></div>`;
const kbRows = [['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'è'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'à'], ['⇧', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']];
const keyboard = (ret = 'rechercher') => `<div class="kb">${kbRows.map((r, ri) => `<div class="kr">${r.map(k => `<span class="k${k === '⇧' || k === '⌫' ? ' g' : ''}" style="${k === '⇧' || k === '⌫' ? 'flex-basis:130px' : ''}">${k}</span>`).join('')}</div>`).join('')}
  <div class="kr"><span class="k g" style="flex-basis:130px">123</span><span class="k g" style="flex-basis:130px">🙂</span><span class="k" style="flex-basis:470px;font-size:40px">espace</span><span class="k g" style="flex-basis:250px;font-size:38px;background:#0A84FF;color:#fff">${ret}</span></div></div>`;
const nb = (t) => t.replace(/ ([?!:;»])/g, '&nbsp;$1').replace(/« /g, '«&nbsp;');
const sticker = (id, html, top, cls = '') => `<div class="st ${cls}" id="${id}" style="top:${top}px"><span>${nb(html)}</span></div>`;
const tap = (id, x, y) => `<div class="tap" id="${id}" style="left:${x}px;top:${y}px"></div>`;
const wa = (id, name, sub, msgs, { avatar = '', time = '18:47', timeId = '' } = {}) => `
<div class="scr wa" id="${id}">${statusBar(time, '#000', timeId)}
  <div class="hd"><span style="font-size:70px;color:#000;margin-right:-6px">‹</span><span class="av">${avatar || name[0]}</span><div style="flex:1"><div style="font-size:48px;font-weight:600">${name}</div><div style="font-size:34px;color:#667781;margin-top:4px" class="wsub">${sub}</div></div><span style="font-size:52px">📹</span><span style="font-size:52px;margin-left:26px">📞</span></div>
  <div class="body">${msgs}</div>
  <div class="ft"><span>＋</span><span class="inp"></span><span>📷</span><span>🎙</span></div>
</div>`;
const im = (id, name, msgs) => `
<div class="scr im" id="${id}">${statusBar()}
  <div class="hd"><span style="position:absolute;left:36px;top:170px;font-size:80px;color:#0B84FE">‹</span><span class="av" style="width:130px;height:130px;background:linear-gradient(#A5ABB8,#858994);font-size:56px">${name[0] === '+' ? '👤' : name[0]}</span><div style="font-size:34px;margin-top:12px">${name} ›</div></div>
  <div class="body">${msgs}</div>
  <div class="ft"><span style="width:100px;height:100px;border-radius:50%;background:#E9E9EB;display:grid;place-items:center;font-size:54px;color:#8A8A8E">+</span><span class="inp">iMessage</span></div>
</div>`;
const bin = (t, time, cls = 'in', id = '', tk = 'tk') => `<div class="bub ${cls}" ${id ? `id="${id}"` : ''}>${nb(t)}<span class="tm">${time}${cls === 'out' ? `<span class="${tk}">${tk === 'tk g' ? '✓' : '✓✓'}</span>` : ''}</span></div>`;
const ibub = (t, cls = 'in', id = '') => `<div class="bub ${cls}" ${id ? `id="${id}"` : ''}>${nb(t)}</div>`;
const endSticker = (top = 1380) => sticker('end', '→ webalp.ch', top, 'b');

// ═════════════════════════════════════════════ REELS ═════════════════════════════════════════════
const R = [];

// 1 — Restaurant (Google)
R.push({
  slug: 'reel-01-restaurant', tag: 'Restaurants', dur: 9.3, cover: 3.0,
  html: `
  <div class="scr gg" id="s1">${statusBar('19:02')}
    <div class="bar"><svg width="46" height="46" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span id="q" style="color:#202124"></span><span class="caret" style="background:#1A73E8"></span></div>
    ${keyboard()}
  </div>
  <div class="scr gg" id="s2">${statusBar('19:02')}
    <div class="bar"><svg width="46" height="46" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span style="color:#202124">resto sion</span></div>
    <div class="res"><div class="tabs"><b>Tous</b><span>Maps</span><span>Images</span><span>Actualités</span></div>
      <div style="font-size:44px;font-weight:500;margin:10px 0 6px">Restaurants</div>
      <div class="lc"><div class="n">Le Carnotset</div><div class="m">4,7 <span class="s">★★★★★</span> (318) · Suisse · CHF 30–50</div><div class="m" style="color:#188038">Ouvert · Ferme à 23:00</div><div class="bt"><span class="p">Réserver</span><span>Site Web</span><span>Itinéraire</span></div></div>
      <div class="lc"><div class="n">Pizzeria da Gino</div><div class="m">4,5 <span class="s">★★★★★</span> (204) · Italien · CHF 20–30</div><div class="m" style="color:#188038">Ouvert · Ferme à 22:30</div><div class="bt"><span class="p">Réserver</span><span>Site Web</span><span>Itinéraire</span></div></div>
      <div class="lc" id="cafe"><div class="n">Café du Bourg</div><div class="m">4,8 <span class="s">★★★★★</span> (96) · Suisse</div><div class="m" style="color:#188038">Ouvert</div><div class="bt"><span>Itinéraire</span><span>Appeler</span></div></div>
    </div>
    ${tap('t1', 245, 905)}
  </div>
  <div class="scr" id="s3" style="background:#fff">${statusBar('19:03')}
    <div style="position:absolute;top:360px;left:70px;right:70px;text-align:center">
      <div style="width:170px;height:170px;border-radius:50%;background:#1E8E3E;color:#fff;display:grid;place-items:center;margin:0 auto;font-size:100px">✓</div>
      <div style="font-size:66px;font-weight:700;margin-top:50px;letter-spacing:-.02em">Réservation confirmée</div>
      <div style="font-size:44px;color:#5F6368;margin-top:24px;line-height:1.45">Le Carnotset<br>ven. 31 oct. · 19:45 · 4 personnes</div>
      <div style="margin-top:60px;border:2px solid #DADCE0;border-radius:30px;padding:34px;font-size:38px;color:#3C4043;text-align:left;line-height:1.5">Un e-mail de confirmation a été envoyé à j.favre@…<br><span style="color:#1A73E8">Ajouter à l'agenda</span></div>
    </div>
  </div>
  ${sticker('c1', 'vendredi 19h, on a faim', 980)}
  ${sticker('c2', 'lui il a la meilleure note…', 1500)}
  ${sticker('c3', 'mais pas de site, pas de menu, pas de résa', 1500)}
  ${sticker('c4', 'du coup on a réservé ici 🤷‍♂️', 1360)}
  ${sticker('c5', 'ton resto, c\'est lequel des deux ?', 1360, 'b')}
  ${sticker('end', '→ webalp.ch', 1560)}`,
  js: `
  show('#s1',0); show('#c1',0);
  tl.to('#q',{text:'resto sion',duration:1.0,ease:'none'},.35);
  hide('#s1',1.6); hide('#c1',1.6); show('#s2',1.6);
  show('#c2',2.2); tl.to('#cafe',{backgroundColor:'#FFF8D6',duration:.2},2.2);
  hide('#c2',3.6); show('#c3',3.6);
  hide('#c3',5.1); tapAt('#t1',5.2);
  hide('#s2',5.5); show('#s3',5.5); show('#c4',5.6);
  hide('#c4',7.2); show('#c5',7.2); show('#end',8.0);
  `,
});

// 2 — Artisan (WhatsApp)
R.push({
  slug: 'reel-02-artisans', tag: 'Artisans', dur: 9.5, cover: 4.2,
  html: wa('s1', 'Sophie', 'en ligne', `
      <div class="chipd">Aujourd'hui</div>
      ${bin('tu connais un bon menuisier ? on refait la cuisine', '20:14', 'in', 'm1')}
      ${bin('oui Dupont à Savièse, il est top', '20:15', 'out', 'm2')}
      ${bin('il a un site ? je voudrais voir ce qu\'il a déjà fait', '20:15', 'in', 'm3')}
      ${bin('euh… non je crois pas 😅', '20:16', 'out', 'm4')}
      <div class="bub in" id="ty" style="padding:0"><div class="typing"><i></i><i></i><i></i></div></div>
      ${bin('ah ok. j\'ai trouvé un gars sur google avec plein de photos avant/après, je vais l\'appeler lui', '20:16', 'in', 'm5')}`, { time: '20:16' }) + `
  ${sticker('c1', 'le bouche-à-oreille en 2026 :', 340, 'b')}
  ${sticker('c2', 'Dupont vient de perdre une cuisine', 360, 'b')}
  ${endSticker(580)}`,
  js: `
  show('#s1',0); show('#c1',0);
  msg('#m1',.4); msg('#m2',1.5); msg('#m3',2.7); msg('#m4',3.9);
  msg('#ty',4.7); tl.to('#ty .typing i',{y:-8,duration:.18,yoyo:true,repeat:5,stagger:.08},4.8); tl.set('#ty',{display:'none'},5.7);
  msg('#m5',5.7);
  hide('#c1',7.0); show('#c2',7.0); show('#end',8.1);
  `,
});

// 3 — Beauté (Récents + notifs)
R.push({
  slug: 'reel-03-beaute', tag: 'Beauté', dur: 9.0, cover: 3.4,
  html: `
  <div class="scr rc" id="s1">${statusBar('11:52')}
    <div class="seg"><span class="on">Tous</span><span>Manqués</span></div>
    <h1>Récents</h1>
    <div class="list">${[['079 412 •• ••', 'mobile', '11:48'], ['Inconnu', 'Suisse', '11:31'], ['078 655 •• ••', 'mobile', '11:02'], ['Maman', 'mobile', '10:47'], ['077 290 •• ••', 'mobile', '10:15'], ['079 873 •• ••', 'mobile', '09:36']].map(([n, s, h], k) => `<div class="rr" id="r${k}"><div><div class="nm" style="${n === 'Maman' ? 'color:#000' : ''}">${n}</div><div class="sub">${s}</div></div><div style="display:flex;gap:26px;align-items:center"><span class="h">${h}</span><span style="width:52px;height:52px;border-radius:50%;border:3px solid #0A84FF;color:#0A84FF;display:grid;place-items:center;font-size:32px;font-weight:700">i</span></div></div>`).join('')}</div>
    <div class="ban" id="b1"><div class="ic">📅</div><div style="flex:1"><div class="a">Nouvelle réservation <small>maintenant</small></div><div class="b">Léa M. · Balayage · jeu. 6 nov. 14:00</div></div></div>
    <div class="ban" id="b2" style="top:390px"><div class="ic">📅</div><div style="flex:1"><div class="a">Nouvelle réservation <small>maintenant</small></div><div class="b">Nadia R. · Coupe + brushing · ven. 10:30</div></div></div>
  </div>
  ${sticker('c1', 'les mains dans une couleur<br>et ça sonne', 1420)}
  ${sticker('c2', '5 appels manqués avant midi 🙃', 1420)}
  ${sticker('c3', 'depuis qu\'elles réservent sur le site, je décroche plus', 1400, 'b')}
  ${endSticker(1580)}`,
  js: `
  show('#s1',0); show('#c1',0);
  ${[5, 4, 3, 2, 1, 0].map((k, i) => `tl.from('#r${k}',{opacity:0,height:0,paddingTop:0,paddingBottom:0,duration:.18},${(.3 + i * .38).toFixed(2)});`).join('\n  ')}
  hide('#c1',2.8); show('#c2',2.8);
  hide('#c2',4.8); banner('#b1',4.9); banner('#b2',5.7);
  show('#c3',6.3); show('#end',7.7);
  `,
});

// 4 — Chalets (Calculette)
const calcPad = () => {
  const keys = [['AC', 'l'], ['+/−', 'l'], ['%', 'l'], ['÷', 'o'], ['7', ''], ['8', ''], ['9', ''], ['×', 'o'], ['4', ''], ['5', ''], ['6', ''], ['−', 'o'], ['1', ''], ['2', ''], ['3', ''], ['+', 'o'], ['0', 'z'], [',', ''], ['=', 'o']];
  return `<div class="pad">${keys.map(([k, c]) => `<span class="cb ${c}" data-k="${k}">${k}</span>`).join('')}</div>`;
};
R.push({
  slug: 'reel-04-chalets', tag: 'Chalets', dur: 9.2, cover: 6.3,
  html: `
  <div class="scr calc" id="s1">${statusBar('21:16', '#fff')}
    <div class="expr" id="ex"></div>
    <div class="disp" id="d">0</div>
    ${calcPad()}
  </div>
  ${sticker('c1', 'le calcul que les proprios de chalet font jamais', 168)}
  ${sticker('l1', '1 semaine louée', 372, 't')}
  ${sticker('l2', 'commission plateforme (~15 %)', 372, 't')}
  ${sticker('l3', '20 semaines par an', 372, 't')}
  ${sticker('c2', 'CHF 4’620 par an.<br>pour un bouton « réserver ».', 168, 'b')}
  ${sticker('end', 'site de réservation directe → webalp.ch', 372)}`,
  js: `
  show('#s1',0); show('#c1',0);
  tl.set('#d',{text:'2'},.4); tl.set('#d',{text:'22'},.6); tl.set('#d',{text:'220'},.8);
  press('2',.4); press('2',.6); press('0',.8);
  press('×',1.2); tl.set('#ex',{text:'220 ×'},1.2);
  press('7',1.5); tl.set('#d',{text:'7'},1.5);
  press('=',1.9); tl.set('#ex',{text:'220 × 7'},1.9); tl.set('#d',{text:'1’540'},1.9); show('#l1',1.9);
  press('×',2.9); tl.set('#ex',{text:'1’540 ×'},2.9);
  press('1',3.1); tl.set('#d',{text:'1'},3.1); press('5',3.3); tl.set('#d',{text:'15'},3.3); press('%',3.5); tl.set('#d',{text:'0,15'},3.5);
  press('=',3.9); hide('#l1',3.9); tl.set('#ex',{text:'1’540 × 15 %'},3.9); tl.set('#d',{text:'231'},3.9); show('#l2',3.9);
  press('×',4.9); tl.set('#ex',{text:'231 ×'},4.9);
  press('2',5.1); tl.set('#d',{text:'2'},5.1); press('0',5.3); tl.set('#d',{text:'20'},5.3);
  press('=',5.7); hide('#l2',5.7); tl.set('#ex',{text:'231 × 20'},5.7); tl.set('#d',{text:'4’620'},5.7); show('#l3',5.7);
  hide('#c1',6.6); show('#c2',6.6); hide('#l3',7.8); show('#end',7.8);
  `,
});

// 5 — Commerce (Notes)
R.push({
  slug: 'reel-05-commerces', tag: 'Commerces', dur: 9.4, cover: 5.6,
  html: `
  <div class="scr nt" id="s1">${statusBar('17:52')}
    <div class="nav"><span style="font-size:70px">‹</span> Notes<span style="margin-left:auto;display:flex;gap:46px"><span>⇪</span><span>⋯</span></span></div>
    <div class="doc"><div class="dt">30 octobre 2026 à 17:52</div>
      <h1>Questions au comptoir (cette semaine)</h1>
      <div class="ln"><span id="n1"></span></div><div class="ln"><span id="n2"></span></div><div class="ln"><span id="n3"></span></div><div class="ln"><span id="n4"></span></div>
    </div>
    ${keyboard('retour')}
  </div>
  ${sticker('c1', 'un site répond à tout ça.<br>même quand t\'es fermé.', 1180, 'b')}
  ${endSticker(1380)}`,
  js: `
  show('#s1',0);
  tl.to('#n1',{text:'- vous êtes ouverts le 1er novembre ? (x9)',duration:1.1,ease:'none'},.3);
  tl.to('#n2',{text:'- il vous reste de la tomme de Bagnes ? (x6)',duration:1.1,ease:'none'},1.6);
  tl.to('#n3',{text:'- vous faites des bons cadeaux ? (x11)',duration:1.0,ease:'none'},2.9);
  tl.to('#n4',{text:'- je peux commander et passer samedi ? (x7)',duration:1.1,ease:'none'},4.1);
  tl.to('#s1 .kb',{y:800,duration:.25,ease:'power2.in'},5.4); show('#c1',5.6); show('#end',7.2);
  `,
});

// 6 — Garage (WhatsApp, client qui attend)
R.push({
  slug: 'reel-06-garages', tag: 'Garages', dur: 9.4, cover: 1.2,
  html: wa('s1', 'Garage (pneus)', 'vu hier à 17:30', `
      <div class="chipd">Aujourd'hui</div>
      ${bin('salut, vous avez une place pour changer les pneus cette semaine ? 🙏', '10:12', 'out', 'm1', 'tk g')}
      <div class="chipd" id="dv">Demain</div>
      ${bin('?', '08:40', 'out', 'm2', 'tk g')}
      ${bin('c\'est bon j\'ai réservé en ligne ailleurs, merci quand même', '09:05', 'out', 'm3', 'tk g')}`, { avatar: '🔧', time: '10:12', timeId: 'clk' }) + `
  ${sticker('c1', 'fin octobre en Valais 🥶', 400, 'b')}
  ${sticker('c2', 'le lendemain', 400, 'b')}
  ${sticker('c3', 'un agenda en ligne et ce client était à toi', 400, 'b')}
  ${endSticker(600)}`,
  js: `
  show('#s1',0); show('#c1',0);
  msg('#m1',.5);
  hide('#c1',2.6); show('#c2',2.6); tl.set('#clk',{text:'08:40'},2.6); msg('#dv',2.7); msg('#m2',3.0);
  tl.set('#clk',{text:'09:05'},4.3); msg('#m3',4.4);
  hide('#c2',5.9); show('#c3',5.9); show('#end',7.6);
  `,
});

// 7 — Fiduciaire (Google + scroll)
R.push({
  slug: 'reel-07-fiduciaires', tag: 'Fiduciaires', dur: 9.0, cover: 3.2,
  html: `
  <div class="scr gg" id="s1">${statusBar('20:31')}
    <div class="bar"><svg width="46" height="46" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span id="q" style="color:#202124"></span><span class="caret" style="background:#1A73E8"></span></div>
    ${keyboard()}
  </div>
  <div class="scr gg" id="s2">${statusBar('20:31')}
    <div style="position:absolute;left:0;right:0;top:0;height:350px;background:#fff;z-index:2"></div><div class="bar" style="z-index:3;background:#fff"><svg width="46" height="46" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span style="color:#202124">fiduciaire sion impôts</span></div>
    <div class="res" id="sc">
      <div class="tabs"><b>Tous</b><span>Maps</span><span>Actualités</span><span>Images</span></div>
      ${[['Fiduciaire du Centre', '4,9 (127) · Conseiller fiscal', ['Prendre RDV', 'Site Web']], ['Bureau Fiscal Valais', '4,7 (88) · Fiduciaire', ['Site Web', 'Itinéraire']], ['Compta & Impôts Sàrl', '4,6 (54) · Comptable', ['Prendre RDV', 'Site Web']], ['Fidu Rhône Conseils', '4,8 (61) · Fiduciaire', ['Site Web', 'Appeler']], ['Cabinet Bonvin', '4,5 (39) · Comptable', ['Site Web', 'Itinéraire']]].map(([n, m, b]) => `<div class="lc"><div class="n">${n}</div><div class="m">${m.split(' ')[0]} <span class="s">★★★★★</span> ${m.split(' ').slice(1).join(' ')}</div><div class="bt">${b.map((x, i) => `<span class="${i === 0 && x === 'Prendre RDV' ? 'p' : ''}">${x}</span>`).join('')}</div></div>`).join('')}
      <div style="text-align:center;padding:60px 0 400px;font-size:40px;color:#1A73E8">Plus de résultats ⌄</div>
    </div>
  </div>
  ${sticker('c1', 'chaque février, tout le Valais tape ça', 980, 'b')}
  ${sticker('c2', 'et toi t\'es où dans la liste ?', 1500)}
  ${sticker('c3', 'si t\'es pas là, c\'est pas toi qui fais leurs impôts', 1400, 'b')}
  ${endSticker(1600)}`,
  js: `
  show('#s1',0); show('#c1',0);
  tl.to('#q',{text:'fiduciaire sion impôts',duration:1.4,ease:'none'},.3);
  hide('#s1',2.0); hide('#c1',2.0); show('#s2',2.0);
  show('#c2',2.6); tl.to('#sc',{y:-950,duration:2.2,ease:'power1.inOut'},2.9);
  hide('#c2',5.4); show('#c3',5.4); show('#end',7.4);
  `,
});

// 8 — Physio (iMessage)
R.push({
  slug: 'reel-08-physio-sante', tag: 'Santé', dur: 9.2, cover: 4.4,
  html: im('s1', '+41 79 •• •• ••', `
      <div style="align-self:center;font-size:30px;color:#8A8A8E;margin-bottom:10px">SMS/MMS<br>Aujourd'hui 07:12</div>
      ${ibub('Bonjour, vous prenez encore des nouveaux patients ?', 'in', 'm1')}
      ${ibub('C\'est remboursé si j\'ai une ordonnance ?', 'in', 'm2')}
      ${ibub('Vous avez des créneaux le soir après 18h ?', 'in', 'm3')}
      ${ibub('Et c\'est où exactement, il y a un parking ?', 'in', 'm4')}`) + `
  ${sticker('c1', 'ce sms je le reçois 10x par semaine', 430, 'b')}
  ${sticker('c2', '4 questions, 4 réponses qui pourraient être sur ton site', 400, 'b')}
  ${sticker('c3', '+ la prise de rdv en ligne', 560)}
  ${endSticker(660)}`,
  js: `
  show('#s1',0); show('#c1',0);
  msg('#m1',.4); msg('#m2',1.4); msg('#m3',2.4); msg('#m4',3.4);
  hide('#c1',4.6); show('#c2',4.6); show('#c3',5.9); show('#end',7.3);
  `,
});

// 9 — Immobilier (WhatsApp, agent qui répond trop tard)
R.push({
  slug: 'reel-09-immobilier', tag: 'Immobilier', dur: 9.4, cover: 5.4,
  html: wa('s1', '+41 78 •• •• ••', 'en ligne', `
      <div class="chipd">Mardi</div>
      ${bin('Bonjour, l\'appart 4.5 pièces à Sion est encore dispo ?', '21:48', 'in', 'm1')}
      ${bin('vous auriez plus de photos ? et le plan ?', '21:49', 'in', 'm2')}
      <div class="chipd" id="dv">Jeudi</div>
      ${bin('Bonjour, oui toujours dispo ! je vous envoie tout ça 🙂', '09:20', 'out', 'm3')}
      ${bin('merci mais on a visité un autre appart hier, on signe demain', '09:41', 'in', 'm4')}`, { avatar: '👤', time: '09:41' }) + `
  ${sticker('c1', 'il voulait juste des photos et un plan', 380, 'b')}
  ${sticker('c2', 'en ligne. tout de suite.', 380, 'b')}
  ${endSticker(480)}`,
  js: `
  show('#s1',0);
  msg('#m1',.4); msg('#m2',1.4); msg('#dv',2.6); msg('#m3',3.0); msg('#m4',4.3);
  show('#c1',5.4); hide('#c1',6.6); show('#c2',6.6); show('#end',7.6);
  `,
});

// 10 — Caves & vignerons (meme)
R.push({
  slug: 'reel-10-caves-vignerons', tag: 'Caves', dur: 9.0, cover: 2.8,
  html: `
  <div class="scr mm" id="s1">
    <div class="q" id="q0" style="font-size:54px;font-weight:600;color:#6B5E4F"><span style="background:none;padding:0">touriste zurichois à la cave, en août :</span></div>
    <div class="q" id="q1"><span>« super votre Petite Arvine, on peut en commander depuis Zurich ? »</span></div>
    <div class="q b" id="q2"><span>moi : « euh… envoyez-moi un mail »</span></div>
    <div class="q" id="q3"><span>le touriste, 2 jours après : a oublié le nom de ta cave 🍷</span></div>
    <div class="q b" id="q4" style="margin-top:30px"><span>un petit e-shop = des commandes toute l'année</span></div>
    <div class="q" id="q5"><span>→ webalp.ch</span></div>
  </div>`,
  js: `
  show('#s1',0); pop('#q0',.2); pop('#q1',.9); pop('#q2',2.6); pop('#q3',4.1); pop('#q4',6.0); pop('#q5',7.4);
  `,
});

// ═════════════════════════════════════════════ RENDER ═════════════════════════════════════════════
async function renderReel(browser, r, outDir) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style><script>${GSAP}</script><script>${TEXTP}</script></head>
  <body><div id="stage">${r.html}</div>
  <script>
    gsap.registerPlugin(TextPlugin);
    const tl = gsap.timeline({paused:true});
    window.SFX=[];
    const ev=(t,type)=>window.SFX.push({t:+t,type});
    function show(s,t){ tl.set(s,{visibility:'visible'},t); const el=document.querySelector(s); if(!el||t<=0.01) return; if(el.classList.contains('st')) ev(t, s==='#end'?'end':'sticker'); else if(el.classList.contains('scr')) ev(t,'cut'); }
    function hide(s,t){ tl.set(s,{visibility:'hidden'},t); }
    function msg(s,t){ tl.from(s,{display:'none',duration:.01},t); tl.from(s,{scale:.85,opacity:0,duration:.16,ease:'power2.out',transformOrigin:'50% 100%',immediateRender:false},t); const el=document.querySelector(s); if(!el) return; if(el.classList.contains('out')) ev(t,'send'); else if(el.classList.contains('chipd')) ev(t,'sticker'); else if(s==='#ty') ev(t,'typing'); else ev(t,'recv'); }
    function pop(s,t){ show(s,t); tl.from(s,{scale:.92,opacity:0,duration:.12,ease:'power1.out',immediateRender:false},t); ev(t,'pop'); }
    function tapAt(s,t){ tl.to(s,{opacity:1,scale:1,duration:.06},t); tl.to(s,{opacity:0,duration:.2},t+.25); ev(t,'tap'); }
    function banner(s,t){ show(s,t); tl.from(s,{y:-260,duration:.32,ease:'power3.out',immediateRender:false},t); ev(t,'notif'); }
    function press(k,t){ const el=[...document.querySelectorAll('.cb')].find(e=>e.dataset.k===k); if(!el) return; tl.to(el,{opacity:.55,duration:.04},t); tl.to(el,{opacity:1,duration:.15},t+.12); ev(t,'calc'); }
    ${r.js}
    tl.getChildren(true,true,false).forEach(c=>{ const v=c.vars||{}; const st=c.startTime();
      if(typeof v.text==='string' && c.duration()>0.2){ const n=v.text.length; for(let i=0;i<n;i++) ev(st+c.duration()*i/n, v.text[i]===' '?'space':'key'); }
      const tg=c.targets? c.targets():[]; if(tg[0]&&tg[0].classList&&tg[0].classList.contains('rr')) ev(st,'vibrate');
      if(tg[0]&&tg[0].id==='sc') ev(st,'scroll');
      if(tg[0]&&tg[0].classList&&tg[0].classList.contains('kb')&&v.y) ev(st,'swish'); });
    tl.set({}, {}, ${r.dur});
    window.tl = tl;
  </script></body></html>`;
  const hp = path.join(ROOT, 'reels2-out', 'html-sfx', `${r.slug}.html`);
  fs.mkdirSync(path.dirname(hp), { recursive: true });
  fs.writeFileSync(hp, html);
  const page = await browser.newPage({ viewport: { width: RW, height: RH } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + hp);
  await page.waitForTimeout(300);
  if (errs.length) throw new Error(r.slug + ': ' + errs.join('; '));
  fs.mkdirSync(outDir, { recursive: true });
  if (process.env.EVENTS) { const evs = await page.evaluate(() => window.SFX.sort((a,b)=>a.t-b.t)); fs.mkdirSync(path.join(ROOT,'reels2-out','sfx'),{recursive:true}); fs.writeFileSync(path.join(ROOT,'reels2-out','sfx',r.slug+'.json'), JSON.stringify({dur:r.dur, events:evs})); await page.close(); console.log('ev', r.slug, evs.length); return; }
  const only = process.env.FRAMES ? process.env.FRAMES.split(',').map(Number) : null;
  let ff, done;
  if (!only) {
    ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', path.join(outDir, `${r.slug}.mp4`)]);
    done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  }
  const frames = Math.round(r.dur * FPS);
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    if (only && !only.some(x => Math.abs(x - t) < 1 / (2 * FPS))) continue;
    await page.evaluate(t => { window.tl.seek(t, false); }, t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (only) fs.writeFileSync(path.join(outDir, `${r.slug}-t${t.toFixed(1)}.jpg`), buf);
    else if (!ff.stdin.write(buf)) await new Promise(res => ff.stdin.once('drain', res));
  }
  if (!only) { ff.stdin.end(); await done; }
  await page.evaluate(t => { window.tl.seek(t, false); }, r.cover);
  await page.screenshot({ path: path.join(outDir, `${r.slug}-cover.jpg`), type: 'jpeg', quality: 92 });
  await page.close();
  console.log('ok', r.slug);
}

(async () => {
  const sel = process.argv[2];
  const browser = await chromium.launch();
  for (const r of R) {
    if (sel && !r.slug.includes(sel)) continue;
    await renderReel(browser, r, path.join(ROOT, 'reels2-out', process.env.FRAMES ? 'frames' : 'mp4'));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
module.exports = { R };

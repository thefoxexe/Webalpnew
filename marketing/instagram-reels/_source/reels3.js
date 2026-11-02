// WebAlp — Reels v3 « Coupe franche » : typo géante coupée sur le tempo (124 BPM),
// preuves réelles (site webalp.ch capturé sur mobile + projets clients). 1080x1920, 30 fps, ~9 s.
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const RW = 1080, RH = 1920, FPS = 30, BPM = 124, BEAT = 60 / BPM;
const ROOT = __dirname;
const LIVE = path.join(ROOT, 'live');
const GSAP = fs.readFileSync(path.join(ROOT, 'reels/node_modules/gsap/dist/gsap.min.js'), 'utf8');
const FONTS = fs.readFileSync(path.join(ROOT, 'fonts.css'), 'utf8');

const PROJ = {
  drone: { img: 'work-dronevalais.jpg', name: 'Drone Valais Production', type: 'Site vitrine + CMS', big: '+280 %', lab: 'de demandes de devis' },
  hyg: { img: 'work-monhygiene.jpg', name: 'MonHygiène', type: 'Site + réservation en ligne', big: '24/7', lab: 'réservations en ligne' },
  vest: { img: 'work-vestedwear.jpg', name: 'Vestedwear', type: 'Boutique en ligne', big: 'E-shop', lab: 'qui vend jour et nuit' },
};
const SITE = {
  hero: { img: 'site-hero.jpg', from: 0, to: 700 },
  results: { img: 'site-results.jpg', from: 300, to: 2300 },
  services: { img: 'site-services.jpg', from: 150, to: 1350 },
};

const CSS = `${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${RW}px;height:${RH}px;overflow:hidden;background:#0A0A0A;font-family:'Space Grotesk',Inter,sans-serif;-webkit-font-smoothing:antialiased}
.card{position:absolute;inset:0;visibility:hidden;overflow:hidden}
.ink{background:#0A0A0A;color:#F5F4F0}.paper{background:#F5F4F0;color:#0A0A0A}.lime{background:#B3FF47;color:#0A0A0A}
.tx{position:absolute;left:80px;right:80px;top:50%;transform-origin:0 50%;font-weight:700;letter-spacing:-.055em;line-height:.96}
.tx .l{display:block;white-space:nowrap}
.ink .a{color:#B3FF47}.paper .a{background:linear-gradient(transparent 18%,#B3FF47 18%,#B3FF47 96%,transparent 96%);padding:0 .06em;margin:0 -.03em}.lime .a{background:linear-gradient(transparent 14%,#0A0A0A 14%,#0A0A0A 98%,transparent 98%);color:#B3FF47;padding:0 .06em;margin:0 -.03em}
.cap{position:absolute;left:84px;right:84px;font-family:Inter,sans-serif;font-weight:600;font-size:56px;letter-spacing:-.02em;line-height:1.2;opacity:.8}
.bar{position:absolute;left:80px;right:80px;top:760px;height:150px;border-radius:75px;background:#fff;box-shadow:0 18px 50px rgba(0,0,0,.12);display:flex;align-items:center;gap:30px;padding:0 54px;font-family:Inter,sans-serif;font-size:56px;color:#202124}
.caret{width:5px;height:68px;background:#1A73E8}
.proj .lbl{position:absolute;left:80px;top:300px;font-family:Inter,sans-serif;font-weight:600;font-size:34px;color:#0A0A0A;background:#B3FF47;padding:12px 24px;border-radius:999px}
.proj .nm{position:absolute;left:80px;right:80px;top:400px;font-size:84px;font-weight:700;letter-spacing:-.045em;line-height:.95}
.proj .ty{position:absolute;left:84px;top:500px;font-family:Inter,sans-serif;font-size:38px;opacity:.55}
.proj .win{position:absolute;left:40px;right:40px;top:620px;height:520px;border-radius:26px;overflow:hidden;background:#222;box-shadow:0 40px 90px rgba(0,0,0,.6)}
.proj .win .chrome{height:58px;background:#1C1C1E;display:flex;align-items:center;gap:12px;padding:0 24px}.proj .win .chrome i{width:16px;height:16px;border-radius:50%;background:#3A3A3C}
.proj .win .shot{position:absolute;left:0;right:0;top:58px;bottom:0;background-size:cover;background-position:center top;transform-origin:50% 30%}
.proj .big{position:absolute;left:76px;top:1190px;font-size:230px;font-weight:700;letter-spacing:-.065em;line-height:.85;color:#B3FF47}
.proj .bl{position:absolute;left:84px;top:1410px;font-family:Inter,sans-serif;font-size:44px;opacity:.7}
.site .scroll{position:absolute;left:0;top:0;width:1080px}
.site .tag{position:absolute;left:50%;top:250px;transform:translateX(-50%);background:#0A0A0A;color:#F5F4F0;font-family:Inter,sans-serif;font-weight:700;font-size:44px;padding:14px 30px;border-radius:16px;white-space:nowrap;z-index:2}
.end .w{position:absolute;left:76px;top:720px;font-size:205px;font-weight:700;letter-spacing:-.065em;line-height:.85}
.end .s{position:absolute;left:84px;top:950px;font-family:Inter,sans-serif;font-size:44px;font-weight:500;opacity:.7}
.end .k{position:absolute;left:80px;top:1090px;background:#0A0A0A;color:#F5F4F0;border-radius:30px;padding:34px 44px}
.end .k small{display:block;font-family:Inter,sans-serif;font-size:34px;opacity:.6;font-weight:500}
.end .k b{display:block;font-size:130px;letter-spacing:-.05em;line-height:1;margin-top:10px;color:#B3FF47}
.end .dot{display:inline-block;width:.16em;height:.16em;background:#0A0A0A;margin-left:.04em}
`;

// ── Card builders ──
const esc = (s) => s.replace(/\*(.+?)\*/g, '<span class="a">$1</span>').replace(/ ([?!:;%»])/g, '&nbsp;$1').replace(/« /g, '«&nbsp;');
const T = (text, th, beats, cap) => ({ k: 'T', text, th, beats, cap });
const G = (q, beats = 2, cap) => ({ k: 'G', q, beats, cap });
const P = (p, beats = 3) => ({ k: 'P', p, beats });
const S = (s, tag, beats = 2) => ({ k: 'S', s, tag, beats });
const E = (kw, beats = 3) => ({ k: 'E', kw, beats });

function cardHTML(c, i) {
  if (c.k === 'T') {
    const lines = c.text.split('|').map(l => `<span class="l">${esc(l)}</span>`).join('');
    return `<div class="card ${c.th}" id="c${i}"><div class="tx" data-fit="1">${lines}</div>${c.cap ? `<div class="cap">${esc(c.cap)}</div>` : ''}</div>`;
  }
  if (c.k === 'G') return `<div class="card paper" id="c${i}"><div class="cap" style="top:640px;opacity:.5">${esc(c.cap || 'Ils tapent :')}</div><div class="bar"><svg width="54" height="54" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" stroke="#5F6368" stroke-width="2.4" fill="none"/><path d="M15.5 15.5L21 21" stroke="#5F6368" stroke-width="2.4" stroke-linecap="round"/></svg><span class="q" data-q="${c.q}"></span><span class="caret"></span></div></div>`;
  if (c.k === 'P') {
    const p = PROJ[c.p];
    return `<div class="card ink proj" id="c${i}"><span class="lbl">Projet réel · WebAlp</span><div class="nm">${p.name}</div><div class="ty">${p.type}</div><div class="win"><div class="chrome"><i></i><i></i><i></i></div><div class="shot" style="background-image:url('file://${LIVE}/${p.img}')"></div></div><div class="big">${esc(p.big)}</div><div class="bl">${p.lab}</div></div>`;
  }
  if (c.k === 'S') {
    const s = SITE[c.s];
    return `<div class="card paper site" id="c${i}"><img class="scroll" src="file://${LIVE}/${s.img}" style="transform:translateY(-${s.from}px)" data-to="${s.to}"><div class="tag">${esc(c.tag)}</div></div>`;
  }
  if (c.k === 'E') return `<div class="card lime end" id="c${i}"><div class="w">webalp<span class="dot"></span>ch</div><div class="s">Sites web pour PME · Sion, Valais</div><div class="k"><small>Commente</small><b>« ${c.kw} »</b></div></div>`;
}

// ── The 10 reels ──
const REELS = [
  { slug: 'reel-01-restaurant', kw: 'RESTO', cards: [T('Vendredi,|19h.', 'ink', 2), G('resto sion', 2), T('Ils réservent', 'lime', 1), T('chez celui', 'lime', 1), T('qui a|*un bouton.*', 'paper', 2), P('hyg', 4), T('Ton resto|*plein.*', 'ink', 2), S('hero', 'webalp.ch', 2), E('RESTO', 3)] },
  { slug: 'reel-02-artisans', kw: 'CHANTIER', cards: [T('Tu bosses|bien.', 'ink', 2), T('Mais', 'lime', 1), T('qui|le sait ?', 'paper', 2), T('Même|recommandé,', 'ink', 1), T('on te|*Google.*', 'ink', 2), P('drone', 4), T('Montre|ton *travail.*', 'paper', 2), S('results', 'nos vrais projets', 2), E('CHANTIER', 3)] },
  { slug: 'reel-03-beaute', kw: 'RDV', cards: [T('Ça sonne.', 'ink', 1), T('Encore.', 'ink', 1), T('Les mains', 'paper', 1), T('dans une|*couleur.*', 'paper', 2), T('5', 'lime', 2, 'appels manqués avant midi'), T('Elles réservent', 'ink', 1), T('*ailleurs.*', 'ink', 1), P('hyg', 3), T('Ton agenda|se remplit|*seul.*', 'paper', 2), S('services', 'réservation en ligne incluse', 2), E('RDV', 3)] },
  { slug: 'reel-04-chalets', kw: 'CHALET', cards: [T('7 nuits|louées.', 'ink', 2), T('Commission :|*~15 %*', 'paper', 2), T('CHF 231', 'lime', 2, 'qui partent par semaine'), T('× 20|semaines', 'ink', 1), T('CHF|4’620', 'paper', 3, 'par an, pour la plateforme'), T('Tes habitués,', 'ink', 1), T('*en direct.*', 'ink', 2), P('hyg', 3), E('CHALET', 3)] },
  { slug: 'reel-05-commerces', kw: 'BOUTIQUE', cards: [T('18h30.', 'ink', 1), T('Fermé.', 'paper', 1), T('Ton site ?', 'lime', 1), T('*Ouvert.*', 'lime', 1), T('Il vend.', 'ink', 1), T('Même|à *22h.*', 'ink', 2), P('vest', 4), T('Ta boutique,|*24h/24.*', 'paper', 3), S('hero', 'webalp.ch', 2), E('BOUTIQUE', 3)] },
  { slug: 'reel-06-garages', kw: 'GARAGE', cards: [T('Fin|octobre.', 'ink', 1), T('Pneus|d’hiver.', 'paper', 2), T('Ton téléphone', 'ink', 1), T('sonne', 'ink', 1), T('*sans arrêt.*', 'ink', 2), T('Et s’ils', 'lime', 1), T('réservaient|*seuls ?*', 'lime', 2), P('hyg', 4), S('services', 'agenda en ligne', 2), E('GARAGE', 3)] },
  { slug: 'reel-07-fiduciaires', kw: 'FIDU', cards: [T('Février.', 'ink', 1), G('fiduciaire sion', 2, 'Tout le Valais tape :'), T('T’es où', 'lime', 1), T('dans la|*liste ?*', 'lime', 2), T('Pas trouvé', 'ink', 1), T('= pas|*appelé.*', 'ink', 2), P('drone', 3), T('Sois|*trouvé.*', 'paper', 2), S('results', 'nos vrais résultats', 2), E('FIDU', 3)] },
  { slug: 'reel-08-physio-sante', kw: 'RDV', cards: [T('« Vous prenez', 'paper', 1), T('des nouveaux', 'paper', 1), T('patients ? »', 'paper', 1), T('10 fois', 'ink', 1), T('par|*semaine.*', 'ink', 2), T('La réponse', 'lime', 1), T('sur ton|*site.*', 'lime', 2), T('+ les RDV|*en ligne.*', 'ink', 2), P('hyg', 3), S('services', 'réservation en ligne incluse', 2), E('RDV', 3)] },
  { slug: 'reel-09-immobilier', kw: 'IMMO', cards: [T('« Encore|dispo ? »', 'paper', 2), T('Ta réponse :', 'ink', 1), T('2 jours|*plus tard.*', 'ink', 2), T('Trop tard.', 'lime', 2), T('Photos,', 'paper', 1), T('plan,', 'paper', 1), T('*en ligne.*', 'paper', 2), P('drone', 3), S('results', 'nos vrais projets', 2), E('IMMO', 3)] },
  { slug: 'reel-10-caves-vignerons', kw: 'CAVE', cards: [T('Août.', 'ink', 1), T('Un Zurichois', 'paper', 1), T('adore ta', 'paper', 1), T('*Petite*|*Arvine.*', 'lime', 2), T('Septembre :', 'ink', 1), T('il a oublié', 'ink', 1), T('ton *nom.*', 'ink', 2), T('Un e-shop,', 'paper', 1), T('des commandes', 'paper', 1), T('*toute l’année.*', 'lime', 2), P('vest', 3), E('CAVE', 3)] },
];

function pageJS(cards) {
  return `
  const B=${BEAT}; const tl=gsap.timeline({paused:true}); window.SFX=[];
  const ev=(t,type)=>window.SFX.push({t:+t.toFixed(4),type});
  // fit text
  document.querySelectorAll('.tx').forEach(el=>{ let fs=760; el.style.fontSize=fs+'px';
    const maxW=920, maxH=1050;
    while(fs>60 && ([...el.children].some(l=>l.scrollWidth>maxW) || el.offsetHeight>maxH)){ fs-=6; el.style.fontSize=fs+'px'; }
    el.style.marginTop=(-el.offsetHeight/2-40)+'px';
    const cap=el.parentElement.querySelector('.cap'); if(cap) cap.style.top=(960+el.offsetHeight/2-20)+'px'; });
  const cards=${JSON.stringify(cards.map(c => ({ k: c.k, beats: c.beats, th: c.th || '', q: c.q || '' })))};
  let t=0;
  cards.forEach((c,i)=>{ const id='#c'+i, d=c.beats*B, el=document.querySelector(id);
    tl.set(id,{visibility:'visible'},t); if(i>0) tl.set('#c'+(i-1),{visibility:'hidden'},t);
    if(c.k==='T'){ const lines=[...el.querySelectorAll('.l')];
      const steps=Math.min(lines.length,c.beats);
      lines.forEach((l,j)=>{ const st=t+Math.floor(j*steps/lines.length)*B; if(st>t) { tl.set(l,{visibility:'hidden'},t); tl.set(l,{visibility:'visible'},st); ev(st,'tick'); } });
      tl.fromTo(el.querySelector('.tx'),{scale:1.08},{scale:1,duration:.16,ease:'power3.out'},t);
      tl.fromTo(el.querySelector('.tx'),{x:0},{x:-18,duration:d,ease:'none'},t);
      ev(t, c.th==='lime'?'impact':'cut'); }
    if(c.k==='G'){ const q=el.querySelector('.q'), txt=q.dataset.q; const dur=d*0.7;
      for(let j=1;j<=txt.length;j++){ const tt=t+.1+dur*(j-1)/txt.length; tl.set(q,{textContent:txt.slice(0,j)},tt); ev(tt, txt[j-1]===' '?'space':'key'); }
      tl.to(el.querySelector('.caret'),{opacity:0,duration:.01,repeat:Math.floor(d/.25),yoyo:true,repeatDelay:.24},t); ev(t,'cut'); }
    if(c.k==='P'){ tl.fromTo(el.querySelector('.shot'),{scale:1.0},{scale:1.08,duration:d,ease:'none'},t);
      tl.fromTo(el.querySelector('.win'),{y:80},{y:0,duration:.35,ease:'power3.out'},t);
      const bk=t+B*Math.min(2,c.beats-1); ['.big','.bl'].forEach(q=>{ tl.set(el.querySelector(q),{visibility:'hidden'},t); tl.set(el.querySelector(q),{visibility:'visible'},bk); });
      tl.fromTo(el.querySelector('.big'),{scale:1.1,transformOrigin:'0 50%'},{scale:1,duration:.16,ease:'power3.out'},t+B*Math.min(2,c.beats-1));
      ev(t,'whoosh'); ev(t+B*Math.min(2,c.beats-1),'impact'); }
    if(c.k==='S'){ const im=el.querySelector('.scroll'); tl.to(im,{y:-(+im.dataset.to),duration:d,ease:'power1.inOut'},t); ev(t,'whoosh'); }
    if(c.k==='E'){ tl.fromTo(el.querySelector('.w'),{scale:1.08,transformOrigin:'0 50%'},{scale:1,duration:.16,ease:'power3.out'},t);
      tl.set(el.querySelector('.k'),{visibility:'hidden'},t); tl.set(el.querySelector('.k'),{visibility:'visible'},t+B); ev(t,'end'); ev(t+B,'tick'); }
    t+=d; });
  tl.set({},{},t); window.DUR=t; window.tl=tl;`;
}

async function render(browser, r, outDir, mode) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style><script>${GSAP}</script></head><body>${r.cards.map(cardHTML).join('')}<script>document.fonts.load('700 100px "Space Grotesk"').then(()=>document.fonts.ready).then(()=>{${pageJS(r.cards)}}).catch(e=>{window.ERR=String(e&&e.stack||e)});</script></body></html>`;
  const hp = path.join(ROOT, 'reels3-out', 'html', r.slug + '.html');
  fs.mkdirSync(path.dirname(hp), { recursive: true }); fs.writeFileSync(hp, html);
  const page = await browser.newPage({ viewport: { width: RW, height: RH } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto('file://' + hp); await page.waitForFunction(() => !!(window.tl || window.ERR), null, { timeout: 20000 }); const perr = await page.evaluate(() => window.ERR); if (perr) throw new Error(perr); await page.waitForTimeout(300);
  // refit after fonts
  if (errs.length) throw new Error(r.slug + ': ' + errs.join('; '));
  const dur = await page.evaluate(() => window.DUR);
  fs.mkdirSync(outDir, { recursive: true });
  const evs = await page.evaluate(() => window.SFX.sort((a, b) => a.t - b.t));
  fs.mkdirSync(path.join(ROOT, 'reels3-out', 'sfx'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'reels3-out', 'sfx', r.slug + '.json'), JSON.stringify({ dur, bpm: BPM, events: evs }));
  const frames = Math.round(dur * FPS);
  const only = mode === 'frames' ? (process.env.FRAMES || '').split(',').map(Number) : null;
  let ff, done;
  if (!only) {
    ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', path.join(outDir, r.slug + '.mp4')]);
    done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  }
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    if (only && !only.some(x => Math.abs(x - t) < 1 / (2 * FPS))) continue;
    await page.evaluate(t => { window.tl.seek(t, false); }, t);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (only) fs.writeFileSync(path.join(outDir, `${r.slug}-t${t.toFixed(1)}.jpg`), buf);
    else if (!ff.stdin.write(buf)) await new Promise(res => ff.stdin.once('drain', res));
  }
  if (!only) { ff.stdin.end(); await done; }
  await page.evaluate(() => { window.tl.seek(0.05, false); });
  await page.screenshot({ path: path.join(outDir, r.slug + '-cover.jpg'), type: 'jpeg', quality: 92 });
  await page.close();
  console.log('ok', r.slug, dur.toFixed(2) + 's');
}

(async () => {
  const sel = process.argv[2]; const mode = process.env.FRAMES ? 'frames' : 'mp4';
  const browser = await chromium.launch();
  for (const r of REELS) { if (sel && !r.slug.includes(sel)) continue; await render(browser, r, path.join(ROOT, 'reels3-out', mode), mode); }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

// WebAlp — Instagram carousels 4:5 (1080x1350). Panorama render → slices.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const W = 1080, H = 1350;
const ROOT = __dirname;
const FONTS = fs.readFileSync(path.join(ROOT, 'fonts.css'), 'utf8');

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


async function render(carousels, outRoot, only) {
  const browser = await chromium.launch();
  for (const c of carousels) {
    if (only && !c.slug.startsWith(only)) continue;
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head>
      <body class="${c.theme}" style="width:${W * c.n}px">${c.slides.join('')}${c.deco}<div class="grain"></div></body></html>`;
    const hp = path.join(outRoot, 'html', `${c.slug}.html`);
    fs.mkdirSync(path.dirname(hp), { recursive: true });
    fs.writeFileSync(hp, html);
    const page = await browser.newPage({ viewport: { width: W * c.n, height: H } });
    await page.goto('file://' + hp);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    const outDir = path.join(outRoot, 'out', c.slug);
    fs.mkdirSync(outDir, { recursive: true });
    for (let i = 0; i < c.n; i++) {
      await page.screenshot({ path: path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`), clip: { x: i * W, y: 0, width: W, height: H } });
    }
    await page.close();
    console.log('ok', c.slug);
  }
  await browser.close();
}
module.exports = { W, H, CSS, slide, ck, xx, arrow, star, stars, render };

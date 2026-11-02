# WebAlp Reels v3 — tech-house 124 BPM synthétisée + bruitages calés sur les coupes.
import json, os, sys, wave
import numpy as np

SR = 44100
R = np.random.default_rng(3)

def fftf(x, lo=None, hi=None, slope=1.0):
    """Filtre en fréquence (passe-haut lo / passe-bas hi) avec pente douce."""
    n = len(x)
    if n < 8: return x
    X = np.fft.rfft(x); f = np.fft.rfftfreq(n, 1 / SR); g = np.ones_like(f)
    if lo: g *= 1 / (1 + (lo / np.maximum(f, 1)) ** (2 * slope))
    if hi: g *= 1 / (1 + (f / hi) ** (2 * slope))
    return np.fft.irfft(X * g, n)

def env(n, tau, att=0.002):
    t = np.arange(n) / SR
    return np.minimum(1, t / att) * np.exp(-t / tau) if att else np.exp(-t / tau)

def nz(n): return R.standard_normal(n)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)

def saw(f, n, k_max=16, bright=6.0, det=0.0):
    t = np.arange(n) / SR; y = np.zeros(n)
    for k in range(1, k_max + 1):
        if f * k > 16000: break
        y += np.sin(2 * np.pi * f * (1 + det) * k * t) * (1 / k) * np.exp(-k / bright)
    return y

def reverb(x, secs=1.1, wet=.25, hi=7000):
    n = int(secs * SR); t = np.arange(n) / SR
    out = []
    for ch in range(2):
        ir = R.standard_normal(n) * np.exp(-t / (secs / 5))
        ir[:int(.012 * SR)] = 0
        ir = fftf(ir, lo=200, hi=hi); ir /= np.sqrt((ir ** 2).sum())
        L = len(x) + n; y = np.fft.irfft(np.fft.rfft(x, L) * np.fft.rfft(ir, L), L)[:len(x)]
        out.append(y * wet)
    return out

# ─────────── drums & instruments ───────────
def kick():
    n = int(.42 * SR); t = np.arange(n) / SR
    f = 47 + 120 * np.exp(-t / .035)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .16, .001)
    y += fftf(nz(n), lo=2500) * env(n, .003, .0002) * .35
    return np.tanh(y * 1.6) * .95

def clap():
    n = int(.35 * SR); y = np.zeros(n)
    for i, o in enumerate([0, .009, .019, .028]):
        s = int(o * SR); m = n - s
        y[s:] += nz(m) * env(m, .006 if i < 3 else .07, .0005)
    return fftf(y, lo=1000, hi=7000) * .55

def hat(open_=False):
    n = int((.16 if open_ else .04) * SR)
    return fftf(nz(n), lo=7500) * env(n, .055 if open_ else .009, .0005) * (.32 if open_ else .2)

def bass_note(m, dur):
    n = int(dur * SR); f = mtof(m)
    y = saw(f, n, k_max=8, bright=2.2) * 1.2 + np.sin(2 * np.pi * f * np.arange(n) / SR) * .8
    e = env(n, dur * .7, .004); e[-200:] *= np.linspace(1, 0, 200)
    return y * e * .32

def stab(root, ivs, dur=.32):
    n = int(dur * SR); y = np.zeros(n)
    for i in ivs:
        for d in (-.004, .0, .004):
            y += saw(mtof(root + i), n, k_max=14, bright=5, det=d)
    return y * env(n, .12, .003) * .11

def riser(dur):
    n = int(dur * SR); t = np.arange(n) / SR
    y = nz(n); out = np.zeros(n); seg = 2048
    for s in range(0, n, seg):
        c = .05 + .95 * (s / n)
        out[s:s + seg] = fftf(y[s:s + seg], lo=400 + 6000 * c, hi=1200 + 9000 * c)
    return out * (t / dur) ** 2.2 * .25

def impact(big=False):
    n = int((1.2 if big else .55) * SR); t = np.arange(n) / SR
    f = 38 + 60 * np.exp(-t / .06)
    y = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .35 if big else .18, .001) * (.9 if big else .55)
    y += fftf(nz(n), hi=3500) * env(n, .09 if big else .05, .001) * (.5 if big else .3)
    return y

def click(level=.18):
    n = int(.012 * SR); return fftf(nz(n), lo=3000) * env(n, .002, .0002) * level

def key():
    n = int(.03 * SR)
    y = fftf(nz(n), lo=2200, hi=9000) * env(n, .005, .0003) * .35
    return y * R.uniform(.7, 1)

PROG = [  # (racine, accords en intervalles) — 5 mesures
    [0, 0, -4, -2, 0], [0, -2, -4, -5, 0], [0, 3, -4, -2, 0], [0, 0, 5, 3, 0], [0, -4, -5, -2, 0]]

def track(dur, bpm, root, prog, seed):
    global R
    R = np.random.default_rng(seed)
    B = 60 / bpm; n = int((dur + 1.4) * SR)
    L = np.zeros(n); Rt = np.zeros(n); send = np.zeros(n); KB = np.zeros(n)
    end_beat = round(dur / B) - 3  # la carte de fin dure 3 temps
    K, C, H, OH = kick(), clap(), hat(), hat(True)
    def add(buf, s, t, g=1.0):
        o = int(t * SR)
        if o >= n or o + len(s) <= 0: return
        if o < 0: s = s[-o:]; o = 0
        m = min(len(s), n - o); buf[o:o + m] += s[:m] * g
    duck = np.ones(n)
    nbeats = end_beat + 1
    for b in range(nbeats):
        t = b * B; bar = b // 4; pos = b % 4
        r = root + prog[min(bar, len(prog) - 1)]
        # kick
        add(KB, K, t, .78)
        o = int(t * SR); m = min(int(.22 * SR), n - o)
        duck[o:o + m] = np.minimum(duck[o:o + m], .35 + .65 * (np.arange(m) / m) ** .6)
        if b == end_beat: break
        if b >= 4:
            if pos in (1, 3):
                add(L, C, t); add(Rt, C, t + .002); add(send, C, t, .9)
        # hats
        add(L, OH, t + B / 2, .8); add(Rt, OH, t + B / 2 + .003)
        for q in range(4):
            if q != 2: add(L, H, t + q * B / 4, .5 + .3 * (q % 2)); add(Rt, H, t + q * B / 4 + .004, .6)
        # bass rolling (contre-temps)
        if b >= 2:
            add(L, bass_note(r - 24, B * .42), t + B / 2); add(Rt, bass_note(r - 24, B * .42), t + B / 2)
            if pos == 3: add(L, bass_note(r - 12, B * .2), t + B * .75, .6); add(Rt, bass_note(r - 12, B * .2), t + B * .75, .6)
        # stabs syncopés
        if b >= 4 and pos in (0, 2):
            s = stab(r, [0, 3, 7, 10, 14])
            tt = t + B * (.75 if pos == 0 else .5)
            add(L, s, tt, .9); add(Rt, s, tt + .006); add(send, s, tt, .8)
    # riser avant la carte de fin + impact final avec accord long
    te = end_beat * B
    rs = riser(B * 4); add(L, rs, te - B * 4); add(Rt, rs, te - B * 4)
    fin = np.zeros(int(2.0 * SR))
    for i in [0, 3, 7, 10, 14]:
        for d in (-.005, 0, .005):
            fin += saw(mtof(root + i), len(fin), 12, 4, d) * env(len(fin), .6, .004) * .06
    add(L, fin, te); add(Rt, fin, te + .008); add(send, fin, te, 1.0)
    bl = bass_note(root - 24, 1.2); add(L, bl, te, 1.3); add(Rt, bl, te, 1.3)
    # sidechain sur tout sauf le kick : on recompose
    rvL, rvR = reverb(send, 1.3, .32)
    L = L * duck + rvL + KB; Rt = Rt * duck + rvR + KB
    return L[:int((dur + 1.0) * SR)], Rt[:int((dur + 1.0) * SR)]

def sfx_layer(events, n):
    L = np.zeros(n); Rr = np.zeros(n)
    def add(s, t, g=1.0, pan=0.0):
        o = int(t * SR)
        if o < 0: s = s[-o:]; o = 0
        if o >= n: return
        m = min(len(s), n - o); L[o:o + m] += s[:m] * g * (1 - pan); Rr[o:o + m] += s[:m] * g * (1 + pan)
    for e in events:
        t, k = e['t'], e['type']
        if k == 'cut' and t > .01: add(click(.22), t)
        elif k == 'tick': add(click(.14), t)
        elif k == 'impact': add(impact(), t, .9)
        elif k == 'whoosh':
            w = riser(.32); add(w, t - .32, 1.2)
        elif k == 'key': add(key(), t, 1.0, .25)
        elif k == 'space': add(key() * .8, t, 1.0, .25)
        elif k == 'end': add(impact(True), t, 1.0)
    return L, Rr

def build(js, out):
    d = json.load(open(js)); dur = d['dur']; bpm = d['bpm']
    idx = sum(map(ord, os.path.basename(js))) % 5
    roots = [57, 53, 55, 50, 52]
    L, Rr = track(dur, bpm, roots[idx], PROG[idx], seed=11 + idx)
    n = len(L)
    sL, sR = sfx_layer(d['events'], n)
    L = L * .8 + sL * .75; Rr = Rr * .8 + sR * .75
    L = fftf(L, lo=28); Rr = fftf(Rr, lo=28)
    pk = max(np.abs(L).max(), np.abs(Rr).max()); g = 1 / pk
    L = np.tanh(L * g * 1.4) / np.tanh(1.4); Rr = np.tanh(Rr * g * 1.4) / np.tanh(1.4)
    fo = int(.5 * SR); fade = np.ones(n); fade[-fo:] = np.linspace(1, 0, fo) ** 2
    st = np.stack([L * fade, Rr * fade], 1)
    pcm = (np.clip(st, -1, 1) * 32767 * .92).astype('<i2')
    with wave.open(out, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

if __name__ == '__main__':
    src, dst = sys.argv[1], sys.argv[2]; os.makedirs(dst, exist_ok=True)
    for f in sorted(os.listdir(src)):
        if f.endswith('.json'):
            build(os.path.join(src, f), os.path.join(dst, f[:-5] + '.wav')); print('wav', f[:-5])

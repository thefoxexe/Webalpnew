# WebAlp — bande son des Reels : musique lo-fi originale (synthèse) + bruitages calés sur les événements.
import json, sys, os, wave
import numpy as np

SR = 44100
rng = np.random.default_rng(7)

def env_exp(n, tau, attack=0.004):
    t = np.arange(n) / SR
    a = np.clip(t / attack, 0, 1) if attack > 0 else 1
    return a * np.exp(-t / tau)

def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y

def hp(x, fc):
    return x - onepole_lp(x, fc)

def noise(n):
    return rng.standard_normal(n)

def tone(f, dur, harm=(1, .3, .1), tau=1.0, attack=.008, detune=0.0):
    n = int(dur * SR); t = np.arange(n) / SR
    y = np.zeros(n)
    for k, a in enumerate(harm, 1):
        y += a * np.sin(2 * np.pi * f * k * t * (1 + detune))
    return y * env_exp(n, tau, attack)

def mtof(m):
    return 440 * 2 ** ((m - 69) / 12)

# ───────────── SFX ─────────────
def sfx(kind):
    if kind == 'key':
        n = int(.035 * SR); y = hp(noise(n), 2500) * env_exp(n, .006, .0005) * .5
        y += tone(rng.uniform(1500, 2100), .035, (1,), .008, .0005) * .25
        return y * rng.uniform(.7, 1.0)
    if kind == 'space':
        n = int(.05 * SR); return hp(noise(n), 900) * env_exp(n, .01, .0005) * .45
    if kind == 'calc':
        y = tone(rng.uniform(620, 700), .07, (1, .2), .018, .0008) * .3
        n = len(y); y += hp(noise(n), 3000) * env_exp(n, .004, .0003) * .12
        return y
    if kind == 'tap':
        n = int(.06 * SR); return onepole_lp(noise(n), 1800) * env_exp(n, .012, .0005) * 1.2
    if kind == 'send':
        dur = .16; n = int(dur * SR); t = np.arange(n) / SR
        f = 520 + (1250 - 520) * (t / dur) ** .7
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, .06, .004) * .45
    if kind == 'recv':
        a = tone(1046, .16, (1, .15), .06, .002) * .4
        b = tone(1568, .22, (1, .15), .08, .002) * .35
        y = np.zeros(int(.3 * SR)); y[:len(a)] += a; o = int(.075 * SR); y[o:o + len(b)] += b
        return y
    if kind == 'typing':
        return np.zeros(10)
    if kind == 'notif':
        y = np.zeros(int(.9 * SR))
        for i, m in enumerate([84, 88, 91]):
            s = tone(mtof(m), .7, (1, .5, .25, .12), .28, .002) * .28
            o = int(i * .11 * SR); y[o:o + len(s)] += s[:len(y) - o]
        return y
    if kind == 'pop':
        dur = .09; n = int(dur * SR); t = np.arange(n) / SR
        f = 380 + 500 * (t / dur)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(n, .03, .002) * .5
    if kind in ('sticker', 'swish'):
        n = int(.18 * SR); t = np.arange(n) / SR
        e = np.sin(np.pi * t / t[-1]) ** 2
        return hp(onepole_lp(noise(n), 5000), 1200) * e * (.10 if kind == 'sticker' else .14)
    if kind == 'cut':
        n = int(.28 * SR); t = np.arange(n) / SR
        e = (t / t[-1]) ** 2 * np.exp(-((t - t[-1]) ** 2) / .002)
        return onepole_lp(noise(n), 2500) * e * .35
    if kind == 'scroll':
        n = int(.5 * SR); t = np.arange(n) / SR
        e = np.sin(np.pi * t / t[-1])
        return hp(onepole_lp(noise(n), 3000), 600) * e * .12
    if kind == 'vibrate':
        dur = .3; n = int(dur * SR); t = np.arange(n) / SR
        y = np.sign(np.sin(2 * np.pi * 170 * t)) * (0.5 + 0.5 * np.sin(2 * np.pi * 30 * t))
        return onepole_lp(y, 900) * np.minimum(1, (dur - t) / .03) * np.minimum(1, t / .01) * .35
    if kind == 'end':
        y = np.zeros(int(1.4 * SR))
        for m in [72, 76, 79, 84]:
            s = tone(mtof(m), 1.3, (1, .4, .15), .5, .004) * .14
            y[:len(s)] += s
        return y
    return np.zeros(10)

# ───────────── MUSIC ─────────────
PROGS = [
    [(57, [0, 3, 7, 10]), (53, [0, 4, 7, 11]), (48, [0, 4, 7, 11]), (55, [0, 4, 7, 9])],   # Am7 Fmaj7 Cmaj7 G6
    [(50, [0, 3, 7, 10]), (55, [0, 4, 7, 10]), (48, [0, 4, 7, 11]), (45, [0, 3, 7, 10])],   # Dm7 G7 Cmaj7 Am7
    [(52, [0, 3, 7, 10]), (57, [0, 3, 7, 10]), (50, [0, 4, 7, 11]), (55, [0, 4, 7, 11])],   # Em7 Am7 Dmaj7 Gmaj7
    [(53, [0, 4, 7, 11]), (52, [0, 3, 7, 10]), (50, [0, 3, 7, 10]), (48, [0, 4, 7, 11])],   # Fmaj7 Em7 Dm7 Cmaj7
]

def music(dur, bpm, prog_i, seed):
    r = np.random.default_rng(seed)
    n = int(dur * SR); L = np.zeros(n); R = np.zeros(n)
    beat = 60 / bpm; bar = beat * 4
    prog = PROGS[prog_i % len(PROGS)]
    kick_env = np.ones(n)
    nbars = int(np.ceil(dur / bar)) + 1
    def add(buf, sig, t0):
        o = int(t0 * SR)
        if o >= n: return
        m = min(len(sig), n - o)
        buf[o:o + m] += sig[:m]
    for b in range(nbars):
        t0 = b * bar
        root, iv = prog[b % len(prog)]
        # electric piano chord (lightly strummed)
        for k, i in enumerate(iv):
            f = mtof(root + 12 + i)
            s = tone(f, bar + .5, (1, .28, .08, .03), 1.6, .012, detune=r.uniform(-.0015, .0015)) * .07
            add(L, s, t0 + k * .012); add(R, s, t0 + k * .012 + .011)
        # a little melodic answer on beat 3.5
        if b % 2 == 1:
            m = root + 24 + r.choice(iv)
            s = tone(mtof(m), .6, (1, .2), .25, .004) * .05
            add(L, s * .7, t0 + beat * 2.5); add(R, s, t0 + beat * 2.5)
        # bass
        s = tone(mtof(root - 12), bar * .9, (1, .15), .9, .01) * .22
        add(L, s, t0); add(R, s, t0)
        s = tone(mtof(root - 12 + 7), beat * .9, (1, .15), .3, .01) * .12
        add(L, s, t0 + beat * 2.5); add(R, s, t0 + beat * 2.5)
        for q in range(8):
            tq = t0 + q * beat / 2 + (beat * .08 if q % 2 else 0)  # swing
            # hats
            hn = int(.035 * SR); h = hp(noise(hn), 7000) * env_exp(hn, .008, .0005) * (.045 if q % 2 else .065)
            add(L, h * .8, tq); add(R, h, tq + .004)
        for q in [0, 2.5]:
            tk = t0 + q * beat
            kn = int(.32 * SR); tt = np.arange(kn) / SR
            f = 45 + 75 * np.exp(-tt / .04)
            k = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_exp(kn, .14, .002) * .42
            add(L, k, tk); add(R, k, tk)
            o = int(tk * SR); m = min(int(.25 * SR), n - o)
            if m > 0: kick_env[o:o + m] = np.minimum(kick_env[o:o + m], .55 + .45 * (np.arange(m) / m))
        for q in [1, 3]:
            ts = t0 + q * beat
            sn = int(.22 * SR)
            sg = onepole_lp(hp(noise(sn), 1200), 6000) * env_exp(sn, .055, .001) * .16
            tb = tone(190, .12, (1,), .04, .001) * .08; sg[:len(tb)] += tb
            add(L, sg, ts); add(R, sg, ts + .003)
    # vinyl crackle + hiss
    crack = np.zeros(n); idx = r.integers(0, n, int(dur * 18)); crack[idx] = r.uniform(-.25, .25, len(idx))
    crack = onepole_lp(crack, 4000) * .5 + onepole_lp(noise(n), 3000) * .006
    L = L * kick_env + crack; R = R * kick_env + crack
    # warm it up
    L = onepole_lp(L, 7500); R = onepole_lp(R, 7500)
    fade = np.ones(n); fi = int(.25 * SR); fo = int(.7 * SR)
    fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
    return L * fade, R * fade

def build(slug, js, out_wav, bpm, prog_i, seed):
    d = json.load(open(js)); dur = d['dur'] + .2
    L, R = music(dur, bpm, prog_i, seed)
    L *= .9; R *= .9
    n = len(L)
    # duck music under a few sfx
    sfxL = np.zeros(n); sfxR = np.zeros(n)
    for e in d['events']:
        s = sfx(e['type'])
        o = int(e['t'] * SR); m = min(len(s), n - o)
        if m <= 0: continue
        pan = .5 if e['type'] in ('key', 'space', 'calc') else 0
        sfxL[o:o + m] += s[:m] * (1 - .2 * pan); sfxR[o:o + m] += s[:m] * (1 + .2 * pan - .2)
    L = L + sfxL; R = R + sfxR
    peak = max(np.abs(L).max(), np.abs(R).max())
    g = .89 / peak if peak > 0 else 1
    L = np.tanh(L * g * 1.1) / np.tanh(1.1); R = np.tanh(R * g * 1.1) / np.tanh(1.1)
    st = np.stack([L, R], 1)
    pcm = (np.clip(st, -1, 1) * 32767 * .9).astype('<i2')
    with wave.open(out_wav, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

if __name__ == '__main__':
    sfx_dir = sys.argv[1]; out_dir = sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)
    files = sorted(f for f in os.listdir(sfx_dir) if f.endswith('.json'))
    for i, f in enumerate(files):
        slug = f[:-5]
        build(slug, os.path.join(sfx_dir, f), os.path.join(out_dir, slug + '.wav'), bpm=[88, 92, 96, 84, 90][i % 5], prog_i=i, seed=100 + i)
        print('wav', slug)

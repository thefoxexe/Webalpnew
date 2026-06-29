import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, company, budget, message } = data

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'WebAlp Contact <contact@webalp.ch>',
          to: ['contact@webalp.ch'],
          reply_to: email,
          subject: `Nouveau message de ${name} — webalp.ch`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
              <h2 style="color:#0a0a0a">Nouveau message via webalp.ch</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#666;width:120px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#666">Entreprise</td><td style="padding:8px 0">${company || '—'}</td></tr>
                <tr><td style="padding:8px 0;color:#666">Budget</td><td style="padding:8px 0">${budget || '—'}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
              <p style="color:#333;line-height:1.6">${message.replace(/\n/g, '<br>')}</p>
            </div>
          `,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', err)
        return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
      }

      return NextResponse.json({ ok: true })
    }

    // Fallback: Netlify Forms server-side
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://webalp.ch'
    const encode = (d: Record<string, string>) =>
      Object.entries(d)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&')

    const netlifyRes = await fetch(siteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contactv2',
        name,
        email,
        company: company ?? '',
        budget: budget ?? '',
        message,
      }),
    })

    if (!netlifyRes.ok) {
      return NextResponse.json({ error: 'Erreur soumission' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

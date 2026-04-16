import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import {
    ensureDiagnosticoSchema,
    wasSubmittedToday,
    insertDiagnosticoLead,
} from '@/lib/diagnostico/db';
import type { AnswerValue, AreaId } from '@/lib/diagnostico/questions';

const VALID_LOCALES = ['es', 'en', 'de'] as const;
type Locale = (typeof VALID_LOCALES)[number];

type RequestBody = {
    email?: string;
    answers?: Record<string, AnswerValue>;
    locale?: string;
    score?: number;
    weakAreas?: AreaId[];
};

function isValidLocale(v: unknown): v is Locale {
    return typeof v === 'string' && (VALID_LOCALES as readonly string[]).includes(v);
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const FROM = process.env.RESEND_FROM || 'Le Sous Chef <onboarding@resend.dev>';
const INTERNAL_EMAIL = process.env.CONTACT_EMAIL || 'contact@lesouschef.com';
const SITE_URL = 'https://lesouschef.com';

const MESSAGES: Record<Locale, typeof es.Diagnostico> = {
    es: es.Diagnostico,
    en: en.Diagnostico,
    de: de.Diagnostico,
};

function buildLeadEmail(args: {
    locale: Locale;
    score: number;
    weakAreas: AreaId[];
}): { subject: string; html: string } {
    const { locale, score, weakAreas } = args;
    const t = MESSAGES[locale];
    const scoreInt = Math.round(score);
    const scoreSuffix = t.results.score_suffix.replace('{total}', '20');
    const eyebrow = t.intro.eyebrow;
    const heading = t.email.heading;
    const scoreLabel = t.results.score_label;
    const weakTitle = t.results.weak_title;
    const strongTitle = t.results.strong_title;
    const weakDescription = t.results.weak_description;
    const noWeak = t.results.no_weak;
    const outro = t.email.outro;
    const ctaLabel = t.results.cta_primary;
    const preheader = t.email.preheader;
    const ctaUrl = `${SITE_URL}/${locale}#contact`;

    const weakAreaList =
        weakAreas.length > 0
            ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:8px;">${weakAreas
                  .slice(0, 3)
                  .map((id) => {
                      const area = t.areas[id];
                      return `
                        <tr>
                            <td valign="top" width="18" style="padding:8px 10px 8px 0;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-size:18px;line-height:1;color:#D94F2B;">·</td>
                            <td valign="top" style="padding:8px 0;">
                                <p style="margin:0 0 3px 0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#D94F2B;">${area.name}</p>
                                <p style="margin:0;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-weight:300;font-size:14px;line-height:1.5;color:#3D3830;">${area.description}</p>
                            </td>
                        </tr>`;
                  })
                  .join('')}</table>`
            : '';

    const heroBlock =
        weakAreas.length > 0
            ? `<p style="margin:0 0 16px 0;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-weight:300;font-size:14px;line-height:1.55;color:#3D3830;">${weakDescription}</p>${weakAreaList}`
            : `<p style="margin:0;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;line-height:1.55;color:#3D3830;">${noWeak}</p>`;

    const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8"/>
<meta http-equiv="x-ua-compatible" content="ie=edge"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light only"/>
<meta name="supported-color-schemes" content="light only"/>
<title>${escapeHtml(t.email.subject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
body{margin:0;padding:0;background-color:#F5F0E8;}
a{color:#D94F2B;}
@media screen and (max-width:480px){
 .px{padding-left:20px!important;padding-right:20px!important;}
 .score-num{font-size:52px!important;}
 .title{font-size:28px!important;}
}
</style>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;visibility:hidden;opacity:0;color:transparent;height:0;width:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F0E8;">
  <tr>
    <td align="center" style="padding:48px 20px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#F5F0E8;">
        <tr>
          <td class="px" style="padding:0 0 48px 0;">
            <p style="margin:0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;font-weight:500;color:#8C8478;">LE SOUS CHEF</p>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:0 0 12px 0;">
            <p style="margin:0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#D94F2B;">${eyebrow}</p>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:0 0 32px 0;">
            <h1 class="title" style="margin:0;font-family:'Fraunces',Georgia,'Times New Roman',serif;font-weight:300;font-size:34px;line-height:1.12;color:#1A1814;letter-spacing:-0.01em;">${heading}</h1>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:28px 0;border-top:1px solid #EDE7D9;border-bottom:1px solid #EDE7D9;">
            <p style="margin:0 0 8px 0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#8C8478;">${scoreLabel}</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="baseline" style="padding:0;">
                  <span class="score-num" style="font-family:'Fraunces',Georgia,serif;font-weight:300;font-size:64px;line-height:1;color:#1A1814;">${scoreInt}</span>
                </td>
                <td valign="baseline" style="padding:0 0 0 10px;">
                  <span style="font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:13px;letter-spacing:0.05em;color:#8C8478;">${scoreSuffix}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:32px 0 16px 0;">
            <h2 style="margin:0 0 10px 0;font-family:'Fraunces',Georgia,serif;font-weight:300;font-style:italic;font-size:22px;line-height:1.25;color:#1A1814;">${weakAreas.length > 0 ? weakTitle : strongTitle}</h2>
            ${heroBlock}
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:36px 0 16px 0;border-top:1px solid #EDE7D9;">
            <p style="margin:0 0 24px 0;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-weight:300;font-size:15px;line-height:1.55;color:#3D3830;">${outro}</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="${ctaUrl}" style="display:inline-block;background-color:#D94F2B;color:#F5F0E8;font-family:'DM Sans',-apple-system,Helvetica,Arial,sans-serif;font-size:14px;font-weight:500;text-decoration:none;padding:12px 24px;border-radius:3px;">${ctaLabel}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:56px 0 24px 0;">
            <p style="margin:0 0 4px 0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#8C8478;">LE SOUS CHEF · DOZO TECH</p>
            <p style="margin:0;font-family:'DM Mono',ui-monospace,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8C8478;">SYSTEMS THAT BREATHE</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

    return { subject: t.email.subject, html };
}

export async function POST(req: Request) {
    let body: RequestBody;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const { email, answers, locale, score, weakAreas } = body;

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }
    if (!isValidLocale(locale)) {
        return NextResponse.json({ error: 'invalid_locale' }, { status: 400 });
    }
    if (typeof score !== 'number' || score < 0 || score > 20) {
        return NextResponse.json({ error: 'invalid_score' }, { status: 400 });
    }
    if (!Array.isArray(weakAreas)) {
        return NextResponse.json({ error: 'invalid_weak_areas' }, { status: 400 });
    }
    if (!answers || typeof answers !== 'object') {
        return NextResponse.json({ error: 'invalid_answers' }, { status: 400 });
    }

    const schemaOk = await ensureDiagnosticoSchema();
    if (!schemaOk) {
        return NextResponse.json({ error: 'db_unavailable' }, { status: 503 });
    }

    if (await wasSubmittedToday(email)) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
    }

    try {
        await insertDiagnosticoLead({ email, score, weakAreas, locale });
    } catch (e) {
        console.error('[diagnostico] insert failed:', e);
        return NextResponse.json({ error: 'db_insert_failed' }, { status: 500 });
    }

    const { subject, html } = buildLeadEmail({ locale, score, weakAreas });
    try {
        await resend.emails.send({ from: FROM, to: email, subject, html });
    } catch (e) {
        console.error('[diagnostico] resend to lead failed:', e);
    }

    try {
        const safeEmail = escapeHtml(email);
        const safeLocale = escapeHtml(locale);
        await resend.emails.send({
            from: FROM,
            to: INTERNAL_EMAIL,
            subject: `Diagnostico lead: ${email} (${Math.round(score)}/20)`,
            html: `<p><strong>Email:</strong> ${safeEmail}</p>
                   <p><strong>Score:</strong> ${Math.round(score)}/20</p>
                   <p><strong>Locale:</strong> ${safeLocale}</p>
                   <p><strong>Weak areas:</strong> ${
                       weakAreas.length > 0 ? weakAreas.join(', ') : '(none)'
                   }</p>`,
        });
    } catch (e) {
        console.error('[diagnostico] resend internal failed:', e);
    }

    return NextResponse.json({ ok: true });
}

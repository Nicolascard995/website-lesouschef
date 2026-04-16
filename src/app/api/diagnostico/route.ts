import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
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

const FROM = process.env.RESEND_FROM || 'Le Sous Chef <onboarding@resend.dev>';
const INTERNAL_EMAIL = process.env.CONTACT_EMAIL || 'contact@lesouschef.com';

const EMAIL_COPY: Record<
    Locale,
    {
        subject: string;
        intro: string;
        scoreLabel: string;
        weakLabel: string;
        noWeak: string;
        outro: string;
    }
> = {
    es: {
        subject: 'Tu diagnóstico operativo — Le Sous Chef',
        intro: 'Gracias por completar el diagnóstico. Este es tu resultado.',
        scoreLabel: 'Puntaje',
        weakLabel: 'Dónde se te escapa el margen',
        noWeak: 'Tu base operativa está ordenada. Ninguna área en rojo.',
        outro: 'Si querés que te avisemos cuando abra Le Sous Chef, respondé a este correo.',
    },
    en: {
        subject: 'Your operational audit — Le Sous Chef',
        intro: 'Thanks for completing the audit. Here is your result.',
        scoreLabel: 'Score',
        weakLabel: 'Where margin is leaking',
        noWeak: 'Your operational base is in order. Nothing in the red.',
        outro: 'If you want to know when Le Sous Chef opens, just reply to this email.',
    },
    de: {
        subject: 'Deine Betriebsdiagnose — Le Sous Chef',
        intro: 'Danke, dass du die Diagnose abgeschlossen hast. Hier ist dein Ergebnis.',
        scoreLabel: 'Punktzahl',
        weakLabel: 'Wo die Marge leckt',
        noWeak: 'Deine operative Basis ist in Ordnung. Nichts im roten Bereich.',
        outro:
            'Wenn du Bescheid bekommen willst, sobald Le Sous Chef öffnet, antworte einfach auf diese Mail.',
    },
};

function buildLeadEmail(args: {
    locale: Locale;
    score: number;
    weakAreas: AreaId[];
}): { subject: string; html: string } {
    const copy = EMAIL_COPY[args.locale];
    const scoreInt = Math.round(args.score);
    const weakBlock =
        args.weakAreas.length > 0
            ? `<ul>${args.weakAreas.map((a) => `<li>${a}</li>`).join('')}</ul>`
            : `<p>${copy.noWeak}</p>`;
    const html = `
        <p>${copy.intro}</p>
        <p><strong>${copy.scoreLabel}:</strong> ${scoreInt} / 20</p>
        <p><strong>${copy.weakLabel}:</strong></p>
        ${weakBlock}
        <p>${copy.outro}</p>
        <p>—<br/>Le Sous Chef · Dozo Tech</p>
    `;
    return { subject: copy.subject, html };
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
        await resend.emails.send({
            from: FROM,
            to: INTERNAL_EMAIL,
            subject: `Diagnostico lead: ${email} (${Math.round(score)}/20)`,
            html: `<p><strong>Email:</strong> ${email}</p>
                   <p><strong>Score:</strong> ${Math.round(score)}/20</p>
                   <p><strong>Locale:</strong> ${locale}</p>
                   <p><strong>Weak areas:</strong> ${
                       weakAreas.length > 0 ? weakAreas.join(', ') : '(none)'
                   }</p>`,
        });
    } catch (e) {
        console.error('[diagnostico] resend internal failed:', e);
    }

    return NextResponse.json({ ok: true });
}

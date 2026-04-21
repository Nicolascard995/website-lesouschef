'use server';

import { resend } from '@/lib/resend';
import { getSql, ensureLeadsSchema } from '@/lib/db';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@lesouschef.com';

type LeadResult = { success: true } | { success: false; error: string };

interface DeliveryOutcome {
    dbOk: boolean;
    emailOk: boolean;
    dbError?: string;
    emailError?: string;
}

async function deliverLead(args: {
    type: string;
    name: string;
    email: string;
    data: Record<string, unknown>;
    subject: string;
    html: string;
}): Promise<DeliveryOutcome> {
    const outcome: DeliveryOutcome = { dbOk: false, emailOk: false };

    // 1. Persist to Neon (Postgres)
    const sql = getSql();
    if (sql && (await ensureLeadsSchema())) {
        try {
            await sql`
                INSERT INTO leads (type, name, email, data)
                VALUES (${args.type}, ${args.name}, ${args.email}, ${JSON.stringify(args.data)}::jsonb)
            `;
            outcome.dbOk = true;
        } catch (e) {
            outcome.dbError = e instanceof Error ? e.message : 'Unknown DB error';
            console.error(`[lead:${args.type}] Neon insert failed:`, e);
        }
    } else {
        outcome.dbError = 'DATABASE_URL not configured';
        console.warn(`[lead:${args.type}] DB unavailable — skipping insert`);
    }

    // 2. Send email via Resend
    try {
        const { error: emailError } = await resend.emails.send({
            from: 'LeSousChef Leads <onboarding@resend.dev>',
            to: CONTACT_EMAIL,
            subject: args.subject,
            html: args.html,
        });
        if (emailError) {
            outcome.emailError = emailError.message;
            console.error(`[lead:${args.type}] Resend error:`, emailError);
        } else {
            outcome.emailOk = true;
        }
    } catch (e) {
        outcome.emailError = e instanceof Error ? e.message : 'Unknown email error';
        console.error(`[lead:${args.type}] Resend threw:`, e);
    }

    return outcome;
}

function decideResult(outcome: DeliveryOutcome): LeadResult {
    // Lead is "saved" if it landed somewhere reachable (DB or email).
    if (outcome.dbOk || outcome.emailOk) return { success: true };

    return {
        success: false,
        error: `Could not save your request. ${outcome.emailError || outcome.dbError || 'Please try again or write to ' + CONTACT_EMAIL}`,
    };
}

// ---------------------------------------------------------------------------

export async function submitShieldCalculatorLead(formData: {
    name: string;
    city: string;
    ticket: string;
    noshows: string;
    email: string;
    annualLoss?: number | null;
}): Promise<LeadResult> {
    const outcome = await deliverLead({
        type: 'shield_calculator',
        name: formData.name,
        email: formData.email,
        data: formData,
        subject: 'New Lead: Shield Calculator',
        html: `<p><strong>Name:</strong> ${formData.name}</p>
               <p><strong>Email:</strong> ${formData.email}</p>
               <p><strong>City:</strong> ${formData.city}</p>
               <p><strong>Ticket:</strong> ${formData.ticket}</p>
               <p><strong>No-shows:</strong> ${formData.noshows}</p>
               <p><strong>Annual Loss:</strong> ${formData.annualLoss}</p>`,
    });
    return decideResult(outcome);
}

export async function submitRadarQuizLead(formData: {
    name: string;
    email: string;
    score: number;
    answers?: Record<string, unknown>;
}): Promise<LeadResult> {
    const outcome = await deliverLead({
        type: 'radar_quiz',
        name: formData.name,
        email: formData.email,
        data: formData,
        subject: 'New Lead: Radar Quiz',
        html: `<p><strong>Name:</strong> ${formData.name}</p>
               <p><strong>Email:</strong> ${formData.email}</p>
               <p><strong>Score:</strong> ${formData.score}</p>
               <pre>${JSON.stringify(formData.answers, null, 2)}</pre>`,
    });
    return decideResult(outcome);
}

export async function submitControlQualifyLead(formData: {
    role: string;
    revenue: string;
    painPoint: string;
    name: string;
    email: string;
    phone: string;
    businessName: string;
}): Promise<LeadResult> {
    const outcome = await deliverLead({
        type: 'control_qualify',
        name: formData.name,
        email: formData.email,
        data: formData,
        subject: 'New Lead: Control Qualify',
        html: `<p><strong>Name:</strong> ${formData.name}</p>
               <p><strong>Business Name:</strong> ${formData.businessName}</p>
               <p><strong>Email:</strong> ${formData.email}</p>
               <p><strong>Phone:</strong> ${formData.phone}</p>
               <p><strong>Role:</strong> ${formData.role}</p>
               <p><strong>Revenue:</strong> ${formData.revenue}</p>
               <p><strong>Pain Point:</strong> ${formData.painPoint}</p>`,
    });
    return decideResult(outcome);
}

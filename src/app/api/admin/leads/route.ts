import { getSql } from '@/lib/db';
import { ensureDiagnosticoSchema } from '@/lib/diagnostico/db';

type LeadRow = {
    email: string;
    score: number | string;
    weak_areas: string[] | null;
    locale: string;
    created_at: Date | string;
};

function csvCell(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const expected = process.env.ADMIN_TOKEN;

    if (!expected || !token || token !== expected) {
        return new Response('unauthorized', { status: 401 });
    }

    const ok = await ensureDiagnosticoSchema();
    if (!ok) return new Response('db_unavailable', { status: 503 });

    const sql = getSql();
    if (!sql) return new Response('db_unavailable', { status: 503 });

    let rows: LeadRow[];
    try {
        rows = (await sql`
            SELECT email, score, weak_areas, locale, created_at
            FROM diagnostico_leads
            ORDER BY created_at DESC
        `) as LeadRow[];
    } catch (e) {
        console.error('[admin/leads] query failed:', e);
        return new Response('db_query_failed', { status: 500 });
    }

    const header = 'email,score,weak_areas,locale,created_at\n';
    const lines = rows
        .map((r) => {
            const weak = Array.isArray(r.weak_areas) ? r.weak_areas.join('|') : '';
            const createdAt =
                r.created_at instanceof Date
                    ? r.created_at.toISOString()
                    : new Date(r.created_at).toISOString();
            return [
                csvCell(r.email),
                String(r.score),
                csvCell(weak),
                csvCell(r.locale),
                createdAt,
            ].join(',');
        })
        .join('\n');

    return new Response(header + lines, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="diagnostico_leads.csv"',
            'Cache-Control': 'no-store',
        },
    });
}

import { neon } from '@neondatabase/serverless';

// Neon serverless driver — uses HTTP fetch, works on Vercel Functions
// without connection pooling concerns. Lazy-initialized so missing
// DATABASE_URL doesn't crash the build.

let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
    if (_sql) return _sql;

    const url = process.env.DATABASE_URL;
    if (!url) {
        console.warn('[db] DATABASE_URL not set — DB queries will be skipped');
        return null;
    }

    _sql = neon(url);
    return _sql;
}

let _schemaReady = false;

/**
 * Ensure the leads table exists. Runs once per Vercel function instance.
 * Safe to call from any server action — idempotent.
 */
export async function ensureLeadsSchema(): Promise<boolean> {
    if (_schemaReady) return true;

    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS leads (
                id          SERIAL PRIMARY KEY,
                type        TEXT NOT NULL,
                name        TEXT,
                email       TEXT,
                data        JSONB,
                created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `;
        _schemaReady = true;
        return true;
    } catch (e) {
        console.error('[db] Failed to ensure leads schema:', e);
        return false;
    }
}

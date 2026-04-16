import { getSql } from '../db';
import type { AreaId } from './questions';

let _schemaReady = false;

export async function ensureDiagnosticoSchema(): Promise<boolean> {
  if (_schemaReady) return true;

  const sql = getSql();
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS diagnostico_leads (
        id          BIGSERIAL PRIMARY KEY,
        email       TEXT NOT NULL,
        score       NUMERIC(4,2) NOT NULL,
        weak_areas  TEXT[] NOT NULL,
        locale      TEXT NOT NULL DEFAULT 'es',
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_diagnostico_leads_created
        ON diagnostico_leads (created_at DESC)
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_diagnostico_leads_email
        ON diagnostico_leads (email)
    `;
    _schemaReady = true;
    return true;
  } catch (e) {
    console.error('[diagnostico] Failed to ensure schema:', e);
    return false;
  }
}

export type DiagnosticoLeadInsert = {
  email: string;
  score: number;
  weakAreas: AreaId[];
  locale: string;
};

export async function wasSubmittedToday(email: string): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;

  const rows = (await sql`
    SELECT 1 FROM diagnostico_leads
    WHERE email = ${email}
      AND created_at > NOW() - INTERVAL '24 hours'
    LIMIT 1
  `) as unknown[];
  return rows.length > 0;
}

export async function insertDiagnosticoLead(
  lead: DiagnosticoLeadInsert,
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;

  await sql`
    INSERT INTO diagnostico_leads (email, score, weak_areas, locale)
    VALUES (${lead.email}, ${lead.score}, ${lead.weakAreas}, ${lead.locale})
  `;
  return true;
}

import { getSql } from '../db';

let _schemaReady = false;

export async function ensureProductDownloadsSchema(): Promise<boolean> {
    if (_schemaReady) return true;

    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS product_downloads (
                id          BIGSERIAL PRIMARY KEY,
                lang        TEXT NOT NULL,
                ip          TEXT,
                user_agent  TEXT,
                created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `;
        await sql`
            CREATE INDEX IF NOT EXISTS idx_product_downloads_lang
              ON product_downloads (lang)
        `;
        await sql`
            CREATE INDEX IF NOT EXISTS idx_product_downloads_created
              ON product_downloads (created_at DESC)
        `;
        _schemaReady = true;
        return true;
    } catch (e) {
        console.error('[product-downloads] Failed to ensure schema:', e);
        return false;
    }
}

export type ProductDownloadInsert = {
    lang: string;
    ip: string | null;
    userAgent: string | null;
};

export async function insertProductDownload(
    rec: ProductDownloadInsert,
): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            INSERT INTO product_downloads (lang, ip, user_agent)
            VALUES (${rec.lang}, ${rec.ip}, ${rec.userAgent})
        `;
        return true;
    } catch (e) {
        console.error('[product-downloads] insert failed:', e);
        return false;
    }
}

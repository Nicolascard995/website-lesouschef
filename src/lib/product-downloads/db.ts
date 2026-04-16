import { getSql } from '../db';

let _downloadsReady = false;
let _purchasesReady = false;

export async function ensureProductDownloadsSchema(): Promise<boolean> {
    if (_downloadsReady) return true;

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
            ALTER TABLE product_downloads
              ADD COLUMN IF NOT EXISTS order_id TEXT
        `;
        await sql`
            CREATE INDEX IF NOT EXISTS idx_product_downloads_lang
              ON product_downloads (lang)
        `;
        await sql`
            CREATE INDEX IF NOT EXISTS idx_product_downloads_created
              ON product_downloads (created_at DESC)
        `;
        _downloadsReady = true;
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
    orderId: string | null;
};

export async function insertProductDownload(
    rec: ProductDownloadInsert,
): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            INSERT INTO product_downloads (lang, ip, user_agent, order_id)
            VALUES (${rec.lang}, ${rec.ip}, ${rec.userAgent}, ${rec.orderId})
        `;
        return true;
    } catch (e) {
        console.error('[product-downloads] insert failed:', e);
        return false;
    }
}

export async function ensureProductPurchasesSchema(): Promise<boolean> {
    if (_purchasesReady) return true;

    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS product_purchases (
                id                BIGSERIAL PRIMARY KEY,
                provider          TEXT NOT NULL DEFAULT 'lemonsqueezy',
                provider_order_id TEXT NOT NULL,
                email             TEXT,
                status            TEXT NOT NULL DEFAULT 'pending',
                created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `;
        await sql`
            CREATE UNIQUE INDEX IF NOT EXISTS idx_product_purchases_order
              ON product_purchases (provider_order_id)
        `;
        _purchasesReady = true;
        return true;
    } catch (e) {
        console.error('[product-purchases] Failed to ensure schema:', e);
        return false;
    }
}

export type ProductPurchaseUpsert = {
    providerOrderId: string;
    email: string | null;
    status: string;
};

export async function upsertProductPurchase(
    p: ProductPurchaseUpsert,
): Promise<boolean> {
    const sql = getSql();
    if (!sql) return false;

    try {
        await sql`
            INSERT INTO product_purchases (provider_order_id, email, status)
            VALUES (${p.providerOrderId}, ${p.email}, ${p.status})
            ON CONFLICT (provider_order_id)
              DO UPDATE SET
                email = COALESCE(EXCLUDED.email, product_purchases.email),
                status = EXCLUDED.status
        `;
        return true;
    } catch (e) {
        console.error('[product-purchases] upsert failed:', e);
        return false;
    }
}

export type ProductPurchaseRow = {
    provider_order_id: string;
    email: string | null;
    status: string;
    created_at: Date | string;
};

export async function findProductPurchase(
    providerOrderId: string,
): Promise<ProductPurchaseRow | null> {
    const sql = getSql();
    if (!sql) return null;

    try {
        const rows = (await sql`
            SELECT provider_order_id, email, status, created_at
            FROM product_purchases
            WHERE provider_order_id = ${providerOrderId}
            LIMIT 1
        `) as ProductPurchaseRow[];
        return rows[0] ?? null;
    } catch (e) {
        console.error('[product-purchases] find failed:', e);
        return null;
    }
}

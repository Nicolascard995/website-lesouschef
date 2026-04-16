import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
    ensureProductDownloadsSchema,
    ensureProductPurchasesSchema,
    findProductPurchase,
    insertProductDownload,
} from '@/lib/product-downloads/db';

const VALID_LANGS = ['es', 'en', 'de'] as const;
type Lang = (typeof VALID_LANGS)[number];

function isValidLang(v: string | null): v is Lang {
    return v !== null && (VALID_LANGS as readonly string[]).includes(v);
}

function filenameFor(lang: Lang): string {
    return `food-cost-tracker-${lang.toUpperCase()}.xlsx`;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const lang = url.searchParams.get('lang');
    const orderId = url.searchParams.get('order_id');

    if (!isValidLang(lang)) {
        return NextResponse.json({ error: 'Invalid lang' }, { status: 400 });
    }

    if (!orderId) {
        return NextResponse.json({ error: 'Payment required' }, { status: 403 });
    }

    await ensureProductPurchasesSchema();

    const purchase = await findProductPurchase(orderId);
    if (!purchase) {
        return NextResponse.json({ error: 'Order not found' }, { status: 403 });
    }
    if (purchase.status !== 'paid') {
        return NextResponse.json({ error: 'Payment pending' }, { status: 403 });
    }

    await ensureProductDownloadsSchema();

    const ip = req.headers.get('x-forwarded-for');
    const userAgent = req.headers.get('user-agent');
    await insertProductDownload({ lang, ip, userAgent, orderId });

    const filePath = path.join(
        process.cwd(),
        'public',
        'downloads',
        filenameFor(lang),
    );

    let buffer: Buffer;
    try {
        buffer = await readFile(filePath);
    } catch (e) {
        console.error(
            '[download:food-cost-tracker] readFile failed:',
            filePath,
            e,
        );
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
            'Content-Type':
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="food-cost-tracker.xlsx"',
            'Cache-Control': 'no-store',
        },
    });
}

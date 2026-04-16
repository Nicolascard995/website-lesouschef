import { createHmac, timingSafeEqual } from 'node:crypto';
import {
    ensureProductPurchasesSchema,
    upsertProductPurchase,
} from '@/lib/product-downloads/db';

type LSOrderPayload = {
    meta?: { event_name?: string };
    data?: {
        id?: string | number;
        attributes?: {
            user_email?: string;
            status?: string;
        };
    };
};

function verifySignature(
    rawBody: string,
    header: string | null,
    secret: string,
): boolean {
    if (!header || !secret) return false;
    try {
        const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
        const a = Buffer.from(expected, 'hex');
        const b = Buffer.from(header, 'hex');
        if (a.length !== b.length) return false;
        return timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

export async function POST(req: Request) {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
        console.error(
            '[lemonsqueezy:webhook] LEMONSQUEEZY_WEBHOOK_SECRET not set',
        );
        return new Response('unauthorized', { status: 401 });
    }

    const raw = await req.text();
    const signature = req.headers.get('x-signature');
    if (!verifySignature(raw, signature, secret)) {
        return new Response('unauthorized', { status: 401 });
    }

    let body: LSOrderPayload;
    try {
        body = JSON.parse(raw);
    } catch {
        return new Response('invalid_json', { status: 400 });
    }

    const eventName = body.meta?.event_name;
    if (eventName !== 'order_created') {
        return new Response('ignored', { status: 200 });
    }

    const orderId = body.data?.id;
    const email = body.data?.attributes?.user_email ?? null;
    const status = body.data?.attributes?.status ?? 'pending';

    if (!orderId) {
        console.error(
            '[lemonsqueezy:webhook] order_created without data.id',
        );
        return new Response('missing_order_id', { status: 400 });
    }

    await ensureProductPurchasesSchema();
    const ok = await upsertProductPurchase({
        providerOrderId: String(orderId),
        email,
        status,
    });

    if (!ok) {
        return new Response('db_error', { status: 500 });
    }

    return new Response('ok', { status: 200 });
}

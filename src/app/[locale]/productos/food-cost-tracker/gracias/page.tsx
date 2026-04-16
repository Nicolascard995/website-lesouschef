import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import GraciasPicker from './GraciasPicker';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ProductSection' });
    return {
        title: `${t('title')} — ${t('gracias.title_es')}`,
        robots: { index: false, follow: false },
    };
}

export default async function GraciasPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ order_id?: string }>;
}) {
    const { locale } = await params;
    const { order_id: orderId } = await searchParams;
    const t = await getTranslations({
        locale,
        namespace: 'ProductSection.gracias',
    });

    if (!orderId) {
        return (
            <section className="min-h-[100svh] flex flex-col items-center justify-center bg-cream px-6 py-16">
                <div className="max-w-xl text-center">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                        Food Cost Tracker
                    </p>
                    <h1
                        className="mb-4 font-display font-light italic text-ink"
                        style={{ fontSize: 'clamp(28px,4vw,40px)' }}
                    >
                        {t('missing_order_title')}
                    </h1>
                    <p className="mb-8 font-body font-light text-ink-mid">
                        {t('missing_order_body')}
                    </p>
                    <Link
                        href="/"
                        className="inline-block rounded-[3px] bg-ember px-6 py-[0.7rem] text-sm font-medium text-cream transition-opacity hover:opacity-90"
                    >
                        {t('back_home')}
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <GraciasPicker
            orderId={orderId}
            messages={{
                title_es: t('title_es'),
                title_en: t('title_en'),
                title_de: t('title_de'),
                subtitle_es: t('subtitle_es'),
                subtitle_en: t('subtitle_en'),
                subtitle_de: t('subtitle_de'),
            }}
        />
    );
}

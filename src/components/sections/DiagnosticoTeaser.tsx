'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import ScrollReveal from '../atoms/ScrollReveal';

export default function DiagnosticoTeaser() {
    const t = useTranslations('Diagnostico.teaser');

    return (
        <section
            className="bg-cream-dark py-24 md:py-28"
            style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
        >
            <div className="max-w-[1200px] mx-auto">
                <ScrollReveal mode="slide-up">
                    <div className="max-w-[720px]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
                            {t('eyebrow')}
                        </p>
                        <h2
                            className="font-display font-light italic leading-[1.08] text-ink"
                            style={{ fontSize: 'clamp(32px,4.4vw,52px)' }}
                        >
                            {t('title')}
                        </h2>
                        <p
                            className="mt-5 max-w-[620px] font-body font-light leading-[1.5] text-ink-mid"
                            style={{ fontSize: 'clamp(15px,1.6vw,18px)' }}
                        >
                            {t('description')}
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/diagnostico"
                                className="inline-block rounded-[3px] bg-ember px-6 py-[0.7rem] text-sm font-medium text-cream transition-opacity hover:opacity-90"
                            >
                                {t('cta')}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

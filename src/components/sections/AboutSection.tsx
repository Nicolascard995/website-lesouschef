'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollReveal from '../atoms/ScrollReveal';

export default function AboutSection() {
    const t = useTranslations('About');
    const principles = ['principle_1', 'principle_2', 'principle_3'] as const;

    return (
        <section
            id="about"
            className="py-24 md:py-32 bg-cream overflow-hidden relative"
            style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
        >
            <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-16 items-center">
                <ScrollReveal mode="zoom">
                    <div className="relative w-full max-w-[520px] aspect-[3/4] overflow-hidden rounded-[28px] bg-ink">
                        <Image
                            src="/images/consultant_profile.jpg"
                            alt="Le Sous Chef"
                            fill
                            priority
                            quality={95}
                            sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, (min-width: 640px) 72vw, 92vw"
                            className="object-cover object-center grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/62 via-transparent to-ink/10 z-10" />
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-10">
                            <p className="font-display italic text-[28px] md:text-[34px] leading-tight text-cream max-w-[420px]">
                                {t('image_quote')}
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal mode="slide-up">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
                        {t('badge')}
                    </p>
                    <h2
                        className="font-display italic text-ink leading-[1.08] mb-8"
                        style={{ fontSize: 'clamp(34px,4vw,58px)' }}
                    >
                        {t('title')}
                    </h2>

                    <div className="space-y-6 text-[17px] leading-relaxed text-ink-mid font-light">
                        <p>{t('description1')}</p>
                        <p className="border-l-2 border-ember pl-5 font-display italic text-[28px] leading-snug text-ink">
                            {t('quote')}
                        </p>
                        <p>{t('description2')}</p>
                    </div>

                    <div className="mt-10 border-t border-cream-dark/90">
                        {principles.map((principle) => (
                            <div key={principle} className="py-4 border-b border-cream-dark/90">
                                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
                                    {t(principle)}
                                </p>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const SLIDE_INTERVAL_MS = 3500;
const SLIDE_COUNT = 5;
const CHECKOUT_URL = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
const MOCKUP_SRC = '/images/food-cost-tracker-mockup.png';

export default function ProductSection() {
    const t = useTranslations('ProductSection');
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setSlide((i) => (i + 1) % SLIDE_COUNT);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    const slides = [
        t('slide_1'),
        t('slide_2'),
        t('slide_3'),
        t('slide_4'),
        t('slide_5'),
    ];

    const canBuy = Boolean(CHECKOUT_URL);

    function handleBuy() {
        if (!canBuy || !CHECKOUT_URL) return;
        window.location.href = CHECKOUT_URL;
    }

    return (
        <section
            className="bg-ink py-24 md:py-32"
            style={{
                paddingLeft: 'clamp(20px,5vw,80px)',
                paddingRight: 'clamp(20px,5vw,80px)',
            }}
        >
            <div className="mx-auto max-w-[1200px]">
                <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
                    <div>
                        <div
                            className="relative w-full overflow-hidden rounded-[3px] bg-ink-mid"
                            style={{ aspectRatio: '4 / 5' }}
                        >
                            <Image
                                src={MOCKUP_SRC}
                                alt={t('title')}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 560px, 100vw"
                            />
                        </div>

                        <div className="mt-8 min-h-[96px]">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={slide}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="font-display font-light italic leading-[1.4] text-cream"
                                    style={{ fontSize: '20px' }}
                                >
                                    {slides[slide]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        <div className="mt-5 flex items-center gap-2">
                            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className={`h-[6px] w-[6px] rounded-full transition-colors ${
                                        i === slide ? 'bg-ember' : 'bg-[#3D3830]'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:pt-4">
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                            {t('badge')}
                        </p>
                        <h2
                            className="mb-6 font-display font-light leading-[1.1] text-cream"
                            style={{ fontSize: 'clamp(28px,3.4vw,40px)' }}
                        >
                            {t('title')}
                        </h2>
                        <p
                            className="mb-8 max-w-md font-body font-light leading-[1.5] text-cream/70"
                            style={{ fontSize: '15px' }}
                        >
                            {t('subtitle')}
                        </p>

                        <p className="mb-6 font-mono text-xl font-medium tracking-[0.05em] text-ember">
                            {t('price')}
                        </p>

                        <button
                            type="button"
                            onClick={handleBuy}
                            disabled={!canBuy}
                            className="w-full rounded-[3px] bg-ember px-6 py-3 text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-[#3D3830] disabled:text-ink-muted disabled:hover:opacity-100"
                        >
                            {canBuy ? t('cta_buy') : t('cta_soon')}
                        </button>

                        <p className="mt-4 font-body text-xs font-light text-ink-muted">
                            {t('cta_note')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

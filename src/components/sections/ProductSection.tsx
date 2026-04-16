'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';

const SLIDE_INTERVAL_MS = 3500;
const LOADING_RESET_MS = 1500;
const SLIDE_COUNT = 5;
const LANGS = ['es', 'en', 'de'] as const;
type Lang = (typeof LANGS)[number];

type LangOption = {
    lang: Lang;
    code: string;
    labelKey: 'cta_lang_es' | 'cta_lang_en' | 'cta_lang_de';
};

const OPTIONS: readonly LangOption[] = [
    { lang: 'es', code: 'ES', labelKey: 'cta_lang_es' },
    { lang: 'en', code: 'EN', labelKey: 'cta_lang_en' },
    { lang: 'de', code: 'DE', labelKey: 'cta_lang_de' },
];

function Spinner() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-spin"
            aria-hidden="true"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="2"
            />
            <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function ProductSection() {
    const t = useTranslations('ProductSection');
    const [slide, setSlide] = useState(0);
    const [loadingLang, setLoadingLang] = useState<Lang | null>(null);

    useEffect(() => {
        const id = setInterval(() => {
            setSlide((i) => (i + 1) % SLIDE_COUNT);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    function handleDownload(lang: Lang) {
        if (loadingLang) return;
        setLoadingLang(lang);
        window.location.href = `/api/download/food-cost-tracker?lang=${lang}`;
        setTimeout(() => setLoadingLang(null), LOADING_RESET_MS);
    }

    const slides = [
        t('slide_1'),
        t('slide_2'),
        t('slide_3'),
        t('slide_4'),
        t('slide_5'),
    ];

    return (
        <section
            className="bg-cream py-24 md:py-28"
            style={{
                paddingLeft: 'clamp(20px,5vw,80px)',
                paddingRight: 'clamp(20px,5vw,80px)',
            }}
        >
            <div className="mx-auto max-w-[1200px]">
                <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted">
                    {t('badge')}
                </p>

                <div className="mb-10 flex h-60 items-center justify-center bg-cream-dark md:h-80">
                    <span
                        className="font-display font-light italic text-ink/40"
                        style={{ fontSize: 'clamp(32px,4vw,48px)' }}
                    >
                        {t('title')}
                    </span>
                </div>

                <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
                    <div>
                        <div className="min-h-[110px] md:min-h-[140px]">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={slide}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="font-display font-light italic leading-[1.35] text-ink"
                                    style={{ fontSize: '20px' }}
                                >
                                    {slides[slide]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        <div className="mt-6 flex items-center gap-2">
                            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className={`h-[6px] w-[6px] rounded-full transition-colors ${
                                        i === slide ? 'bg-ember' : 'bg-ink-muted'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2
                            className="font-display font-light italic leading-[1.05] text-ink"
                            style={{ fontSize: 'clamp(26px,3vw,28px)' }}
                        >
                            {t('title')}
                        </h2>
                        <p
                            className="mt-3 max-w-md font-body font-light leading-[1.5] text-ink-mid"
                            style={{ fontSize: '15px' }}
                        >
                            {t('subtitle')}
                        </p>
                        <div className="mt-6 flex flex-col gap-2">
                            {OPTIONS.map((opt) => {
                                const isLoading = loadingLang === opt.lang;
                                const disabled = loadingLang !== null && !isLoading;
                                return (
                                    <button
                                        key={opt.lang}
                                        type="button"
                                        onClick={() => handleDownload(opt.lang)}
                                        disabled={disabled}
                                        className="flex items-center gap-3 rounded-[3px] border border-ink bg-transparent px-4 py-2.5 text-ink transition-colors hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span className="flex w-[22px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em]">
                                            {isLoading ? <Spinner /> : opt.code}
                                        </span>
                                        <span className="font-body text-sm font-light">
                                            {t(opt.labelKey)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

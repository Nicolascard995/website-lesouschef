'use client';

import { useState } from 'react';

const LOADING_RESET_MS = 1500;

type Lang = 'es' | 'en' | 'de';

export type GraciasMessages = {
    title_es: string;
    title_en: string;
    title_de: string;
    subtitle_es: string;
    subtitle_en: string;
    subtitle_de: string;
};

type Props = {
    orderId: string;
    messages: GraciasMessages;
};

type Option = {
    lang: Lang;
    code: string;
    title: string;
    subtitle: string;
};

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

export default function GraciasPicker({ orderId, messages }: Props) {
    const [loadingLang, setLoadingLang] = useState<Lang | null>(null);

    function handle(lang: Lang) {
        if (loadingLang) return;
        setLoadingLang(lang);
        const q = new URLSearchParams({ lang, order_id: orderId });
        window.location.href = `/api/download/food-cost-tracker?${q.toString()}`;
        setTimeout(() => setLoadingLang(null), LOADING_RESET_MS);
    }

    const options: Option[] = [
        {
            lang: 'es',
            code: 'ES',
            title: messages.title_es,
            subtitle: messages.subtitle_es,
        },
        {
            lang: 'en',
            code: 'EN',
            title: messages.title_en,
            subtitle: messages.subtitle_en,
        },
        {
            lang: 'de',
            code: 'DE',
            title: messages.title_de,
            subtitle: messages.subtitle_de,
        },
    ];

    return (
        <section className="min-h-[100svh] flex flex-col items-center justify-center bg-cream px-6 py-16">
            <div className="w-full max-w-xl">
                <p className="animate-fade-up d1 mb-4 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-ink-muted">
                    Le Sous Chef
                </p>
                <p className="animate-fade-up d2 mb-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    Food Cost Tracker
                </p>

                <div className="flex flex-col gap-4">
                    {options.map((o, i) => {
                        const isLoading = loadingLang === o.lang;
                        const disabled = loadingLang !== null && !isLoading;
                        return (
                            <button
                                key={o.lang}
                                type="button"
                                onClick={() => handle(o.lang)}
                                disabled={disabled}
                                className={`animate-fade-up ${['d3', 'd4', 'd5'][i]} w-full rounded-[4px] border border-cream-dark bg-cream px-6 py-6 text-left transition-colors hover:border-ember hover:bg-cream-dark disabled:cursor-not-allowed disabled:opacity-50`}
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex h-6 w-[22px] items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                                        {isLoading ? <Spinner /> : o.code}
                                    </span>
                                    <div>
                                        <div
                                            className="font-display font-light italic leading-[1.2] text-ink"
                                            style={{ fontSize: '22px' }}
                                        >
                                            {o.title}
                                        </div>
                                        <div className="mt-1 font-body text-sm font-light text-ink-mid">
                                            {o.subtitle}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

'use client';

export type DiagnosticoLocale = 'es' | 'en' | 'de';

type LangOption = {
    locale: DiagnosticoLocale;
    name: string;
    description: string;
};

const OPTIONS: readonly LangOption[] = [
    {
        locale: 'es',
        name: 'Español',
        description: 'Para restaurantes en España y Latinoamérica',
    },
    {
        locale: 'en',
        name: 'English',
        description: 'For restaurants in English-speaking markets',
    },
    {
        locale: 'de',
        name: 'Deutsch',
        description: 'Für Restaurants im deutschsprachigen Raum',
    },
];

const OPTION_DELAY = ['d3', 'd4', 'd5'] as const;

type Props = {
    onSelect: (locale: DiagnosticoLocale) => void;
};

export default function DiagnosticoLangSelect({ onSelect }: Props) {
    return (
        <section className="min-h-[100svh] flex flex-col items-center justify-center bg-cream px-6 py-16">
            <div className="w-full max-w-xl">
                <p className="animate-fade-up d1 mb-10 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-ink-muted">
                    Le Sous Chef
                </p>

                <p className="animate-fade-up d2 mb-12 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    Idioma · Language · Sprache
                </p>

                <div className="flex flex-col gap-4">
                    {OPTIONS.map((opt, i) => (
                        <button
                            key={opt.locale}
                            type="button"
                            onClick={() => onSelect(opt.locale)}
                            className={`animate-fade-up ${OPTION_DELAY[i]} group w-full rounded-[4px] border border-cream-dark bg-cream px-6 py-6 text-left transition-colors hover:border-ember hover:bg-cream-dark`}
                        >
                            <div className="font-display text-[32px] font-light italic leading-none text-ink transition-colors group-hover:text-ember">
                                {opt.name}
                            </div>
                            <div className="mt-2 font-body text-sm font-light text-ink-mid">
                                {opt.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

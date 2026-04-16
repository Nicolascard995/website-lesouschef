'use client';

export type DiagnosticoIntroMessages = {
    eyebrow: string;
    title: string;
    description: string;
    bullets: {
        '0': string;
        '1': string;
        '2': string;
    };
    time_note: string;
    cta_start: string;
    back_to_lang: string;
};

type Props = {
    messages: DiagnosticoIntroMessages;
    onStart: () => void;
    onBackToLang: () => void;
};

export default function DiagnosticoIntro({ messages, onStart, onBackToLang }: Props) {
    return (
        <section className="min-h-[100svh] flex flex-col items-center justify-center bg-cream px-6 py-16">
            <div className="w-full max-w-2xl">
                <p className="animate-fade-up d1 mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    {messages.eyebrow}
                </p>

                <h1
                    className="animate-fade-up d2 mb-6 font-display font-light leading-[1.05] text-ink"
                    style={{ fontSize: 'clamp(40px, 5.2vw, 56px)' }}
                >
                    {messages.title}
                </h1>

                <p
                    className="animate-fade-up d3 mb-10 font-body font-light text-ink-mid leading-[1.5] max-w-xl"
                    style={{ fontSize: 'clamp(15px, 1.5vw, 18px)' }}
                >
                    {messages.description}
                </p>

                <ul className="animate-fade-up d4 mb-8 flex flex-col gap-3 border-t border-cream-dark pt-8">
                    {(['0', '1', '2'] as const).map((k) => (
                        <li key={k} className="flex gap-3 font-body text-sm font-light text-ink-mid">
                            <span aria-hidden="true" className="text-ember">·</span>
                            <span>{messages.bullets[k]}</span>
                        </li>
                    ))}
                </ul>

                <p className="animate-fade-up d4 mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    {messages.time_note}
                </p>

                <div className="animate-fade-up d5 flex flex-col items-start gap-4">
                    <button
                        type="button"
                        onClick={onStart}
                        className="bg-ember text-cream text-sm font-medium px-6 py-[0.7rem] rounded-[3px] hover:opacity-90 transition-opacity"
                    >
                        {messages.cta_start}
                    </button>

                    <button
                        type="button"
                        onClick={onBackToLang}
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted hover:text-ember transition-colors"
                    >
                        {messages.back_to_lang}
                    </button>
                </div>
            </div>
        </section>
    );
}

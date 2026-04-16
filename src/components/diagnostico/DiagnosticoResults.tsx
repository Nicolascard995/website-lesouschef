'use client';

import type { AreaId } from '@/lib/diagnostico/questions';
import type { AreaScore } from '@/lib/diagnostico/scoring';

export type DiagnosticoResultsMessages = {
    eyebrow: string;
    title: string;
    score_label: string;
    score_suffix: string;
    weak_title: string;
    weak_description: string;
    strong_title: string;
    no_weak: string;
    sent_note: string;
    cta_primary: string;
    cta_secondary: string;
};

export type AreaDescriptor = {
    name: string;
    description: string;
};

type Props = {
    messages: DiagnosticoResultsMessages;
    areaMessages: Record<AreaId, AreaDescriptor>;
    totalScore: number;
    totalMax: number;
    areas: AreaScore[];
    weakAreas: AreaId[];
    sentToEmail: string | null;
    onPrimaryCta: () => void;
    onSecondaryCta: () => void;
};

export default function DiagnosticoResults({
    messages,
    areaMessages,
    totalScore,
    totalMax,
    areas,
    weakAreas,
    sentToEmail,
    onPrimaryCta,
    onSecondaryCta,
}: Props) {
    const roundedScore = Math.round(totalScore);
    const scoreSuffix = messages.score_suffix.replace('{total}', String(totalMax));
    const sentNote = sentToEmail
        ? messages.sent_note.replace('{email}', sentToEmail)
        : null;

    return (
        <section className="min-h-[100svh] bg-cream px-6 py-16">
            <div className="mx-auto w-full max-w-2xl">
                <p className="animate-fade-up d1 mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    {messages.eyebrow}
                </p>
                <h2
                    className="animate-fade-up d2 mb-10 font-display font-light leading-[1.1] text-ink"
                    style={{ fontSize: 'clamp(32px, 4.4vw, 44px)' }}
                >
                    {messages.title}
                </h2>

                <div className="animate-fade-up d3 mb-10 border-t border-cream-dark pt-8">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                        {messages.score_label}
                    </p>
                    <div className="flex items-baseline gap-3">
                        <span
                            className="font-display font-light leading-none text-ink"
                            style={{ fontSize: '72px' }}
                        >
                            {roundedScore}
                        </span>
                        <span className="font-mono text-sm text-ink-muted">{scoreSuffix}</span>
                    </div>
                </div>

                <div className="animate-fade-up d3 mb-10 flex flex-col gap-4">
                    {areas.map((a) => {
                        const pct = Math.max(0, Math.min(1, a.percent));
                        const barColor =
                            pct >= 0.75 ? 'bg-moss'
                                : pct < 0.5 ? 'bg-ember'
                                    : 'bg-ink-mid';
                        return (
                            <div key={a.area}>
                                <div className="mb-1 flex items-baseline justify-between gap-3">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mid">
                                        {areaMessages[a.area].name}
                                    </span>
                                    <span className="font-mono text-[11px] text-ink-muted">
                                        {a.raw}/{a.max}
                                    </span>
                                </div>
                                <div className="relative h-1 w-full bg-cream-dark">
                                    <div
                                        className={`absolute inset-y-0 left-0 ${barColor}`}
                                        style={{ width: `${pct * 100}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="animate-fade-up d4 mb-10 border-t border-cream-dark pt-8">
                    <h3
                        className="mb-3 font-display font-light italic text-ink"
                        style={{ fontSize: '22px' }}
                    >
                        {weakAreas.length > 0 ? messages.weak_title : messages.strong_title}
                    </h3>
                    {weakAreas.length > 0 ? (
                        <>
                            <p className="mb-4 font-body text-sm font-light text-ink-mid">
                                {messages.weak_description}
                            </p>
                            <ul className="flex flex-col gap-3">
                                {weakAreas.slice(0, 3).map((id) => (
                                    <li key={id} className="flex gap-3">
                                        <span aria-hidden="true" className="text-ember">·</span>
                                        <div>
                                            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                                                {areaMessages[id].name}
                                            </div>
                                            <div className="mt-1 font-body text-sm font-light text-ink-mid">
                                                {areaMessages[id].description}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="font-body text-sm font-light text-ink-mid">
                            {messages.no_weak}
                        </p>
                    )}
                </div>

                <div className="animate-fade-up d5 flex flex-col items-start gap-4 border-t border-cream-dark pt-8">
                    <button
                        type="button"
                        onClick={onPrimaryCta}
                        className="rounded-[3px] bg-ember px-6 py-[0.7rem] text-sm font-medium text-cream transition-opacity hover:opacity-90"
                    >
                        {messages.cta_primary}
                    </button>

                    <button
                        type="button"
                        onClick={onSecondaryCta}
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ember"
                    >
                        {messages.cta_secondary}
                    </button>

                    {sentNote && (
                        <p className="mt-2 font-body text-[11px] font-light text-ink-muted">
                            {sentNote}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

'use client';

import type { AnswerValue } from '@/lib/diagnostico/questions';

export type AnswerLabels = {
    yes: string;
    partial: string;
    no: string;
    dk: string;
};

type Props = {
    questionText: string;
    value: AnswerValue | undefined;
    onChange: (value: AnswerValue) => void;
    labels: AnswerLabels;
};

const BUTTONS: { value: AnswerValue; symbol: string }[] = [
    { value: 'yes', symbol: '✓' },
    { value: 'partial', symbol: '~' },
    { value: 'no', symbol: '✗' },
    { value: 'dk', symbol: '?' },
];

const ACTIVE_STYLES: Record<AnswerValue, string> = {
    yes: 'bg-[#EBF3EC] border-moss text-moss',
    partial: 'bg-cream-dark border-ember text-ember',
    no: 'bg-cream border-ink border-dashed text-ink',
    dk: 'bg-cream border-ink-muted border-dotted text-ink-muted',
};

const INACTIVE_STYLES =
    'bg-cream border-cream-dark text-ink-mid hover:border-ink-muted';

export default function DiagnosticoQuestion({
    questionText,
    value,
    onChange,
    labels,
}: Props) {
    return (
        <fieldset className="py-5 border-b border-cream-dark last:border-0">
            <legend className="mb-4 font-body text-sm font-light text-ink-mid">
                {questionText}
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BUTTONS.map((b) => {
                    const isActive = value === b.value;
                    const classes = isActive ? ACTIVE_STYLES[b.value] : INACTIVE_STYLES;
                    return (
                        <button
                            key={b.value}
                            type="button"
                            onClick={() => onChange(b.value)}
                            aria-pressed={isActive}
                            className={`flex items-center gap-2 rounded-[3px] border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${classes}`}
                        >
                            <span aria-hidden="true">{b.symbol}</span>
                            <span>{labels[b.value]}</span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

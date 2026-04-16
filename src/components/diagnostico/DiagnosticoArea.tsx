'use client';

import type { AnswerValue, Question } from '@/lib/diagnostico/questions';
import type { Answers } from '@/lib/diagnostico/scoring';
import DiagnosticoQuestion, { type AnswerLabels } from './DiagnosticoQuestion';

type Props = {
    areaIndex: number;
    areaName: string;
    areaDescription: string;
    questions: readonly Question[];
    questionTexts: Record<string, string>;
    answers: Answers;
    onAnswer: (questionId: string, value: AnswerValue) => void;
    labels: AnswerLabels;
};

export default function DiagnosticoArea({
    areaIndex,
    areaName,
    areaDescription,
    questions,
    questionTexts,
    answers,
    onAnswer,
    labels,
}: Props) {
    const prefix = String(areaIndex).padStart(2, '0');

    return (
        <div>
            <div className="mb-4 flex items-baseline gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                    {prefix}
                </span>
                <h2
                    className="font-display font-light italic text-ink"
                    style={{ fontSize: '22px' }}
                >
                    {areaName}
                </h2>
            </div>
            <p className="mb-6 font-body text-sm font-light text-ink-mid">
                {areaDescription}
            </p>

            <div>
                {questions.map((q) => (
                    <DiagnosticoQuestion
                        key={q.id}
                        questionText={questionTexts[q.id] ?? q.id}
                        value={answers[q.id]}
                        onChange={(v) => onAnswer(q.id, v)}
                        labels={labels}
                    />
                ))}
            </div>
        </div>
    );
}

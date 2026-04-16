'use client';

import { useMemo, useState } from 'react';
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import {
    AREAS,
    QUESTIONS_BY_AREA,
    TOTAL_QUESTIONS,
    type AnswerValue,
} from '@/lib/diagnostico/questions';
import {
    scoreDiagnostico,
    type Answers,
    type DiagnosticoScore,
} from '@/lib/diagnostico/scoring';
import DiagnosticoLangSelect, { type DiagnosticoLocale } from './DiagnosticoLangSelect';
import DiagnosticoIntro from './DiagnosticoIntro';
import DiagnosticoProgress from './DiagnosticoProgress';
import DiagnosticoArea from './DiagnosticoArea';
import DiagnosticoCapture, { type CaptureResult } from './DiagnosticoCapture';
import DiagnosticoResults from './DiagnosticoResults';

type DiagnosticoMessages = typeof es.Diagnostico;

const MESSAGES: Record<DiagnosticoLocale, DiagnosticoMessages> = {
    es: es.Diagnostico,
    en: en.Diagnostico,
    de: de.Diagnostico,
};

type Step = 'lang_select' | 'intro' | 'quiz' | 'capture' | 'result';

type Props = {
    initialLocale?: DiagnosticoLocale;
};

export default function DiagnosticoFlow({ initialLocale }: Props) {
    const [step, setStep] = useState<Step>('lang_select');
    const [locale, setLocale] = useState<DiagnosticoLocale>(initialLocale ?? 'es');
    const [answers, setAnswers] = useState<Answers>({});
    const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
    const [sentEmail, setSentEmail] = useState<string | null>(null);

    const t = MESSAGES[locale];
    const score: DiagnosticoScore = useMemo(() => scoreDiagnostico(answers), [answers]);

    const currentArea = AREAS[currentAreaIndex];
    const currentQuestions = QUESTIONS_BY_AREA[currentArea];
    const isLastArea = currentAreaIndex >= AREAS.length - 1;
    const currentAreaHasAllAnswered = currentQuestions.every(
        (q) => answers[q.id] !== undefined,
    );
    const answeredCount = Object.values(answers).filter((v) => v !== undefined).length;
    const progressPercent = answeredCount / TOTAL_QUESTIONS;

    function handleAnswer(questionId: string, value: AnswerValue) {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }

    function handleLangSelect(newLocale: DiagnosticoLocale) {
        setLocale(newLocale);
        setStep('intro');
    }

    function handleStart() {
        setCurrentAreaIndex(0);
        setStep('quiz');
    }

    function handleBackToLang() {
        setStep('lang_select');
    }

    function handleBackArea() {
        if (currentAreaIndex > 0) {
            setCurrentAreaIndex((i) => i - 1);
        } else {
            setStep('intro');
        }
    }

    function handleNextArea() {
        if (isLastArea) {
            setStep('capture');
        } else {
            setCurrentAreaIndex((i) => i + 1);
        }
    }

    async function handleSubmitEmail(email: string): Promise<CaptureResult> {
        try {
            const res = await fetch('/api/diagnostico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    answers,
                    locale,
                    score: score.total,
                    weakAreas: score.weakAreas,
                }),
            });
            if (res.ok) {
                setSentEmail(email);
                setStep('result');
                return { ok: true };
            }
            if (res.status === 429) return { ok: false, kind: 'rate_limit' };
            return { ok: false, kind: 'error' };
        } catch (e) {
            console.error('[diagnostico] submit failed', e);
            return { ok: false, kind: 'error' };
        }
    }

    function handleSkipCapture() {
        setSentEmail(null);
        setStep('result');
    }

    function handleResultPrimaryCta() {
        window.location.href = `/${locale}#contact`;
    }

    function handleResultSecondaryCta() {
        window.location.href = `/${locale}`;
    }

    if (step === 'lang_select') {
        return <DiagnosticoLangSelect onSelect={handleLangSelect} />;
    }

    if (step === 'intro') {
        return (
            <DiagnosticoIntro
                messages={t.intro}
                onStart={handleStart}
                onBackToLang={handleBackToLang}
            />
        );
    }

    if (step === 'quiz') {
        return (
            <section className="min-h-[100svh] bg-cream px-6 py-16">
                <div className="mx-auto w-full max-w-2xl">
                    <div className="mb-10">
                        <DiagnosticoProgress
                            currentIndex={currentAreaIndex + 1}
                            total={AREAS.length}
                            areaName={t.areas[currentArea].name}
                            areaOfTemplate={t.progress.area_of}
                            percent={progressPercent}
                        />
                    </div>

                    <DiagnosticoArea
                        areaIndex={currentAreaIndex + 1}
                        areaName={t.areas[currentArea].name}
                        areaDescription={t.areas[currentArea].description}
                        questions={currentQuestions}
                        questionTexts={t.questions}
                        answers={answers}
                        onAnswer={handleAnswer}
                        labels={t.answers}
                    />

                    <div className="mt-10 flex items-center justify-between gap-3 border-t border-cream-dark pt-6">
                        <button
                            type="button"
                            onClick={handleBackArea}
                            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ember"
                        >
                            {t.nav.back}
                        </button>
                        <button
                            type="button"
                            onClick={handleNextArea}
                            disabled={!currentAreaHasAllAnswered}
                            className="rounded-[3px] bg-ember px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isLastArea ? t.nav.finish : t.nav.next}
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (step === 'capture') {
        return (
            <DiagnosticoCapture
                messages={t.capture}
                onSubmit={handleSubmitEmail}
                onSkip={handleSkipCapture}
            />
        );
    }

    return (
        <DiagnosticoResults
            messages={t.results}
            areaMessages={t.areas}
            totalScore={score.total}
            totalMax={score.totalMax}
            areas={score.areas}
            weakAreas={score.weakAreas}
            sentToEmail={sentEmail}
            onPrimaryCta={handleResultPrimaryCta}
            onSecondaryCta={handleResultSecondaryCta}
        />
    );
}

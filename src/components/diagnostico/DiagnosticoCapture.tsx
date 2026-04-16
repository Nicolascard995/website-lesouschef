'use client';

import { useState } from 'react';

export type DiagnosticoCaptureMessages = {
    eyebrow: string;
    title: string;
    description: string;
    email_label: string;
    email_placeholder: string;
    cta: string;
    cta_sending: string;
    privacy_note: string;
    error: string;
    rate_limit: string;
    skip: string;
};

export type CaptureResult =
    | { ok: true }
    | { ok: false; kind: 'error' | 'rate_limit' };

type Props = {
    messages: DiagnosticoCaptureMessages;
    onSubmit: (email: string) => Promise<CaptureResult>;
    onSkip: () => void;
};

export default function DiagnosticoCapture({ messages, onSubmit, onSkip }: Props) {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [errorKind, setErrorKind] = useState<'error' | 'rate_limit' | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email || sending) return;
        setSending(true);
        setErrorKind(null);
        const result = await onSubmit(email);
        if (!result.ok) {
            setErrorKind(result.kind);
            setSending(false);
        }
    }

    const errorMessage =
        errorKind === 'rate_limit' ? messages.rate_limit :
        errorKind === 'error' ? messages.error :
        null;

    return (
        <section className="min-h-[100svh] flex flex-col items-center justify-center bg-cream px-6 py-16">
            <div className="w-full max-w-xl">
                <p className="animate-fade-up d1 mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ember">
                    {messages.eyebrow}
                </p>

                <h2
                    className="animate-fade-up d2 mb-4 font-display font-light leading-[1.1] text-ink"
                    style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
                >
                    {messages.title}
                </h2>

                <p className="animate-fade-up d3 mb-8 font-body text-sm font-light text-ink-mid leading-[1.5]">
                    {messages.description}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="animate-fade-up d4 flex flex-col gap-4"
                    noValidate
                >
                    <label className="flex flex-col gap-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                            {messages.email_label}
                        </span>
                        <input
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            placeholder={messages.email_placeholder}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-[3px] border border-cream-dark bg-cream px-4 py-3 font-body text-sm text-ink placeholder:text-ink-muted focus:border-ember focus:outline-none"
                        />
                    </label>

                    {errorMessage && (
                        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ember">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={sending || !email}
                        className="rounded-[3px] bg-ember px-6 py-[0.7rem] text-sm font-medium text-cream transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {sending ? messages.cta_sending : messages.cta}
                    </button>

                    <button
                        type="button"
                        onClick={onSkip}
                        className="self-start font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ember"
                    >
                        {messages.skip}
                    </button>

                    <p className="mt-2 font-body text-[11px] font-light leading-[1.5] text-ink-muted">
                        {messages.privacy_note}
                    </p>
                </form>
            </div>
        </section>
    );
}

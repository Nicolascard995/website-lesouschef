'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
 error,
 reset,
}: {
 error: Error & { digest?: string };
 reset: () => void;
}) {
 const t = useTranslations('Errors');

 useEffect(() => {
 console.error(error);
 }, [error]);

 return (
 <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
 <h2 className="text-2xl font-bold text-ink mb-4">
 {t('title')}
 </h2>
 <p className="text-ink-muted mb-8 max-w-md">
 {t('description')}
 </p>
 <button
 onClick={reset}
 className="px-8 py-3 bg-ember text-cream font-bold rounded-lg uppercase tracking-widest hover:bg-ember/90 transition-all"
 >
 {t('retry')}
 </button>
 </div>
 );
}

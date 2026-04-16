import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import DiagnosticoFlow from '@/components/diagnostico/DiagnosticoFlow';
import type { DiagnosticoLocale } from '@/components/diagnostico/DiagnosticoLangSelect';

const VALID_LOCALES = ['es', 'en', 'de'] as const;

function parseLocale(input: string): DiagnosticoLocale {
    return (VALID_LOCALES as readonly string[]).includes(input)
        ? (input as DiagnosticoLocale)
        : 'es';
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Diagnostico' });
    return {
        title: t('meta.title'),
        description: t('meta.description'),
    };
}

export default async function DiagnosticoPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <>
            <Navbar />
            <DiagnosticoFlow initialLocale={parseLocale(locale)} />
        </>
    );
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import "../globals.css";

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
    const { locale } = await params;
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
    const description = tMeta('description');

    return {
        metadataBase: new URL('https://lesouschef.com'),
        title: {
            template: '%s | Le Sous Chef',
            default: 'Le Sous Chef',
        },
        description,
        openGraph: {
            title: 'Le Sous Chef',
            description,
            url: 'https://lesouschef.com',
            siteName: 'Le Sous Chef',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Le Sous Chef',
            description,
        },
    };
}

import JsonLd from '../../components/atoms/JsonLd';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="antialiased">
                <NextIntlClientProvider messages={messages}>
                    <JsonLd />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

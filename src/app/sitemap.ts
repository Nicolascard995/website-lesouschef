import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lesouschef.com';

    // Core pages
    const routes = [''];

    const sitemapEntries = routes.flatMap((route) => {
        return routing.locales.map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }));
    });

    // Also include the root URL if handled by middleware rewrite
    sitemapEntries.push({
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    });

    return sitemapEntries;
}

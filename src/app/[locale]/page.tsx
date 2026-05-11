import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import WaitlistSection from '@/components/sections/WaitlistSection';
import FounderBanner from '@/components/sections/FounderBanner';
import AboutSection from '@/components/sections/AboutSection';
import Methodology from '@/components/sections/Methodology';
import SolutionsGrid from '@/components/sections/SolutionsGrid';
import ShieldSection from '@/components/sections/ShieldSection';
import DiagnosticoTeaser from '@/components/sections/DiagnosticoTeaser';
import ProductSection from '@/components/sections/ProductSection';
import BlogCarousel from '@/components/sections/BlogCarousel';
import Footer from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: tMeta('title'),
        description: tMeta('description'),
        keywords: tMeta('keywords'),
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const footerCopy = {
        es: 'Hecho para dueños y chef-propietarios de cocinas independientes.',
        en: 'Built for owners and chef-owners of independent kitchens.',
        de: 'Gemacht für Inhaber und Chef-Eigentümer unabhängiger Küchen.',
    } as const;
    const footerLine = footerCopy[locale as keyof typeof footerCopy] ?? footerCopy.en;

    return (
        <>
            <Navbar />
            <Hero />
            <SolutionsGrid />
            <Methodology />
            <DiagnosticoTeaser />
            <FounderBanner />
            <AboutSection />
            <ProductSection />
            <WaitlistSection />

            {false && <ShieldSection />}
            {false && <BlogCarousel locale={locale} />}
            {false && <Footer />}

            <footer
                className="bg-ink border-t border-cream/10 py-8"
                style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
            >
                <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/52">
                        LE SOUS CHEF
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/42">
                        {footerLine}
                    </span>
                </div>
                <div className="max-w-[1200px] mx-auto mt-4 flex gap-6">
                    <Link href="/impressum" className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/32 hover:text-cream/70 transition-colors">
                        Impressum
                    </Link>
                    <Link href="/datenschutz" className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/32 hover:text-cream/70 transition-colors">
                        Datenschutz
                    </Link>
                </div>
            </footer>
        </>
    );
}

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
 const t = useTranslations('Errors');

 return (
 <>
 <Navbar />
 <main className="min-h-screen bg-cream pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
 <div className="max-w-xl space-y-8">
 <h1 className="text-8xl font-black text-ember font-display">404</h1>
 <h2 className="text-3xl font-bold text-ink">
 {t('notFound_title')}
 </h2>
 <p className="text-ink-muted text-lg">
 {t('notFound_description')}
 </p>
 <Link
 href="/"
 className="inline-block px-8 py-4 bg-ember text-cream font-bold rounded-xl uppercase tracking-widest hover:bg-ember/90 transition-all"
 >
 {t('notFound_back')}
 </Link>
 </div>
 </main>
 <Footer />
 </>
 );
}

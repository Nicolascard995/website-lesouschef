'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import Logo from '@/components/atoms/Logo';
import ControlQualifyModal from '@/components/organisms/ControlQualifyModal';

export default function Footer() {
 const t = useTranslations('Footer');
 const tNav = useTranslations('Navbar');
 const [isModalOpen, setIsModalOpen] = useState(false);

 return (
 <footer className="bg-cream pt-24 pb-12 border-t border-white/5">
 <ControlQualifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

 <div className="max-w-7xl mx-auto px-6">
 <div className="bg-ink rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden mb-24">
 <div className="relative z-10">
 <h2 className="text-4xl md:text-7xl font-black text-ink tracking-tighter leading-none mb-8">
 {t('title_part1')}<br />{t('title_part2')}
 </h2>
 <p className="text-ink-mid text-xl font-bold mb-10 max-w-xl mx-auto">
 {t('subtitle')}
 </p>
 <button
 onClick={() => setIsModalOpen(true)}
 className="px-12 py-6 bg-cream text-white font-black rounded-full text-base uppercase tracking-widest hover:scale-110 transition-all shadow-2xl"
 >
 {t('cta')}
 </button>
 </div>
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-cream-dark/50 animate-[pulse_5s_infinite] rounded-full"></div>
 </div>

 <div className="grid md:grid-cols-4 gap-12 text-slate-500 text-sm">
 <div className="md:col-span-2">
 <div className="flex items-center gap-2 mb-6">
 <Logo className="w-6 h-6 text-ember" />
 <span className="text-white font-bold tracking-tighter uppercase">DOZO TECH</span>
 </div>
 <p className="max-w-sm">
 {t('brand_desc')}
 </p>
 </div>
 <div>
 <h4 className="text-white font-bold mb-6">{t('nav_title')}</h4>
 <ul className="space-y-4">
 <li><a href="#how-it-works" className="hover:text-ember">{tNav('how_it_works')}</a></li>
 <li><a href="#includes" className="hover:text-ember">{tNav('solutions')}</a></li>
 <li><a href="#about" className="hover:text-ember">{tNav('about')}</a></li>
 <li><a href="#contact" className="hover:text-ember">{tNav('contact')}</a></li>
 </ul>
 </div>
 <div>
 <h4 className="text-white font-bold mb-6">{t('legal_title')}</h4>
 <ul className="space-y-4">
 <li><a href="mailto:hello@lesouschef.com" className="hover:text-ember">{t('founder')}</a></li>
 <li><Link href="/impressum" className="hover:text-ember">{t('impressum')}</Link></li>
 <li><Link href="/datenschutz" className="hover:text-ember">{t('privacy')}</Link></li>
 </ul>
 </div>
 </div>

 <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-end">
 <LanguageSwitcher />
 </div>

 <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 uppercase tracking-widest">
 <span>{t('rights')}</span>
 <span>{t('tagline')}</span>
 </div>
 </div>
 </footer>
 );
}


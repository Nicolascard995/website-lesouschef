'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import { Link } from '@/i18n/routing';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#includes', label: t('solutions') },
        { href: '#how-it-works', label: t('how_it_works') },
        { href: '#about', label: t('about') },
        { href: '#contact', label: t('contact') },
    ];
    const isLightChrome = scrolled || isOpen;
    const brandClass = isLightChrome ? 'text-ink' : 'text-cream';
    const linkClass = isLightChrome
        ? 'text-ink-mid hover:text-ink'
        : 'text-cream/75 hover:text-cream';

    return (
        <nav
            className={`fixed top-0 w-full z-50 h-14 flex items-center transition-all duration-300 ${
                scrolled ? 'bg-cream/92 backdrop-blur-md border-b border-cream-dark' : 'bg-transparent'
            }`}
        >
            <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className={`font-mono text-sm tracking-[0.32em] uppercase font-medium transition-opacity hover:opacity-70 ${brandClass}`}
                >
                    LE SOUS CHEF
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${linkClass}`}
                        >
                            {label}
                        </a>
                    ))}
                    <Link
                        href="/diagnostico"
                        className={`font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${linkClass}`}
                    >
                        {t('diagnostico')}
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <LanguageSwitcher theme={isLightChrome ? 'light' : 'dark'} />
                    <a
                        href="#contact"
                        className={`text-xs font-medium px-4 py-2 rounded-[3px] transition-colors ${
                            isLightChrome
                                ? 'bg-ink text-cream hover:bg-ink/90'
                                : 'bg-cream text-ink hover:bg-cream/90'
                        }`}
                    >
                        {t('cta')}
                    </a>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden p-1 transition-colors ${brandClass}`}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            <div
                className={`fixed inset-0 bg-cream z-40 flex flex-col justify-center items-center md:hidden transition-all duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center gap-10">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="font-display italic text-4xl text-ink hover:text-ember transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                    <Link
                        href="/diagnostico"
                        onClick={() => setIsOpen(false)}
                        className="font-display italic text-4xl text-ink hover:text-ember transition-colors"
                    >
                        {t('diagnostico')}
                    </Link>
                </div>

                <div className="mt-14 flex flex-col items-center gap-6">
                    <LanguageSwitcher />
                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="bg-ink text-cream text-sm font-medium px-8 py-3 rounded-[3px] hover:opacity-80 transition-opacity"
                    >
                        {t('cta')}
                    </a>
                </div>
            </div>
        </nav>
    );
}

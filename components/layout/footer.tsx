"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Footer = ({ locale }: { locale: string }) => {
    const t = useTranslations('Global.footer');
    const tNav = useTranslations('Global.navigation');

    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-4 text-center">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Store<span className="text-indigo-600">.</span>
                    </Link>

                    {/* Navigasyon Linkleri */}
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
                        <Link href={`/${locale}`} className="hover:text-slate-900 transition-colors">
                            {tNav('home')}
                        </Link>
                        <Link href={`/${locale}/products`} className="hover:text-slate-900 transition-colors">
                            {tNav('products')}
                        </Link>
                        <Link href={`/${locale}/#faq`} className="hover:text-slate-900 transition-colors">
                            {tNav('faq')}
                        </Link>
                    </div>

                    {/* Telif Hakkı Metni */}
                    <p className="text-sm text-slate-500 mt-4">
                        © {new Date().getFullYear()} {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
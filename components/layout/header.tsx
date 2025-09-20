"use client";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/store/hooks';
import { ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CartPopover from '../cart/cartPopover';

const Header = ({ locale }: { locale: string }) => {
    const t = useTranslations('Header');
    const cartItems = useAppSelector((state) => state.cart.items);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const count = cartItems.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
        setTotalItems(count);
    }, [cartItems]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <nav className="flex h-16 items-center justify-between">
                    <Link href={`/${locale}`} className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Store<span className="text-indigo-600">.</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <Link href={`/${locale}`} className="hover:text-slate-900 transition-colors">{t('home')}</Link>
                            <Link href={`/${locale}/products`} className="hover:text-slate-900 transition-colors">{t('products')}</Link>
                        </div>

                        <div className="relative flex items-center">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                                aria-label="Sepeti Görüntüle"
                            >
                                <ShoppingCart size={22} />
                                {totalItems > 0 && (
                                    <span
                                        key={totalItems}
                                        className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold animate-in zoom-in-50"
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            <CartPopover
                                isOpen={isCartOpen}
                                onClose={() => setIsCartOpen(false)}
                                locale={locale}
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
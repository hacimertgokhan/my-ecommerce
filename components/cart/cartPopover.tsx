"use client";

import { useRef } from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {ShoppingBag, Trash2, X, Plus, Minus} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/lib/types";
import {removeFromCart, updateQuantity, clearCart, incrementQuantity, decrementQuantity} from "@/store/features/cart/cartSlice";

interface CartPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
}

export default function CartPopover({ isOpen, onClose, locale }: CartPopoverProps) {
    const t = useTranslations('CartPage');
    const popoverRef = useRef<HTMLDivElement>(null);
    const { items } = useAppSelector((state) => state.cart);
    const subtotal = items.reduce((acc: number, item: { product: { price: number; }; quantity: number; }) => acc + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((acc: number, item: { quantity: number; }) => acc + item.quantity, 0);
    const dispatch = useAppDispatch();

    // @ts-ignore
    useOnClickOutside(popoverRef, onClose);

    const handleIncrement = (productId: string | number) => {
        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId: string | number) => {
        dispatch(decrementQuantity(productId));
    };

    const handleRemoveItem = (productId: string | number) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (!isOpen) return null;

    return (
        <div
            ref={popoverRef}
            className="absolute top-full right-0 mt-2 w-screen max-w-md animate-in fade-in slide-in-from-top-2 duration-300 z-50"
        >
            <div className="flex h-full flex-col overflow-hidden bg-white shadow-2xl rounded-xl border border-slate-200/80 backdrop-blur-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-slate-600" />
                        <h2 className="text-lg font-semibold text-slate-900">{t('shoppingCart')}</h2>
                        {items.length > 0 && (
                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-slate-900 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={handleClearCart}
                                className="text-xs text-slate-500 hover:text-red-500 transition-colors duration-200 px-2 py-1 rounded-md hover:bg-red-50"
                            >
                                Tümünü Temizle
                            </button>
                        )}
                        <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all duration-200"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 max-h-80">
                    {items.length > 0 ? (
                        <div className="space-y-4">
                            {items.map(({ product, quantity }: CartItem) => (
                                <div key={product.id} className="group flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-white">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            width={64}
                                            height={64}
                                            loading="lazy"
                                            className="h-full w-full object-contain object-center hover:scale-105 transition-transform duration-200"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <Link
                                                href={`/${locale}/products/${product.id}`}
                                                onClick={onClose}
                                                className="text-sm font-medium text-slate-900 hover:text-slate-700 line-clamp-2 transition-colors duration-200"
                                            >
                                                {product.title}
                                            </Link>
                                            <button
                                                onClick={() => handleRemoveItem(product.id)}
                                                className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                                                <button
                                                    onClick={() => handleDecrement(product.id)}
                                                    className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-white hover:shadow-sm text-slate-600 hover:text-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="px-2 py-1 text-sm font-medium text-slate-900 min-w-[2rem] text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrement(product.id)}
                                                    className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-white hover:shadow-sm text-slate-600 hover:text-slate-900 transition-all duration-200"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-slate-900">
                                                    ${(product.price * quantity).toFixed(2)}
                                                </div>
                                                {quantity > 1 && (
                                                    <div className="text-xs text-slate-500">
                                                        ${product.price.toFixed(2)} × {quantity}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <ShoppingBag className="h-8 w-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium mb-1">{t('emptyCartTitle')}</p>
                            <p className="text-sm text-slate-500">Alışverişe başlamak için ürünleri keşfedin</p>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-slate-100 px-6 py-4 bg-gradient-to-r from-white to-slate-50">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm text-slate-600">{t('subtotal')} ({totalItems} ürün)</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-slate-900">${subtotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <Link
                            href={`/${locale}/cart`}
                            onClick={onClose}
                            className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 active:bg-slate-950 transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            {t('checkout')}
                        </Link>

                        <div className="mt-4 text-center">
                            <button
                                type="button"
                                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                                onClick={onClose}
                            >
                                {t('continueShopping')} →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
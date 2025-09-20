// components/cart/CartClient.tsx

"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateQuantity, removeFromCart, setCart } from "@/store/features/cart/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import { CartItem } from "@/lib/types";

// SEPET BOŞKEN GÖSTERİLECEK BİLEŞEN
const EmptyCart = () => {
    const t = useTranslations('CartPage');
    return (
        <div className="text-center py-24 px-6 bg-slate-50 rounded-xl">
            <ShoppingBag className="mx-auto h-16 w-16 text-slate-400" />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">{t('emptyCartTitle')}</h2>
            <p className="mt-2 text-base text-slate-600">{t('emptyCartSubtitle')}</p>
            <Link
                href="/"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50 transition-all duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
                {t('continueShopping')}
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
};

const CartClient = () => {
    const t = useTranslations('CartPage');
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.cart);
    const subtotal = items.reduce((acc: number, item: { product: { price: number; }; quantity: number; }) => acc + item.product.price * item.quantity, 0);

    if (items.length === 0) {
        return <div className={"w-screen h-screen flex items-center justify-center"}>
            <EmptyCart />
        </div>;
    }

    const handleClearCart = () => {
        dispatch(setCart([]));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center sm:text-left mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{t('shoppingCart')}</h1>
                <p className="mt-2 text-lg text-slate-600">{t('cartPageSubtitle', { count: items.length })}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5">
                    <ul role="list" className="divide-y divide-slate-200">
                        {items.map(({ product, quantity }: CartItem) => (
                            <li key={product.id} className="flex p-6">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        width={120}
                                        height={120}
                                        loading="lazy"
                                        className="object-contain w-24 h-24 sm:w-32 sm:h-32 rounded-lg border p-2 bg-white"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-slate-800 text-lg leading-snug pr-4">{product.title}</h3>
                                            <p className="font-bold text-slate-900 text-lg">${(product.price * quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">${product.price.toFixed(2)} {t('each')}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center border border-slate-300 rounded-md">
                                            <button onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: Math.max(1, quantity - 1) }))} className="p-2 text-slate-600 hover:bg-slate-100 rounded-l-md transition"><Minus size={16} /></button>
                                            <span className="w-12 text-center font-medium">{quantity}</span>
                                            <button onClick={() => dispatch(updateQuantity({
                                                productId: product.id, quantity: quantity + 1 }))} className="p-2 text-slate-600 hover:bg-slate-100 rounded-r-md transition"><Plus size={16} /></button>
                                        </div>
                                        <button onClick={() => dispatch(removeFromCart(product.id))} className="text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 text-sm">
                                            <Trash2 size={16} />
                                            <span>{t('remove')}</span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sağ Taraf: Sipariş Özeti */}
                <div className="lg:col-span-1 sticky top-24">
                    <div className="bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5 p-6">
                        <h2 className="text-xl font-bold border-b pb-4 text-slate-900">{t('orderSummary')}</h2>
                        <div className="space-y-4 mt-4">
                            <div className="flex justify-between text-slate-600">
                                <span>{t('subtotal')}</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>{t('shippingEstimate')}</span>
                                <span className="font-medium">{t('free')}</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-slate-900 text-lg">
                                <span>{t('orderTotal')}</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="mt-6 w-full rounded-lg bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
                            {t('checkout')}
                        </button>
                        <div className="mt-4 text-center">
                            <button onClick={handleClearCart} className="text-sm text-slate-500 hover:text-red-500 transition-colors font-medium">
                                {t('clearCart')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartClient;
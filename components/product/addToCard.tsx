"use client";

import { Product } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/features/cart/cartSlice";
import { useTranslations } from "next-intl";
import { ShoppingCart, Plus, Check, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    const dispatch = useAppDispatch();
    const t = useTranslations('ProductDetailPage');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item: { product: { id: number; }; }) => item.product.id === product.id)
    );
    const currentQuantity = cartItem?.quantity || 0;

    const handleAddToCart = async () => {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 800));

        dispatch(addToCart(product));

        setIsLoading(false);
        setIsAdded(true);

        toast.success("Sepete eklendi!", {
            duration: 2000,
            style: {
                background: '#10b981',
                color: 'white',
            },
        });

        setTimeout(() => setIsAdded(false), 2000);
    };

    return(
        <div className="space-y-4">
            {/* Ana Add to Cart Butonu */}
            <div className="relative">
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading || isAdded}
                    className={`
                        relative w-full py-4 px-8 rounded-2xl font-bold text-lg
                        flex items-center justify-center space-x-3
                        transition-all duration-300 transform
                        ${isAdded
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/25 scale-105'
                        : isLoading
                            ? 'bg-[#09090b]/70 text-white cursor-not-allowed'
                            : 'bg-[#09090b] text-white hover:bg-[#09090b]/90 hover:shadow-xl hover:shadow-[#09090b]/25 hover:-translate-y-1'
                    }
                        disabled:cursor-not-allowed
                        group overflow-hidden
                    `}
                >
                    {/* Background Animation */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                        transform -skew-x-12 transition-transform duration-1000
                        ${isLoading ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'}
                    `} />

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Button Content */}
                    <div className={`flex items-center space-x-3 transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                        {isAdded ? (
                            <>
                                <Check className="w-6 h-6 animate-bounce" />
                                <span>Sepete Eklendi!</span>
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                <span>{t('addToCart')}</span>
                                {currentQuantity > 0 && (
                                    <span className="bg-white/20 rounded-full px-2 py-1 text-sm">
                                        +1
                                    </span>
                                )}
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </>
                        )}
                    </div>
                </button>

                {/* Sepetteki Miktar Göstergesi */}
                {currentQuantity > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                        {currentQuantity}
                    </div>
                )}
            </div>

            {/* Sepetteki Ürün Bilgisi */}
            {currentQuantity > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <ShoppingCart className="w-4 h-4 text-slate-600" />
                            <span className="text-sm text-slate-600">Sepette</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-slate-900">
                                {currentQuantity} adet
                            </span>
                            <span className="text-sm text-slate-500">
                                (${(product.price * currentQuantity).toFixed(2)})
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Ek Aksiyon Butonları */}
            <div className="flex space-x-3">
                <button className="flex-1 py-3 px-6 border-2 border-[#e2e2e2] text-[#09090b] rounded-xl font-semibold hover:border-[#09090b] hover:bg-[#09090b] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Favoriler</span>
                </button>

                <button className="flex-1 py-3 px-6 border-2 border-[#e2e2e2] text-[#09090b] rounded-xl font-semibold hover:border-[#09090b] hover:bg-[#09090b] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Paylaş</span>
                </button>
            </div>
        </div>
    );
};

export default AddToCartButton;
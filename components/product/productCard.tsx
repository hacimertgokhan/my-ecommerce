import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import {addToCart} from "@/store/features/cart/cartSlice";
import toast from "react-hot-toast";
import {useAppDispatch} from "@/store/hooks";

interface ProductCardProps {
    product: Product;
    locale: string;
}

const ProductCard = ({ product, locale }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    return (
        <Link href={`/${locale}/products/${product.id}`} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#e2e2e2] hover:border-[#09090b]/20 transform hover:-translate-y-2">
                <div className="relative w-full h-64 bg-gradient-to-br from-[#e2e2e2]/30 to-white overflow-hidden">
                    <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                        <Heart className="w-5 h-5 text-[#09090b] hover:fill-red-500 hover:text-red-500 transition-colors" />
                    </button>

                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-[#09090b] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            New
                        </span>
                    </div>

                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        loading="lazy"
                        style={{ objectFit: "contain" }}
                        className="p-6 max-w-3xl max-h-96 group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-[#e2e2e2]/50 text-[#09090b] text-xs font-semibold uppercase tracking-wider rounded-full">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-600">4.8</span>
                        </div>
                    </div>

                    <h3 className="text-lg truncate font-bold text-[#09090b] group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 leading-tight">
                        {product.title}
                    </h3>

                    <div className="flex items-center justify-between pt-2 border-t border-[#e2e2e2]/50">
                        <div className="space-y-1">
                            <p className="text-2xl font-black text-[#09090b]">
                                ${product.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500 line-through">
                                ${(product.price * 1.2).toFixed(2)}
                            </p>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            <button onClick={() => {
                                dispatch(addToCart(product));
                                toast.success("Added to cart!");
                            }} className="w-12 h-12 bg-[#09090b] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="h-1 bg-gradient-to-r from-[#09090b] via-gray-400 to-[#e2e2e2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </Link>
    );
};

export default ProductCard;
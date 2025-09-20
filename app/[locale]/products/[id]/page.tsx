// app/[locale]/products/[id]/page.tsx

import { getProductById, getProducts } from "@/lib/api";
import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Star, ChevronRight, CheckCircle2 } from "lucide-react";
import AddToCartButton from "@/components/product/addToCard";
import ProductImageGallery from "@/components/product/productImageGallery";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};

type Props = {
    params: { id: string, locale: string };
};

export async function generateStaticParams() {
    const products: Product[] = await getProducts();

    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const product: Product = await getProductById(id);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.title,
        description: product.description,
    };
}

const Breadcrumbs = ({ product, locale, t }: { product: Product, locale: string, t: any }) => (
    <nav aria-label="Breadcrumb" className="mb-6">
        <ol role="list" className="flex items-center space-x-2 text-sm">
            <li>
                <div className="flex items-center">
                    <Link href={`/${locale}`} className="mr-2 text-slate-500 hover:text-slate-700">
                        {t('breadcrumbs.home')}
                    </Link>
                    <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300" aria-hidden="true" />
                </div>
            </li>
            <li>
                <div className="flex items-center">
                    <Link href={`/${locale}/products`} className="mr-2 text-slate-500 hover:text-slate-700">
                        {t('breadcrumbs.products')}
                    </Link>
                    <ChevronRight className="h-5 w-5 flex-shrink-0 text-slate-300" aria-hidden="true" />
                </div>
            </li>
            <li className="text-slate-700 font-medium capitalize">{product.category}</li>
        </ol>
    </nav>
);

export default async function ProductDetailPage({ params: { id, locale } }: Props) {
    const product: Product = await getProductById(id);
    const t = await getTranslations('ProductDetailPage');

    const images = [product.image, product.image, product.image, product.image];

    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <Breadcrumbs product={product} locale={locale} t={t} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <ProductImageGallery images={images} alt={product.title} />

                    <div className="flex flex-col">
                        <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 w-fit capitalize">
                            {product.category}
                        </span>

                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                            {product.title}
                        </h1>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <p className="text-3xl font-bold text-slate-900 tracking-tight">${product.price.toFixed(2)}</p>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star
                                            key={rating}
                                            className={`h-5 w-5 flex-shrink-0 ${product.rating.rate > rating ? 'text-yellow-400' : 'text-slate-300'}`}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-slate-500">{product.rating.rate} ({product.rating.count} {t('reviews')})</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-6 text-slate-600">
                            <p className="text-base leading-relaxed">{product.description}</p>

                            <div className="border-t border-slate-200 pt-6">
                                <h3 className="font-semibold text-slate-800">{t('features')}</h3>
                                <ul className="mt-3 space-y-2 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Premium Material</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Handcrafted Design</li>
                                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 30-Day Money-Back Guarantee</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-auto pt-8"> {/* mt-auto ve pt-8 ile butonu aşağıya iter */}
                            <p className="text-sm font-semibold text-green-600 mb-4">{t('inStock')}</p>
                            <AddToCartButton product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
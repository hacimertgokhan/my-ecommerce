import { getProducts, getCategories } from "@/lib/api";
import ProductList from "@/components/product/productList";
import { ArrowRight, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const products = await getProducts();
    const categories = await getCategories();
    const t = await getTranslations('ProductsPage');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
                >
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-indigo-500 to-purple-400"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
                        {t('hero.title')}
                    </h1>
                    <p className="mt-6 text-lg max-w-2xl mx-auto text-slate-600">
                        {t('hero.subtitle')}
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <a
                            href="#products"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50 transition-all duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                        >
                            {t('hero.ctaButton')}
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
            <main id="products" className="py-16 sm:py-24">
                <ProductList products={products} categories={categories} locale={locale} />
            </main>

        </div>
    );
}
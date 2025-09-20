"use client";
import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './productCard';
import { useTranslations } from 'next-intl';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ProductListProps {
    products: Product[];
    categories: string[];
    locale: string;
}

const ProductList = ({ products, categories, locale }: ProductListProps) => {
    const t = useTranslations('ProductListPage');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortOrder, setSortOrder] = useState<string>('');
    const [priceRange, setPriceRange] = useState<number>(500);

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        result = result.filter(p => p.price <= priceRange);

        if (sortOrder === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, selectedCategory, sortOrder, priceRange]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <SlidersHorizontal className="w-6 h-6 text-[#09090b]" />
                    <h2 className="text-2xl font-bold text-[#09090b]">
                        {t('filters')}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-[#e2e2e2] p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-[#09090b] uppercase tracking-wide">
                                <Filter className="w-4 h-4" />
                                {t('filterByCategory')}
                            </label>
                            <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-[#e2e2e2]/50 border-2 border-transparent rounded-xl text-[#09090b] font-medium focus:border-[#09090b] focus:outline-none focus:bg-white transition-all duration-300 hover:bg-white"
                            >
                                <option value="all">{t('allCategories')}</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="capitalize font-medium">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="sort" className="flex items-center gap-2 text-sm font-semibold text-[#09090b] uppercase tracking-wide">
                                <SlidersHorizontal className="w-4 h-4" />
                                {t('sortByPrice')}
                            </label>
                            <select
                                id="sort"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full px-4 py-3 bg-[#e2e2e2]/50 border-2 border-transparent rounded-xl text-[#09090b] font-medium focus:border-[#09090b] focus:outline-none focus:bg-white transition-all duration-300 hover:bg-white"
                            >
                                <option value="">Select Sorting</option>
                                <option value="asc">{t('priceLowToHigh')}</option>
                                <option value="desc">{t('priceHighToLow')}</option>
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="price" className="flex items-center justify-between text-sm font-semibold text-[#09090b] uppercase tracking-wide">
                                <span>{t('priceRange')}</span>
                                <span className="bg-[#09090b] text-white px-3 py-1 rounded-full text-xs font-bold">
                                    ${priceRange}
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="range"
                                    id="price"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-3 bg-[#e2e2e2] rounded-full appearance-none cursor-pointer slider"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>$0</span>
                                    <span>$1000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-[#09090b]">
                    {selectedCategory !== 'all' && (
                        <span className="text-gray-500 font-normal">{selectedCategory}</span>
                    )} ({filteredAndSortedProducts.length})
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} locale={locale} />
                ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-[#e2e2e2] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-8 h-8 text-[#09090b]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#09090b] mb-2">{t('notFound')}</h3>
                    <p className="text-gray-500">{t('adjustFilter')}</p>
                </div>
            )}

        </div>
    );
};

export default ProductList;
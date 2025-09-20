import { getProducts } from "@/lib/api";
import {
    ArrowRight,
    ShieldCheck,
    Truck,
    Leaf,
    ChevronDown
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";

export default async function OnePageShowcase({ params}: { params: any}) {
    const products = await getProducts();
    const featuredProducts = products.slice(0, 4);

    let param = await params;
    const locale = param.locale;

    const t = await getTranslations('OnePage');
    const globalT = await getTranslations('Global');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <main>
                <HeroSection t={t} locale={locale} />
                <FeaturesSection t={t} />
                <FeaturedProductsSection t={t} products={featuredProducts} locale={locale} />
                <TestimonialSection t={t} />
                <FaqSection t={t} />
                <CtaSection t={globalT} />
            </main>
        </div>
    );
}

const HeroSection = ({ t, locale }: { t: any, locale: string }) => (
    <section id="home" className="relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
                {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-slate-600">
                {t('hero.subtitle')}
            </p>
            <div className="mt-10 flex justify-center">
                <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50 transition-all duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
                    {t('hero.ctaButton')}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </section>
);

const FeaturesSection = ({ t }: { t: any }) => (
    <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('features.title')}</h2>
                <p className="mt-4 text-lg text-slate-600">{t('features.subtitle')}</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
                {t.raw('features.items').map((item: any, index: number) => (
                    <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto">
                            {index === 0 && <ShieldCheck className="w-6 h-6" />}
                            {index === 1 && <Truck className="w-6 h-6" />}
                            {index === 2 && <Leaf className="w-6 h-6" />}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                        <p className="mt-2 text-base text-slate-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FeaturedProductsSection = ({ t, products, locale }: { t: any, products: any[], locale: string }) => (
    <section id="showcase" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('featured.title')}</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-600">{t('featured.subtitle')}</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
                {products.map((product) => (
                    <Link key={product.id} href={`/${locale}/products/${product.id}`} className="group block">
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-white border border-slate-200 shadow-sm">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={400}
                                className="h-full w-full object-contain object-center p-4 group-hover:opacity-80 transition-opacity duration-300"
                            />
                        </div>
                        <div className="mt-4 text-left">
                            <h3 className="text-base font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">{product.title}</h3>
                            <p className="mt-1 text-lg font-bold text-slate-900">${product.price.toFixed(2)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-16 text-center">
                <Link href={`/${locale}/products`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-sm ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50 transition-all duration-200 hover:bg-slate-800">
                    {t('featured.viewAllButton')}
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    </section>
);

const TestimonialSection = ({ t }: { t: any }) => (
    <section id="testimonial" className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="max-w-4xl mx-auto text-center">
                <blockquote className="text-2xl font-medium text-slate-900 md:text-3xl">
                    <p>“{t('testimonial.quote')}”</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-center space-x-4">
                    <Image className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" width={48} height={48} alt={t('testimonial.author')} />
                    <div>
                        <div className="font-semibold text-slate-900">{t('testimonial.author')}</div>
                        <div className="mt-0.5 text-sm text-slate-600">{t('testimonial.role')}</div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
);

const FaqSection = ({ t }: { t: any }) => (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('faq.title')}</h2>
                <p className="mt-4 text-lg text-slate-600">{t('faq.subtitle')}</p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto space-y-4">
                {t.raw('faq.items').map((item: any, index: number) => (
                    <details key={index} className="group p-6 rounded-lg bg-white border border-slate-200 shadow-sm">
                        <summary className="flex items-center justify-between cursor-pointer font-medium text-slate-900 list-none">
                            {item.q}
                            <ChevronDown className="w-5 h-5 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
                        </summary>
                        <div className="mt-4 text-slate-600">{item.a}</div>
                    </details>
                ))}
            </div>
        </div>
    </section>
);

const CtaSection = ({ t }: { t: any }) => (
    <div className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{t('newsletterCta.title')}</h2>
                <p className="mt-4 text-lg text-slate-600">{t('newsletterCta.subtitle')}</p>
                <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="w-full min-w-0 appearance-none rounded-md border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder={t('newsletterCta.emailPlaceholder')} />
                    <button type="submit" className="flex-shrink-0 rounded-md bg-slate-900 px-5 py-2.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">{t('newsletterCta.submitButton')}</button>
                </form>
            </div>
        </div>
    </div>
);


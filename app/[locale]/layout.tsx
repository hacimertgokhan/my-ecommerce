import './globals.css';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '../i18n/routing';
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/ui/providers";
import {Metadata} from "next";
import CartProvider from "@/components/ui/cartProvider";
import Header from "@/components/layout/header";
import {Toaster} from "react-hot-toast";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Task 2 - E-Commerce",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    console.log(locale)

    return (
        <html lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <CartProvider>
                        <NextIntlClientProvider locale={locale}>
                            <Header locale={locale}/>
                            {children}
                            <Toaster position={"bottom-right"}/>
                            <Footer locale={locale}/>
                        </NextIntlClientProvider>
                    </CartProvider>
                </Providers>

            </body>
        </html>
    );
}
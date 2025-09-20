import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

export default async function middleware(request: NextRequest) {
    const defaultLocale = 'tr';

    const handleI18nRouting = createMiddleware({
        locales: ['en', 'tr'],
        defaultLocale
    });
    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/', '/(tr|en)/:path*']
};
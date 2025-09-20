import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
            },
        ],
    },
};

const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');
export default withNextIntl(nextConfig);
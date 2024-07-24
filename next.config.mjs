/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif','image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '/spencerkphillips/**'
            },{
                protocol: 'https',
                hostname: 'polycode.co',
                port: '',
                pathname: '/assets/**'
            },{
                protocol: 'https',
                hostname: 'media.polycode.co',
                port: '',
                pathname: '/**'
            },{
                protocol: 'https',
                hostname: 'flowbite.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;

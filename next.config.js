const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'vespop.com',
            },
            {
                protocol: 'https',
                hostname: 'backend.vespop.com',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;

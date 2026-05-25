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
            {
                protocol: 'https',
                hostname: '94064959ff2f2e1cdff06054b1607835.r2.cloudflarestorage.com',
            },
            {
                protocol: 'https',
                hostname: 'pub-c5509f5d73d4427f894c7c087f54821c.r2.dev',
            },
            {
                protocol: 'https',
                hostname: 'r2.cloudflarestorage.com',
            },
            {
                protocol: 'https',
                hostname: 'cloudflarestorage.com',
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;

const nextConfig = {
    images: {
        domains: ['localhost','vespop.com','backend.vespop.com'], // Allow images from localhost
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

module.exports = nextConfig;

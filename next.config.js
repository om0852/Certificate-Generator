/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    },
    callbacks: {
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async session(session, user) {
            // Customize the session object
            session.user.id = user.id
            return session
        },
    },
}

module.exports = nextConfig
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
        },
        config.module.rules.push({
            test: /\.(mp4|avi|mov|mkv)$/,
            use: {
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/videos/',
                outputPath: 'static/videos/',
                name: '[name].[hash].[ext]',
                esModule: false,
              },
            },
          });
      
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
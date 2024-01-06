/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                'source': '/',
                destination: '/signin',
                permanent: false
            }
        ]
    },
    images: {
        'domains': ['localhost'] 
    },
    output: 'standalone'
}

module.exports = nextConfig

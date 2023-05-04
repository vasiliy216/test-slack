/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["via.placeholder.com", "images.pexels.com", "i.natgeofe.com", "www.almanac.com", "community.thriveglobal.com", "taurica.net", "bbb.com", "aaa.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				port: "*",
				pathname: "/**"
			}
		]
	},
	reactStrictMode: false,
	async redirects() {
		return [
			{
				source: "/",
				destination: "/chat",
				permanent: true
			}
		]
	}
}

module.exports = nextConfig

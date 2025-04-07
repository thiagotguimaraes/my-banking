const { createProxyMiddleware } = require('http-proxy-middleware')
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.transformer = {
	...config.transformer,
	minifierConfig: {
		mangle: {
			toplevel: true,
		},
	},
}

module.exports = {
	...config,
	server: {
		enhanceMiddleware: (middleware) => {
			return (req, res, next) => {
				console.log(req.url)

				if (req.url.startsWith('/api')) {
					return createProxyMiddleware({
						target: 'http://localhost:3000',
						changeOrigin: true,
					})(req, res, next)
				}
				return middleware(req, res, next)
			}
		},
	},
}

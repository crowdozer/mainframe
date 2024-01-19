import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import vercel from '@astrojs/vercel/serverless'
import lqip from 'vite-plugin-lqip'

// https://astro.build/config
export default defineConfig({
	site: 'https://crwdzr.io',
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
			maxDuration: 60,
		},
	}),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		compressor(),
	],
	vite: {
		plugins: [lqip()],
	},
})

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import vercel from '@astrojs/vercel/serverless'
import lqip from 'vite-plugin-lqip'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: false,
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

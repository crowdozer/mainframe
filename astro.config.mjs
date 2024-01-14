import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
// import react from '@astrojs/react';
import compressor from 'astro-compressor'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: vercel(),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		compressor(),
		// react(),
	],
})

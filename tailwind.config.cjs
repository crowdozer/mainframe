const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	safelist: ['contents', 'hidden', 'overflow-y-hidden'],
	theme: {
		extend: {
			colors: {
				// user focusing
				intent: colors.green[500],
				'hover-intent': colors.neutral['300'],
				//  backdrop
				'neutral-dark': colors.neutral['950'],
				// highlighted backgrounds
				'neutral-dark-highlight': colors.neutral['900'],
				// hover fx for buttons
				'neutral-light-hover': colors.neutral['800'],
				// active fx for buttons
				'neutral-light-active': colors.neutral['900'],
				// ui strokes (general)
				'neutral-ui': colors.neutral['700'],
				// ui strokes (important)
				'neutral-ui-highlight': colors.neutral['400'],
				link: colors.blue['500'],
				'link-active': colors.blue['600'],
				'link-visited': colors.blue['400'],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

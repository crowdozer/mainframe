module.exports = {
	mode: 'jit',
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [require('daisyui')],
};

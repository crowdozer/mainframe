import path from 'path';
import skeletonPlugin from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	// 1. Apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 2. Append the path for the Skeleton NPM package and files:
		path.join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {},
	},
	plugins: [
		// NOTE: Insert above the 'skeleton.cjs' plugin
		require('@tailwindcss/forms'),
		// 3. Append the Skeleton plugin to the end of this list
		...skeletonPlugin(),
	],
};

/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Signika Negative', 'sans-serif']
		},
		colors: {
			primary: colors.amber,
			text: '#e7e5e4',
			bg: '#292524',
			tile: '#e3aa54',
			stone: colors.stone,
			cyan: colors.cyan
		},
		extend: {
			spacing: {
				128: '32rem'
			}
		}
	},
	plugins: []
};

/** @type {import('tailwindcss').Config} */

const { zinc } = require('tailwindcss/colors');
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
			cyan: colors.cyan,
			green: colors.green,
			red: colors.red,
			yellow: colors.yellow,
			zinc: colors.zinc
		},
		extend: {
			spacing: {
				128: '32rem'
			},
			animation: {
				shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
			},
			keyframes: {
				shake: {
					'10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
				}
			}
		}
	},
	plugins: []
};

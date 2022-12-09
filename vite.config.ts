import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		coverage: {
			provider: 'c8',
			reporter: ['html', 'html-spa']
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.ts'
	}
};

export default config;

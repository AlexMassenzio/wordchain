import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, defineConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.ts'
	}
};

export default config;

/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
	test: {
		coverage: {
			provider: 'c8',
			reporter: ['html', 'html-spa']
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/setupTests.ts',
		exclude: [...configDefaults.exclude, './e2e/*']
	}
};

const config: UserConfig = {
	plugins: [sveltekit()],
	test: vitestConfig.test
};

export default config;

import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';

vi.mock('svelte/store', () => ({ get: vi.fn() }));
vi.mock('$lib/store', () => ({ gameProgress: 0 }));
vi.mock('$app/environment', () => ({ browser: true }));

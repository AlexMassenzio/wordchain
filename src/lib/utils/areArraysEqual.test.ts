import areArraysEqual from './areArraysEqual';

describe('given arrays with the same elements', () => {
	it('returns true', () => {
		const arr1 = [1, 2, 3];
		const arr2 = [1, 2, 3];

		expect(areArraysEqual(arr1, arr2)).toBe(true);
	});
});

describe('given arrays with different elements', () => {
	it('returns false', () => {
		const arr1 = [1, 2, 3];
		const arr2 = [1, 3, 3, 7];

		expect(areArraysEqual(arr1, arr2)).toBe(false);
	});
});

describe('given arrays with different types of elements', () => {
	it('returns true', () => {
		const arr1 = [1, '2', 3];
		const arr2 = [1, 2, 3];

		expect(areArraysEqual(arr1, arr2)).toBe(false);
	});
});

describe('given empty arrays', () => {
	it('returns true', () => {
		const arr1: unknown[] = [];
		const arr2: unknown[] = [];

		expect(areArraysEqual(arr1, arr2)).toBe(true);
	});
});

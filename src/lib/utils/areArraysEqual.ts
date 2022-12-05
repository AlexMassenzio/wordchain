const areArraysEqual = (a: unknown[], b: unknown[]) =>
	a.length === b.length && a.every((v, i) => v === b[i]);

export default areArraysEqual;

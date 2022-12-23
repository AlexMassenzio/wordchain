import { getHolidayData, isTodayHoliday } from './holidayUtils';

describe('isTodayHoliday', () => {
	it('should return true if today is a holiday', () => {
		const result = isTodayHoliday(new Date(2022, 11, 25));
		expect(result).toBe(true);
	});
	it('should return false if today is not a holiday', () => {
		const result = isTodayHoliday(new Date(2022, 0, 3));
		expect(result).toBe(false);
	});
});

describe('getHolidayData', () => {
	it('should return holiday data if today is a holiday', () => {
		const result = getHolidayData(new Date(2022, 11, 25));
		expect(result).toEqual({
			name: 'Christmas Day',
			date: new Date(2022, 11, 25),
			words: ['holly', 'yule', 'elf', 'frost', 'tree', 'eggnog', 'grinch'],
			colors: ['red-400', 'green-500']
		});
	});
	it('should return undefined if today is not a holiday', () => {
		const result = getHolidayData(new Date(2022, 0, 3));
		expect(result).toBe(undefined);
	});
});

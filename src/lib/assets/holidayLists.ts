export type HolidayData = {
	name: string;
	date: Date;
	words: string[];
	colors: [string, string];
};

export const holidayLists: HolidayData[] = [
	{
		name: "New Year's Day",
		date: new Date(2023, 0, 1),
		words: ['cheer', 'reflect', 'time', 'enjoy', 'year', 'resolve', 'eve'],
		colors: ['from-yellow-200', 'to-zinc-200']
	},
	{
		name: 'Christmas Day',
		date: new Date(2022, 11, 25),
		words: ['holly', 'yule', 'elf', 'frost', 'tree', 'eggnog', 'grinch'],
		colors: ['from-red-400', 'to-green-500']
	}
];

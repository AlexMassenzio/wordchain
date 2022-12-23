import { holidayLists } from '$lib/assets/holidayLists';

export const isTodayHoliday = (date: Date) => {
	return holidayLists.some((holiday) => {
		const holidayDate = holiday.date;
		return holidayDate.getMonth() === date.getMonth() && holidayDate.getDate() === date.getDate();
	});
};

export const getHolidayData = (date: Date) => {
	return holidayLists.find((holiday) => {
		const holidayDate = holiday.date;
		return holidayDate.getMonth() === date.getMonth() && holidayDate.getDate() === date.getDate();
	});
};

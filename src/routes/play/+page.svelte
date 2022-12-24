<script>
	import ChainSevenGame from '$lib/components/Games/ChainSevenGame.svelte';
	import HolidayGame from '$lib/components/Games/HolidayGame.svelte';
	import OneMinuteGame from '$lib/components/Games/OneMinuteGame.svelte';
	import { getHolidayData, isTodayHoliday } from '$lib/utils/holidayUtils';

	const now = new Date();

	const holidayWordList = getHolidayData(now)?.words;
</script>

{#if isTodayHoliday(now) && holidayWordList !== undefined && holidayWordList.length > 0}
	<HolidayGame wordList={holidayWordList} />
{:else if now.getDay() == 5}
	<OneMinuteGame />
{:else}
	<ChainSevenGame />
{/if}

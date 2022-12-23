<script>
	import ChainSevenGame from '$lib/components/Games/ChainSevenGame.svelte';
	import HolidayGame from '$lib/components/Games/HolidayGame.svelte';
	import OneMinuteGame from '$lib/components/Games/OneMinuteGame.svelte';
	import { isTodayHoliday } from '$lib/utils/holidayUtils';

	const now = new Date();
</script>

{#if isTodayHoliday(now)}
	<HolidayGame />
{:else if now.getDay() == 5}
	<OneMinuteGame />
{:else}
	<ChainSevenGame />
{/if}

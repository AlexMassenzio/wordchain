<script lang="ts">
	import { browser } from '$app/environment';
	import { appVersion } from '$lib/store';
	import HowToPlay from '$lib/components/HowToPlay.svelte';
	import SpecialGameBanner from '$lib/components/SpecialGameBanner.svelte';
	import { getHolidayData, isTodayHoliday } from '$lib/utils/holidayUtils';
	import type { HolidayData } from '$lib/assets/holidayLists';
	import Snowfall from '$lib/components/Snowfall.svelte';

	let isNewVersion = false;
	let isHowToPlayOpen = false;
	let holidayData = getHolidayData(new Date()) as HolidayData;

	const now = new Date();

	if (browser) {
		let lastVersion = window.localStorage.getItem('lastVersion');
		if (lastVersion === null) {
			window.localStorage.setItem('lastVersion', $appVersion);
			lastVersion = $appVersion;
		}

		isNewVersion = lastVersion != $appVersion;
	}
</script>

<div class="text-center">
	<h1 class="pt-36 text-6xl tracking-tight sm:text-8xl">Wordchain</h1>
	<div class="mt-8 align-middle">
		<a
			class="rounded-md border-2 bg-tile p-2 text-2xl text-stone-800 transition-colors
		hover:bg-primary-700
		sm:text-4xl"
			href="/play"
		>
			Play
		</a>
		<button
			class="ml-2 h-12 w-12 rounded-full border-2 bg-stone-800 p-2 text-2xl text-stone-400 transition-colors
	hover:bg-stone-600
	sm:text-2xl"
			on:click={() => (isHowToPlayOpen = true)}>?</button
		>
	</div>
	{#if isTodayHoliday(now)}
		<SpecialGameBanner
			title={holidayData.name + '!'}
			subtitle={'Play a special holiday game!'}
			colors={holidayData.colors}
		/>
	{:else if now.getDay() == 5}
		<SpecialGameBanner
			title={"Today's Special Mode: ⏱Wordash⏱"}
			subtitle={'Try to get as many words in one minute as possible!'}
			colors={['from-green-500', 'to-cyan-400']}
		/>
	{/if}
</div>

<HowToPlay bind:isOpen={isHowToPlayOpen} />

{#if now.getMonth() == 11 && now.getDate() >= 24 && now.getDate() <= 25}
	<Snowfall />
{/if}

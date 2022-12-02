<script lang="ts">
	import { browser } from '$app/environment';
	import { appVersion } from '$lib/store';
	import Changelog from '$lib/components/Changelog.svelte';
	import HowToPlay from '$lib/components/HowToPlay.svelte';

	let isNewVersion = false;
	let isHowToPlayOpen = false;

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
	<h1 class="text-6xl sm:text-8xl pt-36">Wordchain</h1>
	<div class="mt-8 align-middle">
		<a
			class="border-2 text-2xl sm:text-4xl rounded-md p-2 bg-tile text-stone-800
			hover:bg-primary-700
			transition-colors"
			href="/play"
		>
			Play
		</a>
		<button
			class="ml-2 border-2 text-2xl sm:text-2xl rounded-full p-2 w-12 h-12 bg-stone-800 text-stone-400
		hover:bg-stone-600
		transition-colors"
			on:click={() => (isHowToPlayOpen = true)}>?</button
		>
	</div>
</div>

<HowToPlay bind:isOpen={isHowToPlayOpen} />

{#if browser}
	<Changelog bind:isOpen={isNewVersion} />
{/if}

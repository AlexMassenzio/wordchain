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
	<h1 class="pt-36 text-6xl sm:text-8xl">Wordchain</h1>
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
</div>

<HowToPlay bind:isOpen={isHowToPlayOpen} />

{#if browser}
	<Changelog bind:isOpen={isNewVersion} />
{/if}

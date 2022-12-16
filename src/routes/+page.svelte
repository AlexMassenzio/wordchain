<script lang="ts">
	import { browser } from '$app/environment';
	import { appVersion } from '$lib/store';
	import Changelog from '$lib/components/Changelog.svelte';
	import HowToPlay from '$lib/components/HowToPlay.svelte';

	let isNewVersion = false;
	let isHowToPlayOpen = false;

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
	{#if now.getDay() == 5}
		<div class="relative my-8">
			<!-- Blur effect for wrong guesses -->
			<div
				class="absolute inset-0 m-auto w-64 rounded-3xl bg-gradient-to-br from-green-500 to-cyan-400 blur-md sm:w-96"
			/>

			<div
				class="mv-2 relative m-auto flex w-64 flex-col justify-start overflow-x-hidden rounded-3xl border-2 bg-bg p-4 transition-all sm:w-96"
			>
				<h2 class="mx-4 text-lg">Today's Special Mode: ⏱Wordash⏱</h2>
				<h3 class="text-md mt-4">Try to get as many words in one minute as possible!</h3>
			</div>
		</div>
	{/if}
</div>

<HowToPlay bind:isOpen={isHowToPlayOpen} />

{#if browser}
	<Changelog bind:isOpen={isNewVersion} />
{/if}

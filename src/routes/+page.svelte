<script lang="ts">
	import { browser } from '$app/environment';
	import { appVersion } from '$lib/store';
	import Changelog from '$lib/components/Changelog.svelte';

	let isNewVersion = false;

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
	<div class="mt-8">
		<a
			class="border-2 text-2xl sm:text-4xl rounded-md p-2 bg-tile text-stone-800
			hover:bg-primary-700
			transition-colors"
			href="/play"
		>
			Play
		</a>
	</div>
</div>

{#if browser}
	<Changelog bind:isOpen={isNewVersion} />
{/if}

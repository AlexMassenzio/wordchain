<script lang="ts">
	import { browser } from '$app/environment';
	import { appVersion } from '$lib/store';
	import Changelog from '$lib/components/Changelog.svelte';

	let newVersion = true;

	if (browser) {
		newVersion = window.localStorage.getItem('lastVersion') != $appVersion;
	}
</script>

<div class="text-center">
	<h1 class="text-8xl pt-36">Wordchain</h1>
	<div class="mt-8">
		<a
			class="border-2 text-4xl rounded-md p-2 bg-tile text-stone-800
			hover:bg-primary-700
			transition-colors"
			href="/play"
		>
			Play
		</a>
	</div>
</div>
{#if browser}
	<Changelog bind:isOpen={newVersion} />
{/if}

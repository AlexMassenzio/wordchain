<script lang="ts">
	import '../app.css';
	import { appVersion } from '$lib/store';
	import Changelog from '$lib/components/Changelog.svelte';
	import { browser } from '$app/environment';

	let isChangelogOpen = false;
</script>

<div class="fixed inset-0 bg-bg text-text">
	<slot />

	{#if browser}
		<Changelog bind:isOpen={isChangelogOpen} />
	{/if}

	<footer class="fixed left-0 bottom-0 grid w-screen grid-cols-3">
		<p class="col-start-2 p-2 text-center text-2xl text-stone-500">©Alex Massenzio 2022</p>
		<div class="flex items-end justify-end">
			<button
				class="p-2 text-2xl italic text-stone-500
					hover:underline"
				on:click={() => (isChangelogOpen = true)}
				>v{$appVersion}
			</button>
		</div>
	</footer>
</div>

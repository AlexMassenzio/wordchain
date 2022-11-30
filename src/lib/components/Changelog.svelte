<script>
	import { changelog } from '$lib/assets/changelog';
	import { appVersion } from '$lib/store';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import { scale, fade } from 'svelte/transition';

	export let isOpen = true;

	// let lastVersionIndex = changelog.findIndex((version) => version.version != $appVersion);
	// if (lastVersionIndex == -1) lastVersionIndex = 10;
	// let filteredChangelog = changelog.slice(0, lastVersionIndex);
	let filteredChangelog = changelog.slice(0, 10);

	const closeChangelog = () => {
		window.localStorage.setItem('lastVersion', $appVersion);
		isOpen = false;
	};
</script>

<Dialog open={isOpen} on:close={closeChangelog}>
	<div out:fade>
		<DialogOverlay
			class="fixed top-0 left-0 bg-stone-800 bg-opacity-25 transition-opacity inset-0"
		/>
	</div>

	<div out:scale class="fixed z-10 inset-1/4 rounded-2xl bg-stone-200 p-8">
		<div class="overflow-y-auto max-h-full">
			<DialogTitle class="text-4xl">Changelog</DialogTitle>
			<DialogDescription class="text-2xl">What's new in {$appVersion}?</DialogDescription>
			{#each filteredChangelog as version}
				<h1 class="text-2xl">{version.version}</h1>
				<ul class="text-xl mb-2">
					{#each version.changes as change}
						<li>- {change}</li>
					{/each}
				</ul>
			{/each}
		</div>

		<!-- <button
			class="border-2 text-lg rounded-md p-2 py-1 bg-tile text-stone-800"
			on:click={() => (isOpen = false)}>Close</button
		> -->
	</div>
</Dialog>

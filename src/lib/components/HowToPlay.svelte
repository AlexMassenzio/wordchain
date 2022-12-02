<script>
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription
	} from '@rgossiaux/svelte-headlessui';
	import { scale, fade } from 'svelte/transition';

	export let isOpen = true;
	const closeChangelog = () => {
		isOpen = false;
	};
</script>

<Dialog open={isOpen} on:close={closeChangelog}>
	<div out:fade>
		<DialogOverlay
			class="fixed top-0 left-0 bg-stone-900 bg-opacity-50 transition-opacity inset-0"
		/>
	</div>

	<div
		out:scale
		class="fixed z-10 inset-x-10 sm:inset-x-1/4 sm:inset-y-24 rounded-2xl bg-bg text-text p-8"
	>
		<div class="overflow-y-hidden max-h-full text-center">
			<DialogTitle class="text-4xl">How to Play</DialogTitle>
			<video
				class="w-100% sm:w-1/2 m-auto mt-8 p-2 border-2 rounded-xl border-stone-600"
				src="/tutorial.mp4"
				autoplay={true}
				loop={true}
			>
				<track kind="captions" />
			</video>

			<div class="mt-8">
				<p>In Wordchain, your goal is to</p>
				<p>The first letter</p>
			</div>
		</div>

		<button
			class="border-2 text-lg rounded-md p-2 py-1 bg-tile text-stone-800"
			on:click={() => (isOpen = false)}>Close</button
		>
	</div>
</Dialog>

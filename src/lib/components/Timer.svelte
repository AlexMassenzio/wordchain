<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	export let isCountingDown = false;

	export let elapsed: number;

	elapsed *= 1000;

	if (browser) {
		let last_time = window.performance.now();
		let frame: number;

		(function update() {
			frame = requestAnimationFrame(update);

			const time = window.performance.now();
			if (isCountingDown) elapsed -= time - last_time;
			else elapsed += time - last_time;

			last_time = time;
		})();

		onDestroy(() => {
			cancelAnimationFrame(frame);
		});
	}
</script>

<h1 class=" p-10 text-center text-5xl">{(elapsed / 1000).toFixed(1)}s</h1>

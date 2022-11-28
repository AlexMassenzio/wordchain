<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	export let elapsed = 0;
	if (browser) {
		let last_time = window.performance.now();
		let frame: number;

		(function update() {
			frame = requestAnimationFrame(update);

			const time = window.performance.now();
			elapsed += time - last_time;

			last_time = time;
		})();

		onDestroy(() => {
			cancelAnimationFrame(frame);
		});
	}
</script>

<h1 class=" text-center text-5xl p-10">{(elapsed / 1000).toFixed(1)}s</h1>

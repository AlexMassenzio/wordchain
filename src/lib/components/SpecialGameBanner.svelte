<script lang="ts">
	export let title: string;
	export let subtitle: string;
	export let colors: [string, string];

	let gradient: string = 'bg-gradient-to-br ' + colors[0] + ' ' + colors[1];
</script>

<div class="relative my-8">
	<!-- Blur effect for wrong guesses -->
	<div class="absolute inset-0 m-auto w-64 rounded-3xl {gradient} blur-md sm:w-96" />

	<div
		class="relative m-auto flex w-64 flex-col justify-start overflow-x-hidden rounded-3xl border-2 bg-bg p-4 transition-all sm:w-96"
	>
		<h2 class="mx-4 text-xl">{title}</h2>
		<h3 class="text-md mt-2">{subtitle}</h3>
	</div>
</div>

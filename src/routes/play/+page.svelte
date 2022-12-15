<script>
	import ChainSevenGame from '$lib/components/Games/ChainSevenGame.svelte';
	import OneMinuteGame from '$lib/components/Games/OneMinuteGame.svelte';

	const now = new Date();
</script>

{#if now.getDay() != 5}
	<OneMinuteGame />
{:else}
	<ChainSevenGame />
{/if}

<script lang="ts">
	import type { LetterData } from '$lib/utils/letterDataUtils';

	export let letter: LetterData;
</script>

<button
	data-testid="value-container"
	class="flex border-2 rounded w-16 h-16 items-center justify-center text-2xl
	{letter.state != 'used' ? 'bg-tile text-bg' : 'bg-bg border-text text-text'}
	select-none transition-colors"
	on:click
>
	{letter.value.toUpperCase()}
</button>

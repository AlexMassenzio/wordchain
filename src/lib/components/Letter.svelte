<script lang="ts">
	import type { LetterData } from '$lib/utils/letterDataUtils';

	export let letter: LetterData;

	let stateStyle = '';

	$: switch (letter.state) {
		case 'used':
			stateStyle = 'bg-bg border-text text-text border-2';
			break;
		case 'firstLetter':
			stateStyle = 'bg-cyan-300 text-bg border-0';
			break;
		case 'inPlay':
			stateStyle = 'bg-tile text-bg border-0';
			break;

		default:
			break;
	}
</script>

<button
	data-testid="value-container"
	class="mr-1 h-16 w-16 flex-none rounded text-2xl
	{stateStyle}
	select-none transition-colors"
	on:click
>
	{letter.value.toUpperCase()}
</button>

<script lang="ts">
	export let value: string = '';
</script>

<button
	data-testid="value-container"
	class="flex border-2 rounded w-16 h-16 items-center justify-center text-2xl bg-tile text-bg select-none"
	on:click
>
	{value.toUpperCase()}
</button>

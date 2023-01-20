<script lang="ts">
	let usedHints = 0;
	let maxHints = 1;

	export let hintCallback: () => void = () => {};

	let invokeHint = () => {
		if (usedHints < maxHints) {
			usedHints++;
			hintCallback();
		}
	};
</script>

<button
	class="block rounded-md border-2 bg-green-700 p-2 text-xl
transition-colors
hover:bg-green-800"
	on:click={invokeHint}>Hint {maxHints - usedHints}/{maxHints}</button
>

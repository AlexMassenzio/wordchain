<script lang="ts">
	import '../app.css';
	import { appVersion } from '$lib/store';
</script>

<div class="fixed bg-bg text-text inset-0">
	<slot />
	<footer class="fixed grid grid-cols-3 left-0 bottom-0 w-screen">
		<p class="col-start-2 text-stone-500 text-center p-2 text-2xl">©Alex Massenzio 2022</p>
		<p class="italic text-stone-500 flex justify-end items-end p-2 text-2xl">v{$appVersion}</p>
	</footer>
</div>

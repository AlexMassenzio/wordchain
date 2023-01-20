<script lang="ts">
	import '../app.css';
	import { appVersion } from '$lib/store';
</script>

<div class="fixed inset-0 bg-bg text-text">
	<slot />
	<footer class="fixed left-0 bottom-0 grid w-screen grid-cols-3">
		<p class="col-start-2 p-2 text-center text-2xl text-stone-500">©Alex Massenzio 2022</p>
		<p class="flex items-end justify-end p-2 text-2xl italic text-stone-500">v{$appVersion}</p>
	</footer>
</div>

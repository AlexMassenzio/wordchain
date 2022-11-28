<script lang="ts">
	import '../app.css';

	const version = '0.2.0'; //process.env.npm_package_version;
</script>

<div class="bg-bg text-text h-screen">
	<slot />
	<footer class="fixed left-0 bottom-0 w-screen">
		<p class="italic text-stone-500 text-right p-2 text-2xl">v{version}</p>
	</footer>
</div>

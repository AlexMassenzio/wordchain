<script lang="ts">
	// Snowfall animation provided by mannes.tech https://mannes.tech/svelte-snowfall/
	// Changed in and out transitions to use |local to avoid page navigation issues.
	import { cubicOut, backIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	// a bunch of variables defining the snow and how it falls
	const SNOWFLAKES_COUNT = 60;
	const SNOWFLAKE_MIN_SCALE = 0.4;
	const MAX_FALL_DURATION = 10000;
	const MELTING_WAIT = 1000;
	const MELTING_DURATION = 4000;
	const WIND_FORCE = 0.25;
	const SNOW_ICONS = ['❆', '❅', '❄'];

	const MAX_TOTAL_TIME = MAX_FALL_DURATION + MELTING_WAIT + MELTING_DURATION;

	// this function generates the random configuration with all necessary values
	function randomSnowflakeConfig(i: number) {
		const scale = SNOWFLAKE_MIN_SCALE + Math.random() * (1 - SNOWFLAKE_MIN_SCALE);
		const xStart = Math.random() * (1 + WIND_FORCE) - WIND_FORCE;
		return {
			visible: false,
			scale,
			inDelay: Math.random() * MAX_TOTAL_TIME,
			inDuration: (1 + SNOWFLAKE_MIN_SCALE - scale) * MAX_FALL_DURATION,
			xStart,
			xEnd: xStart + scale * WIND_FORCE,
			snowIcon: SNOW_ICONS[i % SNOW_ICONS.length]
		};
	}

	// actially generating the snowflakes
	let snowflakes = new Array(SNOWFLAKES_COUNT)
		.fill()
		.map((_, i) => randomSnowflakeConfig(i))
		.sort((a, b) => a.scale - b.scale);

	// the custom fall transition.
	// See docs for how to create custom Svelte transitions: https://svelte.dev/docs#transition_fn
	function fall(_node, { delay = 0, duration, xStart = 0.1, xEnd = 0.5, scale = 1.0 }) {
		return {
			duration,
			delay,
			css: (t) => {
				const x_t = backIn(t);
				const y_t = t;

				const x_coord = (xEnd - xStart) * x_t + xStart;
				return `
            transform: scale(${scale}) rotate(${x_t * 720}deg);
            left: ${x_coord * 100}%;
            bottom: ${100 - y_t * 100}%;
          `;
			}
		};
	}

	// start everything on mount. starting means setting the snowflakes visible.
	// this "hack" is not needed when you configure your svelte to display transitions on first render:
	// https://svelte.dev/docs#Client-side_component_API - set `intro: true`
	onMount(async () => {
		setTimeout(() => {
			snowflakes = snowflakes.map((sf) => ({ ...sf, visible: true }));
		}, 50);
	});
	onDestroy(() => {
		console.log('destroyed');
	});
</script>

<div class="snowframe -z-10" aria-hidden="true">
	{#each snowflakes as flake}
		{#if flake.visible}
			<div
				class="snowflake"
				style={`transform: scale(${flake.scale}); left: ${flake.xEnd * 100}%`}
				in:fall|local={{
					delay: flake.inDelay,
					duration: flake.inDuration,
					scale: flake.scale,
					xStart: flake.xStart,
					xEnd: flake.xEnd
				}}
				out:fade|local={{ delay: MELTING_WAIT, duration: MELTING_DURATION, easing: cubicOut }}
				on:introend={() => (flake.visible = false)}
				on:outroend={() => (flake.visible = true)}
			>
				{flake.snowIcon}
			</div>
		{/if}
	{/each}
</div>

<style>
	:global(body) {
		min-height: 100%;
	}

	:global(html) {
		height: 100%;
	}

	.snowflake {
		color: #fff;
		font-size: 1.2rem;
		line-height: 1.2rem;
		font-family: Arial, sans-serif;
		text-shadow: 0 0 5px #000;
		position: absolute;
		z-index: 1000;
		overflow: hidden;
		bottom: 0;
	}

	.snowframe {
		pointer-events: none;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: hidden;
	}
</style>

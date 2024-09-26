<script>
	import islands from './islands';
	import LightHouse from './LightHouse.svelte';
	const {id, text} = $props();

	const island = islands.find((island) => island.id === id);
	const textColumns = 5; // odd number
	const textRows = 7; // odd number
	const centerCell = ~~((textColumns * textRows) / 2) + 1;
	const hasLighthouse = Math.random() > 0.5;
</script>

<div
	class="ISLAND"
	style:--island-clipPath="url(#clip-island-{id})"
	style:--island-aspectRatio={island?.aspectRatio}
	style:--island-textOffset={island?.textOffset}
	style:--island-lighthousePosition={island?.lighthousePosition}
	data-has-lighthouse={hasLighthouse}
>
	<svg width="0" height="0">
		<defs>
			<clipPath id="clip-island-{id}" clipPathUnits="objectBoundingBox">
				<path d={island.d}></path>
			</clipPath>
		</defs>
	</svg>

	<div class="_inner">
		<a href="">
			<div class="_text" style:--columns={textColumns} style:--rows={textRows}>
				{#snippet cellContent()}
					<div>{text?.line1 || ''}</div>
					<div>{text?.line2 || ''}</div>
				{/snippet}

				{#each Array(textColumns * textRows).fill('') as _, i}
					{#if i + 1 === centerCell}
						<div class="label">
							{@render cellContent()}
						</div>
					{:else}
						<div class="cell">
							{@render cellContent()}
						</div>
					{/if}
				{/each}
			</div>
		</a>

		<div class="_lighthouse">
			<LightHouse></LightHouse>
		</div>
	</div>
</div>

<style lang="scss">
	.ISLAND {
		width: 100%;
		position: relative;
	}

	._inner {
		aspect-ratio: var(--island-aspectRatio);
		overflow: hidden;
	}

	a {
		clip-path: var(--island-clipPath);
		display: block;
		z-index: 99;
		aspect-ratio: 1;
		min-width: 100%;
		min-height: 100%;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			display: block;
			background-color: var(--color-category, black);
			z-index: -1;
		}
	}

	.cell {
		opacity: 1;
		transition: opacity var(--ms-l);
	}

	a:hover .cell {
		opacity: 0;
	}

	[data-has-lighthouse='false'] ._lighthouse {
		display: none;
	}

	._lighthouse {
		pointer-events: none;
		position: absolute;
		inset: 0;
		transform: translate(var(--island-lighthousePosition));
		display: flex;
		align-items: center;
		justify-content: center;

		> :global(svg) {
			margin: auto;
		}
	}

	._text {
		* {
			// Avoid Render issues by translating every child node individually, not the parent
			transform: translate(var(--island-textOffset));
		}
		position: absolute;
		inset: 0;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		justify-content: center;
		align-content: center;
		gap: 1em;
		pointer-events: none;
		overflow: hidden;

		line-height: 1;

		> div {
			width: 100%;
			font-size: var(--font-size-l);
			text-transform: uppercase;
			white-space: nowrap;
		}
	}
</style>

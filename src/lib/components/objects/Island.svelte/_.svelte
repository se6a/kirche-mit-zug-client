<script>
	import islands from './islands';
	import LightHouse from './LightHouse.svelte';
	const {shape = 1, text = '', children = null} = $props();

	const island = islands.find((island) => island.id === shape);
	const textColumns = 5; // odd number
	const textRows = 19; // odd number
	const centerCell = ~~((textColumns * textRows) / 2) + 1;
	const hasLighthouse = Math.random() > 0.5;

	const splitText = text
		.split('\n')
		.map((line) => `<div>${line}</div>`)
		.join('');
</script>

<div
	class="ISLAND"
	style:--island-clipPath="url(#clip-island-{shape})"
	style:--island-aspectRatio={island?.aspectRatio}
	style:--island-textOffset={island?.textOffset}
	style:--island-lighthousePosition={island?.lighthousePosition}
	data-has-lighthouse={hasLighthouse}
	data-aspect-ratio={island?.aspectRatio >= 1 ? 'wide' : 'tall'}
>
	<svg width="0" height="0">
		<defs>
			<clipPath id="clip-island-{shape}" clipPathUnits="objectBoundingBox">
				<path d={island.d}></path>
			</clipPath>
		</defs>
	</svg>

	<div class="_inner">
		<div class="_clipped">
			{#if children}
				{@render children()}
			{/if}
			<div class="_text" style:--columns={textColumns} style:--rows={textRows}>
				{#each Array(textColumns * textRows).fill('') as _, i}
					{#if i + 1 === centerCell}
						<div class="label">
							{@html splitText}
						</div>
					{:else}
						<div class="cell">
							{@html splitText}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<div class="_lighthouse">
		<LightHouse></LightHouse>
	</div>
</div>

<style lang="scss">
	.ISLAND {
		position: relative;
		font-size: var(--island-fontSize, 2.2rem);
		width: 100%;
	}

	._inner {
		aspect-ratio: var(--island-aspectRatio);
		overflow: hidden;
		height: 100%;
		position: relative;
	}

	[data-aspect-ratio='tall'] ._clipped {
		height: 100%;
	}

	[data-aspect-ratio='wide'] ._clipped {
		width: 100%;
	}

	._clipped {
		clip-path: var(--island-clipPath);
		z-index: 99;
		aspect-ratio: 1;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			display: block;
			background-color: var(--color-category, black);
			z-index: -1;
		}
	}

	:global(a:hover) ~ * .cell {
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
		position: absolute;
		inset: 0;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(var(--columns), auto);
		grid-template-rows: repeat(var(--rows), auto);
		justify-content: center;
		align-content: center;
		gap: 0.4em;
		pointer-events: none;
		overflow: hidden;
		line-height: 1;

		* {
			// Avoid Render issues by translating every child node individually, not the parent
			transform: translate(var(--island-textOffset));
		}
	}

	.cell {
		opacity: 1;
		transition: opacity var(--ms-l);
	}

	.label,
	.cell {
		display: flex;
		flex-direction: column;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.label > :global(div),
	.cell > :global(div) {
		display: inline-block;
		white-space: nowrap;
	}
</style>

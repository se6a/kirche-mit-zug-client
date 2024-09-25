<script>
	import islands from './islands';
	const {id, text} = $props();
	const src = `/assets/islands/island${id}.svg`;

	const island = islands.find((island) => island.id === id);
	const textColumns = 5; // odd number
	const textRows = 7; // odd number
	const centerCell = ~~((textColumns * textRows) / 2) + 1;
</script>

<div
	class="ISLAND"
	style:--island-clipPath="url(#clip-island-{id})"
	style:--island-aspectRatio={island?.aspectRatio}
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
	</div>
</div>

<style lang="scss">
	.ISLAND {
		width: 100%;
		clip-path: url('#test-path');

		position: relative;
		overflow: hidden;
	}

	._inner {
		aspect-ratio: var(--island-aspectRatio);
		overflow: hidden;
		border: 1px solid black;
	}

	a {
		clip-path: var(--island-clipPath);
		display: block;
		z-index: 99;
		aspect-ratio: 1;
		min-width: 100%;
		min-height: 100%;
		background-color: var(--color-category, black);
	}

	.cell {
		opacity: 1;
		transition: opacity var(--ms-l);
	}

	a:hover .cell {
		opacity: 0;
	}

	._text {
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

		line-height: 1;

		> div {
			width: 100%;
			font-size: var(--font-size-l);
			text-transform: uppercase;
			white-space: nowrap;
		}
	}
</style>

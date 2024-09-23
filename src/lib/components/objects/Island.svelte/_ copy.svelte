<script>
	import islands from './islands';

	const {index} = $props();

	const {id, viewBox, d, rotate, size, translate} = islands[index || 0];
</script>

<div
	class="ISLAND"
	style:--island-rotation="{rotate}deg"
	style:--island-size={size}
	style:--island-translate={translate}
>
	<div class="_id">
		id: {id} / index: {index}
	</div>

	<svg
		id="island-{id}"
		width="100%"
		height="100%"
		xmlns="http://www.w3.org/2000/svg"
		viewBox={viewBox.join(' ')}
	>
		<mask id="mask-{id}">
			<path {d}></path>
		</mask>
		<g mask="url(#mask-{id})">
			<foreignObject x={viewBox[0]} y={viewBox[1]} width={viewBox[2]} height={viewBox[3]}>
				{#each Array(25).fill('') as cell}
					<div class="_textGrid">
						<div>Kategorie</div>
						<div>Mehr Text</div>
					</div>
				{/each}
			</foreignObject>
		</g>
	</svg>
</div>

<style lang="scss">
	.ISLAND {
		position: relative;
		width: calc(var(--island-size) * var(--island-baseSize, 100%));
		border: 10px solid orange;
		// pointer-events: none;
	}

	._id {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: black;
	}
	svg {
		overflow: visible;
		border: 2px dashed blue;
		width: 100%;
	}
	path {
		transform: translate(var(--island-translate)) rotate(var(--island-rotation));
		transform-origin: center center;
		fill: white;
	}

	foreignObject {
		background-color: var(--color-category);
		._textGrid {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: repeat(5, 1fr);
			width: 100%;
			height: 100%;
			font-size: var(--font-size-s);
		}
	}
</style>

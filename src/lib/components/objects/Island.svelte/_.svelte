<script>
	const {id} = $props();
	const src = `/assets/islands/island${id}.svg`;

	const textColumns = 5; // odd number
	const textRows = 13; // odd number
	const centerCell = ~~((5 * 13) / 2) + 1;
</script>

<div class="ISLAND" style:--mask="url({src})">
	<img {src} aria-hidden="true" alt="" />
	<a href="">
		<div class="_text" style:--columns={textColumns} style:--rows={textRows}>
			{#snippet text()}
				<div>Kategorie</div>
				<div>Mehr Text</div>
			{/snippet}

			{#each Array(textColumns * textRows).fill('') as _, i}
				{#if i + 1 === centerCell}
					<div class="label">
						{@render text()}
					</div>
				{:else}
					<div class="cell">
						{@render text()}
					</div>
				{/if}
			{/each}
		</div>
	</a>
</div>

<style lang="scss">
	.ISLAND {
		width: 100%;
		mask: var(--mask);
		mask-repeat: no-repeat;
		mask-position: center;
		mask-size: contain;
		background-color: var(--color-category, black);
		position: relative;
		overflow: hidden;
	}

	a {
		position: absolute;
		display: block;
		inset: 0;
		z-index: 99;
	}

	.cell {
		opacity: 1;
		transition: opacity var(--ms-m);
	}

	a:hover .cell {
		opacity: 0;
	}

	img {
		visibility: hidden;
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

		line-height: 1;

		> div {
			width: 100%;
			font-size: var(--font-size-l);
			text-transform: uppercase;
			white-space: nowrap;
		}
	}
</style>

<script>
	const {id, text} = $props();
	const src = `/assets/islands/island${id}.svg`;

	const textColumns = 5; // odd number
	const textRows = 7; // odd number
	const centerCell = ~~((textColumns * textRows) / 2) + 1;
</script>

<div class="ISLAND" style:--mask="url({src})">
	<img {src} aria-hidden="true" alt="" />
	<!-- <svg width="100%" height="100%">
		<defs>
			<clipPath id="test-path" clipPathUnits="objectBoundingBox">
				<path
					d="M203.3,276.18c8.13,2.74,19.38,1.97,23.48-5.98,2.72-5.26,1.04-11.47-1.55-16.48-2.59-5.01-6.09-9.68-7.08-15.3-1.49-8.45,2.95-17.35,2.06-25.91-.84-8.1-6.32-14.71-12.41-19.86-6.09-5.14-13.04-9.36-18.35-15.29-12.04-13.45-13.5-35.47-3.42-51.67,3.91-6.27,9.24-11.57,13.67-17.5,4.44-5.93,8.08-12.96,7.68-20.11-.45-8.06-5.86-14.64-8.22-22.24-4.17-13.42,1.01-30.13-7.36-41.23-3.68-4.88-9.41-7.72-15.1-10.06-6.61-2.72-13.52-4.99-20.78-5.4-15.96-.89-34.15,5.55-43.75,18.95-11.09,15.48,7.15,38.65,6.15,54.68-.61,9.82-6.44,19.63-14.59,24.59-12.13,7.38-33.07-4.15-46.38,7.73-14.63,13.05-3.73,38.36,4.07,55.24,7.81,16.88,20.39,30.92,33.97,43.46,7.62,7.04,15.89,13.81,25.58,17.94,9.81,4.19,20.18,2.55,29.66,7.35,19.38,9.81,31.56,30,52.66,37.1"
				>
				</path>
			</clipPath>
		</defs>
	</svg> -->
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

<style lang="scss">
	.ISLAND {
		width: 100%;
		mask: var(--mask);
		mask-repeat: no-repeat;
		mask-position: center;
		mask-size: contain;
		// clip-path: path(
		// 	'M203.3,276.18c8.13,2.74,19.38,1.97,23.48-5.98,2.72-5.26,1.04-11.47-1.55-16.48-2.59-5.01-6.09-9.68-7.08-15.3-1.49-8.45,2.95-17.35,2.06-25.91-.84-8.1-6.32-14.71-12.41-19.86-6.09-5.14-13.04-9.36-18.35-15.29-12.04-13.45-13.5-35.47-3.42-51.67,3.91-6.27,9.24-11.57,13.67-17.5,4.44-5.93,8.08-12.96,7.68-20.11-.45-8.06-5.86-14.64-8.22-22.24-4.17-13.42,1.01-30.13-7.36-41.23-3.68-4.88-9.41-7.72-15.1-10.06-6.61-2.72-13.52-4.99-20.78-5.4-15.96-.89-34.15,5.55-43.75,18.95-11.09,15.48,7.15,38.65,6.15,54.68-.61,9.82-6.44,19.63-14.59,24.59-12.13,7.38-33.07-4.15-46.38,7.73-14.63,13.05-3.73,38.36,4.07,55.24,7.81,16.88,20.39,30.92,33.97,43.46,7.62,7.04,15.89,13.81,25.58,17.94,9.81,4.19,20.18,2.55,29.66,7.35,19.38,9.81,31.56,30,52.66,37.1'
		// );
		clip-path: url('#test-path');
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
		transition: opacity var(--ms-l);
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

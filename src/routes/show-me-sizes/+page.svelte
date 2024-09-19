<main>
	<section>
		<h2>Sizes</h2>
		<ul class="_sizes">
			{#each ['2xl', 'xl', 'l', 'm', 's'] as size}
				<li>
					<div class="_size" style:---size="var(--size-{size})"></div>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h2>Font Sizes</h2>
		<ul class="_fontSizes">
			{#each ['xl', 'l', 'm', 's'] as size}
				<li>
					<div class="_size" style:---size="var(--font-size-{size})">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed dicta ipsa,
						doloremque repellat.
					</div>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		gap: var(--size-2xl);
		padding: var(--size-l) 0;
	}

	section {
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	h2 {
		margin: auto;
		margin-bottom: var(--size-l);
	}

	ul._sizes {
		display: flex;
		flex-direction: row-reverse;
		align-items: flex-end;
		gap: var(--size-m);

		._size {
			width: var(---size);
			height: var(---size);
			background-color: black;
		}
	}

	ul._fontSizes {
		display: flex;
		flex-direction: column;

		div {
			font-size: var(---size);
			max-width: 30ch;
		}
	}
</style>

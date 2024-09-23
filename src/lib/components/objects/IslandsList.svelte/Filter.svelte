<script>
	import categories from './categories';
	const {setActiveCategories} = $props();

	let showFilter = $state(true);
	let NForm;

	function handleChange(e) {
		e.preventDefault();
		const NActive = [...NForm.querySelectorAll('input:checked')];
		const activeCategories = NActive.map((N) => parseInt(N.dataset.category));
		setActiveCategories(activeCategories);
	}
</script>

<div class="FILTER" data-show-filter={showFilter}>
	<input id="toggleShowFilter" type="checkbox" bind:checked={showFilter} />
	<label for="toggleShowFilter" data-as="button1-outline">
		<div>Filter</div>
	</label>

	<form onchange={handleChange} bind:this={NForm}>
		<fieldset>
			{#each categories as { id, name }}
				<input id="cb-{id}" type="checkbox" data-category={id} checked />
				<label
					for="cb-{id}"
					data-as="button1"
					style:--button1-isActive-color1="var(--color-{id})"
				>
					<div>
						{name}
					</div>
				</label>
			{/each}
		</fieldset>
	</form>
</div>

<style lang="scss">
	.FILTER {
		display: flex;
		flex-direction: column;
		align-items: center;
		pointer-events: none;
		font-size: var(--font-size-s);
	}

	#toggleShowFilter + label {
		margin-bottom: var(--gridM-gapY);
	}

	[data-show-filter='false'] form {
		display: none;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: var(--gridM-gap);
		width: 100%;
		max-width: 50ch;
		justify-content: center;
		margin: auto;
	}

	label {
		display: inline-block;
		pointer-events: all;
	}

	input {
		width: 0px;
		height: 0px;
		visibility: hidden;
		pointer-events: none;
		position: absolute;
	}
</style>

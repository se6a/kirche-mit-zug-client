<script>
	import {afterNavigate} from '$app/navigation';
	import {getContext} from 'svelte';
	const {setActiveCategories} = $props();

	let NFilter;
	let showFilter = $state(true);
	let NForm;

	const categories = getContext('categories');

	function selectOne(NSelected) {
		const NChecked = [...NForm.querySelectorAll('input:checked')];
		NChecked.forEach((N) => {
			if (NSelected.checked && N.isEqualNode(NSelected) === false) {
				N.checked = false;
			}
		});

		const selectedId = parseInt(NSelected.dataset.category);
		if (NSelected.checked && selectedId) setActiveCategories([selectedId]);
		else setActiveCategories([]);
	}

	function handleChange(e) {
		e.preventDefault();
		selectOne(e.target);
	}

	afterNavigate(({from}) => {
		if (from?.route?.id?.startsWith('/insel') === false) return;
		const lastActive = localStorage.getItem('activeCategories');
		if (!lastActive.length) return;
		const categories = lastActive?.split(',').map((n) => parseInt(n));
		setActiveCategories(categories);
		categories.forEach((c) => {
			const NInput = NFilter.querySelector(`input[data-category="${c}"]`);
			if (NInput) NInput.checked = true;
		});
	});
</script>

<div class="FILTER" data-show-filter={showFilter} bind:this={NFilter}>
	<input id="toggleShowFilter" type="checkbox" bind:checked={showFilter} />
	<label for="toggleShowFilter" data-as="button1-outline">
		<div>Filter</div>
	</label>

	<form onchange={handleChange} bind:this={NForm}>
		<fieldset>
			{#each categories as { id, shortName }}
				<input id="cb-{id}" type="checkbox" data-category={id} />
				<label
					for="cb-{id}"
					data-as="button1"
					style:--button1-isActive-color1="var(--color-category{id})"
				>
					<div>
						{shortName}
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
		--button1-isActive-color1: var(--color-0);
		--button1-isInit-color2: var(--color-0);
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
		position: absolute;
	}
</style>

<script>
	import Island from '../Island.svelte';
	import Filter from './Filter.svelte';
	import islandsLayout from './islandsLayout';
	import categories from './categories';

	const {data} = $props();

	const islands = [];

	for (let i = 0; i < data.length; i++) {
		const randomCategory = categories[~~(Math.random() * categories.length)];
		const item = {
			layout: islandsLayout[i % islandsLayout.length],
			item: {
				...data[i],
				category: randomCategory,
			},
		};
		islands.push(item);
	}

	let activeCategories = $state(categories.map((c) => c.id));
	const setActiveCategories = (newCategories) => {
		activeCategories = newCategories;
	};
</script>

<!-- {#key activeCategories} -->
<div class="ISLANDS">
	<Filter {setActiveCategories}></Filter>

	<ul>
		{#each islands as { item, layout }, i}
			{@const {align, islandIndex, x, y} = layout}
			<li
				class="_{(i + 1) % islandsLayout.length}"
				style:--align={align}
				style:--x="{x}%"
				style:--y="{y}%"
				data-category={item.category.id}
				data-is-visible={activeCategories.includes(item.category.id)}
			>
				<Island index={islandIndex}></Island>
			</li>
		{/each}
	</ul>
</div>

<!-- {/key} -->

<style lang="scss">
	.ISLANDS :global(.FILTER) {
		z-index: 10;
	}
	ul {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto;
		grid-auto-rows: auto;
		border: 1px solid red;
		z-index: 1;

		--island-baseSize: 39%;
	}

	[data-category='1'] {
		--color-category: var(--color-1);
	}
	[data-category='2'] {
		--color-category: var(--color-2);
	}
	[data-category='3'] {
		--color-category: var(--color-3);
	}
	[data-category='4'] {
		--color-category: var(--color-4);
	}
	[data-category='5'] {
		--color-category: var(--color-5);
	}
	[data-category='6'] {
		--color-category: var(--color-6);
	}
	[data-category='7'] {
		--color-category: var(--color-7);
	}

	li {
		width: 100%;
		border: 1px solid black;
		display: flex;
		justify-content: var(--align);

		&[data-is-visible='false'] {
			display: none;
		}
	}

	li._0[data-is-visible='true'] + li._1 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	li._1[data-is-visible='true'] + li._2 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	li._2[data-is-visible='true'] + li._3 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	li._3[data-is-visible='true'] + li._4 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	li._4[data-is-visible='true'] + li._5 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	li._5[data-is-visible='true'] + li._6 {
		margin-top: var(--y);
		margin-left: var(--x);
	}

	//

	li._6[data-is-visible='true'] + li._0 {
		margin-top: var(--y);
		margin-left: var(--x);
	}
</style>

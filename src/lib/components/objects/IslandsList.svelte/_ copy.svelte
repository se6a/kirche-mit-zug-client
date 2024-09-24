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

	let isFiltered = $state(false);
	let activeCategories = $state([]);
	const setActiveCategories = (newCategories) => {
		activeCategories = newCategories;
		isFiltered = activeCategories?.length > 0;
	};
</script>

<div class="ISLANDS" data-is-filtered={isFiltered}>
	<Filter {setActiveCategories}></Filter>

	<ul>
		{#each islands as { item, layout }, i}
			{@const {align, islandId, x, y, size} = layout}
			<li
				class="_{(i + 1) % islandsLayout.length}"
				style:--align={align}
				style:--x="{x}%"
				style:--y="{y}%"
				style:--size={size}
				data-category={item.category.id}
				data-is-visible={!isFiltered || activeCategories.includes(item.category.id)}
			>
				<div>
					<Island id={islandId + 1}></Island>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.ISLANDS {
		--island-baseSize: 39%;
		:global(.FILTER) {
			z-index: 10;
			position: absolute;
			left: 0;
			right: 0;
		}
	}

	ul {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto;
		grid-auto-rows: auto;
		z-index: 1;
		width: 100%;
		min-height: 80vh;
		min-height: 80dvh;
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
		position: relative;
		display: flex;
		justify-content: var(--align);
		pointer-events: none;

		:global(a) {
			pointer-events: all;
		}

		> div {
			display: block;
			width: calc(var(--island-baseSize) * var(--size));
		}

		&[data-is-visible='false'] {
			opacity: 0.5;
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

	/* RESPONSIVE
******************************************************************************/
	@media (width < 1250px) {
		ul {
			margin-top: 14%;
		}
	}

	@media (width < 1100px) {
		ul {
			margin-top: unset;
		}

		.ISLANDS :global(.FILTER) {
			position: relative;
		}
	}

	@media (width <= $bp-s-maxWidth) {
		li {
			margin: unset !important;

			div {
				width: 100%;
			}
		}
	}
</style>

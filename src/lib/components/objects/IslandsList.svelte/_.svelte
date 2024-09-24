<script>
	import Island from '../Island.svelte';
	import Filter from './Filter.svelte';
	import Counter from '../Counter.svelte';
	import islandsLayout from './islandsLayout';
	import categories from './categories';
	import {onMount} from 'svelte';

	const {data} = $props();

	let NIslands;
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

	const NListItems = [];
	function observeItemHeight(N) {
		setItemActiveHeight(N);
		NListItems.push(N);
	}

	function setItemActiveHeight(NItem) {
		const NImg = NItem.querySelector('img');
		NItem.style.setProperty('--height-active', `${NImg.clientHeight}px`);
	}

	function setAllItemsActiveHeight(NListItems) {
		for (let i = 0; i < NListItems.length; i++) {
			const N = NListItems[i];
			setItemActiveHeight(N);
		}
	}

	let setFilterHeight;
	function observeFilterHeight(N) {
		const NFilter = N.querySelector('.FILTER');
		setFilterHeight = () => {
			const height = NFilter.clientHeight;
			N.style.setProperty('--filter-height', `${height}px`);
		};
		setFilterHeight();
	}

	function handleResize() {
		let timeoutId;

		const callback = () => {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setAllItemsActiveHeight(NListItems);
				setFilterHeight();
				window.addEventListener('resize', callback, {once: true});
				timeoutId = null;
			}, 1000);
		};

		window.addEventListener('resize', callback, {once: true});
	}

	let visibleItemCount = $state(islands.length);
	function setVisibleItemCount() {
		visibleItemCount = [...NIslands.querySelectorAll("li[data-is-active='true']")].length;
	}

	$effect(() => {
		activeCategories;
		setVisibleItemCount();
	});

	onMount(() => {
		handleResize();
	});
</script>

<div class="ISLANDS" data-is-filtered={isFiltered} use:observeFilterHeight>
	<Filter {setActiveCategories} {setVisibleItemCount}></Filter>

	<div class="_count">
		<span>
			<Counter crntNumber={visibleItemCount} />/{islands.length}
		</span><span>Inseln</span>
	</div>

	<ul bind:this={NIslands}>
		{#each islands as { item, layout }, i}
			{@const {align, islandId, x, y, size} = layout}
			<li
				class="_{(i + 1) % islandsLayout.length}"
				data-align={align}
				style:---x="{x}%"
				style:---y="{y}%"
				style:---size={size}
				data-category={item.category.id}
				data-is-active={!isFiltered || activeCategories.includes(item.category.id)}
				style:--height-active="auto"
				use:observeItemHeight
			>
				<div class="_inner">
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

	._count {
		position: absolute;
		display: flex;
		right: var(--page-paddingY);
		top: var(--page-paddingX);
		opacity: 0;
		transition: opacity var(--ms-m);
		gap: 0.4em;

		span:first-child {
			text-align: right;
			display: inline-block;
			width: 5ch;
			white-space: nowrap;
		}
	}

	.ISLANDS[data-is-filtered='true'] {
		._count {
			opacity: 1;
		}
	}

	ul {
		--offsetTop: 0px;
		margin-top: var(--offsetTop);
		transition: margin-top var(--ms-m);
		position: relative;
		display: flex;
		flex-direction: column;
		z-index: 1;
		width: 100%;

		min-height: 80vh;
		min-height: 80dvh;
	}

	[data-is-filtered='true'] ul {
		--offsetTop: calc(var(--filter-height) + var(--size-m));
	}

	li {
		--size: var(---size);
		--x: var(---x);
		--y: var(---y);
		position: relative;
		display: flex;
		width: 100%;
		transition-property: transform, opacity;
		transform-origin: center;
		transition-duration: var(--ms-m);
		pointer-events: none;

		&[data-align='start'] {
			justify-content: flex-start;
		}

		&[data-align='center'] {
			justify-content: center;
		}

		&[data-align='end'] {
			justify-content: flex-end;
		}

		> ._inner {
			display: block;
			width: calc(var(--island-baseSize) * var(--size));
			margin-top: var(--y);
			margin-left: var(--x);
			transition:
				transform var(--ms-m),
				height var(--ms-m);
			height: var(--height-active, auto);
		}

		&:first-child > ._inner {
			--y: 0px;
		}

		:global(a) {
			pointer-events: all;
		}
	}

	.ISLANDS[data-is-filtered='true'] {
		li[data-is-active='true'] {
			opacity: 1;
			--y: 0px;

			&[data-align='start'] {
				transform: translateX(25%);
			}

			&[data-align='end'] {
				transform: translateX(-25%);
			}

			._inner {
				transform: scale(1);
				height: var(--height-active);
			}
		}

		li[data-is-active='false'] {
			opacity: 0.1;

			._inner {
				transform: scale(0);
				height: 0;
			}
		}
	}

	/* RESPONSIVE
******************************************************************************/
	@media (width < 1250px) {
		ul {
			--filter-height: 0px;
			margin-top: 14%;
		}
	}

	@media (width < 1100px) {
		.ISLANDS :global(.FILTER) {
			position: relative;
		}

		._count {
			position: relative;
			left: 0;
			right: 0;
			justify-content: center;
		}
		ul {
			margin-top: var(--size-xl);
		}
	}

	@media (width <= $bp-s-maxWidth) {
		li {
			--y: 0px;
			--x: 0px;

			justify-items: center;
			> ._inner {
				margin: unset !important;
				width: 100%;
			}

			&[data-is-active='true'] {
				transform: unset !important;
			}
		}
	}
</style>

<script>
	import Filter from './Filter.svelte';
	import Counter from '../Counter.svelte';
	import {onMount, setContext} from 'svelte';
	import itemsLayout from './itemssLayout';
	import categories from './categories';
	import ItemIsland from './ItemIsland.svelte';
	import ItemImage from './ItemImage.svelte';

	const {data} = $props();

	let NIslands;
	const islands = [];

	for (let i = 0; i < data.length; i++) {
		const randomCategory = categories[~~(Math.random() * categories.length)];
		const item = {
			layout: itemsLayout[i % itemsLayout.length],
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
		const NImg = NItem.querySelector('.ISLAND');
		NItem.style.setProperty('--itemIsland-heightActive', `${NImg.clientHeight}px`);
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
			<ItemIsland
				layout={layout.island}
				data={item}
				isActive={!isFiltered || activeCategories.includes(item.category.id)}
				{observeItemHeight}
			></ItemIsland>

			{#if layout.extras.length}
				{#each layout.extras as extra, ii}
					{#if extra.type === 'image'}
						<ItemImage index="{i}-{ii}" layout={extra}></ItemImage>
					{/if}
				{/each}
			{/if}
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
</style>

<script>
	import Filter from './Filter.svelte';
	import Counter from '../Counter.svelte';
	import {onMount} from 'svelte';
	import itemsLayout from './itemsLayout';
	import categories from './categories';
	import ItemIsland from './ItemIsland.svelte';
	import Object from './Object.svelte';

	const {data} = $props();

	let NIslands;

	/* Preparing Data
	 ******************************************************************************/

	let objectSlotCount = 0;
	const islands = [];
	for (let i = 0; i < data.length; i++) {
		const randomCategory = categories[~~(Math.random() * categories.length)];
		const itemLayout = itemsLayout[i % itemsLayout.length];
		const item = {
			itemLayout,
			data: {
				...data[i],
				category: randomCategory,
			},
		};
		islands.push(item);
		objectSlotCount += itemLayout?.objectSlots?.length || 0;
	}
	const imageCount = 10;
	const imageModulus = ~~(objectSlotCount / imageCount);

	/* Filter
	 ******************************************************************************/

	let isFiltered = $state(false);
	let activeCategories = $state([]);

	const setActiveCategories = (newCategories) => {
		activeCategories = newCategories;
		isFiltered = activeCategories?.length > 0;
	};

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

	let visibleItemCount = $state(islands.length);
	function setVisibleItemCount() {
		visibleItemCount = [...NIslands.querySelectorAll("li[data-is-active='true']")].length;
	}

	$effect(() => {
		activeCategories;
		setVisibleItemCount();
	});

	/* Resize
	 ******************************************************************************/

	let setFilterHeight;
	function observeFilterHeight(N) {
		const NFilter = N.querySelector('.FILTER');
		setFilterHeight = () => {
			const height = NFilter.clientHeight;
			N.style.setProperty('--filter-height', `${height}px`);
		};
		setFilterHeight();
	}

	const NListItems = [];
	function observeItemHeight(N) {
		setItemActiveHeight(N);
		NListItems.push(N);
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
		{#each islands as { data, itemLayout }, i}
			<ItemIsland
				layout={itemLayout.island}
				{data}
				isActive={!isFiltered || activeCategories.includes(data.category.id)}
				{observeItemHeight}
			></ItemIsland>

			{#each itemLayout.objectSlots as objectLayout, ii}
				<Object layout={objectLayout} index={ii + i} {imageModulus}></Object>
			{/each}
		{/each}
	</ul>
</div>

<style lang="scss">
	.ISLANDS {
		--island-baseSize: 39%;
		--island-lighthouseWidth: 6rem;
		--object-illustrationWidth: 6rem;
		--object-image-buttonWidth: 4rem;

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
		.ISLANDS {
			--island-lighthouseWidth: 6rem;
			--object-illustrationWidth: 6rem;
			--object-image-buttonWidth: 4rem;
			:global(.FILTER) {
				position: relative;
			}
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

	@media (width < $bp-s-maxWidth) {
		.ISLANDS {
			--island-lighthouseWidth: 5rem;
			--object-illustrationWidth: 5rem;
			--object-image-buttonWidth: 4rem;
		}
	}
</style>

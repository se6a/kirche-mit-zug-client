<script>
	import Filter from './Filter.svelte';
	import Counter from '../Counter.svelte';
	import {onMount, setContext} from 'svelte';
	import itemsLayout from './itemsLayout';
	import ItemIsland from './ItemIsland.svelte';
	import Object from './Object.svelte';
	import Cta from '../Cta.svelte';

	const {data} = $props();
	const {images, islands} = data;
	setContext('images', images);

	let NIslands;

	/* Preparing Data
	 ******************************************************************************/

	let objectSlotCount = 0;
	const islandsPrepared = [];
	for (let i = 0; i < islands.length; i++) {
		const itemLayout = itemsLayout[i % itemsLayout.length];
		const item = {
			itemLayout,
			data: islands[i],
		};
		islandsPrepared.push(item);
		objectSlotCount += itemLayout?.objectSlots?.length || 0;
	}
	const imageModulus = Math.ceil(objectSlotCount / images.length);

	/* Filter
	 ******************************************************************************/

	let isFiltered = $state(false);
	let activeCategories = $state([]);

	const setActiveCategories = (newCategories) => {
		localStorage.setItem('activeCategories', newCategories.join(','));
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

	let visibleItemCount = $state(islandsPrepared.length);
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

	let index = 0;
</script>

<div class="ISLANDS" data-is-filtered={isFiltered} use:observeFilterHeight>
	<div class="_cta">
		<Cta></Cta>
	</div>

	<Filter {setActiveCategories} {setVisibleItemCount}></Filter>

	<div class="_count">
		<span>
			<Counter crntNumber={visibleItemCount} />/{islandsPrepared.length}
		</span><span>Inseln</span>
	</div>

	<ul bind:this={NIslands}>
		{#each islandsPrepared as { data, itemLayout }}
			{index++ ? '' : ''}
			<ItemIsland
				layout={itemLayout.island}
				{data}
				isActive={!isFiltered || activeCategories.includes(data.category.id)}
				{observeItemHeight}
			></ItemIsland>

			{#each itemLayout.objectSlots as objectLayout, i}
				{(index += i) ? '' : ''}
				<Object layout={objectLayout} {index} {imageModulus}></Object>
			{/each}
		{/each}
	</ul>
</div>

<style lang="scss">
	.ISLANDS {
		position: relative;
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
		--offsetTop: 20%;
		margin-top: var(--offsetTop);
		transition: margin-top var(--ms-m);
		position: relative;
		display: flex;
		flex-direction: column;
		z-index: 1;
		width: 100%;
		pointer-events: none;

		min-height: 80vh;
		min-height: 80dvh;
		isolation: isolate;

		:global(li) {
			isolation: isolate;
		}

		:global(li > *) {
			pointer-events: all;
		}

		:global(li.ITEM-ISLAND) {
			z-index: 1;
		}

		:global(li.ITEM-OBJECT[data-type='illustration']) {
			z-index: 2;
		}

		:global(li.ITEM-OBJECT[data-type='image']) {
			z-index: 3;
		}
	}

	[data-is-filtered='true'] ul {
		--offsetTop: calc(var(--filter-height) + var(--size-l));
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width < 1100px) {
		ul {
			--offsetTop: 10%;
		}

		[data-is-filtered='true'] ul {
			--offsetTop: calc(1 * var(--size-l));
		}

		.ISLANDS {
			--island-lighthouseWidth: 6rem;
			--object-illustrationWidth: 6rem;
			--object-image-buttonWidth: 4rem;
			:global(.FILTER) {
				position: relative;
			}
		}

		:global(.ISLAND) {
			--island-fontSize: 2rem;
		}

		._count {
			position: relative;
			left: 0;
			right: 0;
			justify-content: center;
		}
	}

	@media (width < $bp-s-maxWidth) {
		.ISLANDS {
			--island-lighthouseWidth: 5rem;
			--object-illustrationWidth: 5rem;
			--object-image-buttonWidth: 4rem;
		}

		:global(.ISLAND) {
			margin: auto;
		}
	}
</style>

<script>
	import Island from '../Island.svelte';
	let {
		//
		data,
		layout,
		isActive,
		observeItemHeight,
	} = $props();

	const {align, shape, position, size} = layout;
	const {x, y} = position;
</script>

<li
	class="ITEM-ISLAND"
	data-align={align}
	style:---itemIsland-x="{x}%"
	style:---itemIsland-y="{y}%"
	style:---itemIsland-size={size}
	data-category={data.category.id}
	data-is-active={isActive}
	style:--itemIsland-heightActive="auto"
	use:observeItemHeight
>
	<div class="_inner">
		<Island {shape} text={data.islandText}>
			<a
				href="/insel/{data.slug}?shape={shape}"
				aria-label="Link zur Unterseite: {data.islandText}"
			></a>
		</Island>
	</div>
</li>

<style lang="scss">
	li {
		--itemIsland-size: var(---itemIsland-size);
		--itemIsland-x: var(---itemIsland-x);
		--itemIsland-y: var(---itemIsland-y);
		position: relative;
		display: flex;
		width: 100%;
		transition-property: transform, opacity;
		transform-origin: center;
		transition-duration: var(--ms-m);
		pointer-events: none;

		a {
			position: absolute;
			inset: 0;
		}

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
			width: calc(var(--island-baseSize) * var(--itemIsland-size));
			margin-top: var(--itemIsland-y);
			margin-left: var(--itemIsland-x);
			transition:
				transform var(--ms-m),
				height var(--ms-m);
			height: var(--itemIsland-heightActive, auto);
		}

		&:first-child > ._inner {
			--itemIsland-y: 0px;
		}

		:global(a) {
			pointer-events: all;
		}
	}

	:global(.ISLANDS[data-is-filtered='true']) {
		li[data-is-active='true'] {
			opacity: 1;
			--itemIsland-y: 0px;

			&[data-align='start'] {
				transform: translateX(25%);
			}

			&[data-align='end'] {
				transform: translateX(-25%);
			}

			._inner {
				transform: scale(1);
				height: var(--itemIsland-heightActive);
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

	@media (width <= $bp-s-maxWidth) {
		li {
			--itemIsland-y: 0px;
			--itemIsland-x: 0px;

			justify-items: center;
			> ._inner {
				margin: unset !important;
				width: 100%;
			}

			&[data-is-active='true'] {
				margin-top: var(--size-l);
				transform: unset !important;
			}
		}
	}
</style>

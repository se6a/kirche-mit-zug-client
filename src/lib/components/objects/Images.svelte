<script>
	import Icon from '$lib/components/bits/Icon.svelte';
	import Picture from './Picture.svelte';
	const {data} = $props();
</script>

<div class="IMAGES">
	<c-gallery mode={data.length > 1 ? 'slideshow' : 'singles'}>
		<div class="content" slot="images">
			{#each data as { eleImagesId }}
				<Picture data={eleImagesId}></Picture>
			{/each}
		</div>

		<nav slot="navigation">
			<button class="_prev" title="Vorheriges Bild"> </button>
			<div class="_status">
				<span data-insert="currentIndex"></span>/<span data-insert="imageCount"></span>
			</div>
			<button class="_next" title="Nächstes Bild">
				<Icon name="arrow"></Icon>
			</button>
		</nav>
	</c-gallery>
</div>

<style lang="scss" global>
	.IMAGES {
		position: relative;
	}

	c-gallery[mode='slideshow'] {
		---galleryNavigation-height: var(--size-l);

		nav,
		figcaption {
			font-size: var(--font-size-m);
		}

		nav {
			display: flex;
			position: absolute;
			inset: 0;
			pointer-events: none;
			> * {
				margin-top: auto;
				pointer-events: all;
			}
		}

		._status {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			height: var(---galleryNavigation-height);
		}

		button {
			display: flex;
			justify-content: flex-start;
			height: 100%;
			width: 30%;

			.icon {
				height: var(---galleryNavigation-height);
				width: auto;
				aspect-ratio: 1;
				margin-top: auto;
			}

			&._prev {
				.icon {
					transform: rotate(180deg);
				}
			}

			&._next {
				margin-left: auto;
				justify-content: flex-end;
			}
		}

		.content {
			aspect-ratio: 1.4;
		}

		picture {
			max-height: calc(100% - var(---galleryNavigation-height));
			img {
				object-fit: cover !important;
			}
		}

		figcaption {
			height: var(---galleryNavigation-height);
		}
	}

	c-gallery[mode='singles'] {
		nav {
			display: none;
		}
	}

	/* RESPONSIVE
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

	@media (width <= $bp-s-maxWidth) {
		c-gallery[mode='slideshow'] {
			.content {
				aspect-ratio: unset;
				width: 100%;
				height: 70vh;
			}
		}
	}
</style>

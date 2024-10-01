<script>
	import {browser} from '$app/environment';
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import Island from '$lib/components/objects/Island.svelte';
	import Image from '$lib/sanity/Image.svelte';
	import PortableText from '$lib/sanity/PortableText.svelte';
	import {onMount} from 'svelte';

	const {data} = $props();
	const island = data?.island || {};
	const shape = island.shape ? parseInt(island.shape) : 1;
	const {category} = island;

	const page = {
		footer: data.footer,
		title: island.title,
		description: `Eine Idee von ${island.initiators.join(', ')}.`,
	};

	onMount(() => {
		if (!browser) return;
		document.body.style.setProperty(
			'--color-currentCategory',
			`var(--color-category${category.id})`,
		);
	});
</script>

<Page data={{...data, page}}>
	<PageSections>
		<section data-category={category.id}>
			<div class="content">
				<div class="_island">
					<Island {shape} text={island?.islandText || ''}></Island>
				</div>

				<div class="_photo">
					<Image data={island.image}></Image>
				</div>

				<div class="_text">
					<header>
						<h2>
							{island?.title}
						</h2>
					</header>

					<div class="_initiators">
						<h3>Initiiert von:</h3>
						<ul>
							{#each island?.initiators || [] as name}
								<li>
									{name}
								</li>
							{/each}
						</ul>
					</div>
					<div class="_category">
						Kategorie: {category?.name}
					</div>
					<div class="_description" data-text="width-m">
						<PortableText blocks={island?.description || []}></PortableText>
					</div>
				</div>

				<div class="_illustration">
					<Image data={island.illustration}></Image>
				</div>
			</div>
		</section>
	</PageSections>
</Page>

<style lang="scss">
	section {
		margin-top: var(--size-m);
		header {
			margin-bottom: 1em;
		}
	}

	.content {
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-auto-flow: dense;
		gap: var(--gridL-gap);

		._island {
			grid-column: 1;
			--island-fontSize: 2rem;
		}

		._photo {
			grid-column: 1;
		}

		._text {
			grid-column: 2;
		}

		._illustration {
			grid-column: 2;
			grid-row: 3;
		}
	}

	._initiators,
	._category {
		text-transform: uppercase;
	}

	._island {
		max-height: 80vh;

		width: 100%;
		position: relative;
		margin-right: auto;

		:global(svg) {
			height: 0px;
		}

		:global(.ISLAND[data-aspect-ratio='wide']) {
			width: 100%;
			max-width: 36ch;
		}

		:global(.ISLAND[data-aspect-ratio='tall']) {
			height: 100%;
			max-height: 36ch;
			width: auto;
		}
	}

	._text {
		margin-top: auto;
	}

	._initiators {
		ul {
			display: flex;
			flex-wrap: wrap;
			gap: 0 0.4em;
			li {
				display: inline-block;
				&:not(:last-child)::after {
					content: ', ';
				}
			}
		}
	}

	._description {
		margin-top: 1em;
	}

	._illustration {
		width: 50%;
		max-width: 400px;
	}

	/* RESPONSIVE
    **************************************************************************/

	@media (width <= $bp-l-maxWidth) {
		.content {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (width <= $bp-m-maxWidth) {
		.content {
			grid-template-columns: 100%;

			._island {
				grid-column: 1;
				grid-row: 1;
				max-height: 70vh;
				max-height: 70dvh;
			}

			._photo {
				grid-column: 1;
				grid-row: 3;
			}

			._text {
				grid-column: 1;
				grid-row: 2;
			}

			._illustration {
				grid-column: 1;
				grid-row: 4;
			}
		}
	}
</style>

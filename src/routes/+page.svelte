<script>
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import SectionText from '$lib/components/layout/SectionText.svelte';
	import IslandsList from '$lib/components/objects/IslandsList.svelte';

	const {data} = $props();
	const page = data.page || {};
	const footer = data.footer || {};
	const islands = data.islands || [];
	const images = page.images || [];
</script>

<Page data={{page, footer}}>
	<PageSections>
		<IslandsList data={{islands, images}}></IslandsList>
		<SectionText id="ueber" data={page.textAbout}></SectionText>
	</PageSections>
</Page>

<style lang="scss">
	:global(.SECTION-TEXT) {
		margin-top: var(--size-xl);
	}

	:global([data-route='/']) {
		:global(.PAGE-HEADER) {
			position: absolute;
		}
	}

	/* RESPONSIVE
    **************************************************************************/

	@media (width < $bp-m-maxWidth) {
		:global([data-route='/']) {
			:global(.PAGE-HEADER) {
				position: relative;
			}
		}
	}
</style>

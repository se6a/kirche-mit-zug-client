<script>
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import SectionText from '$lib/components/layout/SectionText.svelte';
	import IslandsList from '$lib/components/objects/IslandsList.svelte';

	const {data} = $props();
	const islands = data.islands || [];
</script>

<Page>
	<PageSections>
		<IslandsList data={islands}></IslandsList>
		<SectionText id="ueber"></SectionText>
	</PageSections>
</Page>

<!-- <style lang="scss">
</style> -->

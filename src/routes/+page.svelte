<script>
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import SectionText from '$lib/components/layout/SectionText.svelte';
	import IslandsList from '$lib/components/objects/IslandsList.svelte';

	const islandCount = 20;
	const islands = [];
	for (let i = 0; i < islandCount; i++) {
		islands.push({
			cat: Math.ceil(Math.random() * 7),
		});
	}
</script>

<Page>
	<PageSections>
		<IslandsList data={islands}></IslandsList>
		<SectionText id="ueber"></SectionText>
	</PageSections>
</Page>

<!-- <style lang="scss">
</style> -->

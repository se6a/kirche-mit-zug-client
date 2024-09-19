<script>
	import PageSectionBasic from './PageSectionBasic.svelte';
	const props = $props();
	const children = props?.children;
	const data = props?.data || [];
</script>

<div class="PAGE-SECTIONS">
	{#if children}
		{@render children()}
	{/if}
	{#each data as section}
		<PageSectionBasic data={section.item}></PageSectionBasic>
	{/each}
</div>

<style lang="scss">
	.PAGE-SECTIONS {
		display: flex;
		flex-direction: column;
		gap: var(--size-2xl);
		margin-top: var(--size-l);
	}
</style>

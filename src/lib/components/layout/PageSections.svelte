<script>
	const props = $props();
	const children = props?.children;
	const data = props?.data || [];
</script>

<div class="PAGE-SECTIONS">
	{#if children}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	.PAGE-SECTIONS {
		display: flex;
		flex-direction: column;
		padding-bottom: calc(3 * var(--size-xl));
		gap: var(--gridL-gap);
	}
</style>

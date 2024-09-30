<script>
	const props = $props();
	const children = props?.children;
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
		padding-bottom: var(--size-xl);
		gap: var(--gridL-gap);
	}
</style>

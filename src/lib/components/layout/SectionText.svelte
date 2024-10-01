<script>
	import PortableText from '$lib/sanity/PortableText.svelte';
	import Anchor from '../bits/Anchor.svelte';
	// import PortableText from "$lib/sanity/"
	const {id = '', data} = $props();
</script>

<section class="SECTION-TEXT">
	{#if id}
		<Anchor {id}></Anchor>
	{/if}
	<header>
		<h2>
			{data?.title}
		</h2>
	</header>

	<!-- data-layout="1-1-1 rsp-1" -->

	<div class="_content">
		<PortableText blocks={data.portableText}></PortableText>
	</div>
</section>

<style lang="scss">
	header {
		margin-bottom: calc(3 * var(--size-m));
		white-space: pre-line;
		h2 {
			font-size: var(--font-size-l);
		}
	}

	._content :global(.PORTABLE-TEXT) {
		column-count: 2;
		width: 66%;
	}

	@media (width <= $bp-l-maxWidth) {
		._content :global(.PORTABLE-TEXT) {
			width: 100%;
		}
	}

	@media (width <= $bp-m-maxWidth) {
		._content :global(.PORTABLE-TEXT) {
			column-count: 1;
			max-width: 40ch;
		}
	}
</style>

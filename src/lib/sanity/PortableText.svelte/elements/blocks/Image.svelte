<script>
	import Image from '$lib/sanity/Image.svelte';

	export let data;
	const image = data;

	const ratio = image?.dimensions?.aspectRatio || 1;
	export let sizes = [300, 600, 800, 2000];
</script>

<div class="PT-BLOCK-IMAGE" style:--local-aspectRatio={ratio}>
	<Image data={image} {sizes} />
</div>

<style>
	.PT-BLOCK-IMAGE {
		position: relative;
		width: 100%;
		aspect-ratio: var(--local-aspectRatio);
		max-height: 40vh;
	}
</style>

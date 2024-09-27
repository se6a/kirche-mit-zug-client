<script>
	import {createSrcsets, maybeHotspot} from '$lib/sanity/functions';

	export let data = {};
	export let load = true;

	const asset = data?.asset || {};
	const defaultQuality = 100;
	export let quality = defaultQuality;

	const breakpoints = [
		// check if is the same as in scss variables defined!
		{name: 'xl', threshold: 1201, type: 'min'},
		{name: 'l', threshold: 1200, type: 'max'},
		{name: 'm', threshold: 900, type: 'max'},
		{name: 's', threshold: 600, type: 'max'},
	].sort((a, b) => a.threshold - b.threshold);
	export let sizes = [
		// percentage of the viewport
		// large vp to small vp (xl -> s)
		// Auto generated from the breakpoints above
		80, 90, 100, 100,
	];

	const url = asset?.url || '';
	const caption = data?.caption || '';
	const captionLink = data?.captionLink || '';
	const alt = data?.alt || caption;

	const {
		//
		aspectRatio,
		width: widthOriginal,
		height: heightOriginal,
	} = asset?.metadata?.dimensions || {};
	const hotspot = data?.hotspot;
	const crop = data?.crop;

	const srcsets = createSrcsets({
		url,
		widthOriginal,
		heightOriginal,
		quality,
		breakpoints,
		sizes,
		crop,
	});

	const objectPosition = maybeHotspot(hotspot) || 'center';

	let src = '';
	$: if (load && !src) {
		src = url;
	}
</script>

<figure class="sanityImage">
	<picture>
		{#if load || src}
			{#each srcsets as { rule, srcset }}
				<source media={rule} {srcset} />
			{/each}
		{/if}

		<img
			{alt}
			{src}
			width={widthOriginal}
			height={heightOriginal}
			style:aspect-ratio={aspectRatio}
			style:object-position={objectPosition}
		/>
	</picture>

	{#if caption?.length}
		<figcaption class="caption">
			{#if captionLink?.length}
				<a
					href={captionLink}
					title="Weiterführender Link"
					referrerpolicy="no-referrer"
					target="_blank"
					data-role="inline-link"
				>
					{caption}
				</a>
			{:else}
				{caption}
			{/if}
		</figcaption>
	{/if}
</figure>

<style lang="scss" global>
	figure {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;

		picture {
			flex: 1;
			overflow: hidden;
			display: block;
			width: inherit;
			height: inherit;
			position: relative;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center;
		}

		figcaption {
			flex: 0;
			display: flex;
			flex-direction: column;
		}
	}
</style>

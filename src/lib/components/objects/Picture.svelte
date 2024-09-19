<script>
	import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
	const {data} = $props();
	const {image} = data || {};
	const translations = data?.translations?.[0] || {};
	const {caption, altText} = translations;
	const height = image?.height;
	const width = image?.width;
	const aspectRatio = (width / height).toFixed(2);
</script>

<figure class="PICTURE" style:--aspect-ratio={aspectRatio}>
	<picture>
		<img
			height="{height}px"
			width="{width}px"
			src="{PUBLIC_DIRECTUS_URL}/assets/{image?.id}"
			alt={altText}
		/>
	</picture>
	<figcaption>{caption?.length ? caption : ''}</figcaption>
</figure>

<style lang="scss" global>
	.PICTURE {
		display: flex;
		flex-direction: column;
		position: relative;
		height: 100%;
		width: 100%;

		picture {
			display: block;
			flex: 1;
			width: 100%;
			position: relative;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: contain;
			object-position: left;
		}

		figcaption {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		figcaption:empty {
			display: none;
		}
	}
</style>

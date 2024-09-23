<script>
	import testSvg from './test.svg';
</script>

<main>
	<svg viewBox="0 0 100 100">
		<!-- maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" -->
		<mask id="mask-test" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
			<circle cx="50" cy="50" r="50" fill="white"></circle>
		</mask>
	</svg>

	<div class="_section" style:--mask-url="url(#mask-test)">
		<div class="_box"></div>
	</div>

	<div class="_section" style:--mask-url="url({testSvg})">
		<div class="_box"></div>
	</div>
</main>

<style lang="scss">
	main {
		width: 80vmin;
		height: auto;
		border: 10px solid black;
		margin: auto;
		position: relative;
	}

	._section {
		border: 10px dashed orange;
	}

	._box {
		background-color: blue;
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		mask: var(--mask-url);
		mask-size: 10px;
	}

	svg {
		border: 10px dashed red;
		aspect-ratio: 1;
	}
</style>

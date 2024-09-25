<script>
</script>

<main>
	<svg width="0" height="0" viewBox="0 0 1 1">
		<defs>
			<clipPath id="clip-test" clipPathUnits="objectBoundingBox">
				<path
					d="M0.317,0.266C0.279,0.297 0.256,0.343 0.242,0.39C0.235,0.416 0.229,0.444 0.238,0.47C0.252,0.515 0.303,0.537 0.33,0.577C0.362,0.623 0.358,0.688 0.395,0.73C0.412,0.751 0.436,0.763 0.46,0.774C0.476,0.782 0.493,0.789 0.51,0.786C0.554,0.781 0.569,0.724 0.603,0.697C0.638,0.669 0.696,0.666 0.709,0.623C0.714,0.606 0.708,0.587 0.712,0.569C0.716,0.545 0.735,0.526 0.75,0.506C0.764,0.486 0.774,0.458 0.759,0.438C0.743,0.415 0.708,0.421 0.681,0.426C0.653,0.432 0.616,0.432 0.606,0.405C0.6,0.39 0.606,0.373 0.609,0.357C0.615,0.319 0.598,0.279 0.566,0.257C0.527,0.23 0.49,0.248 0.449,0.245C0.398,0.24 0.362,0.23 0.317,0.266"
				/>
			</clipPath>
		</defs>
	</svg>

	<div class="_section" style:--mask-url="url(#mask-test)">
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
		// border: 10px dashed orange;
	}

	._box {
		background-color: blue;
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		clip-path: url(#clip-test);
	}

	svg {
		// border: 10px dashed red;
		overflow: visible;
		// aspect-ratio: 1;
		height: 10px;
		width: 10px;
	}
</style>

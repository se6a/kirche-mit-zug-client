<script>
	const {index} = $props();
	const randomImage = Math.round(Math.random()) + 1;
</script>

<div class="IMAGE">
	<input id="ti-{index}" type="checkbox" />
	<label class="_toggleImage usePosition" for="ti-{index}" data-as="buttonRound1">
		<div>Bild Anzeigen</div>
	</label>
	<!-- <div class="_image">
		<img src="assets/images/test-image-rastered-{randomImage}.png" alt="" />
	</div> -->
</div>

<style lang="scss">
	.IMAGE {
		._toggleImage {
			display: block;
			width: var(--object-image-buttonWidth);
			background-color: black;
		}

		label > div,
		input {
			position: absolute;
			user-select: none;
			width: 30px;
			height: 30px;
			opacity: 0;
			pointer-events: none;
		}

		// input:checked + label {
		// 	background-color: transparent;
		// }

		// input:not(:checked) ~ ._image {
		// 	display: none;
		// }

		// ._image {
		// 	display: block;
		// 	margin-top: var(--object-y-normal);
		// 	transform: translateY(-50%);
		// 	width: 100%;
		// 	position: absolute;
		// 	height: 60vh;
		// 	pointer-events: none;
		// 	background-color: rgba(255, 255, 255, 0.5);
		// 	max-width: 1000px;
		// 	margin: auto;
		// 	left: 0;
		// 	right: 0;

		// 	img {
		// 		width: 100%;
		// 		height: 100%;
		// 		object-fit: cover;
		// 		object-position: center;
		// 	}
		// }
	}

	/* RESPONSIVE
******************************************************************************/

	// @media (width <= $bp-s-maxWidth) {
	// 	.IMAGE {
	// 	}
	// }
</style>

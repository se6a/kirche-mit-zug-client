<script>
	let {layout, index} = $props();
	const {position} = layout;

	const randomImage = Math.round(Math.random()) + 1;
</script>

<li
	class="ITEM-IMAGE _{index}"
	style:--itemImage-x-normal="{position.normal.x}%"
	style:--itemImage-y-normal="{position.normal.y}%"
	style:--itemImage-x-small="{position.small.x}%"
	style:--itemImage-y-small="{position.small.y}%"
>
	<input id="ti-{index}" type="checkbox" />
	<label class="_toggleImage" for="ti-{index}" data-as="buttonRound1">
		<div>Bild Anzeugen</div>
	</label>
	<div class="_image">
		<img src="assets/images/test-image-rastered-{randomImage}.png" alt="" />
	</div>
</li>

<style lang="scss">
	.ITEM-IMAGE {
		position: relative;
		z-index: var(--z-front);

		> * {
			position: absolute;
		}

		._toggleImage {
			width: 6%;
			position: absolute;
			left: var(--itemImage-x-normal);
			margin-top: var(--itemImage-y-normal);
			transform: translate(-50%, -50%);
			background-color: black;

			div {
				visibility: hidden;
				pointer-events: none;
				position: absolute;
			}
		}

		input {
			width: 0px;
			height: 0px;
			position: absolute;
		}

		input:checked + label {
			background-color: transparent;
		}

		input:not(:checked) ~ ._image {
			display: none;
		}

		._image {
			display: block;
			margin-top: var(--itemImage-y-normal);
			transform: translateY(-50%);
			width: 100%;
			position: absolute;
			height: 60vh;
			pointer-events: none;
			background-color: rgba(255, 255, 255, 0.5);
			max-width: 1000px;
			margin: auto;
			left: 0;
			right: 0;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}
	}

	:global(.ISLANDS[data-is-filtered='true']) li.ITEM-IMAGE {
		pointer-events: none;
		._toggleImage {
			// transform: scale(0);
		}
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width <= $bp-s-maxWidth) {
		.ITEM-IMAGE {
			._toggleImage {
				width: 10%;
				border-radius: 50%;
				left: var(--itemImage-x-small);
				margin-top: var(--itemImage-y-small);
			}
		}
	}
</style>

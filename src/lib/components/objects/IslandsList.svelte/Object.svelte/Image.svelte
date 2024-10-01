<script>
	import Image from '$lib/sanity/Image.svelte';
	import {getContext} from 'svelte';

	const {index, imageModulus} = $props();
	const images = getContext('images');
	const imageIndex = (index - 2) / imageModulus;
	const image = images[imageIndex];
	let NToggle;

	function getParentListItem(N) {
		let NLiParent = null;
		let NCrnt = N;
		let iterationCount = 0;

		while (!NLiParent && iterationCount < 10 && NCrnt) {
			if (NCrnt.tagName === 'LI') NLiParent = NCrnt;
			NCrnt = NCrnt.parentElement;
			iterationCount++;
		}

		return NLiParent;
	}

	function handleHange(e) {
		const NLiParent = getParentListItem(e.target);

		if (e.checked === 'false') {
			NLiParent.style.zIndex = '';
			return;
		}

		const NLiParentSiblings = [...NLiParent.parentElement.children];
		NLiParentSiblings.forEach((NSibling) => (NSibling.style.zIndex = ''));
		NLiParent.style.zIndex = 99;

		[...document.querySelectorAll('input._toggleImage:checked')].forEach((NOtherToggle) => {
			if (NOtherToggle.isEqualNode(e.target) === false) {
				NOtherToggle.checked = false;
				NOtherToggle?.blur?.();
			}
		});
	}

	function handleImageClick() {
		if (!NToggle) return;
		NToggle.checked = false;
	}
</script>

<div class="IMAGE">
	<input
		class="_toggleImage"
		id="ti-{index}"
		type="checkbox"
		onchange={handleHange}
		bind:this={NToggle}
	/>
	<label class="_toggleImage usePosition" for="ti-{index}" data-as="buttonRound1">
		<div>Bild Anzeigen</div>
	</label>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="_image" onclick={handleImageClick}>
		<Image data={image}></Image>
	</div>
</div>

<style lang="scss">
	.IMAGE {
		label._toggleImage {
			display: block;
			width: var(--object-image-buttonWidth);
			background-color: black;
		}

		label,
		input {
			z-index: 10;
		}
		._image {
			z-index: 5;
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

		input:checked + label {
			background-color: transparent;
		}

		input:not(:checked) ~ ._image {
			display: none;
		}

		._image {
			display: block;
			margin-top: var(--object-y-normal);
			transform: translateY(-50%);
			width: 100%;
			position: absolute;
			height: 60vh;
			// background-color: rgba(255, 255, 255, 0.9);
			max-width: 1000px;
			margin: auto;
			left: 0;
			right: 0;
			&::before {
				content: '';
				position: absolute;
				display: block;
				inset: 0;
				background-color: var(--color-0);
				opacity: 0.9;
			}

			:global(img) {
				width: 100%;
				height: 100%;
				object-fit: cover;
				object-position: center;
			}
		}
	}

	/* RESPONSIVE
******************************************************************************/

	// @media (width <= $bp-s-maxWidth) {
	// 	.IMAGE {
	// 	}
	// }
</style>

<script>
	import Image from './Image.svelte';
	import Illustration from './Illustration.svelte';

	let {layout, index, imageModulus} = $props();
	const {position} = layout;

	const isImage = index !== 0 && index % imageModulus === 0;
</script>

<li
	class="OBJECT _{index}"
	style:--object-x-normal="{position.normal.x}%"
	style:--object-y-normal="{position.normal.y}%"
	style:--object-x-small="{position.small.x}%"
	style:--object-y-small="{position.small.y}%"
>
	{#if isImage}
		<Image {index}></Image>
	{:else}
		<Illustration></Illustration>
	{/if}
</li>

<style lang="scss">
	.OBJECT {
		position: relative;
		z-index: var(--z-front);
		transition: transform var(--ms-s);
		transform: scale(1);

		:global(.usePosition) {
			position: absolute;
			left: var(--object-x-normal);
			margin-top: var(--object-y-normal);
			transform: translate(-50%, -50%);
		}
	}

	:global(.ISLANDS[data-is-filtered='true']) .OBJECT {
		transform: scale(0);
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width <= $bp-s-maxWidth) {
		.OBJECT {
			:global(.usePosition) {
				left: var(--object-x-small);
				margin-top: var(--object-y-small);
			}

			._toggleImage {
				width: 10%;
				border-radius: 50%;
				left: var(--object-x-small);
				margin-top: var(--object-y-small);
			}
		}
	}
</style>

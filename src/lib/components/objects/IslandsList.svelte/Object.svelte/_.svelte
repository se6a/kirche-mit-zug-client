<script>
	import Image from './Image.svelte';
	import Illustration from './Illustration.svelte';
	let {layout, index, imageModulus} = $props();
	const {position} = layout;
	const isImage = (index - 2) % imageModulus === 0;
</script>

<li
	class="ITEM-OBJECT _{index}"
	data-type={isImage ? 'image' : 'illustration'}
	style:--object-x-normal="{position.normal.x}%"
	style:--object-y-normal="{position.normal.y}%"
	style:--object-x-small="{position.small.x}%"
	style:--object-y-small="{position.small.y}%"
>
	{#if isImage}
		<Image {index} {imageModulus}></Image>
	{:else}
		<Illustration></Illustration>
	{/if}
</li>

<style lang="scss">
	.ITEM-OBJECT {
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

	:global(.ISLANDS[data-is-filtered='true']) .ITEM-OBJECT {
		transform: scale(0);
		pointer-events: none;
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width <= $bp-s-maxWidth) {
		.ITEM-OBJECT {
			:global(.usePosition) {
				left: var(--object-x-small);
				margin-top: var(--object-y-small);
			}
		}
	}
</style>

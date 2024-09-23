<script>
	const {index} = $props();
	const src = '/assets/islands/island1.svg';
</script>

<div class="ISLAND" style:--mask="url({src})">
	<img {src} aria-hidden="true" alt="" />
	<!-- <div class="_id">
		id: {id} / index: {index}
	</div> -->
</div>

<style lang="scss">
	.ISLAND {
		width: calc(var(--island-size, 1) * var(--island-baseSize, 100%));
		mask: var(--mask);
		background-color: black;
	}

	img {
		visibility: hidden;
	}

	// ._id {
	// 	position: absolute;
	// 	inset: 0;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	color: black;
	// }
</style>

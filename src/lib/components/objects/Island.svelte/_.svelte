<script>
	import island1 from './svg/island1.svg';

	const {index} = $props();
</script>

<div class="ISLAND" style:--mask="url({island1})">
	<img src={island1} />
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

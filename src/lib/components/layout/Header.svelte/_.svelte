<script>
	import Logo from '$lib/components/bits/Logo.svelte';
</script>

<header class="PAGE-HEADER">
	<a href="/">
		<Logo></Logo>
	</a>
</header>

<style lang="scss" global>
	.PAGE-HEADER {
		width: 100%;
		position: absolute;
		top: 0;
		max-width: var(--page-maxWidth);
		margin-left: auto;
		margin-right: auto;
		padding: var(--page-padding);

		.LOGO {
			width: 10vw;
			min-width: 100px;
		}
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width <= $bp-s-maxWidth) {
		.PAGE-HEADER {
			position: relative;
			display: flex;
			justify-content: center;
			margin-top: var(--size-m);
		}
	}
</style>

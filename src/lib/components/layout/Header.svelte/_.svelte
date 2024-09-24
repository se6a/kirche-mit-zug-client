<script>
	import Logo from '$lib/components/bits/Logo.svelte';
</script>

<header class="PAGE-HEADER">
	<a href="/#ueber">
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
		z-index: var(--z-front);
		pointer-events: none;

		> * {
			pointer-events: all;
		}

		a {
			display: inline-block;
		}

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

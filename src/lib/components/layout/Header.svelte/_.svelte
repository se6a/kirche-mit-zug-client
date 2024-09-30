<script>
	import Icon from '$lib/components/bits/Icon.svelte';
	import Logo from '$lib/components/bits/Logo.svelte';
</script>

<header class="PAGE-HEADER">
	<a href="/#ueber" title="Zur Startseite, Sektion 'Über Kirche mit Zug'">
		<Logo></Logo>
	</a>

	<a class="_back" title="Zurück zur Übersicht" href="/"><Icon name="arrow"></Icon></a>
</header>

<style lang="scss" global>
	.PAGE-HEADER {
		width: 100%;
		position: relative;
		top: 0;
		height: var(--header-height);
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
			height: 100%;
		}

		.LOGO {
			height: 100%;
		}

		a._back {
			display: block;

			position: absolute;
			bottom: -100%;
			--icon-size: 2.4rem;

			:global(.icon) {
				transform: rotate(180deg);
				stroke-width: 0.22rem;
			}
		}
	}

	[data-route='/'] .PAGE-HEADER {
		a._back {
			display: none;
		}
	}

	/* RESPONSIVE
******************************************************************************/

	@media (width <= $bp-s-maxWidth) {
		.PAGE-HEADER {
			position: relative;
			display: flex;
		}
	}
</style>

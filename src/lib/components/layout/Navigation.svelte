<script>
	import {browser} from '$app/environment';

	let {isVisible = false} = $props();

	$effect(() => {
		if (!browser) return;
	});
</script>

<nav class="PAGE-NAVIGATION" data-is-visible={isVisible}>
	<ul class="_navItems">
		<li>
			<a href="/programm">Programm 2025</a>
		</li>
		<li>
			<a href="/verein">Verein</a>
			<ul class="_subNavItems">
				<li><a href="/verein#uebersicht">Übersicht</a></li>
				<li><a href="/verein#mitmachen">Mitmachen</a></li>
				<li><a href="/verein#geschichte">Geschichte</a></li>
			</ul>
		</li>
		<li>
			<a href="/projektfoerderung">Projektförderung</a>
			<ul class="_subNavItems">
				<li><a href="/projektfoerderung#uebersicht">Übersicht</a></li>
				<li><a href="/projektfoerderung#bedingungen">Bedingungen</a></li>
				<li>
					<a href="/projektfoerderung#unterstuetzende_projekte">Unterstützende Projekte</a
					>
				</li>
			</ul>
		</li>
		<li>
			<a href="/archiv">Archiv</a>
		</li>
		<li>
			<a href="kontakt">Kontakt</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	.PAGE-NAVIGATION {
		width: 100vw; // hide scrollbar
		---height: 100vh;
		---height: 100svh;
		height: calc(var(---height) - var(--header-height));

		position: relative;
		position: fixed;
		inset: 0;
		top: var(--header-height);
		display: flex;
		justify-content: center;
		overflow-y: auto;
		overscroll-behavior: contain;

		---ms-toggle: 500ms;

		transition-property: opacity, transform;
		transition: var(---ms-toggle);
		transform: scale(0) translateY(calc(-1 * var(--header-height)));
		transform-origin: top right;
		opacity: 0;
	}

	ul {
		display: flex;
		flex-direction: column;
	}

	li {
		text-align: center;
	}

	._navItems {
		padding: 10vh 0;
		height: fit-content;
		gap: var(--size-l);
		> li > a {
			font-weight: 600;
			text-transform: uppercase;
		}
	}

	[data-is-visible='true'] {
		opacity: 1;
		transform: scale(1) translateY(0);
	}
</style>

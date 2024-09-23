<script>
	import Logo from '../bits/Logo.svelte';
</script>

<footer>
	<div class="layout">
		<div class="column _1">
			<a href="/">
				<Logo></Logo>
			</a>
		</div>

		<section class="column _2">
			<header>
				<h2>
					<div>KONTAKT UND</div>
					<div>ORGANISATION</div>
				</h2>
			</header>
			<address>
				<div>Katholische Kirche Zug</div>
				<div>Sandra Dietschi</div>
				<div>Gesamtleitung Fachstellen</div>
				<div>Landhausstrasse 15</div>
				<div>6340 Baar</div>
				<a href="mailto:">Mail</a>
				<a href="tel:">Telefon</a>
			</address>
		</section>

		<div class="column _3">
			<nav>
				<a href="/impressum">Impressum</a>
				<a href="/datenschutz">Datenschutz</a>
			</nav>
		</div>
	</div>
</footer>

<style lang="scss" global>
	footer {
		width: 100%;
		height: auto;
		background-color: black;
		color: white;
		padding-top: var(--size-xl);
		padding-bottom: var(--size-2xl);

		.layout {
			width: 100%;
			margin-left: auto;
			margin-right: auto;
			padding: var(--page-padding);
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
		}

		.column._1 {
			display: flex;
			flex-direction: column;
			align-items: center;

			.LOGO {
				width: 5em;
			}
		}

		.column._2 {
			display: flex;
			flex-direction: column;

			header {
				margin-bottom: var(--size-l);
			}

			address {
				display: flex;
				flex-direction: column;

				div + a {
					margin-top: 1em;
				}
			}
		}

		.column._3 {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			nav {
				display: flex;
				flex-direction: column;
			}
		}
	}

	@media (width <= $bp-m-maxWidth) {
		footer {
			display: flex;

			.layout {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin: auto;
				gap: var(--size-l);
				width: fit-content;

				> * {
				}

				.column._1 {
					align-items: flex-start;
				}
			}
		}
	}
</style>

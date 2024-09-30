<script>
	import Logo from '../bits/Logo.svelte';
	import PortableText from '$lib/sanity/PortableText.svelte';
	const {data} = $props();

	const textContact = data?.textContact || {};
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
					{textContact.title}
				</h2>
			</header>
			<address>
				<PortableText blocks={textContact.portableText}></PortableText>
			</address>
		</section>

		<div class="column _3">
			<figure class="logo _2">
				<img
					src="/assets/logo-katholische-kirche-zug.png"
					alt="Logo Katholische Kirche Zug"
				/>
			</figure>
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
		padding-top: calc(2 * var(--size-m));
		padding-bottom: calc(2 * var(--size-m));

		.layout {
			width: 100%;
			margin-left: auto;
			margin-right: auto;
			padding: var(--page-padding);
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
		}

		a {
			text-decoration: underline;
		}

		a:hover,
		a:focus {
			text-decoration-style: dashed;
		}

		.column._1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: calc(2 * var(--size-m));

			.LOGO {
				width: 5em;
			}
		}

		.column._2 {
			display: flex;
			flex-direction: column;

			header {
				margin-bottom: var(--size-m);
				white-space: pre-line;
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

			.logo {
				max-width: 66%;
				margin-bottom: auto;
				height: auto;
			}

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
				gap: var(--size-m);
				width: fit-content;

				.column._1 {
					align-items: flex-start;
				}

				.column._3 {
					flex-direction: column-reverse;

					.logo {
						max-width: 50%;
						margin-top: calc(3 * var(--size-m));
						margin-bottom: unset;
						height: auto;
					}
				}
			}
		}
	}
</style>

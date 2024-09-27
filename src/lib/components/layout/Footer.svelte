<script>
	import Logo from '../bits/Logo.svelte';
	import PortableText from '$lib/sanity/PortableText.svelte';
	const {data} = $props();

	const textContact = data.textContact || {};
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

<script>
	import Link from '$lib/sanity/Link.svelte';
	import {getContext} from 'svelte';
	const cta = getContext('cta');
	const useCta = typeof cta === 'object' && Array.isArray(cta) === false && cta && cta?.useCta;
</script>

{#if useCta}
	<div class="CTA">
		<div class="_inner" data-as="buttonRound1">
			<Link {cta}>
				{cta?.label}
			</Link>
		</div>
	</div>
{/if}

<style lang="scss">
	.CTA {
		aspect-ratio: 1;
		width: fit-content;

		position: absolute;
		top: calc(var(--filter-height) + 2 * var(--size-m));
		left: 0;
		right: 0;
		margin: auto;

		transform: rotate(0deg) scale(1);
		transition: transform var(--ms-m);

		&:hover {
			transform: rotate(20deg) scale(1.1);
		}

		._inner {
			background-color: black;
			color: white;
			height: auto;
			width: auto;
			padding: 1.4em;
			animation: popup var(--ms-s) 1000ms;
			animation-fill-mode: both;
		}

		:global(a) {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			white-space: pre-line;
			text-align: center;
			text-transform: uppercase;
			font-size: var(--font-size-m);
		}
	}

	:global([data-is-filtered='true']) .CTA {
		transform: rotate(0) scale(0) !important;
		pointer-events: none;
	}

	@keyframes popup {
		0% {
			transform: scale(0);
		}

		95% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}

	/* RESPONSIVE
    **************************************************************************/
	@media (width <= $bp-s-maxWidth) {
		.CTA {
			position: relative;
			top: 0;
			margin-bottom: var(--size-l);
		}
	}
</style>

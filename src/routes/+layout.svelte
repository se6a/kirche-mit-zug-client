<script>
	import '$lib/styles/index.scss';

	import {page} from '$app/stores';
	import {browser} from '$app/environment';
	import {beforeNavigate} from '$app/navigation';
	import Favicon from '$lib/components/bits/Favicon.svelte';

	const {children, data} = $props();

	beforeNavigate(() => {
		if (!browser) return;
		document.getElementById('scroll')?.style?.setProperty('scroll-behavior', 'auto');
	});

	$effect(() => {
		if (!browser) return;
		if (!$page?.url?.hash) {
			window.scrollTo({top: 0});
		}

		let timeout = setTimeout(() => {
			document.getElementById('scroll')?.style?.setProperty('scroll-behavior', 'smooth');
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	});
</script>

{#if children}
	{@render children()}
{/if}

<!-- <Favicon></Favicon> -->

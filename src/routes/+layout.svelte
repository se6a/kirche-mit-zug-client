<script>
	import '$lib/styles/index.scss';
	import {page} from '$app/stores';
	import {browser} from '$app/environment';
	import {beforeNavigate} from '$app/navigation';
	import {setContext} from 'svelte';
	import Favicon from '$lib/components/bits/Favicon.svelte';

	const {children, data} = $props();
	const {categories} = data;

	setContext('categories', categories);
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

	const cssVariables = [
		`<${'style'}>`, // Svelte bug workaround
		'body {',
		...categories.map((c) => `--color-category${c.id}: ${c.color};`),
		'}',
		`</${'style'}>`,
	].join('\n');
</script>

<svelte:head>
	{@html cssVariables}
</svelte:head>

<div class="SITE" data-route={$page?.route?.id}>
	{#if children}
		{@render children()}
	{/if}
</div>

<Favicon></Favicon>

<style lang="scss" global>
	.SITE {
		--color-siteBackground: var(--color-0);
		background-color: var(--color-siteBackground);
		transition: background-color var(--ms-m);

		&[data-route^='/insel'] {
			--color-siteBackground: var(--color-currentCategory, var(--color-0));
		}
	}
</style>

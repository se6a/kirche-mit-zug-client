<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import Cta from '../objects/Cta.svelte';
	import {setContext} from 'svelte';

	const {children, data = {}, attributes = {}} = $props();
	const {page, footer} = data;
	const title = '';
	const description = '';

	setContext('cta', page?.cta);
</script>

<svelte:head>
	<title>{title ? `${title} - ` : ''}Kirche mit Zug</title>
	<meta name="description" content={description ? description : 'Kirche mit Zug'} />
</svelte:head>

<Header></Header>

<main class="PAGE-CONTENT" {...attributes}>
	{#if children}
		{@render children()}
	{/if}
</main>

<Footer data={footer}></Footer>

<style lang="scss" global>
	main {
		width: 100%;
		max-width: var(--page-maxWidth);
		margin-left: auto;
		margin-right: auto;
		padding-inline: var(--page-paddingX);
		padding-top: var(--page-paddingY);
		min-height: 100vh;
	}
</style>

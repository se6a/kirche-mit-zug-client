<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	const {children, data = {}, attributes = {}} = $props();

	const title = '';
	const description = '';
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

<Footer data={data?.footer}></Footer>

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

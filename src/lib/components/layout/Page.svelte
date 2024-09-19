<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	const props = $props();
	const children = props?.children;

	const data = props.data;
	const {title = '', description = ''} = data?.metaTranslations?.[0] || {};
</script>

<svelte:head>
	<title>{title ? `${title} - ` : ''}Tour de Lorainne</title>
	<meta name="description" content={description ? description : 'Tour de Lorainne'} />
</svelte:head>

<Header></Header>

<main class="PAGE-CONTENT">
	{#if children}
		{@render children()}
	{/if}
</main>

<Footer></Footer>

<style lang="scss" global>
	main {
		z-index: -1;
		isolation: isolate;
		position: relative;
		flex: 1;
	}

	main,
	:global(footer) {
		width: 100%;
		max-width: var(--page-maxWidth);
		margin-left: auto;
		margin-right: auto;
	}
</style>

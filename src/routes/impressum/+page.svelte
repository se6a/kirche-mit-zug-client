<script>
	import Page from '$lib/components/layout/Page.svelte';
	import PageSections from '$lib/components/layout/PageSections.svelte';
	import PortableText from '$lib/sanity/PortableText.svelte';

	const {data} = $props();
	const page = data.page || {};
	const footer = data.footer || {};

	const content = page?.portableText || [];
</script>

<Page data={{page, footer}}>
	<PageSections>
		<section>
			<header>
				<h2>Impressum</h2>
			</header>
			<div class="_content">
				<PortableText blocks={content}></PortableText>
			</div>
		</section>
	</PageSections>
</Page>

<style lang="scss">
	section {
		margin-top: calc(3 * var(--size-m));
		header {
			margin-bottom: calc(2 * var(--size-m));
			h2 {
				font-size: var(--font-size-l);
			}
		}

		._content {
			max-width: 40ch;
		}
	}
	/* RESPONSIVE
    **************************************************************************/
</style>

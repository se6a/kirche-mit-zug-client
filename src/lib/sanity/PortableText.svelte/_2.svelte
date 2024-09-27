<script>
	import {toHTML} from '@portabletext/to-html';

	const props = $props();
	const {blocks = []} = props;

	const rendered = toHTML(blocks, {
		components: {
			marks: {
				link: ({children, value}) => {
					const href = value.href || '';
					const rel = href.startsWith('/') ? undefined : 'noreferrer noopener';
					return `<a href="${href}" rel="${rel}">${children}</a>`;
				}
			}
		}
	});
</script>

<div data-role="portableText">
	{#if rendered.length}
		{@html rendered}
	{/if}
</div>

<style>
	div {
		border: 10px solid red;
	}
</style>

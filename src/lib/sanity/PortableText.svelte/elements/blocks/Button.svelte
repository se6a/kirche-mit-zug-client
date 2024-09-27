<script>
	import Link from '$lib/sanity/Link.svelte';
	export let data;

	const link = data?.link || {};
</script>

<div class="PT-BLOCK-BUTTON">
	<Link data={link}>
		<!-- {link?.label} -->
	</Link>
</div>

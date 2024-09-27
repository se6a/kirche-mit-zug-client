<script>
	import Link from '$lib/sanity/Link.svelte';
	export let data;
</script>

<Link {data}>
	<slot />
</Link>

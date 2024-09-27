<script>
	const {data} = $props();
	const island = data?.island || {};
	console.log(island);
</script>

{island.title}

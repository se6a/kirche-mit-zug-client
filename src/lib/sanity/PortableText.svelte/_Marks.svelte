<script>
	import Component from './_Component.svelte';

	export let node = {};
	export let markDefs = [];

	const marks = node?.marks || [];
	const [crntMark, ...nextMarks] = marks;

	const markDef = markDefs.find((d) => d._key === crntMark);
	const data = markDef ? markDef : crntMark ? { style: crntMark } : null;

	const nextNode = {
		...node,
		marks: nextMarks
	};
</script>

{#if data}
	<Component node={data}>
		<svelte:self node={nextNode} {markDefs}>
			<slot />
		</svelte:self>
	</Component>
{:else}
	<slot />
{/if}

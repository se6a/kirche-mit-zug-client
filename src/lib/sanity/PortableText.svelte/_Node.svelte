<script>
	import Marks from './_Marks.svelte';
	import Component from './_Component.svelte';

	export let node = {};
	export let markDefs = [];
</script>

{#if node?._type == 'span'}
	<Marks {node} {markDefs}>
		{node?.text || ''}
	</Marks>
{:else}
	<Component {node}>
		{#if node?.children}
			{#each node.children as child}
				<svelte:self node={child} {markDefs} />
			{/each}
		{/if}
	</Component>
{/if}

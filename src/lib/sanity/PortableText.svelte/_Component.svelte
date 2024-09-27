<script>
	import {marks, blocks, styles} from './elements';

	export let node;

	const isStyle = 'style' in node;

	const component = isStyle
		? styles?.[node?.style] || null
		: marks?.[node?._type] || blocks?.[node?._type] || null;

	let error = false;
	if (!component) {
		console.error(`No Component for "${isStyle ? node?.style : node?._type}" found.`);
		error = true;
	}
</script>

{#if component && !error}
	<svelte:component this={component} data={node}>
		<slot />
	</svelte:component>
{:else}
	<div class="inlineMessage">
		No Component for "{isStyle ? node?.style : node?._type}" found.
	</div>
	<slot />
{/if}

<style>
	.inlineMessage {
		color: red;
		padding: 1em;
		border: 1px solid red;
	}
</style>

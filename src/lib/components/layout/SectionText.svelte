<script>
	import Anchor from '../bits/Anchor.svelte';

	const {id} = $props();
</script>

<section>
	{#if id}
		<Anchor {id}></Anchor>
	{/if}
	<header>
		<h2>
			<div>ÜBER KIRCHE</div>
			<div>MIT ZUG</div>
		</h2>
	</header>

	<div class="_content" data-layout="1-1-1 rsp-1">
		<div>
			Der gegenwärtige Zustand und die Perspektiven der katholischen Kirche im Kanton Zug
			hinsichtlich der Frage «Was interessiert uns in sieben Jahren?» betreffen mehrere
			wichtige Themenfelder, die sowohl aktuelle Herausforderungen als auch zukünftige
			Entwicklungen berücksichtigen.
		</div>

		<div>
			Der gegenwärtige Zustand und die Perspektiven der katholischen Kirche im Kanton Zug
			hinsichtlich der Frage «Was interessiert uns in sieben Jahren?» betreffen mehrere
			wichtige Themenfelder, die sowohl aktuelle Herausforderungen als auch zukünftige
			Entwicklungen berücksichtigen.
		</div>
	</div>
</section>

<style lang="scss">
	header {
		margin-bottom: var(--size-l);
	}
</style>

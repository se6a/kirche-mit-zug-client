<script>
	import Node from './_Node.svelte';
	import List from './elements/lists/Basic.svelte';

	const props = $props();
	const blocks = props?.blocks || [];

	const sorted = [];
	for (let i = 0; i < blocks.length; i++) {
		const b = blocks[i];
		let level = b?.level;

		if (level) {
			const group = [];
			while (i < blocks.length) {
				const _b = blocks[i];
				if (_b?.level !== level) {
					sorted.push(group, _b);
					level = 0;
					break;
				} else if (i === blocks.length - 1) {
					sorted.push([...group, _b]);
					break;
				} else {
					group.push(_b);
					i++;
				}
			}
		} else {
			sorted.push(b);
		}
	}

	// const sanitized = sorted.map((fragment) =>
	// 	fragment.children.map((child) => {
	// 		const usedMarks = [];
	// 		console.log({child});

	// 		child.marks.forEach((mark) => {
	// 			usedMarks.push(fragment.markDefs.find((markDef) => markDef._key === mark)?._type);
	// 		});

	// 		console.log({usedMarks});
	// 	})
	// );

	// console.log({sorted});
</script>

<div data-role="portableText">
	{#each sorted as fragment (fragment?._key)}
		{#if Array.isArray(fragment)}
			<List items={fragment} let:item={node}>
				<Node {node} markDefs={node.markDefs} />
			</List>
		{:else}
			<Node node={fragment} markDefs={fragment.markDefs} />
		{/if}
	{/each}
</div>

<style lang="scss" global>
	[data-role='portableText'] {
		white-space: pre-line;
	}

	[data-role='portableText'] {
		> * + * {
			margin-top: 1em;
		}

		> * + h2 {
			margin-top: 2em;
		}

		ul li {
			position: relative;
			padding-left: 1em;
			::before {
				content: '–';
				position: absolute;
				left: 0;
			}
		}

		ol {
			padding: 0;
			counter-reset: ol 8;
			list-style: none;
			li {
				counter-increment: ol;
				position: relative;
				::before {
					content: counter(ol) '.';
					min-width: 1ch;
					padding-right: 0.5em;
					display: inline-block;
					left: 0;
				}
			}
		}
	}
</style>

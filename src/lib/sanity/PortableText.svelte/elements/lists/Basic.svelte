<script>
    // Basic = ordered (ol) and unordered (ul) lists.

    export let items = [];

    const lists = [];
    let list;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const listType = item?.listItem === 'number' ? 'ol' : 'ul';

        if (list && list?.type === listType) {
            list.items.push(item);
        } else if (list) {
            lists.push(list);
            list = null;
        }

        if (!list) {
            list = {
                type: listType,
                items: [item]
            };
        }

        if (i === items.length - 1) lists.push(list);
    }
</script>

{#each lists as { items: items_ordered, type }}
    <svelte:element this={type}>
        {#each items_ordered as item}
            <li>
                <slot {item} />
            </li>
        {/each}
    </svelte:element>
{/each}

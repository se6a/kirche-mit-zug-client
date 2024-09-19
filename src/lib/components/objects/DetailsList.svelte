<script>
	import Drawer from './Drawer.svelte';
	import Icon from '../bits/Icon.svelte';
	import {PUBLIC_DIRECTUS_URL} from '$env/static/public';
	import Images from './Images.svelte';
	import FormatedText from './FormatedText.svelte';
	const {data} = $props();
</script>

<div class="DETAILS-LIST">
	{#each data as { item }}
		{@const translations = item?.translations?.[0] || {}}

		{#if item?.type === 'ele_details__drawer'}
			<Drawer icon="cross">
				{#snippet title()}
					{translations?.title}
				{/snippet}

				{#snippet content()}
					<FormatedText data={translations?.formatedText || ''}></FormatedText>
				{/snippet}
			</Drawer>
		{:else if item?.type === 'ele_details__media'}
			<Drawer icon="cross">
				{#snippet title()}
					{translations?.title}
				{/snippet}

				{#snippet content()}
					<Images data={item?.images || []}></Images>
				{/snippet}
			</Drawer>
		{:else if item?.type === 'ele_details__link'}
			<a
				href={translations?.url}
				title="URL zu {translations.label} in neuem Tab öffnen."
				referrerpolicy="noreferrer"
			>
				{translations.label}
				<Icon name="arrow"></Icon>
			</a>
		{:else if item?.type === 'ele_details__pdf'}
			{@const pdf = item?.pdf?.translations?.[0] || {}}

			<a
				href="{PUBLIC_DIRECTUS_URL}/assets/{pdf?.file?.id}"
				title="'{pdf?.title}' PDF-Datei in neuem Tab öffnen."
				target="_blank"
			>
				{pdf?.title}
				<Icon name="arrow"></Icon>
			</a>
		{:else}
			<div>
				Type "{item?.type}" does not exsit.
			</div>
		{/if}
	{/each}
</div>

<style lang="scss" global>
	.DETAILS-LIST {
		--icon-size: 1.5em;

		> a,
		summary {
			font-size: var(--font-size-m);
			font-weight: 600;
			min-height: 2em;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-transform: uppercase;
		}

		a,
		summary,
		details > .content {
			padding: var(--box-padding);
		}

		> a {
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				display: block;
				height: var(--line-width);
				width: 100%;
				background-color: currentColor;
				transform: scale(1.00001);
				left: 0;
				right: 0;
			}

			&::before {
				top: 0;
			}

			&::after {
				bottom: 0;
			}
		}

		c-drawer .IMAGES .content {
			max-height: 50vh;
		}

		> * + * {
			&::before {
				content: unset !important;
			}
		}
	}
</style>

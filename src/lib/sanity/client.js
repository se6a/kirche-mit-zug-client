import {createClient} from '@sanity/client';
import {SECRET_PROJECT_ID, SECRET_DATASET, SECRET_TOKEN} from '$env/static/private';

export const sanity = createClient({
	projectId: SECRET_PROJECT_ID,
	dataset: SECRET_DATASET,
	apiVersion: '2024-01-01',
	useCdn: true,
	token: SECRET_TOKEN,
});

export function fetch(query, variables = {}) {
	return sanity.fetch(query, {lang: 'de', ...variables});
}

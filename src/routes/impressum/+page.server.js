import {sanity} from '$lib/sanity/client';

export async function load() {
	try {
		const data = await sanity.fetch(`{
            "page": * [_type == "page-impressum" && _id match("^drafts.") == false][0] {
                ...
            }
        }`);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

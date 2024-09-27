import {fetch} from '$lib/sanity/client';

export async function load() {
	try {
		const data = await fetch(`{
            "categories": * [_type == "categories" && _id match("^drafts.") == false] {
                id,
                name, 
                shortName
            }    
        }`);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

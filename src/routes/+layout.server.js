import {fetch} from '$lib/sanity/client';

export async function load() {
	try {
		const data = await fetch(`{
            "footer": * [_type == "footer" && _id match("^drafts.") == false][0] {
                ...
            },
            "categories": * [_type == "categories" && _id match("^drafts.") == false] {
                id,
                name, 
                shortName,
                "color": color.hex
            }    
        }`);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

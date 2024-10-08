import {fetch} from '$lib/sanity/client';

export async function load() {
	try {
		const data = await fetch(`
        {
            "page": * [_type == "page-start" && _id match("^drafts.") == false][0] {
                description,
                title,
                cta {
                    ...
                },
                textAbout {
                    title,
                    portableText
                },
                images[] {
                    ...,
                    alt,
                    caption,
                    asset->{
                        metadata,
                        url,
                    }
                }
            },
            "islands": * [_type == "islands" && _id match("^drafts.") == false] {
                _id,
                islandText,
                "slug": slug.current,
                category->{
                    id
                },
            }
        }`);

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

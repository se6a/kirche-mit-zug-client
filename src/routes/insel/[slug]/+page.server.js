import {fetch} from '$lib/sanity/client';

export async function load({params}) {
	try {
		const slug = params?.slug;
		const data = await fetch(
			`{
                "island": * [_type == "islands" && slug.current == $slug && _id match("^drafts.") == false][0] {
                    islandText,
                    title,
                    initiators,
                    description,
                    category->{
                        id,
                    },
                    image {
                        alt,
                        caption,
                        ...asset->{
                            url,
                        }
                    },
                    illustration {
                        alt,
                        caption,
                        ...asset->{
                            url,
                        }
                    }
                }
            }`,
			{slug},
		);
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

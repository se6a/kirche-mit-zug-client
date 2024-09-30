import {fetch} from '$lib/sanity/client';

export async function load({params, url}) {
	try {
		const slug = params?.slug;
		const shape = url?.searchParams?.get('shape') || Math.ceil(Math.random() * 7);
		const data = await fetch(
			`{
                "island": * [_type == "islands" && slug.current == $slug && _id match("^drafts.") == false][0] {
                    islandText,
                    title,
                    initiators,
                    description,
                    category->{
                        id,
                        name,
                        shortName
                    },
                    image {
                        alt,
                        caption,
                        asset->{
                            url,
                        }
                    },
                    illustration {
                        alt,
                        caption,
                        asset->{
                            url,
                        }
                    }
                }
            }`,
			{slug},
		);
		return {
			island: {
				...(data?.island || {}),
				shape,
			},
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function createLinkAttributes(data) {
	if (typeof data !== 'object' || data === null || Array.isArray(data))
		throw Error('Argument must be of type Object.');

	const destination = data?.destination || '';
	const target = data?.target || '_blank';

	let href = '';

	switch (destination) {
		case 'page': {
			const section = data?.pageSection?.slug?.current
				? '/#' + data?.pageSection?.slug?.current
				: '';
			href = `/${data?.page?.slug}${section}`;
			break;
		}
		case 'pdf':
			href = data?.url;
			break;
		case 'url':
			href = data?.url;
			break;
		case 'email':
			href = `mailto:${data?.email}`;
			break;
		case 'phone':
			href = `tel:${data?.phone}`;
			break;
	}

	return {
		href,
		target,
	};
}

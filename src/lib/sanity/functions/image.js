export function maybeCrop(crop, widthOriginal, heightOriginal) {
	if (!crop || !widthOriginal || !heightOriginal) return '';

	const left = widthOriginal * crop.left;
	const top = heightOriginal * crop.top;
	const right = widthOriginal * crop.right;
	const bottom = heightOriginal * crop.bottom;

	const widthCropped = Math.round(widthOriginal - left - right);
	const heightCropped = Math.round(heightOriginal - top - bottom);

	return `fit=clip&rect=${Math.round(left)},${Math.round(top)},${Math.round(
		widthCropped,
	)},${Math.round(heightCropped)}`;
}

export function maybeHotspot(hotspot) {
	if (!hotspot) return '';
	const {x, y} = hotspot;
	return `${Math.round(x * 1000) / 10}% ${Math.round(y * 1000) / 10}%`;
}

export function breakpoints_1_addSizes(breakpoints = [], sizes = []) {
	return breakpoints.reverse().reduce((complete, bp, i) => {
		if (sizes[i]) {
			return [...complete, {...bp, size: sizes[i]}];
		}
		// Auto fill if sizes are definied implicit
		// -> size above to sizes below
		// eg. [xl, l] to [xl, l, m: l, s: l]
		return [
			...complete,
			{
				...bp,
				size: complete[i - 1].size,
			},
		];
	}, []);
}

export function breakpoints_2_add2ppx(breakpoints = []) {
	return breakpoints.reduce((complete, bp, i) => {
		return [
			...complete,
			[
				{
					...bp,
					is2dppx: true,
					size: bp.size,
					name: bp.name + '_2x',
				},
				bp,
			],
		];
	}, []);
}

export function makeRule({min = null, max = null, is2dppx = false} = {}) {
	let rule = [min ? `(min-width: ${min + 1}px)` : '', max ? `(max-width: ${max}px)` : '']
		.filter(Boolean)
		.join(' and ');

	if (is2dppx) {
		rule = `(-webkit-min-device-pixel-ratio: 2) and ${rule}, (min-resolution: 2dppx) and ${rule}`;
	}

	return rule;
}

export function breakpoints_3_addRules(breakpoints = []) {
	return breakpoints.map((bp, i) => {
		// A single breakpoint might have multiple versions, for different dppx
		return bp.map((bp_ddpxVersion) => {
			const {threshold, is2dppx} = bp_ddpxVersion;
			const rule =
				i === 0
					? // min
						makeRule({
							min: breakpoints[i + 1]?.[0]?.threshold || 0,
							is2dppx: is2dppx,
						})
					: i === breakpoints.length - 1
						? // max
							makeRule({max: threshold, is2dppx: is2dppx})
						: //min-max
							makeRule({
								max: threshold,
								min: breakpoints[i + 1][0].threshold,
								is2dppx: is2dppx,
							});

			return {...bp_ddpxVersion, rule};
		});
	});
}

export function breakpoints_4_flatten(breakpoinSets = []) {
	return breakpoinSets.reduce((complete, bpSet) => {
		return [...complete, ...bpSet];
	}, []);
}

export function createSrcsets({
	url = '',
	sizes = [],
	breakpoints = [],
	crop = null,
	quality = 75,
	widthOriginal = 0,
	heightOriginal = 0,
} = {}) {
	breakpoints = breakpoints_1_addSizes(breakpoints, sizes);
	// console.log('addSizes', {...breakpoints});
	breakpoints = breakpoints_2_add2ppx(breakpoints);
	// console.log('add2px', {...breakpoints});
	breakpoints = breakpoints_3_addRules(breakpoints);
	// console.log('addRules', {...breakpoints});
	breakpoints = breakpoints_4_flatten(breakpoints);
	// console.log('flatten', {...breakpoints});

	const cropParameter = maybeCrop(crop, widthOriginal, heightOriginal);

	return breakpoints.map(({name, is2dppx, rule, size, threshold}) => {
		let imageSizePx = ~~((threshold / 100) * size);
		if (name === 'xl') imageSizePx = imageSizePx - 1;
		if (is2dppx) imageSizePx = imageSizePx * 2;
		const parameter = [cropParameter, `q=${quality}`, `w=${imageSizePx} ${imageSizePx}w`]
			.filter(Boolean)
			.join('&');

		return {
			rule,
			srcset: url + (parameter ? `?${parameter}` : ''),
		};
	});
}

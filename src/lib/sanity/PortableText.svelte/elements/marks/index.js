export * from './decorators';
export * from './annotations';

import { decorators } from './decorators';
import { annotations } from './annotations';

export const marks = {
	...annotations,
	...decorators
};

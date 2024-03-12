export const firstOccurrenceIndex = (
	list: { [key: string]: unknown }[],
	key: string
): number => {
	const mapHash = new Map();

	for (let i = 0; i < list.length; i++) {
		const object = list[i];
		const currentValue = mapHash.get(object[key]);

		if (!currentValue) {
			mapHash.set(object[key], true);
			continue;
		}

		return i;
	}

	return -1;
};

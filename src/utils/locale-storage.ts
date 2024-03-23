export const setLocalStorageItem = <T>(key: string, value: T): T => {
	try {
		const serializedValue = typeof value !== 'string' ? JSON.stringify(value) : value!;
		localStorage.setItem(key, serializedValue);
	} catch (error) {
		console.error('Error setting localStorage item:', error);
	}

	return value;
};

export const getLocalStorageItem = <T>(key: string): T | null => {
	try {
		const serializedValue = localStorage.getItem(key);
		if (serializedValue) {
			return JSON.parse(serializedValue) as T;
		}
	} catch (error) {
		console.error('Error getting localStorage item:', error);
	}

	return null;
};

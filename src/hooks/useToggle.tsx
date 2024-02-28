import { useState } from 'react';

export const useToggle = (initialValue = false) => {
	const [isOpen, setIsOpen] = useState(initialValue);

	const toggleIsOpen = (value?: boolean) => {
		setIsOpen((prevState) => {
			return value ?? !prevState;
		});
	};

	return { isOpen, toggleIsOpen };
};

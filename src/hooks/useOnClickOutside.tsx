import { RefObject, useEffect } from 'react';

export const useOnClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: (value?: boolean) => void
) => {
	useEffect(() => {
		const listener = (event: any) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}

			callback();
			document.removeEventListener('click', listener);
		};

		document.addEventListener('click', listener);

		return () => {
			document.removeEventListener('click', listener);
		};
	}, [ref, callback]);
};

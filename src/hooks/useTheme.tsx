import { useLayoutEffect } from 'react';
import { useThemeStore } from '@/store/ThemeStore';

export const useTheme = () => {
	const theme = useThemeStore((state) => state.theme);

	useLayoutEffect(() => {
		const root = document.documentElement;
		root.dataset.colorScheme = theme;
	}, [theme]);
};

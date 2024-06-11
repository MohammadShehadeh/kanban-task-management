import { StoreApi } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

interface ZStore {
	theme: string;
	toggleTheme(): void;
}

const initialState: Omit<ZStore, 'toggleTheme'> = {
	theme: 'dark',
};

export const useThemeStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn(
		persist(
			(set) => ({
				theme: initialState.theme,

				toggleTheme: () =>
					set((state) => {
						const updatedTheme = state.theme === 'light' ? 'dark' : 'light';

						return { theme: updatedTheme };
					}),
			}),
			{
				name: '__msh_theme', // name of the item in the storage (must be unique)
				storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			}
		)
	);

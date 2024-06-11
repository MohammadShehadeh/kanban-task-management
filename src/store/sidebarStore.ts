import { StoreApi } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

interface ZStore {
	isSidebarOpen: boolean;
	toggleSideBar: () => void;
}

const initialState: Omit<ZStore, 'toggleSideBar'> = {
	isSidebarOpen: true,
};

export const useSidebarStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn(
		persist(
			(set) => ({
				isSidebarOpen: initialState.isSidebarOpen,

				toggleSideBar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
			}),
			{
				name: '__msh_sidebar', // name of the item in the storage (must be unique)
				storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			}
		)
	);

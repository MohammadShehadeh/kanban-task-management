import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';
interface ZStore {
	isSidebarOpen: boolean;
	toggleSideBar: () => void;
}

const initialState: Omit<ZStore, 'toggleSideBar'> = {
	isSidebarOpen: true,
};

export const useSidebarStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn((set) => ({
		isSidebarOpen: initialState.isSidebarOpen,

		toggleSideBar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
	}));

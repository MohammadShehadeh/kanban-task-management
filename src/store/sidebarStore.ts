import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

interface ZState {
	isSidebarOpen: boolean;
}

interface ZStore {
	isSidebarOpen: boolean;
	toggleSideBar: () => void;
}

export const useSidebarStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn((set) => ({
		isSidebarOpen: true,
		toggleSideBar: () => set((state: ZState) => ({ isSidebarOpen: !state.isSidebarOpen })),
	}));

import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

interface ZState {
	isOpen: boolean;
}

interface ZStore {
	isOpen: boolean;
	toggleIsOpen: () => void;
}

export const useSidebarStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn((set) => ({
		isOpen: true,
		toggleIsOpen: () => set((state: ZState) => ({ isOpen: !state.isOpen })),
	}));

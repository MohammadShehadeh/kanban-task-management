import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

export const useBoardDataStore: UseBoundStoreWithEqualityFn<StoreApi<any>> =
	createWithEqualityFn((set) => ({
		board: [],
		// board handlers
		createBoard: () => set(() => []),
		editBoard: () => set(() => []),
		deleteBoard: () => set(() => []),
		// task handlers
		createTask: () => set(() => []),
		editTask: () => set(() => []),
		deleteTask: () => set(() => []),
	}));

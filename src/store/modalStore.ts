import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';

export const ADD_BOARD = 'add_board';
export const DELETE_BOARD = 'delete_board';
export const EDIT_BOARD = 'edit_board';
export const EDIT_COLUMN = 'edit_column';

export const ADD_TASK = 'add_task';
export const DELETE_TASK = 'delete_task';
export const EDIT_TASK = 'edit_task';
export const VIEW_TASK = 'view_task';

export const MODALS = {
	'': '',
	[ADD_BOARD]: ADD_BOARD,
	[DELETE_BOARD]: DELETE_BOARD,
	[EDIT_BOARD]: EDIT_BOARD,
	[EDIT_COLUMN]: EDIT_COLUMN,
	[ADD_TASK]: ADD_TASK,
	[DELETE_TASK]: DELETE_TASK,
	[EDIT_TASK]: EDIT_TASK,
	[VIEW_TASK]: VIEW_TASK,
};

export type ModalType = keyof typeof MODALS;

interface ZStore {
	modalType: ModalType;
	openModal: (type: ModalType) => void;
	closeModal: () => void;
	isModalOpen: boolean;
}

const initialState: Omit<ZStore, 'closeModal' | 'openModal'> = {
	modalType: '',
	isModalOpen: false,
};

export const useModalStore: UseBoundStoreWithEqualityFn<StoreApi<ZStore>> =
	createWithEqualityFn((set) => ({
		modalType: initialState.modalType,
		isModalOpen: initialState.isModalOpen,

		closeModal: () => set(() => ({ isModalOpen: false, modalType: '' })),
		openModal: (type: ModalType) => set(() => ({ isModalOpen: true, modalType: type })),
	}));

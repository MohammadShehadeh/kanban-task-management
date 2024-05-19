import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// Define a type for the slice state
export interface ModalState {
	isModalOpen: boolean;
	modalType: string;
}

// Define the initial state using that type
const initialState: ModalState = {
	isModalOpen: false,
	modalType: '',
};

export const modalSlice = createSlice({
	name: 'modal',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		open: (state, action) => {
			state.isModalOpen = true;
			state.modalType = action.payload.type;
		},
		close: (state) => {
			state.isModalOpen = false;
			state.modalType = '';
		},
	},
});

export const { open, close } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

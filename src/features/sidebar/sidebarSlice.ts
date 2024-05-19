import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// Define a type for the slice state
export interface SidebarState {
	isSidebarOpen: boolean;
}

// Define the initial state using that type
const initialState: SidebarState = {
	isSidebarOpen: true,
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		toggleSideBar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
	},
});

export const { toggleSideBar } = sidebarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsSidebarOpen = (state: RootState) => state.sidebar.isSidebarOpen;

export default sidebarSlice.reducer;

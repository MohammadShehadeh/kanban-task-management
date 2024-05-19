import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import modalReducer from './features/modal/modalSlice';
import sidebarReducer from './features/sidebar/sidebarSlice';

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		sidebar: sidebarReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

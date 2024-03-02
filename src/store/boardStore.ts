import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';
import { z } from 'zod';

import data from '../../initial-data.json';

const SubTaskSchema = z.array(
	z.object({
		title: z.string(),
		completed: z.boolean(),
	})
);

const TaskSchema = z.array(
	z.object({
		id: z.number(),
		title: z.string().optional(),
		description: z.string().optional(),
		subTasks: SubTaskSchema,
	})
);

const ColumnSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		tasks: TaskSchema,
	})
);

const BoardSchema = z.array(
	z.object({
		id: z.number(),
		name: z.string(),
		columns: ColumnSchema,
	})
);

type BoardData = z.infer<typeof BoardSchema>;

interface ZStore {
	boardData: BoardData;
	activeBoardIndex: number;
	createBoard: () => void;
	editBoard: () => void;
	setActiveBoard: (index: number) => void;
	deleteBoard: () => void;
	createTask: () => void;
	editTask: () => void;
	deleteTask: () => void;
}

const createBoardStore = (): UseBoundStoreWithEqualityFn<StoreApi<ZStore>> => {
	// const boardData = JSON.parse(localStorage.getItem('msh_board') || '{}');
	// const results = BoardSchema.safeParse(boardData);
	// const boardInitialData = results.success ? results.data : data;
	return createWithEqualityFn((set) => ({
		boardData: data,
		activeBoardIndex: 0,
		setActiveBoard: (index: number) => set(() => ({ activeBoardIndex: index })),
		// board handlers
		createBoard: () => set((state) => state),
		editBoard: () => set((state) => state),
		deleteBoard: () => set((state) => state),
		// task handlers
		createTask: () => set((state) => state),
		editTask: () => set((state) => state),
		deleteTask: () => set((state) => state),
	}));
};

export const useBoardDataStore = createBoardStore();

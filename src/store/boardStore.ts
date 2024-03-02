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
	activeTask: any;
	activeBoard: any;
	setActiveTask: any;
	setActiveBoard: (id: number) => void;
	// createBoard: () => void;
	// editBoard: () => void;
	// deleteBoard: () => void;
	// createTask: () => void;
	// editTask: () => void;
	// deleteTask: () => void;
}

const createBoardStore = (): UseBoundStoreWithEqualityFn<StoreApi<ZStore>> => {
	return createWithEqualityFn((set) => ({
		boardData: data,
		activeBoard: data[0],
		activeTask: {},

		setActiveBoard: (id: number) =>
			set((state) => {
				const activeBoard = state.boardData.find((board) => board.id === id);
				return { activeBoard };
			}),
		setActiveTask: (columnId: number, taskId: number) =>
			set((state) => {
				const activeColumn = state.activeBoard?.columns?.find(
					(column: any) => column.id === columnId
				);
				const activeTask = activeColumn?.tasks?.find((task: any) => task.id === taskId);

				return { activeTask: activeTask };
			}),

		// // board handlers
		// createBoard: () => set((state) => state),
		// editBoard: () => set((state) => state),
		// deleteBoard: () => set((state) => state),
		// // task handlers
		// createTask: () => set((state) => state),
		// editTask: () => set((state) => state),
		// deleteTask: () => set((state) => state),
	}));
};

export const useBoardDataStore = createBoardStore();

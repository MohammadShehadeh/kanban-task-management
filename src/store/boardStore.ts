import { StoreApi } from 'zustand';
import { UseBoundStoreWithEqualityFn, createWithEqualityFn } from 'zustand/traditional';
import { z } from 'zod';

import data from '../../initial-data.json';

const SingleSubTaskSchema = z.object({
	title: z.string(),
	completed: z.boolean(),
});

const SubTaskSchema = z.array(SingleSubTaskSchema);

const SingleTaskSchema = z.object({
	id: z.number(),
	title: z.string().optional(),
	description: z.string().optional(),
	subTasks: SubTaskSchema,
});

const TaskSchema = z.array(SingleTaskSchema);

const SingleColumnSchema = z.object({
	id: z.number(),
	name: z.string(),
	tasks: TaskSchema,
});

const ColumnSchema = z.array(SingleColumnSchema);

const SingleBoardSchema = z.object({
	id: z.number(),
	name: z.string(),
	columns: ColumnSchema,
});

const BoardSchema = z.array(SingleBoardSchema);

type Task = z.infer<typeof SingleTaskSchema>;
type BoardData = z.infer<typeof SingleBoardSchema>;

interface ZStore {
	boardData?: BoardData[];
	activeTask?: Task;
	activeBoard?: BoardData;

	setActiveTask: (columnId: number, taskId: number) => void;
	setActiveBoard: (id: number) => void;
	createBoard: () => void;
	editBoard: () => void;
	deleteBoard: (id: number) => void;
	createTask: () => void;
	editTask: () => void;
	deleteTask: (boardId: number, taskId: number) => void;
}

const createBoardStore = (): UseBoundStoreWithEqualityFn<StoreApi<ZStore>> => {
	return createWithEqualityFn((set) => ({
		boardData: data,
		activeBoard: data[0],
		activeTask: undefined,

		setActiveBoard: (id: number) =>
			set((state) => {
				const activeBoard = state.boardData?.find((board) => board.id === id);
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
		createBoard: () => set((state) => state),
		editBoard: () => set((state) => state),
		deleteBoard: (boardId: number) =>
			set((state) => {
				const newBoardData = state.boardData?.filter((board) => board.id !== boardId);

				return { boardData: newBoardData, activeBoard: newBoardData?.[0] };
			}),
		// // task handlers
		createTask: () => set((state) => state),
		editTask: () => set((state) => state),
		deleteTask: (boardId: number, taskId: number) =>
			set((state) => {
				const { boardData } = state;
				const currentBoard = boardData?.find((board) => board.id === boardId);
				currentBoard?.columns?.forEach((column: any) => {
					const taskIndex = column.tasks.findIndex((task: any) => task.id === taskId);

					if (taskIndex !== -1) {
						// Use slice to create a new array instead of mutating directly
						column.tasks = [
							...column.tasks.slice(0, taskIndex),
							...column.tasks.slice(taskIndex + 1),
						];
					}
				});

				return { boardData };
			}),
	}));
};

export const useBoardDataStore = createBoardStore();

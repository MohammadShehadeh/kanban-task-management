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

type Column = z.infer<typeof SingleColumnSchema>;
type Task = z.infer<typeof SingleTaskSchema>;
type BoardData = z.infer<typeof SingleBoardSchema>;

interface ZStore {
	boardData?: BoardData[];
	activeTask?: Task;
	activeBoard?: BoardData;

	setActiveTask: (columnId: number, taskId: number) => void;
	setActiveBoard: (id: number) => void;
	moveTask: (targetColumnId: number, currentTaskId: number, currentColumnId: number) => void;
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
					(column: Column) => column.id === columnId
				);
				const activeTask = activeColumn?.tasks?.find((task: any) => task.id === taskId);

				return { activeTask: activeTask };
			}),
		moveTask: (targetColumnId: number, currentTaskId: number, currentColumnId: number) =>
			set((state) => {
				const updatedActiveBoard = state.activeBoard;

				const targetColumnIndex =
					updatedActiveBoard?.columns.findIndex(
						(columns: Column) => columns.id === targetColumnId
					) ?? -1;

				const currentColumnIndex =
					updatedActiveBoard?.columns.findIndex(
						(columns: Column) => columns.id === currentColumnId
					) ?? -1;

				const currentTaskIndex =
					updatedActiveBoard?.columns[currentColumnIndex]?.tasks.findIndex(
						(task: Task) => task.id === currentTaskId
					) ?? -1;

				if (!updatedActiveBoard || currentTaskIndex === -1 || currentColumnIndex === -1) {
					return {};
				}

				// change current task id
				const currentColumn = updatedActiveBoard.columns[currentColumnIndex];
				const currentTask = currentColumn.tasks[currentTaskIndex];
				currentTask.id = Date.now();

				// Move current task to the target column
				const targetColumn = updatedActiveBoard.columns[targetColumnIndex];
				targetColumn.tasks.push(currentTask);

				// Remove current task from current column
				currentColumn.tasks = [
					...currentColumn.tasks.slice(0, currentTaskIndex),
					...currentColumn.tasks.slice(currentTaskIndex + 1),
				];

				return { activeBoard: updatedActiveBoard };
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
				currentBoard?.columns?.forEach((column: Column) => {
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

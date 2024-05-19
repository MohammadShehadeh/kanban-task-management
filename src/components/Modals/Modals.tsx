'use client';

import React from 'react';

import {
	BoardForm,
	DeleteBoard,
	DeleteTask,
	TaskForm,
	ViewTaskForm,
} from '@/components/Forms';

import {
	ADD_BOARD,
	ADD_TASK,
	DELETE_BOARD,
	DELETE_TASK,
	EDIT_BOARD,
	EDIT_COLUMN,
	EDIT_TASK,
	VIEW_TASK,
} from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';
import { selectModal } from '@/features/modal/modalSlice';
import { useAppSelector } from '@/hooks';

export const Modals = () => {
	const { activeTask, activeBoard } = useBoardDataStore();
	const { modalType } = useAppSelector(selectModal);

	const modalComponents: {
		[key: string]: React.JSX.Element;
	} = {
		[EDIT_BOARD]: <BoardForm {...activeBoard} type={EDIT_BOARD} />,
		[ADD_BOARD]: <BoardForm type={ADD_BOARD} />,
		[EDIT_COLUMN]: <BoardForm {...activeBoard} type={EDIT_BOARD} />,
		[DELETE_BOARD]: <DeleteBoard />,

		[ADD_TASK]: <TaskForm type={ADD_TASK} />,
		[EDIT_TASK]: <TaskForm {...activeTask} type={EDIT_TASK} />,
		[DELETE_TASK]: <DeleteTask />,
		[VIEW_TASK]: <ViewTaskForm {...activeTask!} />,
	};

	return modalComponents[modalType] || null;
};

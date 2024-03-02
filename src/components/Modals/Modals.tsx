'use client';

import React from 'react';

import { BoardForm, DeleteForm, TaskForm, ViewTaskForm } from '@/components/Forms';

import {
	ADD_BOARD,
	ADD_TASK,
	DELETE_BOARD,
	DELETE_TASK,
	EDIT_BOARD,
	EDIT_COLUMN,
	EDIT_TASK,
	VIEW_TASK,
	useModalStore,
} from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';

export const Modals = () => {
	const { modalType } = useModalStore();
	const { activeTask, activeBoard } = useBoardDataStore();

	if (modalType === EDIT_BOARD) {
		return <BoardForm />;
	}

	if (modalType === ADD_BOARD) {
		return <BoardForm />;
	}

	if (modalType === DELETE_BOARD) {
		return <DeleteForm />;
	}

	if (modalType === EDIT_COLUMN) {
		return <BoardForm {...activeBoard} />;
	}

	if (modalType === ADD_TASK) {
		return <TaskForm />;
	}

	if (modalType === EDIT_TASK) {
		return <TaskForm />;
	}

	if (modalType === VIEW_TASK) {
		return <ViewTaskForm {...activeTask} />;
	}

	if (modalType === DELETE_TASK) {
		return <DeleteForm />;
	}
};

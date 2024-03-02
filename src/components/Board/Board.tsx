// @ts-nocheck
'use client';

import React, { DragEvent } from 'react';
import cx from 'classnames';

import { Column } from '@/components/shared/Column';
import { Badge } from '@/components/shared/Badge';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { AddIcon } from '@/components/shared/icons';

import { useSidebarStore } from '@/store/sidebarStore';
import { EDIT_COLUMN, VIEW_TASK, useModalStore } from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';

import styles from './Board.module.scss';

export const Board = () => {
	const { isSidebarOpen } = useSidebarStore();
	const { openModal } = useModalStore();
	const { activeBoard, setActiveTask } = useBoardDataStore();

	const handleOnDrag = (e: DragEvent, columnId: number, taskId: number) => {
		// e.dataTransfer.setData('columnType', columnType.toString());
		// e.dataTransfer.setData('taskType', taskType.toString());
	};

	const handleOnDrop = (e: DragEvent, targetId: number) => {
		// const taskType = e.dataTransfer.getData('taskType');
		// const columnType = e.dataTransfer.getData('columnType');
		// // Find the task with the specified ID
		// let updatedColumns = JSON.parse(JSON.stringify([]));
		// const task = updatedColumns.reduce((acc: any, column: any) => {
		// 	if (acc || column.id !== columnType) {
		// 		return acc;
		// 	}
		// 	return column.tasks.find((task: any) => task.id === taskType);
		// }, undefined);
		// updatedColumns = updatedColumns.reduce((acc: any, column: any) => {
		// 	const updatedCol: any = {
		// 		...column,
		// 	};
		// 	updatedCol.tasks = [];
		// 	updatedCol.tasks =
		// 		column.tasks.filter((task: any) => {
		// 			if (task.id !== taskType) {
		// 				return task;
		// 			}
		// 		}) || [];
		// 	if (column.id === columnTarget) {
		// 		updatedCol.tasks.push(task);
		// 	}
		// 	return [...acc, updatedCol];
		// }, []);
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	return (
		<div className={cx(styles.board, { [styles.isOpen]: !isSidebarOpen })}>
			{activeBoard.columns?.map((column, columnIndex) => (
				<div className={styles.task} key={columnIndex}>
					<Badge order={columnIndex + 1} className={styles.sticky}>
						{column.name} ({column.tasks.length})
					</Badge>
					<Column
						data-name={column.name}
						onDragOver={handleDragOver}
						onDrop={(e) => handleOnDrop(e, column.id)}
					>
						{column.tasks.map((task, taskIndex) => (
							<Card
								draggable
								key={taskIndex}
								onClick={() => {
									openModal(VIEW_TASK);
									setActiveTask(column.id, task.id);
								}}
								onDragStart={(e) => handleOnDrag(e, column.id, task.id)}
							>
								<Card.Headline>{task.title}</Card.Headline>
								<Card.Description>
									{task.subTasks?.filter((subTask) => subTask.completed).length} of{' '}
									{task.subTasks?.length} subtasks
								</Card.Description>
							</Card>
						))}
					</Column>
				</div>
			))}
			<div className={styles.task}>
				<Badge className={styles.sticky}>&nbsp;</Badge>
				<Column className={styles.addNewCol}>
					<Button
						variant="normal"
						size="lg"
						color="secondary"
						center
						onClick={() => openModal(EDIT_COLUMN)}
					>
						<AddIcon /> New Column
					</Button>
				</Column>
			</div>
		</div>
	);
};

'use client';

import React, { DragEvent, useState } from 'react';
import cx from 'classnames';

import { Column } from '@/components/shared/Column';
import { Badge } from '@/components/shared/Badge';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { AddIcon } from '@/components/shared/icons';

import { useSidebarStore } from '@/store/sidebarStore';
import { ADD_BOARD, EDIT_COLUMN, VIEW_TASK, useModalStore } from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';
import { Typography } from '@/components/shared/Typography';

import styles from './Board.module.scss';

export const Board = () => {
	const { isSidebarOpen } = useSidebarStore();
	const { openModal } = useModalStore();
	const { activeBoard, setActiveTask, moveTask } = useBoardDataStore();
	const [activeColumnIndex, setActiveColumnIndex] = useState(-1);

	const handleOnDrag = (e: DragEvent, columnId: number, taskId: number) => {
		e.dataTransfer.setData('currentColumnId', columnId.toString());
		e.dataTransfer.setData('currentTaskId', taskId.toString());

		setActiveColumnIndex(columnId);
	};

	const handleOnDrop = (e: DragEvent, targetColumnId: number) => {
		const currentColumnId = +e.dataTransfer.getData('currentColumnId');
		const currentTaskId = +e.dataTransfer.getData('currentTaskId');

		if (targetColumnId !== currentColumnId) {
			moveTask(targetColumnId, currentTaskId, currentColumnId);
		}

		setActiveColumnIndex(-1);
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	return (
		<div className={cx(styles.board, { [styles.isOpen]: !isSidebarOpen })}>
			{activeBoard?.columns?.map((column, columnIndex) => (
				<div className={styles.task} key={columnIndex}>
					<Badge order={columnIndex + 1} className={styles.sticky}>
						{column.name} ({column.tasks?.length ?? 0})
					</Badge>
					<Column
						data-name={column.name}
						onDragOver={handleDragOver}
						onDrop={(e) => handleOnDrop(e, column.id)}
						active={activeColumnIndex >= 0 ? activeColumnIndex !== columnIndex : false}
					>
						{column.tasks?.map((task, taskIndex) => (
							<Card
								draggable
								key={taskIndex}
								onClick={() => {
									openModal(VIEW_TASK);
									setActiveTask(column.id, task.id);
								}}
								onDragStart={(e) => handleOnDrag(e, column.id, task.id)}
								onDragEnd={() => setActiveColumnIndex(-1)}
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

			{!!activeBoard ? (
				<div className={styles.task}>
					<Badge className={styles.sticky}>&nbsp;</Badge>
					<Column className={styles.addNewCol}>
						<Button
							variant="normal"
							size="lg"
							color="secondary"
							center
							onClick={() => openModal(EDIT_COLUMN)}
							disabled
						>
							<AddIcon /> New Column
						</Button>
					</Column>
				</div>
			) : (
				<div className={styles.newBoard}>
					<Typography as="p" color="muted">
						This board is empty. Create a new column to get started.
					</Typography>
					<Button size="md" center onClick={() => openModal(ADD_BOARD)}>
						<AddIcon /> Create New Board
					</Button>
				</div>
			)}
		</div>
	);
};

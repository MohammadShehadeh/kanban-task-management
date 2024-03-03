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
import { ADD_BOARD, EDIT_COLUMN, VIEW_TASK, useModalStore } from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';
import { Typography } from '@/components/shared/Typography';

import styles from './Board.module.scss';

export const Board = () => {
	const { isSidebarOpen } = useSidebarStore();
	const { openModal } = useModalStore();
	const { activeBoard, setActiveTask } = useBoardDataStore();

	const handleOnDrag = (e: DragEvent, column: any, task: any) => {
		e.dataTransfer.setData('draggedColumn', JSON.stringify(column));
		e.dataTransfer.setData('draggedTask', JSON.stringify(task));
	};

	const handleOnDrop = (e: DragEvent, targetId: number) => {
		const draggedColumn = JSON.parse(e.dataTransfer.getData('draggedColumn'));
		const draggedTask = JSON.parse(e.dataTransfer.getData('draggedTask'));
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	return (
		<div className={cx(styles.board, { [styles.isOpen]: !isSidebarOpen })}>
			{activeBoard?.columns?.map((column, columnIndex) => (
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
								onDragStart={(e) => handleOnDrag(e, column, task)}
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

'use client';

import React, { DragEvent, useState } from 'react';
import cx from 'classnames';

import { Column } from '@/components/shared/Column';
import { Badge } from '@/components/shared/Badge';
import { useSidebarStore } from '@/store/sidebarStore';

import styles from './Board.module.scss';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { AddIcon } from '../shared/icons';
import { BoardForm } from '../BoardForm';
import { ADD_BOARD, useModalStore } from '@/store/modalStore';

export const Board = () => {
	const { isSidebarOpen } = useSidebarStore();
	const { openModal } = useModalStore();

	const [columns, setColumns] = useState([
		{
			id: 'TODO-1',
			title: 'TODO',
			tasks: [
				{
					id: 'TODO-tasks-1',
					title: 'First TODO title',
					description: 'First TODO Description',
					subTasks: [
						{
							title: 'First TODO title',
							completed: false,
						},
						{
							title: 'second TODO title',
							completed: false,
						},
					],
				},
			],
		},
		{
			id: 'TODO-2',
			title: 'TODO',
			tasks: [
				{
					id: 'TODO-tasks-1',
					title: 'First TODO title',
					description: 'First TODO Description',
					subTasks: [
						{
							title: 'First TODO title',
							completed: false,
						},
						{
							title: 'second TODO title',
							completed: false,
						},
					],
				},
			],
		},
		{
			id: 'DONE-1',
			title: 'DONE',
			tasks: [
				{
					id: 'DONE-tasks-1',
					title: 'First DONE title',
					description: 'First DONE Description',
					subTasks: [
						{
							title: 'First DONE title',
							completed: false,
						},
						{
							title: 'second DONE title',
							completed: false,
						},
					],
				},
				{
					id: 'DONE-tasks-2',
					title: 'First DONE title',
					description: 'First DONE Description',
					subTasks: [
						{
							title: 'First DONE title',
							completed: false,
						},
						{
							title: 'second DONE title',
							completed: false,
						},
					],
				},
				{
					id: 'DONE-tasks-3',
					title: 'First DONE title',
					description: 'First DONE Description',
					subTasks: [
						{
							title: 'First DONE title',
							completed: false,
						},
						{
							title: 'second DONE title',
							completed: false,
						},
					],
				},
			],
		},
	]);

	const handleOnDrag = (e: DragEvent, columnType: string, taskType: string) => {
		e.dataTransfer.setData('columnType', columnType);
		e.dataTransfer.setData('taskType', taskType);
	};

	const handleOnDrop = (e: DragEvent, columnTarget: string) => {
		const taskType = e.dataTransfer.getData('taskType');
		const columnType = e.dataTransfer.getData('columnType');

		// Find the task with the specified ID
		let updatedColumns = JSON.parse(JSON.stringify(columns));

		const task = updatedColumns.reduce((acc: any, column: any) => {
			if (acc || column.id !== columnType) {
				return acc;
			}

			return column.tasks.find((task: any) => task.id === taskType);
		}, undefined);

		updatedColumns = updatedColumns.reduce((acc: any, column: any) => {
			const updatedCol: any = {
				...column,
			};
			updatedCol.tasks = [];
			updatedCol.tasks =
				column.tasks.filter((task: any) => {
					if (task.id !== taskType) {
						return task;
					}
				}) || [];

			if (column.id === columnTarget) {
				updatedCol.tasks.push(task);
			}

			return [...acc, updatedCol];
		}, []);

		setColumns(updatedColumns);
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	return (
		<div className={cx(styles.board, { [styles.isOpen]: !isSidebarOpen })}>
			{columns.map((column, columnIndex) => (
				<div className={styles.task} key={columnIndex}>
					<Badge order={1} className={styles.sticky}>
						{column.title} ({column.tasks.length})
					</Badge>
					<Column
						data-name={column.title}
						onDragOver={handleDragOver}
						onDrop={(e) => handleOnDrop(e, column.id)}
					>
						{column.tasks.map((task, taskIndex) => (
							<Card
								draggable
								key={taskIndex}
								onDragStart={(e) => handleOnDrag(e, column.id, task.id)}
							>
								<Card.Headline>{task.title}</Card.Headline>
								<Card.Description>
									{task.subTasks.filter((subTask) => subTask.completed).length} of{' '}
									{task.subTasks.length} subtasks
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
						onClick={() => openModal(ADD_BOARD)}
					>
						<AddIcon /> New Column
					</Button>
				</Column>
			</div>

			<BoardForm type={ADD_BOARD} />
		</div>
	);
};

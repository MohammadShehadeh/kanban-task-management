import React from 'react';
import { Modal } from '@/components/shared/Modal/Modal';
import { Checkbox } from '@/components/shared/Checkbox';
import { Typography } from '@/components/shared/Typography';
import { Form } from '@/components/shared/Form';
import { Select } from '@/components/shared/Select';
import { Dropdown } from '@/components/shared/Dropdown';
import { Button } from '@/components/shared/Button';
import { DELETE_TASK, EDIT_TASK, useModalStore } from '@/store/modalStore';
import { Truncate } from '@/components/shared/Truncate';
import { useBoardDataStore, type Task } from '@/store/boardStore';

export const ViewTaskForm = ({ id, title, description, subTasks, status }: Task) => {
	const { openModal } = useModalStore();
	const { activeBoard, updateSubTask, moveTask } = useBoardDataStore();
	const completedSubTasks = subTasks.filter((subTask) => subTask.completed).length ?? 0;

	return (
		<Modal>
			<Form>
				<Form.Group direction="row">
					<Truncate as="h3" lines={3}>
						{title}
					</Truncate>
					<Dropdown position="right">
						<Button
							variant="normal"
							color="secondary"
							size="md"
							type="button"
							onClick={() => openModal(EDIT_TASK)}
						>
							Edit Task
						</Button>
						<Button
							variant="normal"
							color="danger"
							size="md"
							type="button"
							onClick={() => openModal(DELETE_TASK)}
						>
							Delete Task
						</Button>
					</Dropdown>
				</Form.Group>
				<Form.Group direction="column">
					<Typography color="muted" size="sm">
						{description || 'No description'}
					</Typography>
				</Form.Group>
				<Form.Group direction="column">
					<Form.Label htmlFor={title}>
						Subtasks ({completedSubTasks} of {subTasks.length ?? 0})
					</Form.Label>
					{subTasks?.map(({ title, completed }: any, index: number) => (
						<Form.CheckboxGroup key={title}>
							<Checkbox
								checked={completed}
								id={title}
								value={title}
								onChange={(e) => updateSubTask(index, e.target.checked)}
							/>
							<Form.Label htmlFor={title}>{title}</Form.Label>
						</Form.CheckboxGroup>
					))}
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="status">Current Status</Form.Label>
					<Select
						value={status}
						setValue={(columnName) => {
							let targetColumnId = 0;
							let currentColumnId = 0;
							activeBoard?.columns.forEach(({ name, id }) => {
								if (columnName === name) targetColumnId = id;
								if (status === name) currentColumnId = id;
							});

							if (columnName !== status) moveTask(targetColumnId, id, currentColumnId);
						}}
						id="status"
						placeholder="Status"
						options={activeBoard?.columns.map((column) => column.name) ?? []}
						name="status"
					/>
				</Form.Group>
			</Form>
		</Modal>
	);
};

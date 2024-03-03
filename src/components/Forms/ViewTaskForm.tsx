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

export const ViewTaskForm = ({ title, description, subTasks }: any) => {
	const { openModal } = useModalStore();

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
					<Form.Label htmlFor={title}>Subtasks (0 of 3)</Form.Label>
					{subTasks?.map(({ id, title }: any) => (
						<Form.CheckboxGroup key={id}>
							<Checkbox id={title} value={title} />
							<Form.Label htmlFor={title}>{title}</Form.Label>
						</Form.CheckboxGroup>
					))}
				</Form.Group>

				<Form.Group>
					<Form.Label htmlFor="status">Current Status</Form.Label>
					<Select
						value={''}
						setValue={() => {}}
						id="status"
						placeholder="Status"
						options={['ready', 'done']}
						name="status"
					/>
				</Form.Group>
			</Form>
		</Modal>
	);
};

import React from 'react';
import { Modal } from '../shared/Modal/Modal';
import { Checkbox } from '../shared/Checkbox';
import { Typography } from '../shared/Typography';
import { Form } from '../shared/Form';
import { Select } from '../shared/Select';

export const ViewTaskForm = ({ title, description, subTasks }: any) => {
	return (
		<Modal>
			<Form>
				<Form.Title>{title}</Form.Title>

				<Form.Group direction="column">
					<Typography color="muted" size="sm">
						{description || 'No description'}
					</Typography>
				</Form.Group>

				{subTasks.map(({ id, title }: any) => (
					<Form.CheckboxGroup key={id}>
						<Checkbox id={title} value={title} />
						<Form.Label htmlFor={title}>{title}</Form.Label>
					</Form.CheckboxGroup>
				))}

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

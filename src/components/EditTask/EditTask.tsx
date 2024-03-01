import React from 'react';
import { useFieldArray, useForm, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import { Button } from '@/components/shared/Button';
import { AddIcon, RemoveIcon } from '@/components/shared/icons';

import { Input } from '../shared/Input';
import { Form } from '../shared/Form';
import { Textarea } from '../shared/Textarea';

const requiredMessage = "Can't be empty";
const validateMessage = 'Already used';
const subTasksLimit = 6;

export const EditTask = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			subTasks: [{ title: '', completed: false }],
			status: '',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'subTasks',
	});

	const formHandler = () => {};

	return (
		<Form onSubmit={handleSubmit(formHandler)}>
			<Form.Title>Add New Task</Form.Title>
			<Form.Group>
				<Form.Label htmlFor="title">Title</Form.Label>
				<Input
					error={!!errors.title}
					type="text"
					id="title"
					name="title"
					placeholder="e.g. Take coffee break"
					register={register('title', { required: true })}
				/>

				{errors.description?.type == 'validate' && (
					<Form.HelperText>{validateMessage}</Form.HelperText>
				)}

				{errors.title?.type == 'required' && (
					<Form.HelperText>{requiredMessage}</Form.HelperText>
				)}
			</Form.Group>
			<Form.Group>
				<Form.Label htmlFor="description">Description</Form.Label>
				<Textarea
					error={!!errors?.description}
					id="description"
					name="description"
					placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
					register={register('description', { required: "Can't be empty" })}
				/>

				{errors.description?.type == 'required' && (
					<Form.HelperText>{requiredMessage}</Form.HelperText>
				)}
			</Form.Group>

			{fields.map((item, index) => {
				const subTasks = errors.subTasks?.[index] as Merge<FieldError, FieldErrorsImpl<any>>;
				const errorType = subTasks?.title?.type as string;

				return (
					<Form.Group key={item.id}>
						<Form.Group direction="row">
							<Input
								error={!!errorType}
								type="text"
								id={`subTasks.${index}.title`}
								name={`subTasks.${index}.title`}
								placeholder="e.g. Take coffee break"
								register={register(`subTasks.${index}.title`, { required: "Can't be empty" })}
							/>
							<Button
								onClick={() => remove(index)}
								aria-label="Remove subtask"
								variant="normal"
								color="secondary"
							>
								<RemoveIcon />
							</Button>
						</Form.Group>

						{errorType == 'required' && <Form.HelperText>{requiredMessage}</Form.HelperText>}
					</Form.Group>
				);
			})}

			{fields.length <= subTasksLimit && (
				<Form.Group>
					<Button
						type="button"
						size="sm"
						center
						color="secondary"
						onClick={() => append({ title: '', completed: false })}
					>
						<AddIcon /> Add New Task
					</Button>
				</Form.Group>
			)}

			<Form.Group>
				<Button size="sm" center>
					Create Task
				</Button>
			</Form.Group>
		</Form>
	);
};

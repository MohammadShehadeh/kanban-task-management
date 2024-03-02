import React from 'react';
import { useFieldArray, useForm, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import { Button } from '@/components/shared/Button';
import { AddIcon, RemoveIcon } from '@/components/shared/icons';
import { Input } from '@/components/shared/Input';
import { Form } from '@/components/shared/Form';
import { Textarea } from '@/components/shared/Textarea';
import { Select } from '@/components/shared/Select';
import { Modal } from '@/components/shared/Modal/Modal';
import { ADD_TASK, ModalType } from '@/store/modalStore';

const requiredMessage = "Can't be empty";
const validateMessage = 'Already used';
const subTasksLimit = 5;

const defaultSubTasks = [{ title: '', completed: false }];

interface SubTask {
	title: string;
	completed: boolean;
}
interface TaskFormProps {
	title?: string;
	description?: string;
	status?: string;
	type?: ModalType;
	subTasks?: SubTask[];
}

export const TaskForm = ({
	title = '',
	description = '',
	subTasks = defaultSubTasks,
	status = '',
	type,
}: TaskFormProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			title,
			description,
			subTasks,
			status,
		},
	});

	const statusValue = getValues().status;

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'subTasks',
	});

	const onStatusChange = (value: string) => {
		setValue('status', value, { shouldValidate: true });
	};

	const formHandler = (data: any) => {
		console.log('data: ', data);
	};

	return (
		<Modal>
			<Form onSubmit={handleSubmit(formHandler)}>
				<Form.Title>{type === ADD_TASK ? 'Add New Task' : 'Edit Task'}</Form.Title>
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
						register={register('description')}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Subtasks</Form.Label>

					{fields.length > 0 && (
						<Form.Group>
							{fields.map((item, index) => {
								const subTasks = errors.subTasks?.[index] as Merge<
									FieldError,
									FieldErrorsImpl<any>
								>;
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
												register={register(`subTasks.${index}.title`, {
													required: "Can't be empty",
												})}
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

										{errorType == 'required' && (
											<Form.HelperText>{requiredMessage}</Form.HelperText>
										)}
									</Form.Group>
								);
							})}
						</Form.Group>
					)}
				</Form.Group>

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
					<Form.Label htmlFor="status">Status</Form.Label>
					<Select
						value={statusValue}
						setValue={onStatusChange}
						error={!!errors?.status}
						id="status"
						placeholder="Status"
						options={['ready', 'done']}
						name="status"
						register={register('status', { required: "Can't be empty" })}
					/>

					{errors.status?.type == 'required' && (
						<Form.HelperText>{requiredMessage}</Form.HelperText>
					)}
				</Form.Group>

				<Form.Group>
					<Button size="sm" center>
						{type === ADD_TASK ? 'Create Task' : 'Edit Task'}
					</Button>
				</Form.Group>
			</Form>
		</Modal>
	);
};

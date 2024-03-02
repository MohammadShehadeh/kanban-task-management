import React from 'react';
import { useFieldArray, useForm, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

import { Button } from '@/components/shared/Button';
import { AddIcon, RemoveIcon } from '@/components/shared/icons';
import { Input } from '@/components/shared/Input';
import { Form } from '@/components/shared/Form';
import { Modal } from '../shared/Modal/Modal';
import { ADD_BOARD, ModalType, useModalStore } from '@/store/modalStore';

const requiredMessage = "Can't be empty";
const validateMessage = 'Already used';
const subTasksLimit = 5;

const defaultColumns = [{ name: '' }];

interface column {
	name: string;
}
interface BoardFormProps {
	name?: string;
	columns?: column[];
	type?: ModalType;
}

export const BoardForm = ({ name = '', columns = defaultColumns, type }: BoardFormProps) => {
	const { isModalOpen, modalType, closeModal } = useModalStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			name,
			columns,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'columns',
	});

	const formHandler = (data: any) => {
		console.log('data: ', data);
	};

	if (!isModalOpen || modalType !== type) return;

	return (
		<Modal onClose={closeModal}>
			<Form onSubmit={handleSubmit(formHandler)}>
				<Form.Title>{type === ADD_BOARD ? 'Add New Board' : 'Edit Board'}</Form.Title>
				<Form.Group>
					<Form.Label htmlFor="title">Name</Form.Label>
					<Input
						error={!!errors.name}
						type="text"
						id="name"
						name="name"
						placeholder="e.g. Web Design"
						register={register('name', { required: true })}
					/>

					{errors.name?.type == 'validate' && (
						<Form.HelperText>{validateMessage}</Form.HelperText>
					)}

					{errors.name?.type == 'required' && (
						<Form.HelperText>{requiredMessage}</Form.HelperText>
					)}
				</Form.Group>

				<Form.Group>
					<Form.Label>Columns</Form.Label>

					{fields.length > 0 && (
						<Form.Group>
							{fields.map((item, index) => {
								const columns = errors.columns?.[index] as Merge<
									FieldError,
									FieldErrorsImpl<any>
								>;
								const errorType = columns?.name?.type as string;

								return (
									<Form.Group key={item.id}>
										<Form.Group direction="row">
											<Input
												error={!!errorType}
												type="text"
												id={`columns.${index}.name`}
												name={`columns.${index}.name`}
												placeholder="e.g. Todo"
												register={register(`columns.${index}.name`, {
													required: "Can't be empty",
												})}
											/>
											<Button
												onClick={() => remove(index)}
												aria-label="Remove column"
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
							onClick={() => append({ name: '' })}
						>
							<AddIcon /> Add New Column
						</Button>
					</Form.Group>
				)}

				<Form.Group>
					<Button size="sm" center>
						<Form.Title></Form.Title>
						{type === ADD_BOARD ? 'Create New Board' : 'Edit Board'}
					</Button>
				</Form.Group>
			</Form>
		</Modal>
	);
};
import React from 'react';
import { Typography } from '../shared/Typography';
import { Grid } from '../shared/Grid';
import { Button } from '../shared/Button';
import { ModalType, useModalStore } from '@/store/modalStore';
import { Modal } from '../shared/Modal/Modal';

interface DeleteFormProps {
	onDelete: () => void;
	type: ModalType;
}

export const DeleteForm = ({ onDelete, type }: DeleteFormProps) => {
	const { isModalOpen, modalType, closeModal } = useModalStore();

	if (modalType !== type || !isModalOpen) return;

	return (
		<Modal onClose={closeModal}>
			<Typography as="h3" color="danger">
				Delete this board?
			</Typography>
			<Typography as="p" color="muted" size="sm">
				Are you sure you want to delete the {'Platform Launch'} board? This action will remove
				all columns and tasks and cannot be reversed.
			</Typography>
			<Grid>
				<Grid.Col lg={6}>
					<Button color="danger" size="sm" center fullWidth onClick={() => onDelete()}>
						Delete
					</Button>
				</Grid.Col>
				<Grid.Col lg={6}>
					<Button color="secondary" size="sm" center fullWidth onClick={() => closeModal()}>
						Cancel
					</Button>
				</Grid.Col>
			</Grid>
		</Modal>
	);
};

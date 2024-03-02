import React from 'react';
import { Typography } from '@/components/shared/Typography';
import { Grid } from '@/components/shared/Grid';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal/Modal';
import { DELETE_BOARD, DELETE_TASK, ModalType, useModalStore } from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';

interface DeleteFormProps {
	onDelete?: () => void;
	type?: ModalType;
}

export const DeleteForm = ({ onDelete, type }: DeleteFormProps) => {
	const { closeModal, modalType } = useModalStore();
	const { activeBoard, activeTask } = useBoardDataStore();

	return (
		<Modal>
			<Typography as="h3" color="danger">
				{modalType === DELETE_BOARD && 'Delete this board?'}
				{modalType === DELETE_TASK && 'Delete this Task?'}
			</Typography>
			<Typography as="p" color="muted" size="sm">
				{modalType === DELETE_BOARD &&
					`Are you sure you want to delete the "${activeBoard.name}" board? This action will remove all columns and tasks and cannot be reversed.`}

				{modalType === DELETE_TASK &&
					`Are you sure you want to delete the "${activeTask.title}" task? This action will remove the task and cannot be reversed.`}
			</Typography>
			<Grid>
				<Grid.Col lg={6}>
					<Button color="danger" size="sm" center fullWidth onClick={() => onDelete?.()}>
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

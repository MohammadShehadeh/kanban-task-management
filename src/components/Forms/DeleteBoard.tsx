import React from 'react';

import { Typography } from '@/components/shared/Typography';
import { Grid } from '@/components/shared/Grid';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal/Modal';

import { useModalStore } from '@/store/modalStore';
import { useBoardDataStore } from '@/store/boardStore';

export const DeleteBoard = () => {
	const { closeModal } = useModalStore();
	const { activeBoard, deleteBoard } = useBoardDataStore();

	return (
		<Modal>
			<Typography as="h3" color="danger">
				Delete this board?
			</Typography>
			<Typography as="p" color="muted" size="sm">
				Are you sure you want to delete the <b>{activeBoard?.name}</b> board? This action will
				remove all columns and tasks and cannot be reversed.
			</Typography>
			<Grid>
				<Grid.Col lg={6}>
					<Button
						color="danger"
						size="sm"
						center
						fullWidth
						onClick={() => {
							if (activeBoard?.id !== undefined) {
								deleteBoard(activeBoard.id);
							}

							closeModal();
						}}
					>
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

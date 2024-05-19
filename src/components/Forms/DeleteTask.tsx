import React from 'react';
import { Typography } from '@/components/shared/Typography';
import { Grid } from '@/components/shared/Grid';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal/Modal';
import { useBoardDataStore } from '@/store/boardStore';
import { useAppDispatch } from '@/hooks';
import { close } from '@/features/modal/modalSlice';

export const DeleteTask = () => {
	const dispatch = useAppDispatch();
	const { activeTask, activeBoard, deleteTask } = useBoardDataStore();

	return (
		<Modal>
			<Typography as="h3" color="danger">
				Delete this Task?
			</Typography>
			<Typography as="p" color="muted" size="sm">
				Are you sure you want to delete the <b>{activeTask?.title}</b> task? This action will
				remove the task and cannot be reversed.
			</Typography>
			<Grid>
				<Grid.Col lg={6}>
					<Button
						color="danger"
						size="sm"
						center
						fullWidth
						onClick={() => {
							if (activeBoard?.id !== undefined && activeTask?.id !== undefined) {
								deleteTask(activeBoard.id, activeTask.id);
							}

							dispatch(close());
						}}
					>
						Delete
					</Button>
				</Grid.Col>
				<Grid.Col lg={6}>
					<Button
						color="secondary"
						size="sm"
						center
						fullWidth
						onClick={() => dispatch(close())}
					>
						Cancel
					</Button>
				</Grid.Col>
			</Grid>
		</Modal>
	);
};

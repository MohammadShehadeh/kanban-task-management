'use client';

import React from 'react';

import { Button } from '@/components/shared/Button';
import { AddIcon, ArrowIcon } from '@/components/shared/icons';
import { Dropdown } from '@/components/shared/Dropdown';
import { Sidebar } from '@/components/Sidebar';
import { Truncate } from '@/components/shared/Truncate';
import { Modal } from '@/components/shared/Modal/Modal';
import { AddTask } from '@/components/AddTask';

import { useToggle } from '@/hooks/useToggle';
import { Grid } from '../shared/Grid';
import { Typography } from '../shared/Typography';

import styles from './Navbar.module.scss';

export const Navbar = () => {
	const { isOpen: taskModalOpened, toggleIsOpen: toggleTaskModal } = useToggle();
	const { isOpen: deleteBoardOpened, toggleIsOpen: toggleDeleteBoard } = useToggle();

	return (
		<div className={styles.navbar}>
			<Truncate as="h1" lines={1} className={styles.desktop}>
				Platform Launch
			</Truncate>
			<Dropdown
				className={styles.mobile}
				position="left"
				placeholder={
					<Button variant="normal" color="white">
						<Truncate as="h1" lines={1}>
							Platform Launch
						</Truncate>
						<ArrowIcon />
					</Button>
				}
				disableGutter
			>
				<Sidebar isMobile />
			</Dropdown>

			<div className={styles.settings}>
				<Button onClick={() => toggleTaskModal()}>
					<AddIcon />
					<span className={styles.settingsText}>Add new Task</span>
				</Button>
				<Dropdown position="right">
					<Button variant="normal" color="secondary" size="md">
						Edit Board
					</Button>
					<Button
						variant="normal"
						color="danger"
						size="md"
						onClick={() => toggleDeleteBoard()}
					>
						Delete Board
					</Button>
				</Dropdown>
			</div>

			{taskModalOpened && (
				<Modal
					onClose={() => {
						toggleTaskModal(false);
					}}
				>
					<AddTask />
				</Modal>
			)}

			{deleteBoardOpened && (
				<Modal
					onClose={() => {
						toggleDeleteBoard(false);
					}}
				>
					<Typography as="h3" color="danger">
						Delete this board?
					</Typography>
					<Typography as="p" color="muted" size="sm">
						Are you sure you want to delete the {'Platform Launch'} board? This action will
						remove all columns and tasks and cannot be reversed.
					</Typography>
					<Grid>
						<Grid.Col lg={6}>
							<Button color="danger" size="sm" center fullWidth>
								Delete
							</Button>
						</Grid.Col>
						<Grid.Col lg={6}>
							<Button
								color="secondary"
								size="sm"
								center
								fullWidth
								onClick={() => {
									toggleDeleteBoard(false);
								}}
							>
								Cancel
							</Button>
						</Grid.Col>
					</Grid>
				</Modal>
			)}
		</div>
	);
};

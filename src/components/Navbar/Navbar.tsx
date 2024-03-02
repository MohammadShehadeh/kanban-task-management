'use client';

import React from 'react';

import { Button } from '@/components/shared/Button';
import { AddIcon, ArrowIcon } from '@/components/shared/icons';
import { Dropdown } from '@/components/shared/Dropdown';
import { Sidebar } from '@/components/Sidebar';
import { Truncate } from '@/components/shared/Truncate';
import { TaskForm } from '@/components/TaskForm';
import { BoardForm } from '../BoardForm';

import styles from './Navbar.module.scss';
import { DeleteForm } from '../DeleteForm';
import { ADD_TASK, DELETE_BOARD, EDIT_BOARD, useModalStore } from '@/store/modalStore';

export const Navbar = () => {
	const { openModal } = useModalStore();

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
				<Button onClick={() => openModal(ADD_TASK)}>
					<AddIcon />
					<span className={styles.settingsText}>Add new Task</span>
				</Button>
				<Dropdown position="right">
					<Button
						variant="normal"
						color="secondary"
						size="md"
						onClick={() => openModal(EDIT_BOARD)}
					>
						Edit Board
					</Button>
					<Button
						variant="normal"
						color="danger"
						size="md"
						onClick={() => openModal(DELETE_BOARD)}
					>
						Delete Board
					</Button>
				</Dropdown>
			</div>

			<TaskForm
				type={ADD_TASK}
				title="test"
				description="desc"
				subTasks={[{ title: 'test', completed: false }]}
				status="done"
			/>

			<BoardForm type={EDIT_BOARD} />
			<DeleteForm type={DELETE_BOARD} onDelete={() => {}} />
		</div>
	);
};

'use client';

import React from 'react';

import { Button } from '@/components/shared/Button';
import { AddIcon, ArrowIcon } from '@/components/shared/icons';
import { Dropdown } from '@/components/shared/Dropdown';
import { Sidebar } from '@/components/Sidebar';
import { Truncate } from '@/components/shared/Truncate';
import { ADD_TASK, DELETE_BOARD, EDIT_BOARD } from '@/store/modalStore';

import styles from './Navbar.module.scss';
import { useBoardDataStore } from '@/store/boardStore';
import { useAppDispatch } from '@/hooks';
import { open } from '@/features/modal/modalSlice';

export const Navbar = () => {
	const { activeBoard } = useBoardDataStore();
	const dispatch = useAppDispatch();

	return (
		<div className={styles.navbar}>
			<Truncate as="h1" lines={1} className={styles.desktop}>
				{activeBoard?.name || 'No Board Found'}
			</Truncate>
			<Dropdown
				className={styles.mobile}
				position="left"
				placeholder={
					<Button variant="normal" color="white">
						<Truncate as="h1" lines={1}>
							{activeBoard?.name || 'No Board Found'}
						</Truncate>
						<ArrowIcon />
					</Button>
				}
				disableGutter
			>
				<Sidebar isMobile />
			</Dropdown>
			{!!activeBoard && (
				<div className={styles.settings}>
					<Button onClick={() => dispatch(open({ type: ADD_TASK }))}>
						<AddIcon />
						<span className={styles.settingsText}>Add new Task</span>
					</Button>
					<Dropdown position="right">
						<Button
							variant="normal"
							color="secondary"
							size="md"
							onClick={() => dispatch(open({ type: EDIT_BOARD }))}
						>
							Edit Board
						</Button>
						<Button
							variant="normal"
							color="danger"
							size="md"
							onClick={() => dispatch(open({ type: DELETE_BOARD }))}
						>
							Delete Board
						</Button>
					</Dropdown>
				</div>
			)}
		</div>
	);
};

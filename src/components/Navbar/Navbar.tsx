'use client';

import React from 'react';
import cx from 'classnames';

import { Button } from '@/components/shared/Button';
import { AddIcon, ArrowIcon } from '@/components/shared/icons';
import { Dropdown } from '@/components/shared/Dropdown';
import { Sidebar } from '../Sidebar';

import styles from './Navbar.module.scss';
import { Truncate } from '../shared/Truncate';
import { Modal } from '../shared/Modal/Modal';
import { useToggle } from '@/hooks/useToggle';

export const Navbar = () => {
	const { isOpen, toggleIsOpen } = useToggle();

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
				<Button onClick={() => toggleIsOpen()}>
					<AddIcon />
					<span className={styles.settingsText}>Add new Task</span>
				</Button>
				<Dropdown position="right">
					<Button variant="normal" color="secondary" size="lg">
						Edit Board
					</Button>
					<Button variant="normal" color="danger" size="lg">
						Delete Board
					</Button>
				</Dropdown>
			</div>

			{isOpen && (
				<Modal
					onClose={() => {
						toggleIsOpen(false);
						console.log('false: ', false);
					}}
				>
					<p>Add New Task</p>
					<input type="text" />
					<input type="text" />
					<input type="text" />
					<Button size="sm" center color="white">
						<AddIcon />
						Add New Subtask
					</Button>
					<Button size="sm" center>
						Create Task
					</Button>
				</Modal>
			)}
		</div>
	);
};

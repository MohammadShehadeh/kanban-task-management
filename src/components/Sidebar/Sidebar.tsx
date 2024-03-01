'use client';

import React from 'react';
import cx from 'classnames';

import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { AddIcon, BoardIcon, HideIcon, ShowIcon } from '@/components/shared/icons';
import { ThemeSwitch } from '@/components/ThemeSwitch';

import { Truncate } from '../shared/Truncate';
import { useSidebarStore } from '@/store/sidebarStore';

import styles from './Sidebar.module.scss';

interface SidebarProps {
	isMobile?: boolean;
}

export const Sidebar = ({ isMobile }: SidebarProps) => {
	const { toggleIsOpen, isOpen } = useSidebarStore();

	if (!isOpen && !isMobile) {
		return (
			<Button
				className={cx(styles.button, styles.showButton)}
				variant="normal"
				size="md"
				color="white"
				weight="bold"
				onClick={() => toggleIsOpen()}
				aria-label="Show Sidebar"
			>
				<ShowIcon />
			</Button>
		);
	}

	return (
		<div
			className={cx(styles.sidebar, {
				[styles.mobile]: isMobile,
			})}
		>
			<Badge>All Boards (3)</Badge>
			<div className={styles.wrapper}>
				<div className={styles.sideNav}>
					{['Platform Launch', 'Marketing Plan', 'Roadmap'].map((item, index) => (
						<Button
							key={index}
							className={cx(styles.button, index === 0 ? styles.active : '')}
							variant="normal"
							size="md"
							color="tertiary"
							weight="bold"
						>
							<BoardIcon />
							<Truncate lines={1}>{item}</Truncate>
						</Button>
					))}
					<Button
						className={cx(styles.button)}
						variant="normal"
						size="md"
						color="primary"
						weight="bold"
					>
						<BoardIcon />
						<Truncate lines={1}>+ Create New Board</Truncate>
					</Button>
				</div>
				<div>
					<ThemeSwitch />
					{!isMobile && (
						<Button
							className={cx(styles.button, styles.hideButton)}
							variant="normal"
							size="md"
							color="tertiary"
							weight="bold"
							onClick={() => toggleIsOpen()}
						>
							<HideIcon />
							Hide Sidebar
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

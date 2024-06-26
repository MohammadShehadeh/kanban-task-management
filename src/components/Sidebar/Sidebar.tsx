'use client';

import React from 'react';
import cx from 'classnames';

import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { BoardIcon, HideIcon, ShowIcon } from '@/components/shared/icons';
import { ThemeSwitch } from '@/components/ThemeSwitch';

import { Truncate } from '@/components/shared/Truncate';
import { useSidebarStore } from '@/store/sidebarStore';

import { ADD_BOARD, useModalStore } from '@/store/modalStore';

import styles from './Sidebar.module.scss';
import { useBoardDataStore } from '@/store/boardStore';
import { useTheme } from '@/hooks/useTheme';

interface SidebarProps {
	isMobile?: boolean;
}

export const Sidebar = ({ isMobile }: SidebarProps) => {
	const { toggleSideBar, isSidebarOpen } = useSidebarStore();
	const { setActiveBoard, activeBoard, boardData } = useBoardDataStore();
	const { openModal } = useModalStore();

	useTheme();

	if (!isSidebarOpen && !isMobile) {
		return (
			<Button
				className={cx(styles.button, styles.showButton)}
				variant="normal"
				size="md"
				color="default"
				weight="bold"
				onClick={() => toggleSideBar()}
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
			<Badge>All Boards ({boardData?.length || 0})</Badge>
			<div className={styles.wrapper}>
				<div className={styles.sideNav}>
					{boardData?.map((item, index) => (
						<Button
							key={index}
							className={cx(styles.button, {
								[styles.active]: item.id === activeBoard?.id,
							})}
							variant="normal"
							size="md"
							color="tertiary"
							weight="bold"
							data-id={item.id}
							onClick={() => setActiveBoard(item.id)}
						>
							<BoardIcon />
							<Truncate lines={1}>{item.name}</Truncate>
						</Button>
					))}
					<Button
						className={cx(styles.button)}
						variant="normal"
						size="md"
						color="primary"
						weight="bold"
						onClick={() => openModal(ADD_BOARD)}
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
							onClick={() => toggleSideBar()}
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

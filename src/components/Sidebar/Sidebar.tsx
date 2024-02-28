'use client';

import React from 'react';
import cx from 'classnames';

import { Badge } from '@/components/shared/Badge';
import { Button } from '@/components/shared/Button';
import { BoardIcon, HideIcon, ShowIcon } from '@/components/shared/icons';
import { ThemeSwitch } from '@/components/ThemeSwitch';

import styles from './Sidebar.module.scss';
import { useToggle } from '@/hooks/useToggle';
import { Truncate } from '../shared/Truncate';

interface SidebarProps {
	isMobile?: boolean;
}

export const Sidebar = ({ isMobile }: SidebarProps) => {
	const { isOpen, toggleIsOpen } = useToggle(true);

	if (!isOpen && !isMobile) {
		return (
			<Button
				className={cx(styles.button, styles.showButton)}
				variant="normal"
				size="lg"
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
							size="lg"
							color="tertiary"
							weight="bold"
						>
							<BoardIcon />
							<Truncate lines={1}>{item}</Truncate>
						</Button>
					))}
				</div>
				<div>
					<ThemeSwitch />
					{!isMobile && (
						<Button
							className={cx(styles.button, styles.hideButton)}
							variant="normal"
							size="lg"
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

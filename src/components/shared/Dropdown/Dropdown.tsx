'use client';

/* eslint-disable react/display-name */
import React, { JSXElementConstructor, PropsWithChildren, cloneElement, useRef } from 'react';
import cx from 'classnames';

import { SettingsIcon } from '@/components/shared/icons';
import { Card } from '@/components/shared/Card';
import { useToggle } from '@/hooks/useToggle';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import styles from './Dropdown.module.scss';

interface DropdownProps extends PropsWithChildren {
	position?: 'left' | 'right' | 'middle';
	placeholder?: React.ReactElement;
	disableGutter?: boolean;
	className?: string;
}

interface PlaceholderProps {
	onClick?: () => void;
}

const Placeholder = ({ onClick }: PlaceholderProps) => {
	return (
		<button className={styles.settings} onClick={onClick}>
			<SettingsIcon />
		</button>
	);
};

export const Dropdown = ({
	children,
	className,
	placeholder = <Placeholder />,
	position = 'middle',
	disableGutter,
}: DropdownProps) => {
	const { isOpen, toggleIsOpen } = useToggle();
	const dropdownRef = useRef(null);

	useOnClickOutside(dropdownRef, () => toggleIsOpen(false));

	const placeholderWithProp = cloneElement(placeholder, {
		onClick: () => toggleIsOpen(),
	});

	return (
		<div className={cx(styles.dropdown, className)} ref={dropdownRef}>
			{placeholderWithProp}
			{isOpen && (
				<Card
					className={cx(styles.content, styles[position], {
						[styles.noPadding]: disableGutter,
					})}
					gutter="md"
				>
					{children}
				</Card>
			)}
		</div>
	);
};

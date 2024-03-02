'use client';

import React, {
	ButtonHTMLAttributes,
	Children,
	PropsWithChildren,
	ReactElement,
	cloneElement,
	useRef,
} from 'react';
import cx from 'classnames';

import { SettingsIcon } from '@/components/shared/icons';
import { Card } from '@/components/shared/Card';
import { useToggle } from '@/hooks/useToggle';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import styles from './Dropdown.module.scss';

interface DropdownProps extends PropsWithChildren {
	position?: 'left' | 'right' | 'middle';
	placeholder?: ReactElement;
	disableGutter?: boolean;
	className?: string;
}

const DefaultPlaceholder = ({ ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button className={styles.settings} {...restProps}>
			<SettingsIcon />
		</button>
	);
};

export const Dropdown = ({
	children,
	className,
	placeholder = <DefaultPlaceholder />,
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
					className={cx(styles.content, styles[position])}
					gutter="md"
					disableGutter={disableGutter}
				>
					{Children.map(Children.toArray(children) as ReactElement[], (child) => {
						return cloneElement(child, {
							onClick: () => {
								// Extend click functionality
								child.props?.onClick?.();
								toggleIsOpen(false);
							},
						});
					})}
				</Card>
			)}
		</div>
	);
};

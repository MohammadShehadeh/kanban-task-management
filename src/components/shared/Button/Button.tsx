import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
	color?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'white';
	size?: 'sm' | 'md' | 'lg';
	weight?: 'normal' | 'medium' | 'semibold' | 'bold';
	variant?: 'contained' | 'normal';
	className?: string;
	center?: boolean;
	onClick?: () => void;
}

export const Button = ({
	children,
	color = 'primary',
	size = 'md',
	weight = 'medium',
	variant = 'contained',
	center,
	className,
	onClick,
	...restProps
}: ButtonProps) => {
	return (
		<button
			className={cx(
				styles.button,
				styles[color],
				styles[size],
				styles[weight],
				styles[variant],
				className,
				{
					[styles.center]: center,
				}
			)}
			onClick={onClick}
			{...restProps}
		>
			{children}
		</button>
	);
};

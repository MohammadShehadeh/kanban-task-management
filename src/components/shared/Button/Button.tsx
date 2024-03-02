import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps
	extends PropsWithChildren,
		ButtonHTMLAttributes<HTMLButtonElement> {
	color?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'white' | 'default';
	size?: 'sm' | 'md' | 'lg';
	weight?: 'normal' | 'medium' | 'semibold' | 'bold';
	variant?: 'contained' | 'normal';
	fullWidth?: boolean;
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
	fullWidth,
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
					[styles.fullWidth]: fullWidth,
				}
			)}
			onClick={onClick}
			{...restProps}
		>
			{children}
		</button>
	);
};

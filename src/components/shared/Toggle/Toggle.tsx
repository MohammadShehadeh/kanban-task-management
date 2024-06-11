'use client';

import React, { ButtonHTMLAttributes, useLayoutEffect, useState } from 'react';
import cx from 'classnames';

import styles from './Toggle.module.scss';
import { useToggle } from '@/hooks/useToggle';

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => void;
	active?: boolean;
}

export const Toggle = ({ onClick, className, active, ...restProps }: ToggleProps) => {
	const { isOpen, toggleIsOpen } = useToggle(active);

	const clickHandler = () => {
		toggleIsOpen();
		onClick?.();
	};

	return (
		<button
			className={cx(styles.toggle, { [styles.active]: isOpen })}
			onClick={clickHandler}
			{...restProps}
		>
			<span className={styles.switch} />
		</button>
	);
};

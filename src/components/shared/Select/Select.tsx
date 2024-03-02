import React, { InputHTMLAttributes, useRef, useState } from 'react';
import cx from 'classnames';

import styles from './Select.module.scss';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { useToggle } from '@/hooks/useToggle';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
	register: Record<any, any>;
	error?: boolean;
	options: string[];
	setValue: (value: string) => void;
}

export function Select({
	register,
	options,
	name,
	error,
	value,
	setValue,
	...restProps
}: SelectProps) {
	const { isOpen, toggleIsOpen } = useToggle();
	const inputRef = useRef(null);

	useOnClickOutside(inputRef, () => toggleIsOpen(false));

	return (
		<div className={styles.wrapper} ref={inputRef}>
			<input
				onClick={() => toggleIsOpen()}
				readOnly
				value={value}
				className={cx(styles.select, { [styles.error]: error })}
				{...register}
				{...restProps}
			/>
			{isOpen && (
				<ul className={styles.options}>
					{options.map((option) => (
						<li
							className={cx(styles.option, {
								[styles.active]: value === option,
							})}
							key={option}
							onClick={() => {
								setValue(option as string);
								toggleIsOpen(false);
							}}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

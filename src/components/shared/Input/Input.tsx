import React, { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';
import cx from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	register: Record<any, any>;
	error?: boolean;
}

export const Input = ({ name, error, register, ...restProps }: InputProps) => {
	return (
		<input
			className={cx(styles.input, { [styles.error]: error })}
			{...register}
			{...restProps}
		/>
	);
};

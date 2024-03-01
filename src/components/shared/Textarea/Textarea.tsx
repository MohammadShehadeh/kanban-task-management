import React, { TextareaHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	register: Record<any, any>;
	error?: boolean;
}

export const Textarea = ({ name, error, register, ...restProps }: TextareaProps) => {
	return (
		<textarea
			className={cx(styles.textarea, { [styles.error]: error })}
			{...register}
			{...restProps}
		/>
	);
};

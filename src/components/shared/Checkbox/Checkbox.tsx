import React, { InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = (props: CheckboxProps) => {
	return <input className={styles.checkbox} type="checkbox" {...props} />;
};

import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Form.module.scss';

interface FormProps {
	[key: string]: any;
}

export const Form = ({ onSubmit, children }: FormProps) => {
	return <form onSubmit={onSubmit}>{children}</form>;
};

const Title = ({ children }: PropsWithChildren) => {
	return <h3 className={styles.title}>{children}</h3>;
};

Form.Title = Title;

const Label = ({
	children,
	...restProps
}: PropsWithChildren & LabelHTMLAttributes<HTMLLabelElement>) => {
	return (
		<label className={styles.label} {...restProps}>
			{children}
		</label>
	);
};

Form.Label = Label;

const HelperText = ({ children }: PropsWithChildren) => {
	return <p className={styles.error}>{children}</p>;
};

Form.HelperText = HelperText;

const Group = ({
	children,
	direction = 'column',
}: PropsWithChildren & { direction?: 'column' | 'row' }) => {
	return <div className={cx(styles.formGroup, styles[direction])}>{children}</div>;
};

Form.Group = Group;

const CheckboxGroup = ({ children }: PropsWithChildren) => {
	return <div className={cx(styles.formGroup, styles.row, styles.checkbox)}>{children}</div>;
};

Form.CheckboxGroup = CheckboxGroup;

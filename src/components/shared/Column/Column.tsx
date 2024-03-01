import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Column.module.scss';

interface ColumnProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export const Column = ({ children, className, ...restProps }: ColumnProps) => {
	return (
		<div className={cx(styles.column, className)} {...restProps}>
			{children}
		</div>
	);
};

import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Column.module.scss';

interface ColumnProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	active?: boolean;
}

export const Column = ({ children, active, className, ...restProps }: ColumnProps) => {
	return (
		<div
			className={cx(styles.column, className, {
				[styles.active]: active,
			})}
			{...restProps}
		>
			{children}
		</div>
	);
};

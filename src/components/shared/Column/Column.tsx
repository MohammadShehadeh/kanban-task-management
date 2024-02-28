import React, { PropsWithChildren } from 'react';

import styles from './Column.module.scss';

interface ColumnProps extends PropsWithChildren {}

export const Column = ({ children }: ColumnProps) => {
	return <div className={styles.column}>{children}</div>;
};

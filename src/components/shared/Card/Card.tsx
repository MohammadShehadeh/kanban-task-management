/* eslint-disable react/display-name */
import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';
import { Truncate } from '../Truncate';

interface CardProps extends PropsWithChildren {
	className?: string;
	gutter?: 'sm' | 'md' | 'lg';
}

export const Card = ({ children, gutter = 'lg', className }: CardProps) => {
	return (
		<div className={cx(styles.card, styles[gutter], className)} role="button" tabIndex={0}>
			{children}
		</div>
	);
};

Card.Description = ({ children }: CardProps) => {
	return <p className={styles.description}>{children}</p>;
};

Card.Headline = ({ children }: CardProps) => {
	return (
		<Truncate className={styles.headline} lines={3}>
			{children}
		</Truncate>
	);
};

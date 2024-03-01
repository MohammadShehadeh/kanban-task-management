import React, { HTMLAttributes, PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Card.module.scss';
import { Truncate } from '../Truncate';

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	className?: string;
	gutter?: 'sm' | 'md' | 'lg';
	disableGutter?: boolean;
}

export const Card = ({
	children,
	gutter = 'lg',
	className,
	disableGutter,
	...restProps
}: CardProps) => {
	return (
		<div
			className={cx(styles.card, styles[gutter], className, {
				[styles.noPadding]: disableGutter,
			})}
			role="button"
			tabIndex={0}
			{...restProps}
		>
			{children}
		</div>
	);
};

const Description = ({ children }: CardProps) => {
	return <p className={styles.description}>{children}</p>;
};

Card.Description = Description;

const Headline = ({ children }: CardProps) => {
	return (
		<Truncate className={styles.headline} lines={3}>
			{children}
		</Truncate>
	);
};

Card.Headline = Headline;

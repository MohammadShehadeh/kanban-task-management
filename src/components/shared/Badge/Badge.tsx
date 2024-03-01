import React, { PropsWithChildren } from 'react';

import styles from './Badge.module.scss';
import cx from 'classnames';

interface BadgeProps extends PropsWithChildren {
	order?: number;
	className?: string;
}

export const Badge = ({ children, order, className }: BadgeProps) => {
	return (
		<p
			className={cx(styles.badge, className)}
			title={children?.toString()}
			data-color-num={order}
		>
			{children}
		</p>
	);
};

import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Typography.module.scss';

interface TypographyProps extends PropsWithChildren {
	as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	size?: 'default' | 'sm' | 'md' | 'lg';
	color?: 'normal' | 'muted' | 'danger';
}

export const Typography = ({
	as: As = 'p',
	color = 'normal',
	size = 'default',
	children,
}: TypographyProps) => {
	return (
		<As className={cx(styles.typography, styles[color], { [styles[size]]: size })}>
			{children}
		</As>
	);
};

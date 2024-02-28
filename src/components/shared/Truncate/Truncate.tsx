import React, { PropsWithChildren } from 'react';
import cx from 'classnames';

import styles from './Truncate.module.scss';

interface TruncateProps extends PropsWithChildren {
	lines: number;
	className?: string;
	as?: 'p' | 'h1';
}

export const Truncate = ({ as: As = 'p', lines, className, children }: TruncateProps) => {
	return (
		<As
			title={children?.toString()}
			className={cx(styles.truncate, className)}
			style={
				{
					'--line-clamp': lines,
				} as React.CSSProperties
			}
		>
			{children}
		</As>
	);
};

import React from 'react';

import { Column } from '@/components/shared/Column';
import { Badge } from '@/components/shared/Badge';

import styles from './Board.module.scss';

export const Board = () => {
	return (
		<>
			<div className={styles.col}>
				<Badge order={1}>TODO (5)</Badge>
				<Column>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
					<h1>12</h1>
				</Column>
			</div>
			<div className={styles.col}>
				<Badge order={2}>TODO (5)</Badge>
				<Column>1</Column>
			</div>
			<div className={styles.col}>
				<Badge order={3}>TODO (5)</Badge>
				<Column>1</Column>
			</div>
		</>
	);
};

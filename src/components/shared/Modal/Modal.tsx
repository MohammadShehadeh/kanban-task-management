import React, { PropsWithChildren, useRef } from 'react';

import { Card } from '@/components/shared/Card';

import styles from './Modal.module.scss';
import { useAppDispatch } from '@/hooks';
import { close } from '@/features/modal/modalSlice';

export const Modal = ({ children }: PropsWithChildren) => {
	const modalRef = useRef(null);
	const dispatch = useAppDispatch();

	return (
		<div className={styles.modal} ref={modalRef}>
			<div className={styles.wrapper}>
				<div className={styles.backdrop} onClick={() => dispatch(close())}></div>
				<Card className={styles.content}>{children}</Card>
			</div>
		</div>
	);
};

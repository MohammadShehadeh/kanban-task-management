import React, { PropsWithChildren, useRef } from 'react';

import { Card } from '@/components/shared/Card';

import styles from './Modal.module.scss';
import { useModalStore } from '@/store/modalStore';

export const Modal = ({ children }: PropsWithChildren) => {
	const modalRef = useRef(null);
	const { closeModal } = useModalStore();

	return (
		<div className={styles.modal} ref={modalRef}>
			<div className={styles.backdrop} onClick={() => closeModal()}></div>
			<Card className={styles.content}>{children}</Card>
		</div>
	);
};

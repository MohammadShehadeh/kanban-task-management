import React, { PropsWithChildren, useRef } from 'react';

import { Card } from '@/components/shared/Card';

import styles from './Modal.module.scss';

interface ModalProps extends PropsWithChildren {
	onClose: (value?: boolean) => void;
}

export const Modal = ({ onClose, children }: ModalProps) => {
	const modalRef = useRef(null);

	return (
		<div className={styles.modal} ref={modalRef}>
			<div className={styles.backdrop} onClick={() => onClose()}></div>
			<Card className={styles.content}>{children}</Card>
		</div>
	);
};

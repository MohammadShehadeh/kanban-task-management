import React from "react";

import { Card } from "@/components/shared/Card";

import styles from "./Modal.module.scss";

export const Modal = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.backdrop}></div>
      <div className={styles.content}>
        <Card>test</Card>
      </div>
    </div>
  );
};


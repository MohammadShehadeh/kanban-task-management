import React, { PropsWithChildren } from "react";

import styles from "./Badge.module.scss";

interface BadgeProps extends PropsWithChildren {
  order?: number;
}

export const Badge = ({ children, order }: BadgeProps) => {
  return (
    <p
      className={styles.badge}
      title={children?.toString()}
      data-color-num={order}
    >
      {children}
    </p>
  );
};

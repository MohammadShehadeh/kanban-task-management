import React, { PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

export interface ButtonProps extends PropsWithChildren {
  color?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  variant?: "contained" | "normal";
  className?: string;
}

export const Button = ({
  children,
  color = "primary",
  size = "md",
  variant = "contained",
  className,
}: ButtonProps) => {
  return (
    <button
      className={cx(
        styles.button,
        styles[color],
        styles[size],
        styles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

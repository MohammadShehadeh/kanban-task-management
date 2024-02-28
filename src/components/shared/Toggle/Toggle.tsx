"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import cx from "classnames";

import styles from "./Toggle.module.scss";
import { useToggle } from "@/hooks/useToggle";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
}

export const Toggle = ({ onClick, className, ...restProps }: ToggleProps) => {
  const { isOpen, toggleIsOpen } = useToggle();

  const clickHandler = () => {
    toggleIsOpen();
    onClick?.();
  };

  return (
    <button
      className={cx(styles.toggle, { [styles.active]: isOpen })}
      onClick={clickHandler}
      {...restProps}
    >
      <span className={styles.switch} />
    </button>
  );
};

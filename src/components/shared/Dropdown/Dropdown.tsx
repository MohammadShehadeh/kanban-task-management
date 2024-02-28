"use client";

/* eslint-disable react/display-name */
import React, { PropsWithChildren, useRef } from "react";
import cx from "classnames";

import { SettingsIcon } from "@/components/shared/icons";
import { Card } from "@/components/shared/Card";
import { useToggle } from "@/hooks/useToggle";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import styles from "./Dropdown.module.scss";

interface DropdownProps extends PropsWithChildren {
  position?: "left" | "right" | "middle";
}

export const Dropdown = ({ children, position = 'middle' }: DropdownProps) => {
  const { isOpen, toggleIsOpen } = useToggle();
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => toggleIsOpen(false));

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.settings} onClick={() => toggleIsOpen()}>
        <SettingsIcon />
      </button>
      {isOpen && (
        <Card className={cx(styles.content, styles[position])} gutter="md">
          {children}
        </Card>
      )}
    </div>
  );
};

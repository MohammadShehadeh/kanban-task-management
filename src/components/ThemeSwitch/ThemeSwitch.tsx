'use client';

import React from "react";

import { DarkIcon, LightIcon } from "@/components/shared/icons";
import { Toggle } from "@/components/shared/Toggle";

import styles from "./ThemeSwitch.module.scss";

export const ThemeSwitch = () => {
  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const themeClassName = htmlElement.dataset.colorScheme === 'light' ? 'dark' : 'light';
    console.log('themeClassName: ', themeClassName);
    htmlElement.dataset.colorScheme = themeClassName;
  };

  return (
    <div className={styles.themeSwitch}>
      <DarkIcon />
      <Toggle onClick={toggleTheme} />
      <LightIcon />
    </div>
  );
};

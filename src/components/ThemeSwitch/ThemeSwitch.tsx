'use client';

import React, { useLayoutEffect } from 'react';

import { DarkIcon, LightIcon } from '@/components/shared/icons';
import { Toggle } from '@/components/shared/Toggle';
import { useThemeStore } from '@/store/ThemeStore';

import styles from './ThemeSwitch.module.scss';

export const ThemeSwitch = () => {
	const { toggleTheme, theme } = useThemeStore();

	return (
		<div className={styles.themeSwitch}>
			<DarkIcon />
			<Toggle onClick={toggleTheme} active={theme === 'light'} />
			<LightIcon />
		</div>
	);
};

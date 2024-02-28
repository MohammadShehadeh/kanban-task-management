/* eslint-disable react/display-name */
import React, { PropsWithChildren } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
	return <main className={styles.layout}>{children}</main>;
};

Layout.Header = ({ children }: LayoutProps) => {
	return <nav className={styles.header}>{children}</nav>;
};

Layout.Main = ({ children }: LayoutProps) => {
	return <div className={styles.main}>{children}</div>;
};

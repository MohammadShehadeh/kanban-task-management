import React, { PropsWithChildren } from 'react';

import styles from './Layout.module.scss';

interface LayoutProps extends PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
	return <main className={styles.layout}>{children}</main>;
};

const Header = ({ children }: LayoutProps) => {
	return <nav className={styles.header}>{children}</nav>;
};

Layout.Header = Header;

const Main = ({ children }: LayoutProps) => {
	return <div className={styles.main}>{children}</div>;
};

Layout.Main = Main;
